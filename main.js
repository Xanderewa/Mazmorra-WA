// Detección de errores globales (muestra alerta)
window.onerror = function(message, source, lineno, colno, error) {
  alert('Error en JS: ' + message + ' (línea ' + lineno + ')');
};

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 700,
  parent: 'game-container',
  backgroundColor: '#111',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, DungeonScene]
};

// ========== TEXTURAS ==========
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    try {
      // Creamos texturas usando canvas (más compatible)
      this.createTexture('suelo', 64, 64, '#3a3a5c');
      this.createTexture('pared', 64, 64, '#8b4513');
      this.createTexture('player', 32, 32, '#4dd599');
      this.createTexture('enemy', 32, 32, '#ff5555');
      this.scene.start('DungeonScene');
    } catch (e) {
      alert('Error en BootScene: ' + e.message);
    }
  }

  createTexture(key, w, h, color) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    // Borde suave
    ctx.strokeStyle = '#00000033';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w-2, h-2);
    this.textures.addCanvas(key, canvas);
  }
}

// ========== ESCENA DE MAZMORRA ==========
class DungeonScene extends Phaser.Scene {
  constructor() {
    super('DungeonScene');
    this.tileSize = 64;
    this.mapWidth = 20;
    this.mapHeight = 15;
  }

  create() {
    try {
      // Mapa simplificado (igual que antes)
      this.mapData = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];

      this.groundLayer = this.add.group();
      this.wallLayer = this.physics.add.staticGroup();

      for (let y = 0; y < this.mapHeight; y++) {
        for (let x = 0; x < this.mapWidth; x++) {
          const posX = x * this.tileSize;
          const posY = y * this.tileSize;
          if (this.mapData[y][x] === 0) {
            this.add.image(posX, posY, 'suelo').setOrigin(0);
          } else {
            const wall = this.add.image(posX, posY, 'pared').setOrigin(0);
            this.wallLayer.add(wall);
          }
        }
      }

      this.player = this.physics.add.sprite(3 * this.tileSize, 3 * this.tileSize, 'player');
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.wallLayer);

      this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
      this.cameras.main.setBounds(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);

      this.createVirtualJoystick();
    } catch (e) {
      alert('Error en DungeonScene: ' + e.message);
    }
  }

  createVirtualJoystick() {
    this.joystickBase = this.add.circle(80, 600, 45, 0xffffff, 0.3).setScrollFactor(0);
    this.joystickThumb = this.add.circle(80, 600, 20, 0xffffff, 0.8).setScrollFactor(0);
    this.joystickBase.setDepth(10);
    this.joystickThumb.setDepth(11);

    this.joystickActive = false;
    this.joystickVector = { x: 0, y: 0 };

    this.input.on('pointerdown', (pointer) => {
      const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.joystickBase.x, this.joystickBase.y);
      if (dist <= 45) {
        this.joystickActive = true;
        this.updateJoystick(pointer);
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (this.joystickActive) this.updateJoystick(pointer);
    });

    this.input.on('pointerup', () => {
      this.joystickActive = false;
      this.joystickThumb.x = this.joystickBase.x;
      this.joystickThumb.y = this.joystickBase.y;
      this.joystickVector = { x: 0, y: 0 };
    });
  }

  updateJoystick(pointer) {
    const dx = pointer.x - this.joystickBase.x;
    const dy = pointer.y - this.joystickBase.y;
    const maxDist = 40;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > maxDist) {
      const angle = Math.atan2(dy, dx);
      this.joystickThumb.x = this.joystickBase.x + Math.cos(angle) * maxDist;
      this.joystickThumb.y = this.joystickBase.y + Math.sin(angle) * maxDist;
      this.joystickVector = { x: Math.cos(angle), y: Math.sin(angle) };
    } else {
      this.joystickThumb.x = pointer.x;
      this.joystickThumb.y = pointer.y;
      this.joystickVector = { x: dx / maxDist, y: dy / maxDist };
    }
  }

  update() {
    const speed = 160;
    if (this.player && this.joystickVector) {
      this.player.setVelocity(
        this.joystickVector.x * speed,
        this.joystickVector.y * speed
      );
      if (!this.joystickActive) {
        this.player.setVelocity(0, 0);
      }
    }
  }
}

// ========== INICIAR ==========
window.addEventListener('load', () => {
  try {
    const game = new Phaser.Game(config);
  } catch (e) {
    alert('Error al iniciar Phaser: ' + e.message);
  }
});
// Configuración del juego
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
    // Generamos texturas simples
    this.createTile('suelo', 0x3a3a5c, 64, 64);
    this.createTile('pared', 0x8b4513, 64, 64);
    this.createPlayerTexture();
    this.createEnemyTexture();

    this.scene.start('DungeonScene');
  }

  createTile(key, color, w, h) {
    const g = this.add.graphics();
    g.fillStyle(color, 1);
    g.fillRect(0, 0, w, h);
    g.lineStyle(2, 0x000000, 0.3);
    g.strokeRect(0, 0, w, h);
    g.generateTexture(key, w, h);
    g.destroy();
  }

  createPlayerTexture() {
    const g = this.add.graphics();
    g.fillStyle(0x4dd599, 1);
    g.fillRoundedRect(0, 0, 32, 32, 6);
    g.generateTexture('player', 32, 32);
    g.destroy();
  }

  createEnemyTexture() {
    const g = this.add.graphics();
    g.fillStyle(0xff5555, 1);
    g.fillCircle(16, 16, 16);
    g.generateTexture('enemy', 32, 32);
    g.destroy();
  }
}

// ========== ESCENA DE MAZMORRA ==========
class DungeonScene extends Phaser.Scene {
  constructor() {
    super('DungeonScene');
    this.tileSize = 64;
    this.mapWidth = 20;  // en tiles
    this.mapHeight = 15;
  }

  create() {
    // Definición del mapa (0 = suelo, 1 = pared)
    // Puedes modificar esta matriz para crear diferentes mazmorras
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

    // Creamos el grupo de suelos y paredes
    this.groundLayer = this.add.group();
    this.wallLayer = this.physics.add.staticGroup();

    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const tile = this.mapData[y][x];
        const posX = x * this.tileSize;
        const posY = y * this.tileSize;
        if (tile === 0) {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
        } else if (tile === 1) {
          const wall = this.add.image(posX, posY, 'pared').setOrigin(0);
          this.wallLayer.add(wall);
          wall.body.setSize(this.tileSize, this.tileSize);
        }
      }
    }

    // Jugador
    this.player = this.physics.add.sprite(3 * this.tileSize, 3 * this.tileSize, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.wallLayer);

    // Cámara sigue al jugador
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);

    // Joystick virtual
    this.createVirtualJoystick();
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
    this.player.setVelocity(
      this.joystickVector.x * speed,
      this.joystickVector.y * speed
    );
    if (!this.joystickActive) {
      this.player.setVelocity(0, 0);
    }
  }
}

// ========== INICIAR ==========
const game = new Phaser.Game(config);
// ========== CLASES ==========
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    // Texturas del suelo y paredes
    this.createTileTexture('suelo', 64, 64, '#3a3a5c');
    this.createTileTexture('pared', 64, 64, '#8b4513');

    // Texturas de personajes y ataque
    this.createCatTexture();
    this.createSkeletonTexture();
    this.createPawTexture();

    this.scene.start('DungeonScene');
  }

  createTileTexture(key, w, h, color) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#00000033';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w-2, h-2);
    this.textures.addCanvas(key, canvas);
  }

  createCatTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Cuerpo (círculo negro)
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.ellipse(16, 20, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Orejas (triángulos)
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.moveTo(8, 12);
    ctx.lineTo(10, 4);
    ctx.lineTo(14, 10);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(24, 12);
    ctx.lineTo(22, 4);
    ctx.lineTo(18, 10);
    ctx.fill();

    // Ojos (verdes)
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(13, 19, 1.5, 0, Math.PI*2);
    ctx.arc(19, 19, 1.5, 0, Math.PI*2);
    ctx.fill();

    // Cola (línea negra)
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(26, 20);
    ctx.quadraticCurveTo(32, 16, 28, 10);
    ctx.stroke();

    this.textures.addCanvas('cat', canvas);
  }

  createSkeletonTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Espada de madera (mango marrón, hoja gris)
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(22, 10, 2, 10);   // mango
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(21, 4, 4, 6);     // hoja

    // Cuerpo (huesos blancos)
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 3;

    // Brazos
    ctx.beginPath();
    ctx.moveTo(10, 14);
    ctx.lineTo(18, 18);
    ctx.moveTo(18, 18);
    ctx.lineTo(24, 14);
    ctx.stroke();

    // Piernas
    ctx.beginPath();
    ctx.moveTo(13, 24);
    ctx.lineTo(11, 30);
    ctx.moveTo(19, 24);
    ctx.lineTo(21, 30);
    ctx.stroke();

    // Columna vertebral
    ctx.beginPath();
    ctx.moveTo(16, 16);
    ctx.lineTo(16, 24);
    ctx.stroke();

    // Cráneo (círculo blanco)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 10, 7, 0, Math.PI*2);
    ctx.fill();

    // Ojos del cráneo (negros)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(13.5, 9, 1.2, 0, Math.PI*2);
    ctx.arc(18.5, 9, 1.2, 0, Math.PI*2);
    ctx.fill();

    // Boca (línea)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(13, 12);
    ctx.lineTo(19, 12);
    ctx.stroke();

    this.textures.addCanvas('skeleton', canvas);
  }

  createPawTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext('2d');

    // Garra (círculo blanco con "dedos")
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(12, 14, 7, 5, 0, 0, Math.PI*2);
    ctx.fill();

    // Dedos
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(8, 9, 2.5, 0, Math.PI*2);
    ctx.arc(12, 6, 2.5, 0, Math.PI*2);
    ctx.arc(16, 9, 2.5, 0, Math.PI*2);
    ctx.fill();

    // Borde negro
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();

    this.textures.addCanvas('paw', canvas);
  }
}

class DungeonScene extends Phaser.Scene {
  constructor() {
    super('DungeonScene');
    this.tileSize = 64;
    this.mapWidth = 20;
    this.mapHeight = 15;
    this.playerSpeed = 160;
    this.playerHP = 100;
    this.attackCooldown = 500;
    this.lastAttackTime = 0;
    this.invulnerable = false;
    this.invulnerableDuration = 1000;
    this.facing = 'right'; // dirección inicial
  }

  create() {
    // Mapa (puedes cambiarlo más adelante)
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

    // Suelo y paredes
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
          wall.body.setSize(this.tileSize, this.tileSize);
        }
      }
    }

    // Jugador (gato)
    this.player = this.physics.add.sprite(3 * this.tileSize, 3 * this.tileSize, 'cat');
    this.player.setCollideWorldBounds(true);
    this.playerHP = 100;
    this.physics.add.collider(this.player, this.wallLayer);

    // Enemigos (esqueletos)
    this.enemies = this.physics.add.group();
    this.spawnSkeleton(10 * this.tileSize, 10 * this.tileSize);
    this.spawnSkeleton(15 * this.tileSize, 5 * this.tileSize);

    // Colisión enemigos-paredes
    this.physics.add.collider(this.enemies, this.wallLayer);

    // Cámara
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);

    // HUD
    this.createHUD();

    // Joystick virtual
    this.createVirtualJoystick();

    // Botón de ataque
    this.createAttackButton();
  }

  spawnSkeleton(x, y) {
    const skeleton = this.enemies.create(x, y, 'skeleton');
    skeleton.setCollideWorldBounds(true);
    skeleton.health = 40;      // 2 golpes de 20 de daño
    skeleton.speed = 60;       // un poco lento
    skeleton.damage = 3;       // quita 3 HP por golpe
    skeleton.body.setSize(30, 30);
    skeleton.healthBar = this.add.graphics();
    skeleton.healthBar.setDepth(5);
    this.updateEnemyHealthBar(skeleton);
  }

  updateEnemyHealthBar(enemy) {
    enemy.healthBar.clear();
    const width = 30;
    const height = 4;
    const x = enemy.x - width/2;
    const y = enemy.y - 20;
    enemy.healthBar.fillStyle(0x000000, 0.8);
    enemy.healthBar.fillRect(x, y, width, height);
    const healthPercent = Phaser.Math.Clamp(enemy.health / 40, 0, 1);
    enemy.healthBar.fillStyle(0xff0000, 1);
    enemy.healthBar.fillRect(x, y, width * healthPercent, height);
  }

  createHUD() {
    this.playerHealthBar = this.add.graphics().setScrollFactor(0).setDepth(20);
    this.updatePlayerHealthBar();
  }

  updatePlayerHealthBar() {
    this.playerHealthBar.clear();
    const width = 150;
    const height = 15;
    const x = 10;
    const y = 10;
    this.playerHealthBar.fillStyle(0x000000, 0.8);
    this.playerHealthBar.fillRect(x, y, width, height);
    const healthPercent = Phaser.Math.Clamp(this.playerHP / 100, 0, 1);
    this.playerHealthBar.fillStyle(0x00ff00, 1);
    this.playerHealthBar.fillRect(x, y, width * healthPercent, height);
    this.playerHealthBar.lineStyle(2, 0xffffff, 0.5);
    this.playerHealthBar.strokeRect(x, y, width, height);
  }

  createAttackButton() {
    const btn = this.add.circle(340, 650, 30, 0xff0000, 0.6).setScrollFactor(0).setDepth(10);
    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerdown', () => {
      this.playerAttack();
    });
    this.add.text(340, 650, '⚔️', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
  }

  playerAttack() {
    const now = this.time.now;
    if (now - this.lastAttackTime < this.attackCooldown) return;
    this.lastAttackTime = now;

    // Mostrar garra según dirección
    let offsetX = 0, offsetY = 0;
    const range = 50;
    switch (this.facing) {
      case 'right': offsetX = range * 0.6; break;
      case 'left':  offsetX = -range * 0.6; break;
      case 'up':    offsetY = -range * 0.6; break;
      case 'down':  offsetY = range * 0.6; break;
    }

    const paw = this.add.image(this.player.x + offsetX, this.player.y + offsetY, 'paw').setDepth(6);
    this.tweens.add({
      targets: paw,
      scale: 0.8,
      alpha: 0,
      duration: 200,
      onComplete: () => paw.destroy()
    });

    // Daño a enemigos en rango
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist <= range) {
        enemy.health -= 20;
        this.updateEnemyHealthBar(enemy);
        if (enemy.health <= 0) {
          enemy.destroy();
        }
      }
    });
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

  update(time, delta) {
    // Movimiento del jugador
    this.player.setVelocity(
      this.joystickVector.x * this.playerSpeed,
      this.joystickVector.y * this.playerSpeed
    );
    if (!this.joystickActive) {
      this.player.setVelocity(0, 0);
    }

    // Actualizar dirección del gato según el movimiento
    if (Math.abs(this.joystickVector.x) > 0.2) {
      this.facing = this.joystickVector.x > 0 ? 'right' : 'left';
    } else if (Math.abs(this.joystickVector.y) > 0.2) {
      this.facing = this.joystickVector.y > 0 ? 'down' : 'up';
    }

    // Movimiento de enemigos (persecución)
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dx = this.player.x - enemy.x;
      const dy = this.player.y - enemy.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 0 && dist < 300) {
        const vx = (dx / dist) * enemy.speed;
        const vy = (dy / dist) * enemy.speed;
        enemy.setVelocity(vx, vy);
      } else {
        enemy.setVelocity(0, 0);
      }

      // Colisión con el jugador (daño)
      if (!this.invulnerable && Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        enemy.getBounds()
      )) {
        this.playerHP -= enemy.damage;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(this.invulnerableDuration, () => {
          this.invulnerable = false;
        });
        // Parpadeo rojo
        this.tweens.add({
          targets: this.player,
          alpha: 0.5,
          duration: 100,
          yoyo: true,
          repeat: 5,
          onComplete: () => { this.player.alpha = 1; }
        });

        if (this.playerHP <= 0) {
          this.playerDeath();
        }
      }

      // Actualizar posición de la barra de vida
      enemy.healthBar.setPosition(enemy.x - 15, enemy.y - 20);
    });
  }

  playerDeath() {
    this.physics.pause();
    this.add.text(200, 350, 'HAS MUERTO', { fontSize: '32px', color: '#ff0000' })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(30);
    this.time.delayedCall(2000, () => {
      this.scene.restart();
    });
  }
}

// ========== CONFIGURACIÓN E INICIO ==========
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

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
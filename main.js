// Configuración general del juego
const config = {
  type: Phaser.AUTO,
  width: 400,            // Ancho lógico (se ajustará a la pantalla)
  height: 700,           // Alto lógico
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, GameScene]
};

// ========== ESCENA DE CARGA ==========
class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    // Creamos texturas simples (sin imágenes externas)
    this.createPlayerTexture();
    this.createGroundTexture();
    this.createObstacleTexture();

    // Pasamos a la escena del juego
    this.scene.start('GameScene');
  }

  createPlayerTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x4dd599, 1);
    graphics.fillRoundedRect(0, 0, 32, 32, 6);
    graphics.generateTexture('player', 32, 32);
    graphics.destroy();
  }

  createGroundTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x3a3a5c, 1);
    graphics.fillRect(0, 0, 64, 64);
    graphics.lineStyle(2, 0x2a2a3c, 1);
    graphics.strokeRect(1, 1, 62, 62);
    graphics.generateTexture('ground', 64, 64);
    graphics.destroy();
  }

  createObstacleTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x8b4513, 1);
    graphics.fillRect(0, 0, 32, 32);
    graphics.lineStyle(2, 0x5a2e0a, 1);
    graphics.strokeRect(0, 0, 32, 32);
    graphics.generateTexture('obstacle', 32, 32);
    graphics.destroy();
  }
}

// ========== ESCENA DEL JUEGO ==========
class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Creamos un fondo de tiles (suelo)
    this.add.tileSprite(0, 0, 400, 700, 'ground').setOrigin(0, 0);

    // Obstáculos simples (puedes cambiarlos después)
    this.add.image(200, 200, 'obstacle');
    this.add.image(120, 350, 'obstacle');
    this.add.image(300, 450, 'obstacle');

    // Jugador
    this.player = this.physics.add.sprite(200, 600, 'player');
    this.player.setCollideWorldBounds(true);

    // Cámara sigue al jugador
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Inicializar joystick virtual
    this.createVirtualJoystick();
  }

  createVirtualJoystick() {
    // Base del joystick (fondo)
    this.joystickBase = this.add.circle(80, 600, 45, 0xffffff, 0.3);
    this.joystickBase.setScrollFactor(0); // Fijo en pantalla

    // Thumb (palanca)
    this.joystickThumb = this.add.circle(80, 600, 20, 0xffffff, 0.8);
    this.joystickThumb.setScrollFactor(0);

    this.joystickBase.setDepth(10);
    this.joystickThumb.setDepth(11);

    this.joystickActive = false;
    this.joystickVector = { x: 0, y: 0 };

    // Eventos táctiles
    this.input.on('pointerdown', (pointer) => {
      const distance = Phaser.Math.Distance.Between(
        pointer.x, pointer.y,
        this.joystickBase.x, this.joystickBase.y
      );
      if (distance <= 45) {
        this.joystickActive = true;
        this.updateJoystick(pointer);
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (this.joystickActive) {
        this.updateJoystick(pointer);
      }
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
    const maxDistance = 40;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > maxDistance) {
      const angle = Math.atan2(dy, dx);
      this.joystickThumb.x = this.joystickBase.x + Math.cos(angle) * maxDistance;
      this.joystickThumb.y = this.joystickBase.y + Math.sin(angle) * maxDistance;
      this.joystickVector = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      };
    } else {
      this.joystickThumb.x = pointer.x;
      this.joystickThumb.y = pointer.y;
      this.joystickVector = { x: dx / maxDistance, y: dy / maxDistance };
    }
  }

  update() {
    // Movimiento del jugador con el joystick
    const speed = 160;
    this.player.setVelocity(
      this.joystickVector.x * speed,
      this.joystickVector.y * speed
    );

    // Si no hay joystick activo, detener
    if (!this.joystickActive) {
      this.player.setVelocity(0, 0);
    }
  }
}

// ========== INICIAR JUEGO ==========
const game = new Phaser.Game(config);
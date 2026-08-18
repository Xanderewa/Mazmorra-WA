// ========== CLASES ==========
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this.createTexture('suelo', 64, 64, '#3a3a5c');
    this.createTexture('pared', 64, 64, '#8b4513');
    this.createTexture('player', 32, 32, '#4dd599');
    this.createTexture('enemy', 32, 32, '#ff5555');
    this.createTexture('attack_slash', 40, 40, '#ffffff'); // efecto de ataque
    this.scene.start('DungeonScene');
  }

  createTexture(key, w, h, color) {
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
}

class DungeonScene extends Phaser.Scene {
  constructor() {
    super('DungeonScene');
    this.tileSize = 64;
    this.mapWidth = 20;
    this.mapHeight = 15;
    this.playerSpeed = 160;
    this.playerHP = 100;
    this.attackCooldown = 500; // milisegundos entre ataques
    this.lastAttackTime = 0;
    this.invulnerable = false;
    this.invulnerableDuration = 1000; // 1 segundo de invulnerabilidad tras recibir daño
  }

  create() {
    // Mapa (igual que antes)
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

    // Jugador
    this.player = this.physics.add.sprite(3 * this.tileSize, 3 * this.tileSize, 'player');
    this.player.setCollideWorldBounds(true);
    this.playerHP = 100; // Reiniciamos vida
    this.physics.add.collider(this.player, this.wallLayer);

    // Enemigos
    this.enemies = this.physics.add.group();
    this.spawnEnemy(10 * this.tileSize, 10 * this.tileSize);
    this.spawnEnemy(15 * this.tileSize, 5 * this.tileSize);

    // Colisión entre enemigos y paredes
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

  spawnEnemy(x, y) {
    const enemy = this.enemies.create(x, y, 'enemy');
    enemy.setCollideWorldBounds(true);
    enemy.health = 50;
    enemy.speed = 80;
    enemy.damage = 10;
    enemy.body.setSize(30, 30); // ajustar hitbox
    // Barra de vida del enemigo
    enemy.healthBar = this.add.graphics();
    enemy.healthBar.setDepth(5);
    this.updateEnemyHealthBar(enemy);
  }

  updateEnemyHealthBar(enemy) {
    enemy.healthBar.clear();
    const width = 30;
    const height = 4;
    const x = enemy.x - width/2;
    const y = enemy.y - 20;
    // Fondo
    enemy.healthBar.fillStyle(0x000000, 0.8);
    enemy.healthBar.fillRect(x, y, width, height);
    // Relleno según vida
    const healthPercent = Phaser.Math.Clamp(enemy.health / 50, 0, 1);
    enemy.healthBar.fillStyle(0xff0000, 1);
    enemy.healthBar.fillRect(x, y, width * healthPercent, height);
  }

  createHUD() {
    // Barra de vida del jugador (fija en pantalla)
    this.playerHealthBar = this.add.graphics().setScrollFactor(0).setDepth(20);
    this.updatePlayerHealthBar();
  }

  updatePlayerHealthBar() {
    this.playerHealthBar.clear();
    const width = 150;
    const height = 15;
    const x = 10;
    const y = 10;
    // Fondo
    this.playerHealthBar.fillStyle(0x000000, 0.8);
    this.playerHealthBar.fillRect(x, y, width, height);
    // Relleno
    const healthPercent = Phaser.Math.Clamp(this.playerHP / 100, 0, 1);
    this.playerHealthBar.fillStyle(0x00ff00, 1);
    this.playerHealthBar.fillRect(x, y, width * healthPercent, height);
    // Borde
    this.playerHealthBar.lineStyle(2, 0xffffff, 0.5);
    this.playerHealthBar.strokeRect(x, y, width, height);
  }

  createAttackButton() {
    const btn = this.add.circle(340, 650, 30, 0xff0000, 0.6).setScrollFactor(0).setDepth(10);
    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerdown', () => {
      this.playerAttack();
    });
    // Texto
    this.add.text(340, 650, '⚔️', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
  }

  playerAttack() {
    const now = this.time.now;
    if (now - this.lastAttackTime < this.attackCooldown) return;
    this.lastAttackTime = now;

    // Efecto visual de ataque (círculo blanco temporal)
    const slash = this.add.circle(this.player.x, this.player.y, 40, 0xffffff, 0.5).setDepth(5);
    this.tweens.add({
      targets: slash,
      scale: 0.5,
      alpha: 0,
      duration: 200,
      onComplete: () => slash.destroy()
    });

    // Comprobar enemigos en rango
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist <= 50) { // alcance del ataque
        enemy.health -= 20; // daño del ataque
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

    // Movimiento de enemigos (persecución simple)
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dx = this.player.x - enemy.x;
      const dy = this.player.y - enemy.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 0 && dist < 300) { // rango de detección
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
        // Efecto visual de daño (parpadeo)
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

      // Actualizar barra de vida enemiga posición
      enemy.healthBar.x = enemy.x - 15;
      enemy.healthBar.y = enemy.y - 20;
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
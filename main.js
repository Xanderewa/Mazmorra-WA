// ========== DATOS DE MAZMORRAS ==========
const MAZMORRAS = [
  {
    id: 'cripta',
    nombre: 'Cripta de las Sombras',
    dificultad: 1,
    desbloqueada: true,
    mensaje: 'La Cripta de las Sombras se abre ante ti...',
    colorLetra: '#B266FF',
    // Mapa de 20x20 (filas de strings)
    // # = pared, . = suelo, S = esqueleto, B = murciélago, Z = zombi,
    // T = pinchos, J = jefe (nigromante), P = posición inicial jugador
    mapa: [
      '####################',
      '#P.................#',
      '#..................#',
      '#...S..............#',
      '#..................#',
      '#..T...............#',
      '#..................#',
      '#........Z.........#',
      '#..................#',
      '#.....B............#',
      '#..................#',
      '#...........S......#',
      '#..................#',
      '#......T...........#',
      '#..................#',
      '#.........Z........#',
      '#..................#',
      '#.............J....#',
      '#..................#',
      '####################'
    ],
    enemigos: [
      { tipo: 'esqueleto', cantidad: 3 },
      { tipo: 'murcielago', cantidad: 2 },
      { tipo: 'zombi', cantidad: 2 }
    ],
    jefes: [
      { tipo: 'nigromante', posicion: { x: 17, y: 17 } }
    ],
    recompensaJefe: { monedas: 100, llaves: 1 }
  },
  {
    id: 'bosque',
    nombre: 'Bosque Maldito',
    dificultad: 2,
    desbloqueada: false,
    mensaje: 'El Bosque Maldito susurra tu nombre...',
    colorLetra: '#9ACD32',
    mapa: [
      '####################',
      '#P.................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '####################'
    ],
    enemigos: [],
    jefes: [],
    recompensaJefe: { monedas: 200, llaves: 1 }
  },
  {
    id: 'cavernas',
    nombre: 'Cavernas de Hielo',
    dificultad: 3,
    desbloqueada: false,
    mensaje: 'Las Cavernas de Hielo te hielan el alma...',
    colorLetra: '#00BFFF',
    mapa: [
      '####################',
      '#P.................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '####################'
    ],
    enemigos: [],
    jefes: [],
    recompensaJefe: { monedas: 300, llaves: 1 }
  },
  {
    id: 'lava',
    nombre: 'Lava Infernal',
    dificultad: 4,
    desbloqueada: false,
    mensaje: 'Lava Infernal arde ante ti. Solo los más fuertes sobreviven.',
    colorLetra: '#FF4500',
    mapa: [
      '####################',
      '#P.................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '#..................#',
      '####################'
    ],
    enemigos: [],
    jefes: [],
    recompensaJefe: { monedas: 500, llaves: 1 }
  }
];

// ========== CLASES ==========
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    // Texturas de tiles
    this.createTileTexture('suelo', 64, 64, '#3a3a5c');
    this.createTileTexture('pared', 64, 64, '#8b4513');
    this.createTileTexture('pincho', 64, 64, '#aaaaaa', true); // triángulos

    // Personajes
    this.createCatTexture();
    this.createSkeletonTexture();
    this.createBatTexture();
    this.createZombieTexture();
    this.createNecromancerTexture();
    this.createPawTexture();
    this.createProjectileTexture();

    // Moneda
    this.createCoinTexture();

    this.scene.start('MenuScene');
  }

  createTileTexture(key, w, h, color, isSpike = false) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (isSpike) {
      // Fondo transparente
      ctx.clearRect(0, 0, w, h);
      // Triángulos de pinchos (gris oscuro)
      ctx.fillStyle = '#555555';
      for (let i = 0; i < 4; i++) {
        const x = i * (w / 4);
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(x + w / 8, 0);
        ctx.lineTo(x + w / 4, h);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#00000033';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, w-2, h-2);
    }
    this.textures.addCanvas(key, canvas);
  }

  createCatTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.ellipse(16, 20, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Orejas
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.moveTo(8, 12); ctx.lineTo(10, 4); ctx.lineTo(14, 10); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(24, 12); ctx.lineTo(22, 4); ctx.lineTo(18, 10); ctx.fill();
    // Ojos
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(13, 19, 1.5, 0, Math.PI*2); ctx.arc(19, 19, 1.5, 0, Math.PI*2); ctx.fill();
    // Cola
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(26, 20); ctx.quadraticCurveTo(32, 16, 28, 10); ctx.stroke();
    this.textures.addCanvas('cat', canvas);
  }

  createSkeletonTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    // Espada
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(22, 10, 2, 10);
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(21, 4, 4, 6);
    // Cuerpo
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 14); ctx.lineTo(18, 18); ctx.moveTo(18, 18); ctx.lineTo(24, 14);
    ctx.moveTo(13, 24); ctx.lineTo(11, 30); ctx.moveTo(19, 24); ctx.lineTo(21, 30);
    ctx.moveTo(16, 16); ctx.lineTo(16, 24);
    ctx.stroke();
    // Cráneo
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 10, 7, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(13.5, 9, 1.2, 0, Math.PI*2); ctx.arc(18.5, 9, 1.2, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(13, 12); ctx.lineTo(19, 12); ctx.stroke();
    this.textures.addCanvas('skeleton', canvas);
  }

  createBatTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    // Cuerpo (círculo gris)
    ctx.fillStyle = '#666666';
    ctx.beginPath();
    ctx.arc(16, 18, 6, 0, Math.PI*2); ctx.fill();
    // Alas (triángulos)
    ctx.fillStyle = '#555555';
    ctx.beginPath();
    ctx.moveTo(8, 10); ctx.lineTo(16, 18); ctx.lineTo(4, 22); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(24, 10); ctx.lineTo(16, 18); ctx.lineTo(28, 22); ctx.fill();
    // Ojos rojos
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(14, 17, 1.5, 0, Math.PI*2); ctx.arc(18, 17, 1.5, 0, Math.PI*2); ctx.fill();
    this.textures.addCanvas('bat', canvas);
  }

  createZombieTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    // Cuerpo verde
    ctx.fillStyle = '#556b2f';
    ctx.fillRect(8, 8, 16, 20);
    // Cabeza
    ctx.fillStyle = '#6b8e23';
    ctx.beginPath();
    ctx.arc(16, 10, 7, 0, Math.PI*2); ctx.fill();
    // Ojos
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(13, 9, 1.5, 0, Math.PI*2); ctx.arc(19, 9, 1.5, 0, Math.PI*2); ctx.fill();
    // Brazos extendidos
    ctx.strokeStyle = '#556b2f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(8, 14); ctx.lineTo(2, 18);
    ctx.moveTo(24, 14); ctx.lineTo(30, 18);
    ctx.stroke();
    this.textures.addCanvas('zombie', canvas);
  }

  createNecromancerTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    // Túnica morada
    ctx.fillStyle = '#800080';
    ctx.fillRect(8, 12, 16, 20);
    // Capucha
    ctx.fillStyle = '#4b0082';
    ctx.beginPath();
    ctx.arc(16, 12, 8, 0, Math.PI*2); ctx.fill();
    // Ojos brillantes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(13, 11, 1.5, 0, Math.PI*2); ctx.arc(19, 11, 1.5, 0, Math.PI*2); ctx.fill();
    // Bastón
    ctx.strokeStyle = '#8b5a2b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(26, 18); ctx.lineTo(26, 32); ctx.stroke();
    this.textures.addCanvas('necromancer', canvas);
  }

  createPawTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 24;
    canvas.height = 24;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(12, 14, 7, 5, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(8, 9, 2.5, 0, Math.PI*2); ctx.arc(12, 6, 2.5, 0, Math.PI*2); ctx.arc(16, 9, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
    this.textures.addCanvas('paw', canvas);
  }

  createProjectileTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 8;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#aa00ff';
    ctx.beginPath();
    ctx.arc(4, 4, 4, 0, Math.PI*2); ctx.fill();
    this.textures.addCanvas('projectile', canvas);
  }

  createCoinTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 12;
    canvas.height = 12;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(6, 6, 6, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#b8860b';
    ctx.beginPath();
    ctx.arc(6, 6, 3, 0, Math.PI*2); ctx.fill();
    this.textures.addCanvas('coin', canvas);
  }
}

// ========== ESCENA DE MENÚ ==========
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Título
    this.add.text(200, 80, 'Mazmorras 2D', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);

    // Monedas y llaves
    const monedas = parseInt(localStorage.getItem('monedas') || '0');
    const llaves = parseInt(localStorage.getItem('llaves') || '0');
    this.add.text(200, 130, `🪙 ${monedas}   🔑 ${llaves}`, { fontSize: '20px', color: '#ffd700' }).setOrigin(0.5);

    // Botones de mazmorras
    MAZMORRAS.forEach((mazmorra, index) => {
      const y = 220 + index * 80;
      const btn = this.add.rectangle(200, y, 300, 60, mazmorra.desbloqueada ? 0x3777ca : 0x444444)
        .setInteractive({ useHandCursor: true });

      this.add.text(200, y, `${mazmorra.desbloqueada ? '' : '🔒 '}${mazmorra.nombre}`, {
        fontSize: '18px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);

      if (mazmorra.desbloqueada) {
        btn.on('pointerdown', () => {
          this.scene.start('DungeonScene', { mazmorraIndex: index });
        });
      } else {
        btn.on('pointerdown', () => {
          // Mostrar mensaje de bloqueada
          this.add.text(200, y + 40, 'Completa la mazmorra anterior', {
            fontSize: '14px',
            color: '#ff5555'
          }).setOrigin(0.5).setDepth(1);
        });
      }
    });

    // Instrucciones
    this.add.text(200, 560, 'Usa el joystick para moverte\nBotón ⚔️ para atacar', {
      fontSize: '14px',
      color: '#cccccc',
      align: 'center'
    }).setOrigin(0.5);
  }
}

// ========== ESCENA DE MAZMORRA ==========
class DungeonScene extends Phaser.Scene {
  constructor() {
    super('DungeonScene');
    this.tileSize = 64;
    this.playerSpeed = 160;
    this.playerHP = 100;
    this.attackCooldown = 500;
    this.lastAttackTime = 0;
    this.invulnerable = false;
    this.invulnerableDuration = 1000;
    this.facing = 'right';
    this.currentMazmorra = null;
    this.enemies = null;
    this.jefes = null;
    this.projectiles = null;
    this.coinsGroup = null;
    this.spikeGroup = null;
    this.wallLayer = null;
    this.joystickActive = false;
    this.joystickVector = { x: 0, y: 0 };
  }

  init(data) {
    this.currentMazmorra = MAZMORRAS[data.mazmorraIndex];
  }

  create() {
    const mazmorra = this.currentMazmorra;

    // Mostrar mensaje de entrada (temporal)
    this.mensajeEntrada = this.add.text(200, 350, mazmorra.mensaje, {
      fontSize: '20px',
      color: mazmorra.colorLetra,
      align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
    this.time.delayedCall(2500, () => this.mensajeEntrada.destroy());

    // Construir mapa
    this.wallLayer = this.physics.add.staticGroup();
    this.spikeGroup = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group();
    this.jefes = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.coinsGroup = this.physics.add.group();

    const mapa = mazmorra.mapa;
    for (let y = 0; y < mapa.length; y++) {
      for (let x = 0; x < mapa[y].length; x++) {
        const posX = x * this.tileSize;
        const posY = y * this.tileSize;
        const char = mapa[y][x];
        if (char === '#') {
          const wall = this.add.image(posX, posY, 'pared').setOrigin(0);
          this.wallLayer.add(wall);
          wall.body.setSize(this.tileSize, this.tileSize);
        } else if (char === '.') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
        } else if (char === 'P') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
          this.player = this.physics.add.sprite(posX, posY, 'cat');
          this.player.setCollideWorldBounds(true);
          this.playerHP = 100;
          this.physics.add.collider(this.player, this.wallLayer);
        } else if (char === 'S') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
          this.spawnEnemy('esqueleto', posX, posY);
        } else if (char === 'B') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
          this.spawnEnemy('murcielago', posX, posY);
        } else if (char === 'Z') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
          this.spawnEnemy('zombi', posX, posY);
        } else if (char === 'T') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
          const spike = this.add.image(posX, posY, 'pincho').setOrigin(0);
          this.spikeGroup.add(spike);
          spike.body.setSize(this.tileSize, this.tileSize);
        } else if (char === 'J') {
          this.add.image(posX, posY, 'suelo').setOrigin(0);
          this.spawnEnemy('nigromante', posX, posY, true); // es jefe
        }
      }
    }

    // Si no se definió jugador (por seguridad), crear en posición por defecto
    if (!this.player) {
      this.player = this.physics.add.sprite(3 * this.tileSize, 3 * this.tileSize, 'cat');
      this.player.setCollideWorldBounds(true);
      this.playerHP = 100;
      this.physics.add.collider(this.player, this.wallLayer);
    }

    // Colisiones enemigos-paredes
    this.physics.add.collider(this.enemies, this.wallLayer);
    this.physics.add.collider(this.jefes, this.wallLayer);

    // Cámara
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, mapa[0].length * this.tileSize, mapa.length * this.tileSize);

    // HUD
    this.createHUD();

    // Joystick virtual
    this.createVirtualJoystick();

    // Botón de ataque
    this.createAttackButton();
  }

  spawnEnemy(tipo, x, y, esJefe = false) {
    let sprite;
    let health, speed, damage, rangeDetect;
    switch (tipo) {
      case 'esqueleto':
        sprite = this.enemies.create(x, y, 'skeleton');
        health = 40;
        speed = 60;
        damage = 3;
        rangeDetect = 300;
        break;
      case 'murcielago':
        sprite = this.enemies.create(x, y, 'bat');
        health = 20;
        speed = 100;
        damage = 5;
        rangeDetect = 250;
        break;
      case 'zombi':
        sprite = this.enemies.create(x, y, 'zombie');
        health = 60;
        speed = 40;
        damage = 8;
        rangeDetect = 200;
        break;
      case 'nigromante':
        if (esJefe) {
          sprite = this.jefes.create(x, y, 'necromancer');
        } else {
          sprite = this.enemies.create(x, y, 'necromancer');
        }
        health = 150;
        speed = 50;
        damage = 10;
        rangeDetect = 400;
        break;
      default:
        sprite = this.enemies.create(x, y, 'skeleton');
        health = 40;
        speed = 60;
        damage = 3;
        rangeDetect = 300;
    }

    sprite.setCollideWorldBounds(true);
    sprite.health = health;
    sprite.speed = speed;
    sprite.damage = damage;
    sprite.rangeDetect = rangeDetect;
    sprite.tipo = tipo;
    sprite.esJefe = esJefe;
    sprite.body.setSize(30, 30);
    sprite.healthBar = this.add.graphics();
    sprite.healthBar.setDepth(5);
    this.updateEnemyHealthBar(sprite);
    return sprite;
  }

  updateEnemyHealthBar(enemy) {
    enemy.healthBar.clear();
    const width = 30;
    const height = 4;
    const x = enemy.x - width/2;
    const y = enemy.y - 20;
    enemy.healthBar.fillStyle(0x000000, 0.8);
    enemy.healthBar.fillRect(x, y, width, height);
    const maxHealth = enemy.tipo === 'nigromante' ? 150 : enemy.tipo === 'zombi' ? 60 : enemy.tipo === 'murcielago' ? 20 : 40;
    const healthPercent = Phaser.Math.Clamp(enemy.health / maxHealth, 0, 1);
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

    // Daño a enemigos normales
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist <= range) {
        enemy.health -= 20;
        this.updateEnemyHealthBar(enemy);
        if (enemy.health <= 0) {
          this.dropCoins(enemy.x, enemy.y);
          enemy.destroy();
        }
      }
    });

    // Daño a jefes
    this.jefes.children.iterate((jefe) => {
      if (!jefe.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, jefe.x, jefe.y);
      if (dist <= range) {
        jefe.health -= 20;
        this.updateEnemyHealthBar(jefe);
        if (jefe.health <= 0) {
          this.derrotarJefe(jefe);
        }
      }
    });
  }

  dropCoins(x, y) {
    const coin = this.coinsGroup.create(x, y, 'coin');
    coin.setDepth(3);
    // Moneda desaparece tras 3 segundos si no se recoge
    this.time.delayedCall(3000, () => {
      if (coin.active) coin.destroy();
    });
  }

  derrotarJefe(jefe) {
    // Recompensas
    const recompensa = this.currentMazmorra.recompensaJefe;
    let monedas = parseInt(localStorage.getItem('monedas') || '0');
    monedas += recompensa.monedas;
    localStorage.setItem('monedas', monedas.toString());

    let llaves = parseInt(localStorage.getItem('llaves') || '0');
    llaves += recompensa.llaves;
    localStorage.setItem('llaves', llaves.toString());

    // Marcar mazmorra completada y desbloquear siguiente
    const idx = MAZMORRAS.indexOf(this.currentMazmorra);
    const completadas = JSON.parse(localStorage.getItem('mazmorrasCompletadas') || '[]');
    if (!completadas.includes(this.currentMazmorra.id)) {
      completadas.push(this.currentMazmorra.id);
      localStorage.setItem('mazmorrasCompletadas', JSON.stringify(completadas));
    }
    if (idx + 1 < MAZMORRAS.length) {
      MAZMORRAS[idx + 1].desbloqueada = true;
      // Guardar desbloqueo en localStorage (simple)
      localStorage.setItem('mazmorraDesbloqueada', MAZMORRAS[idx + 1].id);
    }

    jefe.destroy();

    // Pantalla de victoria
    this.physics.pause();
    this.add.text(200, 350, '¡VICTORIA!\nHas derrotado al jefe', {
      fontSize: '28px',
      color: '#ffd700',
      align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(30);

    this.add.text(200, 420, `Recompensas: ${recompensa.monedas} monedas, ${recompensa.llaves} llave(s)`, {
      fontSize: '16px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(30);

    const btnVolver = this.add.rectangle(200, 500, 150, 40, 0x3777ca)
      .setInteractive({ useHandCursor: true })
      .setScrollFactor(0)
      .setDepth(30);
    this.add.text(200, 500, 'Volver al menú', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5).setScrollFactor(0).setDepth(31);
    btnVolver.on('pointerdown', () => {
      this.scene.start('MenuScene');
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

    // Actualizar dirección
    if (Math.abs(this.joystickVector.x) > 0.2) {
      this.facing = this.joystickVector.x > 0 ? 'right' : 'left';
    } else if (Math.abs(this.joystickVector.y) > 0.2) {
      this.facing = this.joystickVector.y > 0 ? 'down' : 'up';
    }

    // Colisiones con pinchos
    this.physics.overlap(this.player, this.spikeGroup, (player, spike) => {
      if (!this.invulnerable) {
        this.playerHP -= 10;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(this.invulnerableDuration, () => {
          this.invulnerable = false;
        });
        this.tweens.add({
          targets: this.player,
          alpha: 0.5,
          duration: 100,
          yoyo: true,
          repeat: 5,
          onComplete: () => { this.player.alpha = 1; }
        });
        if (this.playerHP <= 0) this.playerDeath();
      }
    });

    // Recoger monedas
    this.physics.overlap(this.player, this.coinsGroup, (player, coin) => {
      if (coin.active) {
        coin.destroy();
        let monedas = parseInt(localStorage.getItem('monedas') || '0');
        monedas += 5; // cantidad fija por moneda
        localStorage.setItem('monedas', monedas.toString());
      }
    });

    // Movimiento de enemigos normales
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      this.handleEnemyAI(enemy);
    });

    // Movimiento de jefes
    this.jefes.children.iterate((jefe) => {
      if (!jefe.active) return;
      this.handleEnemyAI(jefe, true);
    });

    // Actualizar barras de vida de enemigos
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      enemy.healthBar.setPosition(enemy.x - 15, enemy.y - 20);
    });
    this.jefes.children.iterate((jefe) => {
      if (!jefe.active) return;
      jefe.healthBar.setPosition(jefe.x - 15, jefe.y - 20);
    });

    // Proyectiles de jefes
    this.projectiles.children.iterate((proj) => {
      if (!proj.active) return;
      // Mover en línea recta (dirección guardada)
      proj.x += proj.vx;
      proj.y += proj.vy;

      // Colisión con jugador
      if (!this.invulnerable && Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        proj.getBounds()
      )) {
        this.playerHP -= proj.damage;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(this.invulnerableDuration, () => {
          this.invulnerable = false;
        });
        this.tweens.add({
          targets: this.player,
          alpha: 0.5,
          duration: 100,
          yoyo: true,
          repeat: 5,
          onComplete: () => { this.player.alpha = 1; }
        });
        if (this.playerHP <= 0) this.playerDeath();
        proj.destroy();
      }

      // Si sale del mapa, destruir
      if (proj.x < 0 || proj.x > this.cameras.main.worldView.right || proj.y < 0 || proj.y > this.cameras.main.worldView.bottom) {
        proj.destroy();
      }
    });
  }

  handleEnemyAI(enemy, esJefe = false) {
    // Persecución simple
    const dx = this.player.x - enemy.x;
    const dy = this.player.y - enemy.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist > 0 && dist < enemy.rangeDetect) {
      // Movimiento hacia el jugador
      let vx = (dx / dist) * enemy.speed;
      let vy = (dy / dist) * enemy.speed;

      // Si es murciélago, movimiento errático
      if (enemy.tipo === 'murcielago') {
        vx += Math.sin(this.time.now / 500) * 30;
        vy += Math.cos(this.time.now / 500) * 30;
      }

      enemy.setVelocity(vx, vy);

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
        this.tweens.add({
          targets: this.player,
          alpha: 0.5,
          duration: 100,
          yoyo: true,
          repeat: 5,
          onComplete: () => { this.player.alpha = 1; }
        });
        if (this.playerHP <= 0) this.playerDeath();
      }

      // Ataque a distancia si es nigromante
      if (enemy.tipo === 'nigromante' && esJefe) {
        this.nigromanteAttack(enemy);
      }
    } else {
      enemy.setVelocity(0, 0);
    }
  }

  nigromanteAttack(jefe) {
    // Disparar proyectil cada 2 segundos
    if (!jefe.lastShot || this.time.now - jefe.lastShot > 2000) {
      jefe.lastShot = this.time.now;
      const dx = this.player.x - jefe.x;
      const dy = this.player.y - jefe.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 0) {
        const proj = this.projectiles.create(jefe.x, jefe.y, 'projectile');
        proj.vx = (dx / dist) * 150;
        proj.vy = (dy / dist) * 150;
        proj.damage = 15;
        proj.setDepth(4);
      }
    }
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
  scene: [BootScene, MenuScene, DungeonScene]
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
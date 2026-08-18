// ========== DATOS DE MAZMORRAS ==========
const MAZMORRAS = [
  {
    id: 'cripta',
    nombre: 'Cripta de las Sombras',
    dificultad: 1,
    desbloqueada: true,
    mensaje: 'La Cripta de las Sombras se abre ante ti...',
    colorLetra: '#B266FF',
    colorSuelo: '#3a3a5c',
    colorPared: '#5c3a6b',
    // Mapa 20x20
    mapa: [
      '####################',
      '#P.................#',
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
      '#..................#',
      '####################'
    ],
    enemigos: [
      { tipo: 'esqueleto', x: 3, y: 3 },
      { tipo: 'esqueleto', x: 11, y: 11 },
      { tipo: 'murcielago', x: 5, y: 9 },
      { tipo: 'murcielago', x: 8, y: 5 },
      { tipo: 'zombi', x: 8, y: 7 },
      { tipo: 'zombi', x: 9, y: 15 }
    ],
    jefes: [
      { tipo: 'nigromante', x: 17, y: 17 }
    ],
    decoracion: ['ataud', 'antorchas']
  },
  {
    id: 'bosque',
    nombre: 'Bosque Maldito',
    dificultad: 2,
    desbloqueada: true,
    mensaje: 'El Bosque Maldito susurra tu nombre...',
    colorLetra: '#9ACD32',
    colorSuelo: '#1B4D1B',
    colorPared: '#2E7D32',
    mapa: [
      '####################',
      '#P.................#',
      '#...L..............#',
      '#..................#',
      '#..T...............#',
      '#..................#',
      '#........L.........#',
      '#..................#',
      '#.....P............#',
      '#..................#',
      '#...........L......#',
      '#..................#',
      '#......T...........#',
      '#..................#',
      '#.........L........#',
      '#..................#',
      '#.............J....#',
      '#..................#',
      '#..................#',
      '####################'
    ],
    enemigos: [
      { tipo: 'lobo', x: 4, y: 4 },
      { tipo: 'lobo', x: 8, y: 7 },
      { tipo: 'planta', x: 9, y: 5 },
      { tipo: 'planta', x: 5, y: 10 },
      { tipo: 'lobo', x: 11, y: 12 },
      { tipo: 'murcielago', x: 6, y: 14 }
    ],
    jefes: [
      { tipo: 'ent', x: 17, y: 17 }
    ],
    decoracion: ['arboles', 'flores']
  },
  {
    id: 'cavernas',
    nombre: 'Cavernas de Hielo',
    dificultad: 3,
    desbloqueada: true,
    mensaje: 'Las Cavernas de Hielo te hielan el alma...',
    colorLetra: '#00BFFF',
    colorSuelo: '#1a3a4a',
    colorPared: '#2c5e7a',
    mapa: [
      '####################',
      '#P.................#',
      '#...G..............#',
      '#..................#',
      '#..T...............#',
      '#..................#',
      '#........G.........#',
      '#..................#',
      '#.....G............#',
      '#..................#',
      '#...........G......#',
      '#..................#',
      '#......T...........#',
      '#..................#',
      '#.........G........#',
      '#..................#',
      '#.............J....#',
      '#..................#',
      '#..................#',
      '####################'
    ],
    enemigos: [
      { tipo: 'golem', x: 4, y: 4 },
      { tipo: 'golem', x: 8, y: 7 },
      { tipo: 'murcielago_escarcha', x: 5, y: 9 },
      { tipo: 'murcielago_escarcha', x: 10, y: 13 },
      { tipo: 'lobo_artico', x: 6, y: 5 },
      { tipo: 'lobo_artico', x: 12, y: 15 }
    ],
    jefes: [
      { tipo: 'yeti', x: 17, y: 17 }
    ],
    decoracion: ['cristales', 'nieve']
  },
  {
    id: 'lava',
    nombre: 'Lava Infernal',
    dificultad: 4,
    desbloqueada: true,
    mensaje: 'Lava Infernal arde ante ti. Solo los más fuertes sobreviven.',
    colorLetra: '#FF4500',
    colorSuelo: '#5a2e0a',
    colorPared: '#8b3a0a',
    mapa: [
      '####################',
      '#P.................#',
      '#...A..............#',
      '#..................#',
      '#..T...............#',
      '#..................#',
      '#........E.........#',
      '#..................#',
      '#.....A............#',
      '#..................#',
      '#...........E......#',
      '#..................#',
      '#......T...........#',
      '#..................#',
      '#.........A........#',
      '#..................#',
      '#.............J....#',
      '#..................#',
      '#..................#',
      '####################'
    ],
    enemigos: [
      { tipo: 'arana', x: 4, y: 4 },
      { tipo: 'arana', x: 9, y: 9 },
      { tipo: 'esqueleto_llameante', x: 8, y: 7 },
      { tipo: 'esqueleto_llameante', x: 11, y: 12 },
      { tipo: 'arana', x: 5, y: 14 },
      { tipo: 'esqueleto_llameante', x: 13, y: 15 }
    ],
    jefes: [
      { tipo: 'carnicero', x: 17, y: 17 }
    ],
    decoracion: ['lava', 'rocas']
  }
];

// ========== CLASES ==========
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    // Texturas de tiles (se generan en DungeonScene con colores personalizados)
    // Solo creamos texturas de personajes, enemigos y objetos
    this.createCatTexture();
    this.createSkeletonTexture();
    this.createBatTexture();
    this.createZombieTexture();
    this.createNecromancerTexture();
    this.createWolfTexture();
    this.createPlantTexture();
    this.createGolemTexture();
    this.createArachnidTexture();
    this.createFlameSkeletonTexture();
    this.createYetiTexture();
    this.createEntTexture();
    this.createCarniceroTexture();
    this.createPawTexture();
    this.createProjectileTexture();
    this.createCoinTexture();
    this.createDecorations();

    this.scene.start('MenuScene');
  }

  createCatTexture() {
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const ctx = c.getContext('2d');
    // Cuerpo
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(16, 20, 10, 8, 0, 0, Math.PI*2);
    ctx.fill();
    // Orejas
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.moveTo(8,12); ctx.lineTo(10,4); ctx.lineTo(14,10); ctx.fill();
    ctx.beginPath(); ctx.moveTo(24,12); ctx.lineTo(22,4); ctx.lineTo(18,10); ctx.fill();
    // Ojos (verdes con brillo)
    ctx.fillStyle = '#0f0';
    ctx.beginPath(); ctx.arc(13,19,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(19,19,1.5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(13.5,18.5,0.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(19.5,18.5,0.5,0,Math.PI*2); ctx.fill();
    // Nariz
    ctx.fillStyle = '#ff9999';
    ctx.beginPath(); ctx.arc(16,21,1,0,Math.PI*2); ctx.fill();
    // Cola
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(26,20); ctx.quadraticCurveTo(32,16,28,10); ctx.stroke();
    this.textures.addCanvas('cat', c);
  }

  createSkeletonTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Espada de madera
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(22,10,2,10);
    ctx.fillStyle = '#ccc'; ctx.fillRect(21,4,4,6);
    // Cuerpo huesos
    ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10,14); ctx.lineTo(18,18); ctx.moveTo(18,18); ctx.lineTo(24,14);
    ctx.moveTo(13,24); ctx.lineTo(11,30); ctx.moveTo(19,24); ctx.lineTo(21,30);
    ctx.moveTo(16,16); ctx.lineTo(16,24);
    ctx.stroke();
    // Cráneo
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    // Ojos negros
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(13.5,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18.5,9,1.2,0,Math.PI*2); ctx.fill();
    // Boca
    ctx.strokeStyle = '#000'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(13,12); ctx.lineTo(19,12); ctx.stroke();
    this.textures.addCanvas('skeleton', c);
  }

  createBatTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo
    ctx.fillStyle = '#666'; ctx.beginPath(); ctx.arc(16,18,6,0,Math.PI*2); ctx.fill();
    // Alas grandes
    ctx.fillStyle = '#555';
    ctx.beginPath(); ctx.moveTo(8,10); ctx.lineTo(16,18); ctx.lineTo(2,24); ctx.fill();
    ctx.beginPath(); ctx.moveTo(24,10); ctx.lineTo(16,18); ctx.lineTo(30,24); ctx.fill();
    // Ojos rojos
    ctx.fillStyle = '#f00';
    ctx.beginPath(); ctx.arc(14,17,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,17,1.5,0,Math.PI*2); ctx.fill();
    // Colmillos
    ctx.fillStyle = '#fff';
    ctx.fillRect(14,20,1,2); ctx.fillRect(17,20,1,2);
    this.textures.addCanvas('bat', c);
  }

  createZombieTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo verde podrido
    ctx.fillStyle = '#556b2f'; ctx.fillRect(8,8,16,20);
    // Cabeza
    ctx.fillStyle = '#6b8e23'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    // Ojos rojos
    ctx.fillStyle = '#f00';
    ctx.beginPath(); ctx.arc(13,9,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(19,9,1.5,0,Math.PI*2); ctx.fill();
    // Herida
    ctx.fillStyle = '#8b0000'; ctx.fillRect(12,14,8,2);
    // Brazos extendidos
    ctx.strokeStyle = '#556b2f'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(8,14); ctx.lineTo(2,18); ctx.moveTo(24,14); ctx.lineTo(30,18); ctx.stroke();
    this.textures.addCanvas('zombie', c);
  }

  createNecromancerTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Túnica púrpura
    ctx.fillStyle = '#800080'; ctx.fillRect(8,12,16,20);
    // Capucha
    ctx.fillStyle = '#4b0082'; ctx.beginPath(); ctx.arc(16,12,8,0,Math.PI*2); ctx.fill();
    // Ojos brillantes
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(13,11,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(19,11,1.5,0,Math.PI*2); ctx.fill();
    // Bastón
    ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(26,18); ctx.lineTo(26,32); ctx.stroke();
    this.textures.addCanvas('necromancer', c);
  }

  createWolfTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo gris
    ctx.fillStyle = '#555'; ctx.fillRect(6,12,20,12);
    // Cabeza
    ctx.fillStyle = '#666'; ctx.beginPath(); ctx.arc(16,10,6,0,Math.PI*2); ctx.fill();
    // Orejas
    ctx.fillStyle = '#555';
    ctx.beginPath(); ctx.moveTo(12,7); ctx.lineTo(14,2); ctx.lineTo(17,7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(20,7); ctx.lineTo(22,2); ctx.lineTo(25,7); ctx.fill();
    // Ojos amarillos
    ctx.fillStyle = '#ff0';
    ctx.beginPath(); ctx.arc(14,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,9,1.2,0,Math.PI*2); ctx.fill();
    // Cola
    ctx.strokeStyle = '#555'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(26,16); ctx.quadraticCurveTo(30,10,28,6); ctx.stroke();
    this.textures.addCanvas('wolf', c);
  }

  createPlantTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Maceta
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(10,24,12,8);
    // Tallo
    ctx.strokeStyle = '#0f0'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(16,24); ctx.lineTo(16,12); ctx.stroke();
    // Hojas
    ctx.fillStyle = '#0a0';
    ctx.fillRect(14,14,4,8); ctx.fillRect(18,14,4,8);
    // Cabeza de planta (boca)
    ctx.fillStyle = '#0f0'; ctx.beginPath(); ctx.arc(16,10,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f00'; ctx.beginPath(); ctx.arc(16,10,3,0,Math.PI*2); ctx.fill();
    // Dientes
    ctx.fillStyle = '#fff';
    ctx.fillRect(14,10,1,2); ctx.fillRect(17,10,1,2);
    this.textures.addCanvas('plant', c);
  }

  createGolemTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo de piedra
    ctx.fillStyle = '#789'; ctx.fillRect(8,8,16,16);
    // Cabeza
    ctx.fillStyle = '#89a'; ctx.beginPath(); ctx.arc(16,8,6,0,Math.PI*2); ctx.fill();
    // Ojos azules
    ctx.fillStyle = '#00f';
    ctx.beginPath(); ctx.arc(14,7,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,7,1.5,0,Math.PI*2); ctx.fill();
    // Grietas
    ctx.strokeStyle = '#333'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(12,14); ctx.lineTo(16,18); ctx.lineTo(20,14); ctx.stroke();
    this.textures.addCanvas('golem', c);
  }

  createArachnidTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo (dos círculos)
    ctx.fillStyle = '#300'; ctx.fillRect(8,8,16,12);
    // Cabeza
    ctx.fillStyle = '#400'; ctx.beginPath(); ctx.arc(16,10,5,0,Math.PI*2); ctx.fill();
    // Ojos múltiples
    ctx.fillStyle = '#f00';
    for (let i=0;i<4;i++) {
      ctx.beginPath(); ctx.arc(13+i*3,9,1,0,Math.PI*2); ctx.fill();
    }
    // Patas
    ctx.strokeStyle = '#300'; ctx.lineWidth=2;
    for (let i=0;i<4;i++) {
      ctx.beginPath();
      ctx.moveTo(12+i*4,14);
      ctx.lineTo(8+i*5,22);
      ctx.moveTo(12+i*4,14);
      ctx.lineTo(16+i*5,22);
      ctx.stroke();
    }
    this.textures.addCanvas('arana', c);
  }

  createFlameSkeletonTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Esqueleto básico
    this.createSkeletonTexture(); // reutilizar? no se puede, pero dibujamos similar
    // Cuerpo huesos con tinte naranja
    ctx.strokeStyle = '#ff8c00'; ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(10,14); ctx.lineTo(18,18); ctx.moveTo(18,18); ctx.lineTo(24,14);
    ctx.moveTo(13,24); ctx.lineTo(11,30); ctx.moveTo(19,24); ctx.lineTo(21,30);
    ctx.moveTo(16,16); ctx.lineTo(16,24);
    ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f00';
    ctx.beginPath(); ctx.arc(13.5,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18.5,9,1.2,0,Math.PI*2); ctx.fill();
    // Fuego alrededor
    ctx.fillStyle = '#ff4500';
    ctx.beginPath(); ctx.arc(16,12,8,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('esqueleto_llameante', c);
  }

  createYetiTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo blanco peludo
    ctx.fillStyle = '#eee'; ctx.fillRect(6,12,20,20);
    // Cabeza
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    // Ojos azules
    ctx.fillStyle = '#00f';
    ctx.beginPath(); ctx.arc(14,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,9,1.2,0,Math.PI*2); ctx.fill();
    // Dientes
    ctx.fillStyle = '#fff'; ctx.fillRect(14,13,2,3); ctx.fillRect(17,13,2,3);
    this.textures.addCanvas('yeti', c);
  }

  createEntTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Tronco
    ctx.fillStyle = '#5a3e1b'; ctx.fillRect(8,8,16,20);
    // Ramas
    ctx.strokeStyle = '#3e2a10'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(8,16); ctx.lineTo(2,10); ctx.moveTo(24,16); ctx.lineTo(30,10); ctx.stroke();
    // Hojas
    ctx.fillStyle = '#0a0';
    ctx.beginPath(); ctx.arc(2,10,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(30,10,4,0,Math.PI*2); ctx.fill();
    // Ojos
    ctx.fillStyle = '#ff0';
    ctx.beginPath(); ctx.arc(14,10,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,10,1.5,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('ent', c);
  }

  createCarniceroTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    // Cuerpo grande
    ctx.fillStyle = '#8b0000'; ctx.fillRect(4,8,24,20);
    // Cabeza con cuernos
    ctx.fillStyle = '#a52a2a'; ctx.beginPath(); ctx.arc(16,8,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff0';
    ctx.beginPath(); ctx.arc(14,7,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,7,1.2,0,Math.PI*2); ctx.fill();
    // Cuernos
    ctx.strokeStyle = '#fff'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(10,5); ctx.lineTo(6,0); ctx.moveTo(22,5); ctx.lineTo(26,0); ctx.stroke();
    // Cuchillo
    ctx.fillStyle = '#c0c0c0'; ctx.fillRect(24,12,2,6); ctx.fillStyle = '#fff'; ctx.fillRect(23,10,4,2);
    this.textures.addCanvas('carnicero', c);
  }

  createPawTexture() {
    const c = document.createElement('canvas'); c.width=24; c.height=24;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(12,14,7,5,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(8,9,2.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(12,6,2.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(16,9,2.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#000'; ctx.lineWidth=1; ctx.stroke();
    this.textures.addCanvas('paw', c);
  }

  createProjectileTexture() {
    const c = document.createElement('canvas'); c.width=8; c.height=8;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#aa00ff';
    ctx.beginPath(); ctx.arc(4,4,4,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('projectile', c);
  }

  createCoinTexture() {
    const c = document.createElement('canvas'); c.width=12; c.height=12;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(6,6,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#b8860b'; ctx.beginPath(); ctx.arc(6,6,3,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('coin', c);
  }

  createDecorations() {
    // Ataúd
    const c1 = document.createElement('canvas'); c1.width=32; c1.height=32;
    const ctx1 = c1.getContext('2d');
    ctx1.fillStyle = '#5c3a1b'; ctx1.fillRect(4,8,24,20);
    ctx1.fillStyle = '#3e2a10'; ctx1.fillRect(8,12,16,12);
    ctx1.strokeStyle = '#fff'; ctx1.lineWidth=1;
    ctx1.strokeRect(8,12,16,12);
    this.textures.addCanvas('ataud', c1);

    // Antorcha
    const c2 = document.createElement('canvas'); c2.width=16; c2.height=32;
    const ctx2 = c2.getContext('2d');
    ctx2.fillStyle = '#8b5a2b'; ctx2.fillRect(6,16,4,16);
    ctx2.fillStyle = '#ff4500'; ctx2.beginPath(); ctx2.arc(8,10,5,0,Math.PI*2); ctx2.fill();
    ctx2.fillStyle = '#ffd700'; ctx2.beginPath(); ctx2.arc(8,10,3,0,Math.PI*2); ctx2.fill();
    this.textures.addCanvas('antorcha', c2);

    // Árbol
    const c3 = document.createElement('canvas'); c3.width=32; c3.height=32;
    const ctx3 = c3.getContext('2d');
    ctx3.fillStyle = '#5a3e1b'; ctx3.fillRect(12,16,8,16);
    ctx3.fillStyle = '#0a0'; ctx3.beginPath(); ctx3.arc(16,10,10,0,Math.PI*2); ctx3.fill();
    this.textures.addCanvas('arbol', c3);

    // Flor
    const c4 = document.createElement('canvas'); c4.width=16; c4.height=16;
    const ctx4 = c4.getContext('2d');
    ctx4.fillStyle = '#f0f'; ctx4.beginPath(); ctx4.arc(8,8,5,0,Math.PI*2); ctx4.fill();
    ctx4.fillStyle = '#ff0'; ctx4.beginPath(); ctx4.arc(8,8,2,0,Math.PI*2); ctx4.fill();
    this.textures.addCanvas('flor', c4);

    // Cristal hielo
    const c5 = document.createElement('canvas'); c5.width=16; c5.height=16;
    const ctx5 = c5.getContext('2d');
    ctx5.fillStyle = '#00bfff'; ctx5.beginPath(); ctx5.moveTo(8,0); ctx5.lineTo(16,8); ctx5.lineTo(8,16); ctx5.lineTo(0,8); ctx5.fill();
    ctx5.strokeStyle = '#fff'; ctx5.lineWidth=1; ctx5.stroke();
    this.textures.addCanvas('cristal', c5);

    // Roca volcánica
    const c6 = document.createElement('canvas'); c6.width=16; c6.height=16;
    const ctx6 = c6.getContext('2d');
    ctx6.fillStyle = '#555'; ctx6.beginPath(); ctx6.ellipse(8,8,6,5,0,0,Math.PI*2); ctx6.fill();
    ctx6.strokeStyle = '#222'; ctx6.lineWidth=1; ctx6.stroke();
    this.textures.addCanvas('roca', c6);
  }
}

// ========== ESCENA DE MENÚ ==========
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Fondo decorativo con gradiente simple
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x2a2a4e, 0x2a2a4e, 1);
    bg.fillRect(0,0,400,700);
    bg.setDepth(0);

    // Título
    this.add.text(200, 60, '⚔️ Mazmorras 2D ⚔️', { fontSize: '32px', color: '#ffd700' }).setOrigin(0.5);

    // Monedas y llaves
    const monedas = parseInt(localStorage.getItem('monedas') || '0');
    const llaves = parseInt(localStorage.getItem('llaves') || '0');
    this.add.text(200, 110, `🪙 ${monedas}    🔑 ${llaves}`, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);

    // Botones de mazmorras (todas desbloqueadas)
    const colores = ['#6a4e9e', '#2e7d32', '#1a6e9e', '#b23a1a'];
    MAZMORRAS.forEach((mazmorra, index) => {
      const y = 180 + index * 90;
      const btn = this.add.rectangle(200, y, 320, 70, colores[index])
        .setInteractive({ useHandCursor: true });
      btn.setStrokeStyle(2, 0xffffff, 0.5);

      this.add.text(200, y - 15, mazmorra.nombre, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
      this.add.text(200, y + 15, `Dificultad: ${'⭐'.repeat(mazmorra.dificultad)}`, { fontSize: '14px', color: '#ffd700' }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        this.scene.start('DungeonScene', { mazmorraIndex: index });
      });
    });

    // Instrucciones
    this.add.text(200, 560, '🕹️ Joystick para moverte\n⚔️ Botón rojo para atacar', {
      fontSize: '14px', color: '#ccc', align: 'center'
    }).setOrigin(0.5);

    // Botón para resetear progreso (opcional)
    const resetBtn = this.add.rectangle(200, 640, 160, 40, 0x333333)
      .setInteractive({ useHandCursor: true });
    this.add.text(200, 640, 'Resetear', { fontSize: '16px', color: '#fff' }).setOrigin(0.5);
    resetBtn.on('pointerdown', () => {
      localStorage.clear();
      this.scene.restart();
    });
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

    // Generar texturas de suelo y pared con colores de la mazmorra
    this.createTileTexture('suelo_maz', 64, 64, mazmorra.colorSuelo);
    this.createTileTexture('pared_maz', 64, 64, mazmorra.colorPared);

    // Mostrar mensaje de entrada
    this.mensajeEntrada = this.add.text(200, 350, mazmorra.mensaje, {
      fontSize: '20px',
      color: mazmorra.colorLetra,
      align: 'center',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 }
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
          const wall = this.add.image(posX, posY, 'pared_maz').setOrigin(0);
          this.wallLayer.add(wall);
          wall.body.setSize(this.tileSize, this.tileSize);
        } else if (char === '.') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
        } else if (char === 'P') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.player = this.physics.add.sprite(posX, posY, 'cat');
          this.player.setCollideWorldBounds(true);
          this.playerHP = 100;
          this.physics.add.collider(this.player, this.wallLayer);
        } else if (char === 'S') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('esqueleto', posX, posY);
        } else if (char === 'B') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('murcielago', posX, posY);
        } else if (char === 'Z') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('zombi', posX, posY);
        } else if (char === 'T') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          const spike = this.add.image(posX, posY, 'pincho').setOrigin(0);
          this.spikeGroup.add(spike);
          spike.body.setSize(this.tileSize, this.tileSize);
        } else if (char === 'J') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          // Encontrar jefe correspondiente en mazmorra.jefes y usar su tipo
          const jefeDef = mazmorra.jefes.find(j => j.x === x && j.y === y);
          if (jefeDef) {
            this.spawnEnemy(jefeDef.tipo, posX, posY, true);
          }
        } else if (char === 'L') { // Lobo (solo Bosque)
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('lobo', posX, posY);
        } else if (char === 'G') { // Golem (Cavernas)
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('golem', posX, posY);
        } else if (char === 'A') { // Araña (Lava)
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('arana', posX, posY);
        } else if (char === 'E') { // Esqueleto llameante (Lava)
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('esqueleto_llameante', posX, posY);
        }
      }
    }

    // Si no se definió jugador, crear por defecto
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

  createTileTexture(key, w, h, color) {
    if (this.textures.exists(key)) this.textures.remove(key);
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    // Añadir textura de detalle (líneas)
    ctx.strokeStyle = '#00000033';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w-2, h-2);
    // Sombreado suave
    ctx.fillStyle = '#ffffff11';
    ctx.fillRect(0, 0, w, h/2);
    this.textures.addCanvas(key, canvas);
  }

  spawnEnemy(tipo, x, y, esJefe = false) {
    let sprite;
    let health, speed, damage, rangeDetect;
    switch (tipo) {
      case 'esqueleto':
        sprite = this.enemies.create(x, y, 'skeleton');
        health = 40; speed = 60; damage = 3; rangeDetect = 300; break;
      case 'murcielago':
        sprite = this.enemies.create(x, y, 'bat');
        health = 20; speed = 100; damage = 5; rangeDetect = 250; break;
      case 'zombi':
        sprite = this.enemies.create(x, y, 'zombie');
        health = 60; speed = 40; damage = 8; rangeDetect = 200; break;
      case 'nigromante':
        if (esJefe) sprite = this.jefes.create(x, y, 'necromancer');
        else sprite = this.enemies.create(x, y, 'necromancer');
        health = 150; speed = 50; damage = 10; rangeDetect = 400; break;
      case 'lobo':
        sprite = this.enemies.create(x, y, 'wolf');
        health = 35; speed = 90; damage = 6; rangeDetect = 350; break;
      case 'planta':
        sprite = this.enemies.create(x, y, 'plant');
        health = 50; speed = 0; damage = 10; rangeDetect = 100; break;
      case 'golem':
        sprite = this.enemies.create(x, y, 'golem');
        health = 80; speed = 30; damage = 12; rangeDetect = 250; break;
      case 'arana':
        sprite = this.enemies.create(x, y, 'arana');
        health = 25; speed = 120; damage = 4; rangeDetect = 350; break;
      case 'esqueleto_llameante':
        sprite = this.enemies.create(x, y, 'esqueleto_llameante');
        health = 70; speed = 55; damage = 10; rangeDetect = 300; break;
      case 'yeti':
        if (esJefe) sprite = this.jefes.create(x, y, 'yeti');
        else sprite = this.enemies.create(x, y, 'yeti');
        health = 400; speed = 40; damage = 20; rangeDetect = 400; break;
      case 'ent':
        if (esJefe) sprite = this.jefes.create(x, y, 'ent');
        else sprite = this.enemies.create(x, y, 'ent');
        health = 400; speed = 30; damage = 18; rangeDetect = 350; break;
      case 'carnicero':
        if (esJefe) sprite = this.jefes.create(x, y, 'carnicero');
        else sprite = this.enemies.create(x, y, 'carnicero');
        health = 600; speed = 60; damage = 25; rangeDetect = 450; break;
      default:
        sprite = this.enemies.create(x, y, 'skeleton');
        health = 40; speed = 60; damage = 3; rangeDetect = 300;
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
    const maxHealth = enemy.tipo === 'nigromante' ? 150 :
                      enemy.tipo === 'yeti' ? 400 :
                      enemy.tipo === 'ent' ? 400 :
                      enemy.tipo === 'carnicero' ? 600 :
                      enemy.tipo === 'esqueleto_llameante' ? 70 :
                      enemy.tipo === 'golem' ? 80 :
                      enemy.tipo === 'planta' ? 50 :
                      enemy.tipo === 'lobo' ? 35 :
                      enemy.tipo === 'murcielago' ? 20 :
                      enemy.tipo === 'zombi' ? 60 :
                      enemy.tipo === 'arana' ? 25 : 40;
    const healthPercent = Phaser.Math.Clamp(enemy.health / maxHealth, 0, 1);
    enemy.healthBar.fillStyle(0xff0000, 1);
    enemy.healthBar.fillRect(x, y, width * healthPercent, height);
  }

  createHUD() {
    this.playerHealthBar = this.add.graphics().setScrollFactor(0).setDepth(20);
    this.updatePlayerHealthBar();

    // Texto de monedas
    this.moneyText = this.add.text(10, 30, `🪙 ${localStorage.getItem('monedas') || 0}`, {
      fontSize: '16px', color: '#ffd700'
    }).setScrollFactor(0).setDepth(20);
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
    this.time.delayedCall(3000, () => {
      if (coin.active) coin.destroy();
    });
  }

  derrotarJefe(jefe) {
    const recompensa = this.currentMazmorra.recompensaJefe || { monedas: 100, llaves: 1 };
    let monedas = parseInt(localStorage.getItem('monedas') || '0');
    monedas += recompensa.monedas;
    localStorage.setItem('monedas', monedas.toString());

    let llaves = parseInt(localStorage.getItem('llaves') || '0');
    llaves += recompensa.llaves;
    localStorage.setItem('llaves', llaves.toString());

    // Marcar completada
    const completadas = JSON.parse(localStorage.getItem('mazmorrasCompletadas') || '[]');
    if (!completadas.includes(this.currentMazmorra.id)) {
      completadas.push(this.currentMazmorra.id);
      localStorage.setItem('mazmorrasCompletadas', JSON.stringify(completadas));
    }

    jefe.destroy();

    // Pantalla de victoria
    this.physics.pause();
    this.add.text(200, 350, '¡VICTORIA!\nHas derrotado al jefe', {
      fontSize: '28px',
      color: '#ffd700',
      align: 'center',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 }
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
        monedas += 5;
        localStorage.setItem('monedas', monedas.toString());
        this.moneyText.setText(`🪙 ${monedas}`);
      }
    });

    // Movimiento de enemigos normales
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      this.handleEnemyAI(enemy, false);
    });

    // Movimiento de jefes
    this.jefes.children.iterate((jefe) => {
      if (!jefe.active) return;
      this.handleEnemyAI(jefe, true);
    });

    // Actualizar barras de vida
    this.enemies.children.iterate((enemy) => {
      if (enemy.active) enemy.healthBar.setPosition(enemy.x - 15, enemy.y - 20);
    });
    this.jefes.children.iterate((jefe) => {
      if (jefe.active) jefe.healthBar.setPosition(jefe.x - 15, jefe.y - 20);
    });

    // Proyectiles
    this.projectiles.children.iterate((proj) => {
      if (!proj.active) return;
      proj.x += proj.vx;
      proj.y += proj.vy;

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

      if (proj.x < 0 || proj.x > this.cameras.main.worldView.right || proj.y < 0 || proj.y > this.cameras.main.worldView.bottom) {
        proj.destroy();
      }
    });
  }

  handleEnemyAI(enemy, esJefe = false) {
    const dx = this.player.x - enemy.x;
    const dy = this.player.y - enemy.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist > 0 && dist < enemy.rangeDetect) {
      let vx = (dx / dist) * enemy.speed;
      let vy = (dy / dist) * enemy.speed;

      if (enemy.tipo === 'murcielago' || enemy.tipo === 'murcielago_escarcha') {
        vx += Math.sin(this.time.now / 500) * 30;
        vy += Math.cos(this.time.now / 500) * 30;
      }

      if (enemy.tipo === 'planta') {
        // No se mueve, solo ataca si está muy cerca
        vx = 0; vy = 0;
        if (dist < 50 && !this.invulnerable) {
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
      } else {
        enemy.setVelocity(vx, vy);
      }

      // Colisión con jugador (daño cuerpo a cuerpo)
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

      // Ataque a distancia para jefes nigromante, ent, carnicero, yeti, etc.
      if (esJefe && (enemy.tipo === 'nigromante' || enemy.tipo === 'ent' || enemy.tipo === 'carnicero' || enemy.tipo === 'yeti')) {
        this.jefeRangedAttack(enemy);
      }
    } else {
      if (enemy.tipo !== 'planta') enemy.setVelocity(0, 0);
    }
  }

  jefeRangedAttack(jefe) {
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
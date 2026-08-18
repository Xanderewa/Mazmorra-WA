// ========== DATOS GLOBALES ==========
const RANGOS = [
  { nombre: 'Sin rango', minNivel: 0, color: '#111111', descripcion: 'Evoluciona a nivel 10' },
  { nombre: 'Guerrero', minNivel: 10, color: '#4B0082', descripcion: 'Fuerza aumentada' },
  { nombre: 'Imperial', minNivel: 20, color: '#B8860B', descripcion: 'Defensa mejorada' },
  { nombre: 'Burger', minNivel: 30, color: '#FF8C00', descripcion: 'Velocidad aumentada' },
  { nombre: 'Rey', minNivel: 40, color: '#FFD700', descripcion: 'Daño legendario' },
  { nombre: 'Divinidad-Demonio', minNivel: 50, color: '#FF4500', descripcion: 'Poder supremo' }
];

const MAZMORRAS = [
  {
    id: 'cripta', nombre: 'Cripta de las Sombras', dificultad: 1,
    mensaje: 'La Cripta de las Sombras se abre ante ti...',
    colorLetra: '#B266FF', colorSuelo: '#3a3a5c', colorPared: '#5c3a6b',
    mapa: [
      '########################################',
      '#P.......................................#',
      '#...S...................................#',
      '#........C............................#',
      '#..T..................................#',
      '#.......................................#',
      '#........Z............................#',
      '#.......................................#',
      '#.....B................................#',
      '#.......................................#',
      '#...........S..........................#',
      '#.......................................#',
      '#......T...............................#',
      '#.......................................#',
      '#.........Z............................#',
      '#.......................................#',
      '#.............J........................#',
      '#.......................................#',
      '#.......................................#',
      '########################################'
    ],
    jefes: [{ tipo: 'nigromante', x: 17, y: 17 }]
  },
  {
    id: 'bosque', nombre: 'Bosque Maldito', dificultad: 2,
    mensaje: 'El Bosque Maldito susurra tu nombre...',
    colorLetra: '#9ACD32', colorSuelo: '#1B4D1B', colorPared: '#2E7D32',
    mapa: [
      '########################################',
      '#P.......................................#',
      '#...L...................................#',
      '#.......................................#',
      '#..T..................................#',
      '#.......................................#',
      '#........L............................#',
      '#.......................................#',
      '#.....P................................#',
      '#.......................................#',
      '#...........L..........................#',
      '#.......................................#',
      '#......T...............................#',
      '#.......................................#',
      '#.........L............................#',
      '#.......................................#',
      '#.............J........................#',
      '#.......................................#',
      '#.......................................#',
      '########################################'
    ],
    jefes: [{ tipo: 'ent', x: 17, y: 17 }]
  },
  {
    id: 'cavernas', nombre: 'Cavernas de Hielo', dificultad: 3,
    mensaje: 'Las Cavernas de Hielo te hielan el alma...',
    colorLetra: '#00BFFF', colorSuelo: '#1a3a4a', colorPared: '#2c5e7a',
    mapa: [
      '########################################',
      '#P.......................................#',
      '#...G...................................#',
      '#.......................................#',
      '#..T..................................#',
      '#.......................................#',
      '#........G............................#',
      '#.......................................#',
      '#.....G................................#',
      '#.......................................#',
      '#...........G..........................#',
      '#.......................................#',
      '#......T...............................#',
      '#.......................................#',
      '#.........G............................#',
      '#.......................................#',
      '#.............J........................#',
      '#.......................................#',
      '#.......................................#',
      '########################################'
    ],
    jefes: [{ tipo: 'yeti', x: 17, y: 17 }]
  },
  {
    id: 'lava', nombre: 'Lava Infernal', dificultad: 4,
    mensaje: 'Lava Infernal arde ante ti. Solo los más fuertes sobreviven.',
    colorLetra: '#FF4500', colorSuelo: '#5a2e0a', colorPared: '#8b3a0a',
    mapa: [
      '########################################',
      '#P.......................................#',
      '#...A...................................#',
      '#.......................................#',
      '#..T..................................#',
      '#.......................................#',
      '#........E............................#',
      '#.......................................#',
      '#.....A................................#',
      '#.......................................#',
      '#...........E..........................#',
      '#.......................................#',
      '#......T...............................#',
      '#.......................................#',
      '#.........A............................#',
      '#.......................................#',
      '#.............J........................#',
      '#.......................................#',
      '#.......................................#',
      '########################################'
    ],
    jefes: [{ tipo: 'carnicero', x: 17, y: 17 }]
  }
];

// ========== CLASES ==========
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    // Texturas de tiles genéricas (suelo, pared, pincho)
    this.createTileTexture('suelo', 64, 64, '#3a3a5c');
    this.createTileTexture('pared', 64, 64, '#8b4513');
    this.createTileTexture('pincho', 64, 64, '#aaaaaa', true);
    this.createTileTexture('cesped', 64, 64, '#4a8f3c');
    this.createTileTexture('agua', 64, 64, '#3366cc');

    // Personajes y enemigos
    this.createCatTextureBase('cat_base');
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
    this.createChestTexture('cofre_plata', '#c0c0c0');
    this.createChestTexture('cofre_oro', '#ffd700');
    this.createPortalTexture('portal_cripta', '#B266FF');
    this.createPortalTexture('portal_bosque', '#9ACD32');
    this.createPortalTexture('portal_cavernas', '#00BFFF');
    this.createPortalTexture('portal_lava', '#FF4500');
    this.createSlimeTexture();

    // Skins de gato según rango
    this.createCatTextureByRank('cat_guerrero', '#4B0082', '#ffffff');
    this.createCatTextureByRank('cat_imperial', '#B8860B', '#000000');
    this.createCatTextureByRank('cat_burger', '#FF8C00', '#ffffff');
    this.createCatTextureByRank('cat_rey', '#FFD700', '#000000');
    this.createCatTextureByRank('cat_divinidad', '#FF4500', '#ffffff');
    this.createCatTextureByRank('cat_base', '#111111', '#00ff00'); // Base con contorno blanco

    this.scene.start('MenuScene');
  }

  createTileTexture(key, w, h, color, isSpike = false) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    if (isSpike) {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = '#555';
      for (let i=0;i<4;i++) {
        const x = i * (w/4);
        ctx.beginPath();
        ctx.moveTo(x,h);
        ctx.lineTo(x+w/8,0);
        ctx.lineTo(x+w/4,h);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(0,0,w,h);
      ctx.strokeStyle = '#00000033';
      ctx.lineWidth = 2;
      ctx.strokeRect(1,1,w-2,h-2);
      // Sombreado
      ctx.fillStyle = '#ffffff11';
      ctx.fillRect(0,0,w,h/2);
    }
    this.textures.addCanvas(key, c);
  }

  createCatTextureBase(key) {
    const c = document.createElement('canvas');
    c.width = 48; c.height = 48;
    const ctx = c.getContext('2d');
    // Cuerpo
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(24, 28, 14, 12, 0, 0, Math.PI*2);
    ctx.fill();
    // Orejas
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.moveTo(10,20); ctx.lineTo(12,6); ctx.lineTo(18,16); ctx.fill();
    ctx.beginPath(); ctx.moveTo(38,20); ctx.lineTo(36,6); ctx.lineTo(30,16); ctx.fill();
    // Ojos (verdes)
    ctx.fillStyle = '#0f0';
    ctx.beginPath(); ctx.arc(20,26,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(28,26,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(20.5,25.5,0.8,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(28.5,25.5,0.8,0,Math.PI*2); ctx.fill();
    // Nariz
    ctx.fillStyle = '#ff9999';
    ctx.beginPath(); ctx.arc(24,30,1.5,0,Math.PI*2); ctx.fill();
    // Contorno blanco para visibilidad
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(5,5,38,38);
    this.textures.addCanvas(key, c);
  }

  createCatTextureByRank(key, color, eyeColor) {
    const c = document.createElement('canvas');
    c.width = 48; c.height = 48;
    const ctx = c.getContext('2d');
    // Cuerpo con color de rango
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(24, 28, 14, 12, 0, 0, Math.PI*2);
    ctx.fill();
    // Orejas
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(10,20); ctx.lineTo(12,6); ctx.lineTo(18,16); ctx.fill();
    ctx.beginPath(); ctx.moveTo(38,20); ctx.lineTo(36,6); ctx.lineTo(30,16); ctx.fill();
    // Ojos
    ctx.fillStyle = eyeColor;
    ctx.beginPath(); ctx.arc(20,26,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(28,26,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(20.5,25.5,0.8,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(28.5,25.5,0.8,0,Math.PI*2); ctx.fill();
    // Nariz
    ctx.fillStyle = '#ff9999';
    ctx.beginPath(); ctx.arc(24,30,1.5,0,Math.PI*2); ctx.fill();
    // Contorno
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(4,4,40,40);
    this.textures.addCanvas(key, c);
  }

  createSkeletonTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(22,10,2,10);
    ctx.fillStyle = '#ccc'; ctx.fillRect(21,4,4,6);
    ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10,14); ctx.lineTo(18,18); ctx.moveTo(18,18); ctx.lineTo(24,14);
    ctx.moveTo(13,24); ctx.lineTo(11,30); ctx.moveTo(19,24); ctx.lineTo(21,30);
    ctx.moveTo(16,16); ctx.lineTo(16,24);
    ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(13.5,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18.5,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#000'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(13,12); ctx.lineTo(19,12); ctx.stroke();
    this.textures.addCanvas('skeleton', c);
  }

  createBatTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#666'; ctx.beginPath(); ctx.arc(16,18,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#555';
    ctx.beginPath(); ctx.moveTo(8,10); ctx.lineTo(16,18); ctx.lineTo(2,24); ctx.fill();
    ctx.beginPath(); ctx.moveTo(24,10); ctx.lineTo(16,18); ctx.lineTo(30,24); ctx.fill();
    ctx.fillStyle = '#f00';
    ctx.beginPath(); ctx.arc(14,17,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,17,1.5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(14,20,1,2); ctx.fillRect(17,20,1,2);
    this.textures.addCanvas('bat', c);
  }

  createZombieTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#556b2f'; ctx.fillRect(8,8,16,20);
    ctx.fillStyle = '#6b8e23'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f00';
    ctx.beginPath(); ctx.arc(13,9,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(19,9,1.5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#8b0000'; ctx.fillRect(12,14,8,2);
    ctx.strokeStyle = '#556b2f'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(8,14); ctx.lineTo(2,18); ctx.moveTo(24,14); ctx.lineTo(30,18); ctx.stroke();
    this.textures.addCanvas('zombie', c);
  }

  createNecromancerTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#800080'; ctx.fillRect(8,12,16,20);
    ctx.fillStyle = '#4b0082'; ctx.beginPath(); ctx.arc(16,12,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(13,11,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(19,11,1.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(26,18); ctx.lineTo(26,32); ctx.stroke();
    this.textures.addCanvas('necromancer', c);
  }

  createWolfTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#555'; ctx.fillRect(6,12,20,12);
    ctx.fillStyle = '#666'; ctx.beginPath(); ctx.arc(16,10,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#555';
    ctx.beginPath(); ctx.moveTo(12,7); ctx.lineTo(14,2); ctx.lineTo(17,7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(20,7); ctx.lineTo(22,2); ctx.lineTo(25,7); ctx.fill();
    ctx.fillStyle = '#ff0';
    ctx.beginPath(); ctx.arc(14,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#555'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(26,16); ctx.quadraticCurveTo(30,10,28,6); ctx.stroke();
    this.textures.addCanvas('wolf', c);
  }

  createPlantTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(10,24,12,8);
    ctx.strokeStyle = '#0f0'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(16,24); ctx.lineTo(16,12); ctx.stroke();
    ctx.fillStyle = '#0a0'; ctx.fillRect(14,14,4,8); ctx.fillRect(18,14,4,8);
    ctx.fillStyle = '#0f0'; ctx.beginPath(); ctx.arc(16,10,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f00'; ctx.beginPath(); ctx.arc(16,10,3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(14,10,1,2); ctx.fillRect(17,10,1,2);
    this.textures.addCanvas('plant', c);
  }

  createGolemTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#789'; ctx.fillRect(8,8,16,16);
    ctx.fillStyle = '#89a'; ctx.beginPath(); ctx.arc(16,8,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#00f';
    ctx.beginPath(); ctx.arc(14,7,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,7,1.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(12,14); ctx.lineTo(16,18); ctx.lineTo(20,14); ctx.stroke();
    this.textures.addCanvas('golem', c);
  }

  createArachnidTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#300'; ctx.fillRect(8,8,16,12);
    ctx.fillStyle = '#400'; ctx.beginPath(); ctx.arc(16,10,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f00';
    for (let i=0;i<4;i++) {
      ctx.beginPath(); ctx.arc(13+i*3,9,1,0,Math.PI*2); ctx.fill();
    }
    ctx.strokeStyle = '#300'; ctx.lineWidth=2;
    for (let i=0;i<4;i++) {
      ctx.beginPath();
      ctx.moveTo(12+i*4,14); ctx.lineTo(8+i*5,22);
      ctx.moveTo(12+i*4,14); ctx.lineTo(16+i*5,22);
      ctx.stroke();
    }
    this.textures.addCanvas('arana', c);
  }

  createFlameSkeletonTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
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
    ctx.fillStyle = '#ff4500'; ctx.beginPath(); ctx.arc(16,12,8,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('esqueleto_llameante', c);
  }

  createYetiTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#eee'; ctx.fillRect(6,12,20,20);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(16,10,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#00f';
    ctx.beginPath(); ctx.arc(14,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,9,1.2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(14,13,2,3); ctx.fillRect(17,13,2,3);
    this.textures.addCanvas('yeti', c);
  }

  createEntTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#5a3e1b'; ctx.fillRect(8,8,16,20);
    ctx.strokeStyle = '#3e2a10'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(8,16); ctx.lineTo(2,10); ctx.moveTo(24,16); ctx.lineTo(30,10); ctx.stroke();
    ctx.fillStyle = '#0a0';
    ctx.beginPath(); ctx.arc(2,10,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(30,10,4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff0';
    ctx.beginPath(); ctx.arc(14,10,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,10,1.5,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('ent', c);
  }

  createCarniceroTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#8b0000'; ctx.fillRect(4,8,24,20);
    ctx.fillStyle = '#a52a2a'; ctx.beginPath(); ctx.arc(16,8,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff0';
    ctx.beginPath(); ctx.arc(14,7,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(18,7,1.2,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(10,5); ctx.lineTo(6,0); ctx.moveTo(22,5); ctx.lineTo(26,0); ctx.stroke();
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
    ctx.fillStyle = '#aa00ff'; ctx.beginPath(); ctx.arc(4,4,4,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('projectile', c);
  }

  createCoinTexture() {
    const c = document.createElement('canvas'); c.width=12; c.height=12;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(6,6,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#b8860b'; ctx.beginPath(); ctx.arc(6,6,3,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('coin', c);
  }

  createChestTexture(key, color) {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(4,12,24,18);
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(4,22,24,8);
    ctx.fillStyle = '#000';
    ctx.fillRect(12,26,8,6);
    // Cerradura
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(14,20,4,5);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(4,12,24,18);
    this.textures.addCanvas(key, c);
  }

  createPortalTexture(key, color) {
    const c = document.createElement('canvas'); c.width=64; c.height=64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(32,32,25,25,0,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(32,32,15,15,0,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(32,32,8,8,0,0,Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.stroke();
    this.textures.addCanvas(key, c);
  }

  createSlimeTexture() {
    const c = document.createElement('canvas'); c.width=32; c.height=32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#33cc33';
    ctx.beginPath();
    ctx.arc(16,20,12,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(12,18,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(20,18,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(12,18,0.8,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(20,18,0.8,0,Math.PI*2); ctx.fill();
    this.textures.addCanvas('slime', c);
  }
}

// ========== MENÚ PRINCIPAL ==========
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.add.text(400, 80, '⚔️ Mazmorras 2D ⚔️', { fontSize: '48px', color: '#ffd700' }).setOrigin(0.5);

    // Botones
    const btnJugar = this.createButton(400, 200, 'Jugar', 0x3777ca);
    btnJugar.on('pointerdown', () => { this.scene.start('WorldScene'); });

    const btnTienda = this.createButton(400, 300, 'Tienda', 0x43b581);
    btnTienda.on('pointerdown', () => { this.scene.start('ShopScene'); });

    const btnPerfil = this.createButton(400, 400, 'Perfil', 0x9b59b6);
    btnPerfil.on('pointerdown', () => { this.scene.start('ProfileScene'); });

    // Mostrar oro y nivel brevemente
    const gold = parseInt(localStorage.getItem('gold') || '0');
    const level = parseInt(localStorage.getItem('level') || '1');
    this.add.text(400, 520, `🪙 ${gold}    Nivel: ${level}`, { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
  }

  createButton(x, y, text, color) {
    const btn = this.add.rectangle(x, y, 250, 60, color)
      .setInteractive({ useHandCursor: true });
    btn.setStrokeStyle(2, 0xffffff, 0.5);
    this.add.text(x, y, text, { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
    btn.on('pointerover', () => btn.setScale(1.05));
    btn.on('pointerout', () => btn.setScale(1));
    return btn;
  }
}

// ========== TIENDA ==========
class ShopScene extends Phaser.Scene {
  constructor() { super('ShopScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.add.text(400, 40, 'Tienda', { fontSize: '40px', color: '#ffd700' }).setOrigin(0.5);

    // Mostrar oro
    const gold = parseInt(localStorage.getItem('gold') || '0');
    this.goldText = this.add.text(400, 80, `🪙 ${gold}`, { fontSize: '24px', color: '#fff' }).setOrigin(0.5);

    // Items disponibles
    const items = [
      { nombre: 'Espada básica', costo: 50, accion: 'comprarEspada', descripcion: '+5 daño' },
      { nombre: 'Armadura ligera', costo: 50, accion: 'comprarArmadura', descripcion: '+20 HP máx' },
      { nombre: 'Poción de curación', costo: 20, accion: 'comprarPocion', descripcion: 'Restaura 50 HP' },
      { nombre: '100 XP', costo: 100, accion: 'comprarXP', descripcion: 'Aumenta tu XP' },
      { nombre: 'Habilidad: Garra mejorada', costo: 150, accion: 'comprarHabilidad', descripcion: '+10 daño adicional' }
    ];

    items.forEach((item, index) => {
      const y = 130 + index * 70;
      const btn = this.add.rectangle(400, y, 500, 50, 0x43b581)
        .setInteractive({ useHandCursor: true });
      btn.setStrokeStyle(1, 0xffffff, 0.3);
      this.add.text(400, y, `${item.nombre} - ${item.costo}🪙`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
      this.add.text(400, y + 20, item.descripcion, { fontSize: '12px', color: '#ccc' }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        this[item.accion]();
      });
    });

    // Botón volver
    const btnVolver = this.createButton(400, 520, 'Volver', 0x666666);
    btnVolver.on('pointerdown', () => this.scene.start('MenuScene'));
  }

  createButton(x, y, text, color) {
    const btn = this.add.rectangle(x, y, 200, 50, color).setInteractive({ useHandCursor: true });
    this.add.text(x, y, text, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
    return btn;
  }

  actualizarOro() {
    const gold = parseInt(localStorage.getItem('gold') || '0');
    this.goldText.setText(`🪙 ${gold}`);
  }

  comprarEspada() {
    let gold = parseInt(localStorage.getItem('gold') || '0');
    if (gold >= 50) {
      gold -= 50;
      localStorage.setItem('gold', gold);
      let sword = parseInt(localStorage.getItem('swordLevel') || '1');
      sword += 1;
      localStorage.setItem('swordLevel', sword);
      this.actualizarOro();
      alert('Has comprado una mejora de espada. Daño aumentado.');
    } else {
      alert('Oro insuficiente');
    }
  }

  comprarArmadura() {
    let gold = parseInt(localStorage.getItem('gold') || '0');
    if (gold >= 50) {
      gold -= 50;
      localStorage.setItem('gold', gold);
      let armor = parseInt(localStorage.getItem('armorLevel') || '1');
      armor += 1;
      localStorage.setItem('armorLevel', armor);
      this.actualizarOro();
      alert('Has comprado una mejora de armadura. Vida máxima aumentada.');
    } else {
      alert('Oro insuficiente');
    }
  }

  comprarPocion() {
    let gold = parseInt(localStorage.getItem('gold') || '0');
    if (gold >= 20) {
      gold -= 20;
      localStorage.setItem('gold', gold);
      let potions = parseInt(localStorage.getItem('potions') || '0');
      potions += 1;
      localStorage.setItem('potions', potions);
      this.actualizarOro();
      alert('Has comprado una poción de curación.');
    } else {
      alert('Oro insuficiente');
    }
  }

  comprarXP() {
    let gold = parseInt(localStorage.getItem('gold') || '0');
    if (gold >= 100) {
      gold -= 100;
      localStorage.setItem('gold', gold);
      let xp = parseInt(localStorage.getItem('xp') || '0');
      xp += 100;
      localStorage.setItem('xp', xp);
      // Verificar nivel (simplificado)
      this.verificarNivel();
      this.actualizarOro();
      alert('Has ganado 100 XP.');
    } else {
      alert('Oro insuficiente');
    }
  }

  comprarHabilidad() {
    let gold = parseInt(localStorage.getItem('gold') || '0');
    if (gold >= 150) {
      gold -= 150;
      localStorage.setItem('gold', gold);
      let ability = parseInt(localStorage.getItem('abilityLevel') || '1');
      ability += 1;
      localStorage.setItem('abilityLevel', ability);
      this.actualizarOro();
      alert('Habilidad mejorada. +10 daño adicional.');
    } else {
      alert('Oro insuficiente');
    }
  }

  verificarNivel() {
    // Función global para actualizar nivel según XP
    const xp = parseInt(localStorage.getItem('xp') || '0');
    let level = parseInt(localStorage.getItem('level') || '1');
    let xpNecesario = 100 * level;
    while (xp >= xpNecesario && level < 100) {
      xp -= xpNecesario;
      level++;
      xpNecesario = 100 * level;
    }
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    // Aplicar evolución si corresponde
    aplicarEvolucion(level);
  }
}

// ========== PERFIL ==========
class ProfileScene extends Phaser.Scene {
  constructor() { super('ProfileScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.add.text(400, 40, 'Perfil', { fontSize: '40px', color: '#ffd700' }).setOrigin(0.5);

    const nombre = localStorage.getItem('playerName') || 'Sin nombre';
    const nivel = parseInt(localStorage.getItem('level') || '1');
    const xp = parseInt(localStorage.getItem('xp') || '0');
    const xpNecesario = 100 * nivel;
    const gold = parseInt(localStorage.getItem('gold') || '0');
    const sword = parseInt(localStorage.getItem('swordLevel') || '1');
    const armor = parseInt(localStorage.getItem('armorLevel') || '1');
    const potions = parseInt(localStorage.getItem('potions') || '0');
    const ability = parseInt(localStorage.getItem('abilityLevel') || '1');
    const rango = getRango(nivel);

    // Mostrar gato según rango
    const catKey = 'cat_' + rango.nombre.toLowerCase().replace(/ /g,'_');
    if (this.textures.exists(catKey)) {
      this.add.image(400, 140, catKey).setScale(2);
    } else {
      this.add.image(400, 140, 'cat_base').setScale(2);
    }

    this.add.text(400, 200, nombre, { fontSize: '28px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 240, `Rango: ${rango.nombre}`, { fontSize: '20px', color: rango.color }).setOrigin(0.5);
    this.add.text(400, 270, `Nivel: ${nivel}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 300, `XP: ${xp}/${xpNecesario}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 330, `🪙 Oro: ${gold}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 360, `⚔️ Espada nivel: ${sword}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 390, `🛡️ Armadura nivel: ${armor}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 420, `🧪 Pociones: ${potions}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.add.text(400, 450, `✨ Habilidad nivel: ${ability}`, { fontSize: '18px', color: '#fff' }).setOrigin(0.5);

    // Botón "?" (cómo jugar)
    const btnAyuda = this.add.circle(700, 80, 25, 0xffffff, 0.8).setInteractive({ useHandCursor: true });
    this.add.text(700, 80, '?', { fontSize: '30px', color: '#000' }).setOrigin(0.5);
    btnAyuda.on('pointerdown', () => {
      alert('Cómo jugar:\n\n- Usa el joystick para moverte.\n- Toca el botón ⚔️ para atacar.\n- Mata monstruos para ganar XP y oro.\n- Cada nivel requiere 100 XP más que el anterior.\n- Evoluciona a nivel 10, 20, 30, 40 y 50.\n- Visita la tienda para mejorar.\n- Encuentra portales en las esquinas del mapa principal para entrar a las mazmorras.\n- Derrota jefes para obtener cofres dorados.');
    });

    // Botón volver
    const btnVolver = this.createButton(400, 520, 'Volver', 0x666666);
    btnVolver.on('pointerdown', () => this.scene.start('MenuScene'));
  }

  createButton(x, y, text, color) {
    const btn = this.add.rectangle(x, y, 200, 50, color).setInteractive({ useHandCursor: true });
    this.add.text(x, y, text, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
    return btn;
  }
}

// ========== MAPA PRINCIPAL ==========
class WorldScene extends Phaser.Scene {
  constructor() { super('WorldScene'); }

  create() {
    this.tileSize = 64;
    this.mapWidth = 100;
    this.mapHeight = 100;
    this.playerSpeed = 200;

    // Generar texturas de cesped y agua
    if (!this.textures.exists('cesped')) {
      this.createTileTexture('cesped', 64, 64, '#4a8f3c');
    }
    if (!this.textures.exists('agua')) {
      this.createTileTexture('agua', 64, 64, '#3366cc');
    }

    // Fondo de césped
    this.add.tileSprite(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize, 'cesped').setOrigin(0);

    // Obstáculos simples (rocas, árboles)
    this.obstacles = this.physics.add.staticGroup();
    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(0, this.mapWidth - 1) * this.tileSize;
      const y = Phaser.Math.Between(0, this.mapHeight - 1) * this.tileSize;
      if (x < 5*this.tileSize && y < 5*this.tileSize) continue; // zona segura
      const rock = this.add.image(x, y, 'pared').setOrigin(0);
      this.obstacles.add(rock);
      rock.body.setSize(this.tileSize, this.tileSize);
    }

    // Jugador
    const spawnX = 5 * this.tileSize;
    const spawnY = 5 * this.tileSize;
    this.player = this.physics.add.sprite(spawnX, spawnY, this.getCatTextureKey());
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.obstacles);
    this.playerHP = parseInt(localStorage.getItem('maxHP') || '100');
    this.playerMaxHP = this.playerHP;

    // Enemigos básicos (slimes)
    this.enemies = this.physics.add.group();
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(10, this.mapWidth - 2) * this.tileSize;
      const y = Phaser.Math.Between(10, this.mapHeight - 2) * this.tileSize;
      const slime = this.enemies.create(x, y, 'slime');
      slime.setCollideWorldBounds(true);
      slime.health = 30;
      slime.speed = 60;
      slime.damage = 5;
      slime.rangeDetect = 200;
      slime.body.setSize(30, 30);
      slime.healthBar = this.add.graphics().setDepth(5);
      this.physics.add.collider(slime, this.obstacles);
    }

    // Portales a mazmorras (esquinas)
    this.portals = this.physics.add.staticGroup();
    const portalPositions = [
      { x: 2, y: 2, key: 'portal_cripta', mazmorraIndex: 0 },
      { x: 97, y: 2, key: 'portal_bosque', mazmorraIndex: 1 },
      { x: 2, y: 97, key: 'portal_cavernas', mazmorraIndex: 2 },
      { x: 97, y: 97, key: 'portal_lava', mazmorraIndex: 3 }
    ];
    portalPositions.forEach(portal => {
      const posX = portal.x * this.tileSize;
      const posY = portal.y * this.tileSize;
      const portalSprite = this.portals.create(posX, posY, portal.key);
      portalSprite.setScale(0.8);
      portalSprite.setData('mazmorraIndex', portal.mazmorraIndex);
      // Texto encima del portal
      this.add.text(posX + 32, posY - 10, MAZMORRAS[portal.mazmorraIndex].nombre, {
        fontSize: '16px', color: '#fff', align: 'center'
      }).setOrigin(0.5);
    });

    this.physics.add.overlap(this.player, this.portals, (player, portal) => {
      const idx = portal.getData('mazmorraIndex');
      this.scene.start('DungeonScene', { mazmorraIndex: idx });
    });

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

  getCatTextureKey() {
    const nivel = parseInt(localStorage.getItem('level') || '1');
    const rango = getRango(nivel);
    const key = 'cat_' + rango.nombre.toLowerCase().replace(/ /g,'_');
    return this.textures.exists(key) ? key : 'cat_base';
  }

  createTileTexture(key, w, h, color) {
    if (this.textures.exists(key)) return;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = '#00000033';
    ctx.lineWidth = 2;
    ctx.strokeRect(1,1,w-2,h-2);
    ctx.fillStyle = '#ffffff11';
    ctx.fillRect(0,0,w,h/2);
    this.textures.addCanvas(key, c);
  }

  createHUD() {
    this.playerHealthBar = this.add.graphics().setScrollFactor(0).setDepth(20);
    this.updatePlayerHealthBar();
    this.moneyText = this.add.text(10, 30, `🪙 ${localStorage.getItem('gold') || 0}`, {
      fontSize: '16px', color: '#ffd700'
    }).setScrollFactor(0).setDepth(20);
    this.levelText = this.add.text(10, 50, `Nivel ${localStorage.getItem('level') || 1}`, {
      fontSize: '16px', color: '#fff'
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
    const healthPercent = Phaser.Math.Clamp(this.playerHP / this.playerMaxHP, 0, 1);
    this.playerHealthBar.fillStyle(0x00ff00, 1);
    this.playerHealthBar.fillRect(x, y, width * healthPercent, height);
    this.playerHealthBar.lineStyle(2, 0xffffff, 0.5);
    this.playerHealthBar.strokeRect(x, y, width, height);
  }

  createVirtualJoystick() {
    this.joystickBase = this.add.circle(80, 380, 45, 0xffffff, 0.3).setScrollFactor(0);
    this.joystickThumb = this.add.circle(80, 380, 20, 0xffffff, 0.8).setScrollFactor(0);
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

  createAttackButton() {
    const btn = this.add.circle(720, 380, 30, 0xff0000, 0.6).setScrollFactor(0).setDepth(10);
    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerdown', () => {
      this.playerAttack();
    });
    this.add.text(720, 380, '⚔️', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
  }

  playerAttack() {
    const now = this.time.now;
    if (now - this.lastAttackTime < this.attackCooldown) return;
    this.lastAttackTime = now;

    const range = 60;
    const paw = this.add.image(this.player.x + (this.facing === 'right' ? 30 : this.facing === 'left' ? -30 : 0), this.player.y + (this.facing === 'down' ? 30 : this.facing === 'up' ? -30 : 0), 'paw').setDepth(6);
    this.tweens.add({ targets: paw, scale: 0.5, alpha: 0, duration: 200, onComplete: () => paw.destroy() });

    // Daño a enemigos
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist <= range) {
        let swordLevel = parseInt(localStorage.getItem('swordLevel') || '1');
        let damage = 20 + (swordLevel * 5);
        let abilityLevel = parseInt(localStorage.getItem('abilityLevel') || '1');
        damage += (abilityLevel - 1) * 10;
        enemy.health -= damage;
        this.updateEnemyHealthBar(enemy);
        if (enemy.health <= 0) {
          this.killEnemy(enemy);
        }
      }
    });
  }

  killEnemy(enemy) {
    enemy.destroy();
    // Ganar XP y oro
    let xp = parseInt(localStorage.getItem('xp') || '0');
    xp += 15;
    localStorage.setItem('xp', xp);
    let gold = parseInt(localStorage.getItem('gold') || '0');
    gold += 10;
    localStorage.setItem('gold', gold);
    this.moneyText.setText(`🪙 ${gold}`);
    this.checkLevelUp();
  }

  checkLevelUp() {
    let xp = parseInt(localStorage.getItem('xp') || '0');
    let level = parseInt(localStorage.getItem('level') || '1');
    let xpNecesario = 100 * level;
    while (xp >= xpNecesario && level < 100) {
      xp -= xpNecesario;
      level++;
      xpNecesario = 100 * level;
      // Actualizar atributos al subir nivel
      let maxHP = parseInt(localStorage.getItem('maxHP') || '100');
      maxHP += 10;
      localStorage.setItem('maxHP', maxHP);
      this.playerMaxHP = maxHP;
      this.playerHP = Math.min(this.playerHP + 20, maxHP); // curar un poco
      this.updatePlayerHealthBar();
      // Evolución si corresponde
      aplicarEvolucion(level);
    }
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    this.levelText.setText(`Nivel ${level}`);
  }

  updateEnemyHealthBar(enemy) {
    enemy.healthBar.clear();
    const width = 30;
    const height = 4;
    const x = enemy.x - width/2;
    const y = enemy.y - 20;
    enemy.healthBar.fillStyle(0x000000, 0.8);
    enemy.healthBar.fillRect(x, y, width, height);
    const healthPercent = Phaser.Math.Clamp(enemy.health / 30, 0, 1);
    enemy.healthBar.fillStyle(0xff0000, 1);
    enemy.healthBar.fillRect(x, y, width * healthPercent, height);
  }

  update(time, delta) {
    // Movimiento del jugador
    this.player.setVelocity(
      this.joystickVector.x * this.playerSpeed,
      this.joystickVector.y * this.playerSpeed
    );
    if (!this.joystickActive) this.player.setVelocity(0,0);

    // Actualizar dirección
    if (Math.abs(this.joystickVector.x) > 0.2) {
      this.facing = this.joystickVector.x > 0 ? 'right' : 'left';
    } else if (Math.abs(this.joystickVector.y) > 0.2) {
      this.facing = this.joystickVector.y > 0 ? 'down' : 'up';
    }

    // IA de enemigos (slimes)
    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dx = this.player.x - enemy.x;
      const dy = this.player.y - enemy.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < enemy.rangeDetect) {
        enemy.setVelocity((dx/dist)*enemy.speed, (dy/dist)*enemy.speed);
      } else {
        enemy.setVelocity(0,0);
      }

      // Colisión con jugador
      if (!this.invulnerable && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) {
        this.playerHP -= enemy.damage;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(1000, () => { this.invulnerable = false; });
        this.tweens.add({ targets: this.player, alpha: 0.5, duration: 100, yoyo: true, repeat: 5, onComplete: () => { this.player.alpha = 1; } });
        if (this.playerHP <= 0) this.playerDeath();
      }

      enemy.healthBar.setPosition(enemy.x - 15, enemy.y - 20);
    });
  }

  playerDeath() {
    this.physics.pause();
    this.add.text(400, 225, 'HAS MUERTO', { fontSize: '48px', color: '#ff0000' }).setOrigin(0.5).setScrollFactor(0).setDepth(30);
    this.time.delayedCall(2000, () => this.scene.restart());
  }
}

// ========== ESCENA DE MAZMORRA (REUTILIZABLE) ==========
class DungeonScene extends Phaser.Scene {
  constructor() { super('DungeonScene'); }

  init(data) {
    this.currentMazmorra = MAZMORRAS[data.mazmorraIndex];
  }

  create() {
    const mazmorra = this.currentMazmorra;
    this.tileSize = 64;
    this.playerSpeed = 200;
    this.playerMaxHP = parseInt(localStorage.getItem('maxHP') || '100');
    this.playerHP = this.playerMaxHP;
    this.attackCooldown = 500;
    this.lastAttackTime = 0;
    this.invulnerable = false;
    this.invulnerableDuration = 1000;
    this.facing = 'right';

    // Generar texturas de suelo/pared específicas
    this.createTileTexture('suelo_maz', 64, 64, mazmorra.colorSuelo);
    this.createTileTexture('pared_maz', 64, 64, mazmorra.colorPared);

    // Mostrar mensaje
    this.mensajeEntrada = this.add.text(400, 225, mazmorra.mensaje, {
      fontSize: '24px', color: mazmorra.colorLetra, align: 'center',
      backgroundColor: '#000000aa', padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
    this.time.delayedCall(2500, () => this.mensajeEntrada.destroy());

    // Construir mapa
    this.wallLayer = this.physics.add.staticGroup();
    this.spikeGroup = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group();
    this.jefes = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.coinsGroup = this.physics.add.group();
    this.chests = this.physics.add.staticGroup();

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
          this.player = this.physics.add.sprite(posX, posY, this.getCatTextureKey());
          this.player.setCollideWorldBounds(true);
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
        } else if (char === 'L') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('lobo', posX, posY);
        } else if (char === 'P') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('planta', posX, posY);
        } else if (char === 'G') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('golem', posX, posY);
        } else if (char === 'A') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('arana', posX, posY);
        } else if (char === 'E') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          this.spawnEnemy('esqueleto_llameante', posX, posY);
        } else if (char === 'T') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          const spike = this.add.image(posX, posY, 'pincho').setOrigin(0);
          this.spikeGroup.add(spike);
          spike.body.setSize(this.tileSize, this.tileSize);
        } else if (char === 'C') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          const chest = this.chests.create(posX, posY, 'cofre_plata');
          chest.setData('tipo', 'plata');
          chest.body.setSize(this.tileSize, this.tileSize);
        } else if (char === 'J') {
          this.add.image(posX, posY, 'suelo_maz').setOrigin(0);
          const jefeDef = mazmorra.jefes.find(j => j.x === x && j.y === y);
          if (jefeDef) {
            this.spawnEnemy(jefeDef.tipo, posX, posY, true);
          }
        }
      }
    }

    if (!this.player) {
      this.player = this.physics.add.sprite(64, 64, this.getCatTextureKey());
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.wallLayer);
    }

    this.physics.add.collider(this.enemies, this.wallLayer);
    this.physics.add.collider(this.jefes, this.wallLayer);
    this.physics.add.collider(this.player, this.chests); // para no atravesar cofres

    // Cámara
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, mapa[0].length * this.tileSize, mapa.length * this.tileSize);

    // HUD
    this.createHUD();

    // Joystick y ataque
    this.createVirtualJoystick();
    this.createAttackButton();
  }

  getCatTextureKey() {
    const nivel = parseInt(localStorage.getItem('level') || '1');
    const rango = getRango(nivel);
    const key = 'cat_' + rango.nombre.toLowerCase().replace(/ /g,'_');
    return this.textures.exists(key) ? key : 'cat_base';
  }

  createTileTexture(key, w, h, color) {
    if (this.textures.exists(key)) this.textures.remove(key);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = '#00000033';
    ctx.lineWidth = 2;
    ctx.strokeRect(1,1,w-2,h-2);
    ctx.fillStyle = '#ffffff11';
    ctx.fillRect(0,0,w,h/2);
    this.textures.addCanvas(key, c);
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
      case 'nigromante':
        if (esJefe) sprite = this.jefes.create(x, y, 'necromancer');
        else sprite = this.enemies.create(x, y, 'necromancer');
        health = 150; speed = 50; damage = 10; rangeDetect = 400; break;
      case 'ent':
        if (esJefe) sprite = this.jefes.create(x, y, 'ent');
        else sprite = this.enemies.create(x, y, 'ent');
        health = 400; speed = 30; damage = 18; rangeDetect = 350; break;
      case 'yeti':
        if (esJefe) sprite = this.jefes.create(x, y, 'yeti');
        else sprite = this.enemies.create(x, y, 'yeti');
        health = 400; speed = 40; damage = 20; rangeDetect = 400; break;
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
    sprite.healthBar = this.add.graphics().setDepth(5);
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
    const maxHealth = enemy.health; // asumiendo que health ya es el máximo
    const healthPercent = Phaser.Math.Clamp(enemy.health / maxHealth, 0, 1);
    enemy.healthBar.fillStyle(0xff0000, 1);
    enemy.healthBar.fillRect(x, y, width * healthPercent, height);
  }

  createHUD() {
    this.playerHealthBar = this.add.graphics().setScrollFactor(0).setDepth(20);
    this.updatePlayerHealthBar();
    this.moneyText = this.add.text(10, 30, `🪙 ${localStorage.getItem('gold') || 0}`, {
      fontSize: '16px', color: '#ffd700'
    }).setScrollFactor(0).setDepth(20);
    this.levelText = this.add.text(10, 50, `Nivel ${localStorage.getItem('level') || 1}`, {
      fontSize: '16px', color: '#fff'
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
    const healthPercent = Phaser.Math.Clamp(this.playerHP / this.playerMaxHP, 0, 1);
    this.playerHealthBar.fillStyle(0x00ff00, 1);
    this.playerHealthBar.fillRect(x, y, width * healthPercent, height);
    this.playerHealthBar.lineStyle(2, 0xffffff, 0.5);
    this.playerHealthBar.strokeRect(x, y, width, height);
  }

  createVirtualJoystick() {
    this.joystickBase = this.add.circle(80, 380, 45, 0xffffff, 0.3).setScrollFactor(0);
    this.joystickThumb = this.add.circle(80, 380, 20, 0xffffff, 0.8).setScrollFactor(0);
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

  createAttackButton() {
    const btn = this.add.circle(720, 380, 30, 0xff0000, 0.6).setScrollFactor(0).setDepth(10);
    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerdown', () => { this.playerAttack(); });
    this.add.text(720, 380, '⚔️', { fontSize: '24px' }).setOrigin(0.5).setScrollFactor(0).setDepth(11);
  }

  playerAttack() {
    const now = this.time.now;
    if (now - this.lastAttackTime < this.attackCooldown) return;
    this.lastAttackTime = now;

    const range = 60;
    const paw = this.add.image(this.player.x + (this.facing === 'right' ? 30 : this.facing === 'left' ? -30 : 0), this.player.y + (this.facing === 'down' ? 30 : this.facing === 'up' ? -30 : 0), 'paw').setDepth(6);
    this.tweens.add({ targets: paw, scale: 0.5, alpha: 0, duration: 200, onComplete: () => paw.destroy() });

    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist <= range) {
        let swordLevel = parseInt(localStorage.getItem('swordLevel') || '1');
        let damage = 20 + (swordLevel * 5);
        let abilityLevel = parseInt(localStorage.getItem('abilityLevel') || '1');
        damage += (abilityLevel - 1) * 10;
        enemy.health -= damage;
        this.updateEnemyHealthBar(enemy);
        if (enemy.health <= 0) {
          this.killEnemy(enemy);
        }
      }
    });

    this.jefes.children.iterate((jefe) => {
      if (!jefe.active) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, jefe.x, jefe.y);
      if (dist <= range) {
        let swordLevel = parseInt(localStorage.getItem('swordLevel') || '1');
        let damage = 20 + (swordLevel * 5);
        let abilityLevel = parseInt(localStorage.getItem('abilityLevel') || '1');
        damage += (abilityLevel - 1) * 10;
        jefe.health -= damage;
        this.updateEnemyHealthBar(jefe);
        if (jefe.health <= 0) {
          this.derrotarJefe(jefe);
        }
      }
    });
  }

  killEnemy(enemy) {
    enemy.destroy();
    let xp = parseInt(localStorage.getItem('xp') || '0');
    xp += 15;
    localStorage.setItem('xp', xp);
    let gold = parseInt(localStorage.getItem('gold') || '0');
    gold += 10;
    localStorage.setItem('gold', gold);
    this.moneyText.setText(`🪙 ${gold}`);
    this.checkLevelUp();
  }

  derrotarJefe(jefe) {
    let gold = parseInt(localStorage.getItem('gold') || '0');
    gold += 100;
    localStorage.setItem('gold', gold);
    let xp = parseInt(localStorage.getItem('xp') || '0');
    xp += 50;
    localStorage.setItem('xp', xp);
    jefe.destroy();

    // Cofre dorado
    const chest = this.chests.create(jefe.x, jefe.y, 'cofre_oro');
    chest.setData('tipo', 'oro');
    chest.body.setSize(this.tileSize, this.tileSize);
    this.physics.add.overlap(this.player, chest, (player, cofre) => {
      if (cofre.active) {
        cofre.destroy();
        // Recompensas aleatorias
        const tipo = cofre.getData('tipo');
        if (tipo === 'oro') {
          let potions = parseInt(localStorage.getItem('potions') || '0');
          potions += 2;
          localStorage.setItem('potions', potions);
          alert('Cofre dorado abierto: 2 pociones y 100 oro.');
          gold += 100;
          localStorage.setItem('gold', gold);
          this.moneyText.setText(`🪙 ${gold}`);
        }
      }
    });

    this.checkLevelUp();
  }

  checkLevelUp() {
    let xp = parseInt(localStorage.getItem('xp') || '0');
    let level = parseInt(localStorage.getItem('level') || '1');
    let xpNecesario = 100 * level;
    while (xp >= xpNecesario && level < 100) {
      xp -= xpNecesario;
      level++;
      xpNecesario = 100 * level;
      let maxHP = parseInt(localStorage.getItem('maxHP') || '100');
      maxHP += 10;
      localStorage.setItem('maxHP', maxHP);
      this.playerMaxHP = maxHP;
      this.playerHP = Math.min(this.playerHP + 20, maxHP);
      this.updatePlayerHealthBar();
      aplicarEvolucion(level);
    }
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    this.levelText.setText(`Nivel ${level}`);
  }

  update(time, delta) {
    this.player.setVelocity(
      this.joystickVector.x * this.playerSpeed,
      this.joystickVector.y * this.playerSpeed
    );
    if (!this.joystickActive) this.player.setVelocity(0,0);

    if (Math.abs(this.joystickVector.x) > 0.2) {
      this.facing = this.joystickVector.x > 0 ? 'right' : 'left';
    } else if (Math.abs(this.joystickVector.y) > 0.2) {
      this.facing = this.joystickVector.y > 0 ? 'down' : 'up';
    }

    this.physics.overlap(this.player, this.spikeGroup, (player, spike) => {
      if (!this.invulnerable) {
        this.playerHP -= 10;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(1000, () => { this.invulnerable = false; });
        this.tweens.add({ targets: this.player, alpha: 0.5, duration: 100, yoyo: true, repeat: 5, onComplete: () => { this.player.alpha = 1; } });
        if (this.playerHP <= 0) this.playerDeath();
      }
    });

    this.physics.overlap(this.player, this.chests, (player, chest) => {
      if (chest.active) {
        chest.destroy();
        const tipo = chest.getData('tipo');
        let gold = parseInt(localStorage.getItem('gold') || '0');
        if (tipo === 'plata') {
          gold += 50;
          alert('Cofre de plata: +50 oro.');
        } else if (tipo === 'oro') {
          gold += 100;
          let potions = parseInt(localStorage.getItem('potions') || '0');
          potions += 2;
          localStorage.setItem('potions', potions);
          alert('Cofre dorado: +100 oro y 2 pociones.');
        }
        localStorage.setItem('gold', gold);
        this.moneyText.setText(`🪙 ${gold}`);
      }
    });

    this.enemies.children.iterate((enemy) => {
      if (!enemy.active) return;
      this.handleEnemyAI(enemy, false);
    });

    this.jefes.children.iterate((jefe) => {
      if (!jefe.active) return;
      this.handleEnemyAI(jefe, true);
    });

    this.enemies.children.iterate((enemy) => {
      if (enemy.active) enemy.healthBar.setPosition(enemy.x - 15, enemy.y - 20);
    });
    this.jefes.children.iterate((jefe) => {
      if (jefe.active) jefe.healthBar.setPosition(jefe.x - 15, jefe.y - 20);
    });

    this.projectiles.children.iterate((proj) => {
      if (!proj.active) return;
      proj.x += proj.vx;
      proj.y += proj.vy;
      if (!this.invulnerable && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), proj.getBounds())) {
        this.playerHP -= proj.damage;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(1000, () => { this.invulnerable = false; });
        this.tweens.add({ targets: this.player, alpha: 0.5, duration: 100, yoyo: true, repeat: 5, onComplete: () => { this.player.alpha = 1; } });
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
        vx = 0; vy = 0;
        if (dist < 50 && !this.invulnerable) {
          this.playerHP -= enemy.damage;
          this.updatePlayerHealthBar();
          this.invulnerable = true;
          this.time.delayedCall(1000, () => { this.invulnerable = false; });
          this.tweens.add({ targets: this.player, alpha: 0.5, duration: 100, yoyo: true, repeat: 5, onComplete: () => { this.player.alpha = 1; } });
          if (this.playerHP <= 0) this.playerDeath();
        }
      } else {
        enemy.setVelocity(vx, vy);
      }

      if (!this.invulnerable && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) {
        this.playerHP -= enemy.damage;
        this.updatePlayerHealthBar();
        this.invulnerable = true;
        this.time.delayedCall(1000, () => { this.invulnerable = false; });
        this.tweens.add({ targets: this.player, alpha: 0.5, duration: 100, yoyo: true, repeat: 5, onComplete: () => { this.player.alpha = 1; } });
        if (this.playerHP <= 0) this.playerDeath();
      }

      if (esJefe && (enemy.tipo === 'nigromante' || enemy.tipo === 'ent' || enemy.tipo === 'carnicero' || enemy.tipo === 'yeti')) {
        if (!enemy.lastShot || this.time.now - enemy.lastShot > 2000) {
          enemy.lastShot = this.time.now;
          const dx2 = this.player.x - enemy.x;
          const dy2 = this.player.y - enemy.y;
          const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
          if (dist2 > 0) {
            const proj = this.projectiles.create(enemy.x, enemy.y, 'projectile');
            proj.vx = (dx2 / dist2) * 150;
            proj.vy = (dy2 / dist2) * 150;
            proj.damage = 15;
            proj.setDepth(4);
          }
        }
      }
    } else {
      if (enemy.tipo !== 'planta') enemy.setVelocity(0, 0);
    }
  }

  playerDeath() {
    this.physics.pause();
    this.add.text(400, 225, 'HAS MUERTO', { fontSize: '48px', color: '#ff0000' }).setOrigin(0.5).setScrollFactor(0).setDepth(30);
    this.time.delayedCall(2000, () => this.scene.restart());
  }
}

// ========== FUNCIONES GLOBALES ==========
function getRango(nivel) {
  return RANGOS.filter(r => nivel >= r.minNivel).pop();
}

function aplicarEvolucion(nivel) {
  // Actualizar apariencia del gato y stats según rango
  const rango = getRango(nivel);
  // Guardar el rango actual en localStorage
  localStorage.setItem('rango', rango.nombre);
  // Podríamos actualizar textura en vivo, pero por simplicidad se aplica al reiniciar escena.
  // Nota: en WorldScene y DungeonScene, al crear el jugador se usa getCatTextureKey() que ya consulta el nivel.
}

// ========== CONFIGURACIÓN ==========
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
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
  scene: [BootScene, MenuScene, ShopScene, ProfileScene, WorldScene, DungeonScene]
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
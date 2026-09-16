export const CATEGORIES = [
  { key: 'granizados', label: 'Granizados', countLabel: '4 sabores' },
  { key: 'micheladas', label: 'Micheladas', countLabel: '2 opciones' },
  { key: 'peceras', label: 'Peceras', countLabel: 'Para compartir' },
  { key: 'licor', label: 'Licor', countLabel: 'Shots y botellas' },
]

// Selección temporal/aleatoria para probar el carrusel de "Más pedidos" —
// pendiente reemplazar por los productos reales que indique el negocio.
export const FEATURED_IDS = ['mango', 'michBora', 'pecTropical', 'shot', 'maracuya']

// Catálogo de adiciones por categoría: todos los granizados manejan las
// mismas adiciones entre sí, igual que todas las micheladas y todas las
// peceras — una sola lista compartida en vez de repetirla por producto.
const GRANIZADOS_ADDS = [
  { id: 'add_gomitas', l: 'Gomitas', p: 1500, av: true },
  { id: 'add_chispas_chocolate', l: 'Chispas de chocolate', p: 1500, av: true },
  { id: 'add_caramelo', l: 'Caramelo', p: 2500, av: true },
  { id: 'add_fruta_surtida', l: 'Fruta surtida', p: 2000, av: true },
  { id: 'add_sal_sabores_extra', l: 'Sal de sabores extra', p: 1000, av: true },
  { id: 'add_chile_polvo', l: 'Chile en polvo', p: 1500, av: true },
  { id: 'add_perlas_fresa', l: 'Perlas de fresa', p: 2500, av: false },
  { id: 'add_jeringa_tequila', l: 'Jeringa tequila', p: 5000, av: true },
  { id: 'add_jeringa_vodka', l: 'Jeringa vodka', p: 5000, av: true },
  { id: 'add_jeringa_ron', l: 'Jeringa ron', p: 5000, av: true },
]

const MICHELADAS_ADDS = [
  { id: 'add_doble_escarchado_tajin', l: 'Doble escarchado de tajín', p: 1000, av: true },
  { id: 'add_chamoy_extra', l: 'Chamoy extra', p: 1000, av: true },
  { id: 'add_limon_extra', l: 'Limón extra', p: 500, av: true },
  { id: 'add_mango', l: 'Mango', p: 1500, av: true },
  { id: 'add_pina', l: 'Piña', p: 1500, av: true },
  { id: 'add_fresa', l: 'Fresa', p: 1500, av: true },
  { id: 'add_maracuya', l: 'Maracuyá', p: 1500, av: false },
]

const PECERAS_ADDS = [
  { id: 'add_pina_adicional', l: 'Piña adicional', p: 5000, av: true },
  { id: 'add_fresa_adicional', l: 'Fresa adicional', p: 5000, av: true },
  { id: 'add_maracuya_adicional', l: 'Maracuyá adicional', p: 5000, av: false },
  { id: 'add_shot_extra_ron', l: 'Shot extra de ron', p: 6000, av: true },
  { id: 'add_shot_extra_vodka', l: 'Shot extra de vodka', p: 6000, av: true },
]

export const PRODUCTS_BY_CATEGORY = {
  granizados: ['mora', 'mango', 'maracuya', 'tropical'],
  micheladas: ['michClasica', 'michBora'],
  peceras: ['pecTropical', 'pecExplosiva'],
  licor: ['shot', 'botella'],
}

export const PRODUCTS = {
  mora: {
    id: 'mora',
    category: 'granizados',
    art: 'mora',
    name: 'Mora Azul',
    available: true,
    availLabel: 'Disponible',
    contains: 'Mora azul, leche condensada, topping de gomitas.',
    desc: 'Mora azul bien helada con leche condensada.',
    sizes: [
      { l: 'S', p: 14000 },
      { l: 'M', p: 18000, sel: true },
      { l: 'L', p: 23000 },
      { l: 'XL', p: 36500 },
    ],
    adds: GRANIZADOS_ADDS,
  },
  mango: {
    id: 'mango',
    category: 'granizados',
    art: 'mango',
    name: 'Mango Biche',
    available: true,
    availLabel: 'Disponible',
    contains: 'Mango verde, sal de sabores — el más pedido.',
    desc: 'Mango verde con sal de sabores — el granizado más pedido de la carta.',
    sizes: [
      { l: 'S', p: 14000 },
      { l: 'M', p: 18000, sel: true },
      { l: 'L', p: 23000 },
      { l: 'XL', p: 36500 },
    ],
    adds: GRANIZADOS_ADDS,
  },
  maracuya: {
    id: 'maracuya',
    category: 'granizados',
    art: 'maracuya',
    name: 'Maracuyá',
    available: true,
    availLabel: 'Disponible',
    contains: 'Maracuyá natural, ácido y refrescante.',
    desc: 'Maracuyá natural, ácido y muy refrescante.',
    sizes: [
      { l: 'S', p: 14000 },
      { l: 'M', p: 18000, sel: true },
      { l: 'L', p: 23000 },
      { l: 'XL', p: 36500 },
    ],
    adds: GRANIZADOS_ADDS,
  },
  tropical: {
    id: 'tropical',
    category: 'granizados',
    art: 'tropical',
    name: 'Tropical (multifruta)',
    available: false,
    availLabel: 'Agotado hoy',
    contains: 'Mezcla de mora, mango y maracuyá.',
    desc: 'Mezcla de mora, mango y maracuyá con topping de fruta.',
    sizes: [
      { l: 'S', p: 14000 },
      { l: 'M', p: 18000, sel: true },
      { l: 'L', p: 23000 },
      { l: 'XL', p: 36500 },
    ],
    adds: GRANIZADOS_ADDS,
  },
  michClasica: {
    id: 'michClasica',
    category: 'micheladas',
    art: 'michClasica',
    name: 'Michelada Clásica',
    available: true,
    availLabel: 'Disponible',
    contains: 'Tu cerveza, escarchado de sal y tajín, limón.',
    desc: 'Tu cerveza con escarchado de sal y tajín, limón al gusto.',
    base: 15000,
    adds: MICHELADAS_ADDS,
  },
  michBora: {
    id: 'michBora',
    category: 'micheladas',
    art: 'michBora',
    name: 'Michelada BoraBora',
    available: true,
    availLabel: 'Disponible',
    contains: 'Cerveza + escarchado de tajín + elige 2 frutas.',
    desc: 'Cerveza con escarchado de tajín — arma tu michelada con las frutas que quieras.',
    base: 18000,
    adds: MICHELADAS_ADDS,
  },
  pecTropical: {
    id: 'pecTropical',
    category: 'peceras',
    art: 'pecTropical',
    name: 'Pecera Tropical',
    available: true,
    availLabel: 'Disponible · sirve 4',
    contains: 'Ron + jugos naturales — sirve 4, 4 pitillos.',
    desc: 'Ron con jugos naturales de fruta, decorada, con 4 pitillos para compartir.',
    base: 65000,
    adds: PECERAS_ADDS,
  },
  pecExplosiva: {
    id: 'pecExplosiva',
    category: 'peceras',
    art: 'pecExplosiva',
    name: 'Pecera Explosiva',
    available: false,
    availLabel: 'Solo fines de semana',
    contains: 'Vodka + energizante + fruta — sirve 4.',
    desc: 'Vodka con energizante y fruta, con 4 pitillos para compartir.',
    base: 70000,
    adds: PECERAS_ADDS,
  },
  shot: {
    id: 'shot',
    category: 'licor',
    art: 'shot',
    name: 'Shot Tequila / Vodka / Ron',
    available: true,
    availLabel: 'Disponible',
    contains: '1 onza de licor a elección, con limón y sal.',
    desc: '1 onza de licor, servido con limón y sal.',
    base: 6000,
    adds: [
      { id: 'add_doble_onza', l: 'Doble onza', p: 6000, av: true },
      { id: 'add_limon_sal_extra', l: 'Limón y sal extra', p: 500, av: true },
    ],
  },
  botella: {
    id: 'botella',
    category: 'licor',
    art: 'botella',
    name: 'Botella Aguardiente',
    available: true,
    availLabel: 'Disponible',
    contains: '750ml, servida con hielo y limón.',
    desc: 'Botella de 750ml, servida con hielo y limón.',
    base: 55000,
    adds: [
      { id: 'add_gaseosa_aparte', l: 'Gaseosa aparte', p: 8000, av: true },
      { id: 'add_vaso_adicional', l: 'Vaso adicional', p: 2000, av: true },
    ],
  },
}

export function listPrice(product) {
  if (product.sizes) {
    const min = Math.min(...product.sizes.map((s) => s.p))
    return `Desde ${fmt(min)}`
  }
  return fmt(product.base)
}

export function fmt(n) {
  return '$' + n.toLocaleString('es-CO')
}

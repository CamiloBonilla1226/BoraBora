import { PRODUCTS } from '../data/products'
import { isPromoDay } from './schedule'

// Orden de tamaños de más chico a más grande, para poder comparar cuál
// granizado es "igual o más pequeño" que otro.
const SIZE_ORDER = ['S', 'M', 'L', 'XL']

function sizeRank(size) {
  return SIZE_ORDER.indexOf(size)
}

/**
 * Promo de granizados (martes y miércoles, ver utils/schedule.js): cada 3
 * granizados en el carrito, el 1ro va a precio completo, el 2do a mitad de
 * precio y el 3ro gratis. Solo aplica a la categoría "granizados" — el resto
 * de productos (micheladas, peceras, licor) siempre van a precio completo.
 *
 * Regla de tamaños: el 2do/3er granizado rebajado nunca puede ser más grande
 * que el "primero" de su grupo de 3. Para garantizarlo sin importar el orden
 * en que se agregaron al carrito, los granizados se ordenan de más grande a
 * más chico antes de armar los grupos — así el más grande de cada grupo
 * siempre queda de primero, a precio completo, y los descuentos solo caen
 * sobre granizados de su mismo tamaño o menores.
 *
 * Devuelve los items del carrito con `finalPrice` (precio ya con la promo
 * aplicada) y `promoLabel` (texto del descuento, o null si no aplica).
 */
export function priceCartItems(items, now = new Date()) {
  const promoActive = isPromoDay(now)

  if (!promoActive) {
    return items.map((item) => ({ ...item, finalPrice: item.total, promoLabel: null }))
  }

  const granizadoIndexes = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => PRODUCTS[item.productId]?.category === 'granizados')
    .sort((a, b) => {
      const rankDiff = sizeRank(b.item.size) - sizeRank(a.item.size)
      if (rankDiff !== 0) return rankDiff
      return b.item.total - a.item.total
    })

  const promoByIndex = new Map()
  granizadoIndexes.forEach(({ index }, position) => {
    const positionInGroup = position % 3
    if (positionInGroup === 1) {
      promoByIndex.set(index, { multiplier: 0.5, label: '2do granizado · 50% off' })
    } else if (positionInGroup === 2) {
      promoByIndex.set(index, { multiplier: 0, label: '3er granizado · gratis' })
    }
  })

  return items.map((item, index) => {
    const promo = promoByIndex.get(index)
    if (!promo) return { ...item, finalPrice: item.total, promoLabel: null }
    return { ...item, finalPrice: Math.round(item.total * promo.multiplier), promoLabel: promo.label }
  })
}

/**
 * Mensaje corto para animar a completar el grupo de 3 granizados, sin
 * insistir: solo se muestra un aviso a la vez (nunca varios ni repetido en
 * loop) y desaparece justo al completar el grupo de 3.
 */
export function getPromoNudge(items, now = new Date()) {
  if (!isPromoDay(now)) return null

  const granizadoCount = items.filter((item) => PRODUCTS[item.productId]?.category === 'granizados').length
  if (granizadoCount === 0) return null

  const remainder = granizadoCount % 3
  if (remainder === 1) return 'Agrega otro granizado (igual o más chico) y va a mitad de precio.'
  if (remainder === 2) return 'Agrega un granizado más (igual o más chico) y el tercero es gratis.'
  return null
}

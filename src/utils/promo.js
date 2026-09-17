import { PRODUCTS } from '../data/products'
import { isPromoDay } from './schedule'

// Orden de tamaños de más pequeño a más grande, para poder comparar cuál
// granizado es "igual o más pequeño" que otro.
const SIZE_ORDER = ['S', 'M', 'L', 'XL']

function sizeRank(size) {
  return SIZE_ORDER.indexOf(size)
}

export const PROMO_LABEL_HALF = 'Granizado pequeño · 50% off'
export const PROMO_LABEL_FREE = 'Granizado pequeño · gratis'

/**
 * Promo de granizados (martes y miércoles, ver utils/schedule.js): por la
 * compra de 1 granizado a precio completo, un granizado pequeño (S) va a
 * mitad de precio; por la compra de 2 granizados a precio completo, el
 * pequeño (S) va gratis (el beneficio de gratis reemplaza al de 50%, no se
 * suman). El patrón se repite cada 2 granizados de precio completo. Solo
 * aplica a la categoría "granizados" — el resto de productos (micheladas,
 * peceras, licor) siempre van a precio completo.
 *
 * Regla de tamaños: el descuento SOLO puede caer sobre un granizado de
 * tamaño S — un granizado más grande nunca se rebaja. Para que los
 * granizados grandes siempre cuenten como "precio completo" antes que
 * cualquier S del carrito, se ordenan de más grande a más pequeño antes de
 * armar los grupos.
 *
 * Los granizados se agrupan de a 3 en orden: los 2 primeros de cada grupo
 * van a precio completo y el 3ro (si es talla S) sale gratis. Si al cliente
 * le queda un grupo incompleto de solo 2 granizados al final, el 1ro va a
 * precio completo y el 2do (si es talla S) sale a mitad de precio.
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
  const total = granizadoIndexes.length
  granizadoIndexes.forEach(({ item, index }, position) => {
    if (item.size !== 'S') return

    const groupStart = Math.floor(position / 3) * 3
    const groupSize = Math.min(3, total - groupStart)
    const positionInGroup = position - groupStart

    if (groupSize === 3 && positionInGroup === 2) {
      promoByIndex.set(index, { multiplier: 0, label: PROMO_LABEL_FREE })
    } else if (groupSize === 2 && positionInGroup === 1) {
      promoByIndex.set(index, { multiplier: 0.5, label: PROMO_LABEL_HALF })
    }
  })

  return items.map((item, index) => {
    const promo = promoByIndex.get(index)
    if (!promo) return { ...item, finalPrice: item.total, promoLabel: null }
    return { ...item, finalPrice: Math.round(item.total * promo.multiplier), promoLabel: promo.label }
  })
}

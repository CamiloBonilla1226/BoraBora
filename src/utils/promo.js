import { PRODUCTS } from '../data/products'
import { isPromoDay } from './schedule'

// Orden de tamaños de más pequeño a más grande, para poder comparar cuál
// granizado es "igual o más pequeño" que otro.
const SIZE_ORDER = ['S', 'M', 'L', 'XL']

function sizeRank(size) {
  return SIZE_ORDER.indexOf(size)
}

export const PROMO_LABEL_HALF = '2do granizado · 50% off'
export const PROMO_LABEL_FREE = '3er granizado · gratis'

/**
 * Promo de granizados (martes y miércoles, ver utils/schedule.js): cada 3
 * granizados en el carrito, el 1ro va a precio completo, el 2do a mitad de
 * precio y el 3ro gratis. Solo aplica a la categoría "granizados" — el resto
 * de productos (micheladas, peceras, licor) siempre van a precio completo.
 *
 * Regla de tamaños: el 2do/3er granizado rebajado nunca puede ser más grande
 * que el "primero" de su grupo de 3. Para garantizarlo sin importar el orden
 * en que se agregaron al carrito, los granizados se ordenan de más grande a
 * más pequeño antes de armar los grupos — así el más grande de cada grupo
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
      promoByIndex.set(index, { multiplier: 0.5, label: PROMO_LABEL_HALF })
    } else if (positionInGroup === 2) {
      promoByIndex.set(index, { multiplier: 0, label: PROMO_LABEL_FREE })
    }
  })

  return items.map((item, index) => {
    const promo = promoByIndex.get(index)
    if (!promo) return { ...item, finalPrice: item.total, promoLabel: null }
    return { ...item, finalPrice: Math.round(item.total * promo.multiplier), promoLabel: promo.label }
  })
}

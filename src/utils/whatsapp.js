import { fmt } from '../data/products'

// Número de WhatsApp del negocio (Colombia, +57) — se usa tanto para el
// contacto de "Nosotros" como para enviar el pedido desde el carrito.
export const WHATSAPP_NUMBER = '3146032055'
const WHATSAPP_COUNTRY_CODE = '57'

/** Link para abrir un chat directo con el negocio, sin mensaje precargado. */
export function buildWhatsAppContactLink() {
  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_NUMBER}`
}

/**
 * Arma el mensaje del pedido (cada producto con su tamaño, adiciones y
 * precio ya con la promo aplicada, el total y el comentario si hay) y
 * devuelve el link de WhatsApp con ese texto precargado — el cliente solo
 * tiene que revisarlo y darle enviar, nunca se manda nada sin que él lo vea.
 */
export function buildWhatsAppOrderLink(pricedItems, total, comment) {
  const lines = ['🧊 *Nuevo pedido — BoraBora*', '']

  pricedItems.forEach((item, i) => {
    const details = []
    if (item.size) details.push(`Tamaño ${item.size}`)
    details.push(item.adds.length ? item.adds.join(', ') : 'Sin adiciones')

    lines.push(`${i + 1}. *${item.name}*`)
    lines.push(`   ${details.join(' · ')}`)
    lines.push(item.promoLabel ? `   ${fmt(item.finalPrice)} _(${item.promoLabel})_` : `   ${fmt(item.finalPrice)}`)
    lines.push('')
  })

  lines.push(`*Total: ${fmt(total)}*`)

  const trimmedComment = comment.trim()
  if (trimmedComment) {
    lines.push('')
    lines.push(`📝 *Comentario:* ${trimmedComment}`)
  }

  lines.push('')
  lines.push('_Pedido generado desde la carta digital BoraBora_')

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_NUMBER}?text=${text}`
}

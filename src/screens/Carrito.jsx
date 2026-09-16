import { useMemo, useState } from 'react'
import { IconCart, IconTrash, IconWhatsapp } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { fmt } from '../data/products'
import { priceCartItems } from '../utils/promo'
import { useNow } from '../utils/useNow'
import { buildWhatsAppOrderLink } from '../utils/whatsapp'

const COMMENT_MAX_LENGTH = 300

export default function Carrito() {
  const { items, removeItem } = useCart()
  const now = useNow()
  const [comment, setComment] = useState('')

  const pricedItems = useMemo(() => priceCartItems(items, now), [items, now])
  const total = useMemo(() => pricedItems.reduce((sum, item) => sum + item.finalPrice, 0), [pricedItems])
  const whatsappLink = useMemo(
    () => buildWhatsAppOrderLink(pricedItems, total, comment),
    [pricedItems, total, comment],
  )

  return (
    <section className="screen" id="tab-carrito">
      <div className="sec-head">
        <div className="eyebrow">Tu pedido</div>
        <h1>Carrito</h1>
      </div>
      <div id="cartContent">
        {items.length === 0 ? (
          <div className="cart-empty">
            <IconCart className="ico" strokeWidth="1.6" />
            <p>
              Tu carrito está vacío.
              <br />
              Ve al menú y elige algo rico.
            </p>
          </div>
        ) : (
          <>
            {pricedItems.map((item) => {
              const extra = []
              if (item.size) extra.push('Tamaño ' + item.size)
              if (item.adds.length) extra.push(item.adds.join(', '))
              return (
                <div className="cart-item" key={item.id}>
                  <div className="row1">
                    <h3>{item.name}</h3>
                    <div className="price">
                      {item.promoLabel && <span className="price-was">{fmt(item.total)}</span>}
                      {fmt(item.finalPrice)}
                    </div>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Quitar ${item.name} del carrito`}
                    >
                      <IconTrash />
                    </button>
                  </div>
                  <p>
                    {extra.join(' · ') || 'Sin adiciones'}
                    {item.promoLabel && <span className="promo-badge"> · {item.promoLabel}</span>}
                  </p>
                </div>
              )
            })}
            <div className="cart-total">
              <span>Total del pedido</span>
              <b>{fmt(total)}</b>
            </div>

            <div className="cart-comment-group">
              <label htmlFor="cart-comment" className="cart-comment-label">
                Comentario (opcional)
              </label>
              <textarea
                id="cart-comment"
                className="cart-comment"
                placeholder="Ej: sin pitillo, para recoger a las 7pm..."
                maxLength={COMMENT_MAX_LENGTH}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <a className="whatsapp-send-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <IconWhatsapp />
              Enviar pedido por WhatsApp
            </a>
          </>
        )}
      </div>
    </section>
  )
}

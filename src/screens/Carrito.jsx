import { useMemo } from 'react'
import { IconCart, IconTrash } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { fmt } from '../data/products'
import { priceCartItems } from '../utils/promo'
import { useNow } from '../utils/useNow'

export default function Carrito() {
  const { items, removeItem } = useCart()
  const now = useNow()

  const pricedItems = useMemo(() => priceCartItems(items, now), [items, now])
  const total = useMemo(() => pricedItems.reduce((sum, item) => sum + item.finalPrice, 0), [pricedItems])

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
            {/* Siguiente paso: flujo de pago y envío del pedido */}
          </>
        )}
      </div>
    </section>
  )
}

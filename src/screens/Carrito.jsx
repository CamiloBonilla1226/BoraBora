import { IconCart } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { fmt } from '../data/products'

export default function Carrito() {
  const { items, total } = useCart()

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
            {items.map((item, i) => {
              const extra = []
              if (item.size) extra.push('Tamaño ' + item.size)
              if (item.adds.length) extra.push(item.adds.join(', '))
              return (
                <div className="cart-item" key={i}>
                  <div className="row1">
                    <h3>{item.name}</h3>
                    <div className="price">{fmt(item.total)}</div>
                  </div>
                  <p>{extra.join(' · ') || 'Sin adiciones'}</p>
                </div>
              )
            })}
            <div className="cart-total">
              <span>Total del pedido</span>
              <b>{fmt(total)}</b>
            </div>
            <p className="cart-note">
              Este carrito es un prototipo — el flujo de pago y envío del pedido se define en el siguiente paso.
            </p>
            {/* Siguiente paso: flujo de pago y envío del pedido */}
          </>
        )}
      </div>
    </section>
  )
}

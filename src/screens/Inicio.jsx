import RailCard from '../components/RailCard'
import CategoryTile from '../components/CategoryTile'
import { PRODUCTS, FEATURED_IDS, CATEGORIES } from '../data/products'
import logo from '../assets/logo-borabora.png'

export default function Inicio({ onOpenProduct, onGoToCategory }) {
  return (
    <section className="screen" id="tab-inicio">
      <div className="hero-logo">
        <img src={logo} alt="BoraBora" />
      </div>

      <div className="sec-head">
        <div className="eyebrow">Carta digital</div>
        <h1>¿Qué se te antoja hoy?</h1>
        <p className="lead">Explora la carta por categoría o entra directo a lo más pedido.</p>
      </div>

      <div className="promo-teaser">
        <span className="tag">HOY</span>
        <span style={{ flex: 1 }}>
          <strong>Martes y miércoles de promo</strong>
          <span>2do granizado al 50% de descuento</span>
        </span>
      </div>

      <div className="block-title">
        <h2>Más pedidos</h2>
      </div>
      <div className="rail">
        {FEATURED_IDS.map((id) => (
          <RailCard key={id} product={PRODUCTS[id]} onOpen={onOpenProduct} />
        ))}
      </div>

      <div className="block-title">
        <h2>Categorías</h2>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c) => (
          <CategoryTile key={c.key} category={c} onOpen={onGoToCategory} />
        ))}
      </div>
    </section>
  )
}

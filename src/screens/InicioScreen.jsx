import CupArt from '../components/CupArt'
import { IconGranizados, IconMicheladas, IconPeceras, IconLicor } from '../components/Icons'
import { PRODUCTS, FEATURED_IDS, CATEGORIES, listPrice } from '../data/products'
import logo from '../assets/logo-borabora.png'

const CATEGORY_ICONS = {
  granizados: IconGranizados,
  micheladas: IconMicheladas,
  peceras: IconPeceras,
  licor: IconLicor,
}

export default function InicioScreen({ onOpenProduct, onGoToCategory }) {
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
        {FEATURED_IDS.map((id) => {
          const p = PRODUCTS[id]
          return (
            <button className="rail-card" key={id} onClick={() => onOpenProduct(id)}>
              <div className="cupwrap">
                <CupArt variant={p.art} />
              </div>
              <h3>{p.name}</h3>
              <div className="price">{listPrice(p)}</div>
            </button>
          )
        })}
      </div>

      <div className="block-title">
        <h2>Categorías</h2>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c.key]
          return (
            <button className="cat-tile" key={c.key} onClick={() => onGoToCategory(c.key)}>
              <Icon />
              <span>
                <b>{c.label}</b>
                <span>{c.countLabel}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

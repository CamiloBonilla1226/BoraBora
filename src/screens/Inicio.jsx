import FeaturedCarousel from '../components/FeaturedCarousel'
import CategoryTile from '../components/CategoryTile'
import StoreInfo from '../components/StoreInfo'
import { PRODUCTS, FEATURED_IDS, CATEGORIES } from '../data/products'
import { useNow } from '../utils/useNow'
import { isPromoDay } from '../utils/schedule'
import logo from '../assets/logo-borabora.png'

export default function Inicio({ onOpenProduct, onGoToCategory }) {
  const now = useNow()
  const promoToday = isPromoDay(now)

  return (
    <section className="screen" id="tab-inicio">
      <div className="hero-logo">
        <img src={logo} alt="BoraBora" />
      </div>

      <div className="sec-head">
        <div className="eyebrow">Carta digital</div>
        <h1>¿Granizado o miedo?</h1>
        <p className="lead">Explora la carta por categoría o entra directo a lo más pedido.</p>
      </div>

      <div className="promo-teaser">
        <span className="tag">{promoToday ? 'HOY' : 'PROMO'}</span>
        <span style={{ flex: 1 }}>
          <strong>
            {promoToday
              ? 'Martes y miércoles de promo'
              : 'Recuerda que los martes y miércoles hay promo'}
          </strong>
          <span>2do granizado a mitad de precio y el 3ro gratis</span>
        </span>
      </div>

      <div className="block-title">
        <h2>Más pedidos</h2>
      </div>
      <FeaturedCarousel products={FEATURED_IDS.map((id) => PRODUCTS[id])} onOpen={onOpenProduct} />

      <div className="block-title">
        <h2>Categorías</h2>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c) => (
          <CategoryTile key={c.key} category={c} onOpen={onGoToCategory} />
        ))}
      </div>

      <div className="block-title">
        <h2>Nosotros</h2>
      </div>
      <StoreInfo />
    </section>
  )
}

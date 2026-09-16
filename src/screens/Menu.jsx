import ProductCard from '../components/ProductCard'
import { CATEGORIES, PRODUCTS, PRODUCTS_BY_CATEGORY } from '../data/products'
import { useDisponibilidad } from '../context/DisponibilidadContext'
import { resolveProductAvailability } from '../utils/availability'

export default function Menu({ activeCategory, onChangeCategory, onOpenProduct }) {
  const category = CATEGORIES.find((c) => c.key === activeCategory) ?? CATEGORIES[0]
  const { isAvailable } = useDisponibilidad()
  const visibleProducts = PRODUCTS_BY_CATEGORY[category.key]
    .map((id) => resolveProductAvailability(PRODUCTS[id], isAvailable))
    .filter((product) => product.available)

  return (
    <section className="screen" id="tab-menu">
      <div className="sec-head">
        <div className="eyebrow">Carta</div>
        <h1>Menú</h1>
      </div>

      <div className="subtabs">
        {CATEGORIES.map((c) => (
          <button key={c.key} className={c.key === activeCategory ? 'active' : ''} onClick={() => onChangeCategory(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="catpanel" id={'cat-' + category.key}>
        <div className="cat-count">{category.countLabel}</div>

        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
        ))}
      </div>
    </section>
  )
}

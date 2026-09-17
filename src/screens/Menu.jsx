import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { IconSearch } from '../components/Icons'
import { CATEGORIES, PRODUCTS, PRODUCTS_BY_CATEGORY } from '../data/products'
import { useDisponibilidad } from '../context/DisponibilidadContext'
import { resolveProductAvailability } from '../utils/availability'
import { matchesQuery } from '../utils/search'

const SEARCH_MAX_LENGTH = 60

export default function Menu({ activeCategory, onChangeCategory, onOpenProduct }) {
  const category = CATEGORIES.find((c) => c.key === activeCategory) ?? CATEGORIES[0]
  const { isAvailable } = useDisponibilidad()
  const [query, setQuery] = useState('')
  const searching = query.trim().length > 0

  // Buscando, se ignoran las categorías y se busca en todo el menú — el
  // cliente puede no acordarse en qué categoría está lo que quiere.
  const idsToShow = searching ? Object.keys(PRODUCTS) : PRODUCTS_BY_CATEGORY[category.key]
  const visibleProducts = idsToShow
    .map((id) => resolveProductAvailability(PRODUCTS[id], isAvailable))
    .filter((product) => product.available)
    .filter((product) => matchesQuery(product, query))

  function selectCategory(key) {
    setQuery('')
    onChangeCategory(key)
  }

  return (
    <section className="screen" id="tab-menu">
      <div className="sec-head">
        <div className="eyebrow">Carta</div>
        <h1>Menú</h1>
      </div>

      <div className="search-box" data-no-swipe>
        <IconSearch />
        <input
          type="search"
          className="search-input"
          placeholder="Buscar un producto..."
          aria-label="Buscar un producto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          maxLength={SEARCH_MAX_LENGTH}
        />
      </div>

      <div className="subtabs">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={!searching && c.key === activeCategory ? 'active' : ''}
            onClick={() => selectCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="catpanel" id={'cat-' + category.key}>
        <div className="cat-count">
          {searching
            ? `${visibleProducts.length} resultado${visibleProducts.length === 1 ? '' : 's'}`
            : category.countLabel}
        </div>

        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
        ))}

        {visibleProducts.length === 0 && (
          <p className="menu-empty">
            {searching
              ? <>No encontramos ningún producto con &quot;{query.trim()}&quot;.</>
              : <>Por ahora no hay productos disponibles en {category.label.toLowerCase()}.</>}
          </p>
        )}
      </div>
    </section>
  )
}

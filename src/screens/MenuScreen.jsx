import CupArt from '../components/CupArt'
import { CATEGORIES, PRODUCTS, PRODUCTS_BY_CATEGORY, listPrice } from '../data/products'

export default function MenuScreen({ activeCategory, onChangeCategory, onOpenProduct }) {
  const category = CATEGORIES.find((c) => c.key === activeCategory) ?? CATEGORIES[0]

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

        {PRODUCTS_BY_CATEGORY[category.key].map((id) => {
          const p = PRODUCTS[id]
          return (
            <button className={'card' + (p.available ? '' : ' is-out')} key={id} onClick={() => onOpenProduct(id)}>
              <div className="cupwrap">
                <CupArt variant={p.art} />
              </div>
              <div className="card-body">
                <div className="card-top">
                  <h3>{p.name}</h3>
                  <div className="price">{listPrice(p)}</div>
                </div>
                <p className="contains">{p.contains}</p>
                <span className={'status' + (p.available ? ' ok' : '')}>
                  <span className="dot"></span>
                  {p.availLabel}
                </span>
              </div>
              <div className="tapcue">›</div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

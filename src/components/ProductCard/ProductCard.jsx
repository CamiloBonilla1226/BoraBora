import CupArt from '../CupArt'
import { listPrice } from '../../data/products'
import './ProductCard.css'

export default function ProductCard({ product, onOpen }) {
  return (
    <button className={'card' + (product.available ? '' : ' is-out')} onClick={() => onOpen(product.id)}>
      <div className="cupwrap">
        <CupArt variant={product.art} />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{product.name}</h3>
          <div className="price">{listPrice(product)}</div>
        </div>
        <p className="contains">{product.contains}</p>
        <span className={'status' + (product.available ? ' ok' : '')}>
          <span className="dot"></span>
          {product.availLabel}
        </span>
      </div>
      <div className="tapcue">›</div>
    </button>
  )
}

import CupArt from '../CupArt'
import { listPrice } from '../../data/products'
import './RailCard.css'

export default function RailCard({ product, onOpen }) {
  return (
    <button className="rail-card" onClick={() => onOpen(product.id)}>
      <div className="cupwrap">
        <CupArt variant={product.art} />
      </div>
      <h3>{product.name}</h3>
      <div className="price">{listPrice(product)}</div>
    </button>
  )
}

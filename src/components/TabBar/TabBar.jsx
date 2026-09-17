import { IconHome, IconMenu, IconCart } from '../Icons'
import { useCart } from '../../context/CartContext'
import './TabBar.css'

export default function TabBar({ activeTab, onChangeTab, swipeHandlers }) {
  const { count } = useCart()

  return (
    <nav className="tabbar" {...swipeHandlers}>
      <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => onChangeTab('inicio')}>
        <IconHome />
        <span>Inicio</span>
      </button>
      <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => onChangeTab('menu')}>
        <IconMenu />
        <span>Menú</span>
      </button>
      <button className={activeTab === 'carrito' ? 'active' : ''} onClick={() => onChangeTab('carrito')}>
        <IconCart />
        <span className="tab-badge" hidden={count === 0}>
          {count}
        </span>
        <span>Carrito</span>
      </button>
    </nav>
  )
}

import { IconHome, IconMenu, IconCart } from '../Icons'
import './TabBar.css'

export default function TabBar({ activeTab, onChangeTab, cartCount }) {
  return (
    <nav className="tabbar">
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
        <span className="tab-badge" hidden={cartCount === 0}>
          {cartCount}
        </span>
        <span>Carrito</span>
      </button>
    </nav>
  )
}

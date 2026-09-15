import { useState } from 'react'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import ProductSheet from './components/ProductSheet'
import Inicio from './screens/Inicio'
import MenuScreen from './screens/MenuScreen'
import CarritoScreen from './screens/CarritoScreen'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [activeCategory, setActiveCategory] = useState('granizados')
  const [openProductId, setOpenProductId] = useState(null)
  const [cart, setCart] = useState([])

  function changeTab(tab) {
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }

  function goToCategory(category) {
    setActiveCategory(category)
    changeTab('menu')
  }

  function addToCart(item) {
    setCart((prev) => [...prev, item])
  }

  return (
    <div className="app">
      <TopBar />

      <main>
        {activeTab === 'inicio' && <Inicio onOpenProduct={setOpenProductId} onGoToCategory={goToCategory} />}
        {activeTab === 'menu' && (
          <MenuScreen activeCategory={activeCategory} onChangeCategory={setActiveCategory} onOpenProduct={setOpenProductId} />
        )}
        {activeTab === 'carrito' && <CarritoScreen cart={cart} />}
      </main>

      <TabBar activeTab={activeTab} onChangeTab={changeTab} cartCount={cart.length} />

      {openProductId && (
        <ProductSheet productId={openProductId} onClose={() => setOpenProductId(null)} onAdd={addToCart} />
      )}
    </div>
  )
}

export default App

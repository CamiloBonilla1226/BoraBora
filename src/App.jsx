import { useState } from 'react'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import ProductSheet from './components/ProductSheet'
import Inicio from './screens/Inicio'
import Menu from './screens/Menu'
import Carrito from './screens/Carrito'
import { useSwipeNavigation } from './utils/useSwipeNavigation'
import './App.css'

const TAB_ORDER = ['inicio', 'menu', 'carrito']

function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [activeCategory, setActiveCategory] = useState('granizados')
  const [openProductId, setOpenProductId] = useState(null)

  function changeTab(tab) {
    setActiveTab(tab)
    window.scrollTo(0, 0)
  }

  function goToCategory(category) {
    setActiveCategory(category)
    changeTab('menu')
  }

  function goToAdjacentTab(step) {
    const index = TAB_ORDER.indexOf(activeTab)
    const nextTab = TAB_ORDER[index + step]
    if (nextTab) changeTab(nextTab)
  }

  // Deslizar hacia los lados cambia de pantalla (Inicio ↔ Menú ↔ Carrito),
  // salvo mientras hay una ficha de producto abierta (ese gesto lo maneja
  // ProductSheet para cerrarla) o mientras se toca el carrusel de Inicio.
  const swipeHandlers = useSwipeNavigation({
    disabled: openProductId !== null,
    onSwipeLeft: () => goToAdjacentTab(1),
    onSwipeRight: () => goToAdjacentTab(-1),
  })

  return (
    <div className="app">
      <TopBar />

      <main {...swipeHandlers}>
        {activeTab === 'inicio' && <Inicio onOpenProduct={setOpenProductId} onGoToCategory={goToCategory} />}
        {activeTab === 'menu' && (
          <Menu activeCategory={activeCategory} onChangeCategory={setActiveCategory} onOpenProduct={setOpenProductId} />
        )}
        {activeTab === 'carrito' && <Carrito />}
      </main>

      <TabBar activeTab={activeTab} onChangeTab={changeTab} />

      {openProductId && <ProductSheet productId={openProductId} onClose={() => setOpenProductId(null)} />}
    </div>
  )
}

export default App

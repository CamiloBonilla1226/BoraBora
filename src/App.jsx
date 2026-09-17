import { useState } from 'react'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import ProductSheet from './components/ProductSheet'
import Inicio from './screens/Inicio'
import Menu from './screens/Menu'
import Carrito from './screens/Carrito'
import { CATEGORIES } from './data/products'
import { useSwipeNavigation } from './utils/useSwipeNavigation'
import './App.css'

const TAB_ORDER = ['inicio', 'menu', 'carrito']
const CATEGORY_KEYS = CATEGORIES.map((c) => c.key)

function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [activeCategory, setActiveCategory] = useState('granizados')
  const [openProductId, setOpenProductId] = useState(null)
  // Sentido de la última transición, para animar la pantalla que entra
  // desde el lado correcto. Empieza en null para que la primera pantalla no
  // aparezca con animación.
  const [direction, setDirection] = useState(null)

  function changeTab(tab) {
    if (tab === activeTab) return
    setDirection(TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(activeTab) ? 'forward' : 'backward')
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

  function goToAdjacentCategory(step) {
    const index = CATEGORY_KEYS.indexOf(activeCategory)
    const nextCategory = CATEGORY_KEYS[index + step]
    if (nextCategory) {
      setActiveCategory(nextCategory)
      return
    }
    // Ya no hay más categorías de ese lado: seguir deslizando saca de Menú
    // (de Licor hacia la derecha entra a Carrito, de Granizados hacia la
    // izquierda entra a Inicio).
    goToAdjacentTab(step)
  }

  // Deslizar sobre el contenido: en Inicio y Carrito cambia de pantalla,
  // pero en Menú primero recorre las categorías (Granizados → Micheladas →
  // Peceras → Licor) y solo cambia de pantalla al pasarse del primer o
  // último filtro. Se desactiva mientras hay una ficha de producto abierta
  // (ese gesto lo maneja ProductSheet) o al tocar el carrusel de Inicio.
  const contentSwipeHandlers = useSwipeNavigation({
    disabled: openProductId !== null,
    onSwipeLeft: () => (activeTab === 'menu' ? goToAdjacentCategory(1) : goToAdjacentTab(1)),
    onSwipeRight: () => (activeTab === 'menu' ? goToAdjacentCategory(-1) : goToAdjacentTab(-1)),
  })

  // Deslizar sobre la barra de navegación de abajo siempre cambia de
  // pantalla directamente, sin pasar por las categorías del Menú.
  const navSwipeHandlers = useSwipeNavigation({
    disabled: openProductId !== null,
    onSwipeLeft: () => goToAdjacentTab(1),
    onSwipeRight: () => goToAdjacentTab(-1),
  })

  return (
    <div className="app">
      <TopBar />

      <main {...contentSwipeHandlers}>
        <div
          key={activeTab}
          className={direction ? `screen-transition screen-transition-${direction}` : undefined}
        >
          {activeTab === 'inicio' && <Inicio onOpenProduct={setOpenProductId} onGoToCategory={goToCategory} />}
          {activeTab === 'menu' && (
            <Menu activeCategory={activeCategory} onChangeCategory={setActiveCategory} onOpenProduct={setOpenProductId} />
          )}
          {activeTab === 'carrito' && <Carrito />}
        </div>
      </main>

      <TabBar activeTab={activeTab} onChangeTab={changeTab} swipeHandlers={navSwipeHandlers} />

      {openProductId && <ProductSheet productId={openProductId} onClose={() => setOpenProductId(null)} />}
    </div>
  )
}

export default App

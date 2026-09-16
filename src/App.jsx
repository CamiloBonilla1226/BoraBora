import { useState } from 'react'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import ProductSheet from './components/ProductSheet'
import Inicio from './screens/Inicio'
import Menu from './screens/Menu'
import Carrito from './screens/Carrito'
import './App.css'

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

  return (
    <div className="app">
      <TopBar />

      <main>
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

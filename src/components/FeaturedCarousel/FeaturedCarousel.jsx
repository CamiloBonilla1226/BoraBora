import { useEffect, useRef, useState } from 'react'
import RailCard from '../RailCard'
import './FeaturedCarousel.css'

// Ancho de RailCard (126px) + separación entre tarjetas (10px), para poder
// calcular a qué tarjeta corresponde cada posición de scroll.
const CARD_STEP = 136

export default function FeaturedCarousel({ products, onOpen }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = null
    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        // El navegador no deja hacer scroll más allá del ancho real del
        // carril, que casi nunca cae justo en un múltiplo de CARD_STEP —
        // por eso al llegar al final se compara contra el scroll máximo en
        // vez de seguir dividiendo por CARD_STEP, para que el último punto
        // siempre quede encendido cuando se ve la última tarjeta.
        const maxScrollLeft = track.scrollWidth - track.clientWidth
        const lastIndex = products.length - 1
        if (maxScrollLeft <= 0 || track.scrollLeft >= maxScrollLeft - 1) {
          setActiveIndex(lastIndex)
          return
        }
        setActiveIndex(Math.round(track.scrollLeft / CARD_STEP))
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [products.length])

  function goTo(index) {
    const track = trackRef.current
    if (!track) return
    const maxScrollLeft = track.scrollWidth - track.clientWidth
    track.scrollTo({ left: Math.min(index * CARD_STEP, maxScrollLeft), behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef} data-no-swipe>
        {products.map((product) => (
          <RailCard key={product.id} product={product} onOpen={onOpen} />
        ))}
      </div>
      <div className="carousel-dots">
        {products.map((product, i) => (
          <button
            key={product.id}
            type="button"
            className={'carousel-dot' + (i === activeIndex ? ' active' : '')}
            aria-label={`Ir a ${product.name}`}
            aria-current={i === activeIndex}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

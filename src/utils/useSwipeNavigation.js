import { useRef } from 'react'

const SWIPE_THRESHOLD = 50 // px mínimos horizontales para contar como swipe
const DIRECTION_RATIO = 1.5 // qué tan horizontal debe ser el gesto frente a lo vertical

/**
 * Detecta gestos de swipe horizontal sobre el elemento donde se apliquen los
 * handlers devueltos, para navegar entre pantallas con el dedo. No hace nada
 * mientras `disabled` sea true, ni si el gesto arranca dentro de un elemento
 * marcado con `data-no-swipe` (por ejemplo el carrusel de Inicio, que ya usa
 * el touch para su propio scroll horizontal y no debe disparar un cambio de
 * pantalla).
 */
export function useSwipeNavigation({ onSwipeLeft, onSwipeRight, disabled = false }) {
  const start = useRef(null)

  function onTouchStart(e) {
    if (disabled || e.target.closest('[data-no-swipe]')) {
      start.current = null
      return
    }
    const touch = e.touches[0]
    start.current = { x: touch.clientX, y: touch.clientY }
  }

  function onTouchEnd(e) {
    if (!start.current) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - start.current.x
    const dy = touch.clientY - start.current.y
    start.current = null

    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (Math.abs(dx) < Math.abs(dy) * DIRECTION_RATIO) return // gesto más vertical que horizontal (scroll normal)

    if (dx < 0) onSwipeLeft?.()
    else onSwipeRight?.()
  }

  function onTouchCancel() {
    start.current = null
  }

  return { onTouchStart, onTouchEnd, onTouchCancel }
}

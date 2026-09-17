import { useEffect, useMemo, useRef, useState } from 'react'
import CupArt from '../CupArt'
import { PRODUCTS, fmt } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useDisponibilidad } from '../../context/DisponibilidadContext'
import { useNow } from '../../utils/useNow'
import { isPromoDay } from '../../utils/schedule'
import { priceCartItems, PROMO_LABEL_HALF, PROMO_LABEL_FREE } from '../../utils/promo'
import { resolveProductAvailability } from '../../utils/availability'
import './ProductSheet.css'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const DRAG_LOCK_DISTANCE = 10 // px que hay que moverse para decidir si el gesto es un arrastre
const DRAG_CLOSE_DISTANCE = 110 // px de arrastre para considerar que se quiere cerrar
const DRAG_ANIMATION_MS = 220

export default function ProductSheet({ productId, onClose }) {
  const { items, addItem } = useCart()
  const { isAvailable } = useDisponibilidad()
  const product = resolveProductAvailability(PRODUCTS[productId], isAvailable)

  // Adiciones que la hoja de disponibilidad (o, si no responde, el `av` de
  // products.js como respaldo) marca como activas — las demás ni siquiera
  // se muestran como opción.
  const visibleAdds = useMemo(
    () => product.adds.filter((a) => isAvailable(a.id, a.av)),
    [product.adds, isAvailable],
  )

  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? (product.sizes.find((s) => s.sel) ?? product.sizes[0]).l : null,
  )
  const [selectedAdds, setSelectedAdds] = useState(new Set(visibleAdds.filter((a) => a.sel).map((a) => a.l)))
  const [added, setAdded] = useState(false)

  const now = useNow()
  const promoActiveToday = product.category === 'granizados' && isPromoDay(now)

  // Para cada tamaño, simula agregarlo al carrito tal como está ahora y ve
  // qué le tocaría (precio completo, mitad de precio o gratis), para poder
  // mostrarle al cliente cuál tamaño le conviene elegir.
  const sizePromoPreview = useMemo(() => {
    if (!promoActiveToday || !product.sizes) return {}
    const preview = {}
    for (const s of product.sizes) {
      const candidate = { productId: product.id, size: s.l, adds: [], total: s.p }
      const result = priceCartItems([...items, candidate], now)
      preview[s.l] = result[result.length - 1].promoLabel
    }
    return preview
  }, [promoActiveToday, product.sizes, product.id, items, now])

  const sheetRef = useRef(null)
  const heroRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !sheetRef.current) return

      const focusable = [...sheetRef.current.querySelectorAll(FOCUSABLE_SELECTOR)]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!sheetRef.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  // Arrastrar para cerrar: deslizar de izquierda a derecha en cualquier
  // parte de la ficha (como "salir" del producto), o bajar desde la imagen
  // de arriba (como cualquier bottom-sheet). La ficha sigue el dedo en vivo
  // y, al soltar, o se termina de esconder (y ahí se cierra de verdad) o
  // vuelve a su lugar si no se arrastró lo suficiente.
  useEffect(() => {
    const sheet = sheetRef.current
    const hero = heroRef.current
    if (!sheet) return

    let axis = null // 'x' | 'y' | 'none' | null (sin decidir aún)
    let dragging = false
    let startX = 0
    let startY = 0

    function endDrag(shouldClose) {
      sheet.style.transition = `transform ${DRAG_ANIMATION_MS}ms ease, opacity ${DRAG_ANIMATION_MS}ms ease`
      if (shouldClose) {
        sheet.style.transform =
          axis === 'x' ? 'translateX(calc(-50% + 100vw))' : 'translate(-50%, 100%)'
        sheet.style.opacity = '0'
        window.setTimeout(onClose, DRAG_ANIMATION_MS)
      } else {
        sheet.style.transform = ''
        sheet.style.opacity = ''
      }
      axis = null
      dragging = false
    }

    function onTouchStart(e) {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      axis = null
      dragging = false
    }

    function onTouchMove(e) {
      const touch = e.touches[0]
      const dx = touch.clientX - startX
      const dy = touch.clientY - startY

      if (!axis) {
        if (Math.abs(dx) < DRAG_LOCK_DISTANCE && Math.abs(dy) < DRAG_LOCK_DISTANCE) return
        const startedOnHero = hero?.contains(e.target)
        if (startedOnHero && dy > DRAG_LOCK_DISTANCE && dy > Math.abs(dx)) {
          axis = 'y'
        } else if (dx > DRAG_LOCK_DISTANCE && dx > Math.abs(dy)) {
          axis = 'x'
        } else {
          axis = 'none'
        }
        if (axis !== 'none') {
          dragging = true
          sheet.style.transition = 'none'
        }
      }

      if (!dragging) return
      e.preventDefault()

      if (axis === 'x') {
        const offset = Math.max(0, dx)
        sheet.style.transform = `translateX(calc(-50% + ${offset}px))`
        sheet.style.opacity = String(Math.max(0.3, 1 - offset / 300))
      } else if (axis === 'y') {
        const offset = Math.max(0, dy)
        sheet.style.transform = `translate(-50%, ${offset}px)`
        sheet.style.opacity = String(Math.max(0.3, 1 - offset / 300))
      }
    }

    function onTouchEnd(e) {
      if (!dragging) {
        axis = null
        return
      }
      const touch = e.changedTouches[0]
      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      const shouldClose = (axis === 'x' && dx > DRAG_CLOSE_DISTANCE) || (axis === 'y' && dy > DRAG_CLOSE_DISTANCE)
      endDrag(shouldClose)
    }

    function onTouchCancel() {
      if (dragging) endDrag(false)
      axis = null
    }

    sheet.addEventListener('touchstart', onTouchStart, { passive: true })
    sheet.addEventListener('touchmove', onTouchMove, { passive: false })
    sheet.addEventListener('touchend', onTouchEnd, { passive: true })
    sheet.addEventListener('touchcancel', onTouchCancel, { passive: true })
    return () => {
      sheet.removeEventListener('touchstart', onTouchStart)
      sheet.removeEventListener('touchmove', onTouchMove)
      sheet.removeEventListener('touchend', onTouchEnd)
      sheet.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [onClose])

  const total =
    (product.sizes ? product.sizes.find((s) => s.l === selectedSize).p : product.base) +
    visibleAdds.filter((a) => selectedAdds.has(a.l)).reduce((sum, a) => sum + a.p, 0)

  // Qué le tocaría a ESTE granizado (con el tamaño y las adiciones ya
  // elegidas) si se agrega al carrito ahora mismo.
  const currentPromo = useMemo(() => {
    if (!promoActiveToday) return null
    const candidate = { productId: product.id, size: selectedSize, adds: [], total }
    const result = priceCartItems([...items, candidate], now)
    return result[result.length - 1].promoLabel
  }, [promoActiveToday, product.id, selectedSize, total, items, now])

  const previewTotal =
    currentPromo === PROMO_LABEL_FREE ? 0 : currentPromo === PROMO_LABEL_HALF ? Math.round(total * 0.5) : total

  function toggleAdd(label) {
    setSelectedAdds((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  function handleAdd() {
    if (!product.available) return
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize,
      adds: visibleAdds.filter((a) => selectedAdds.has(a.l)).map((a) => a.l),
      total,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="sheet" ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="sheetName">
        <div className="sheet-scroll">
          <div className="sheet-hero" ref={heroRef}>
            <button ref={closeBtnRef} className="sheet-close" onClick={onClose} aria-label="Cerrar">
              ✕
            </button>
            <div className="cupwrap">
              <CupArt variant={product.art} />
            </div>
          </div>
          <div className="sheet-top">
            <h3 id="sheetName">{product.name}</h3>
            <span className={'status' + (product.available ? ' ok' : '')}>{product.availLabel}</span>
          </div>
          <div className="sheet-body">
            <div className="field-label">Qué trae</div>
            <p className="sheet-desc">{product.desc}</p>
            {promoActiveToday && (
              <p className="sheet-promo-note">
                🎉 Hoy en granizados: comprando 1 recibes 50% off en un pequeño, y comprando 2 el pequeño es gratis.
              </p>
            )}

            {product.sizes && (
              <div className="group">
                <div className="group-label">
                  <span>Tamaño</span>
                  <span className="group-hint">elige 1</span>
                </div>
                <div className="opt-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s.l}
                      type="button"
                      className="opt"
                      aria-pressed={selectedSize === s.l}
                      onClick={() => setSelectedSize(s.l)}
                    >
                      {s.l} · {fmt(s.p)}
                      {sizePromoPreview[s.l] === PROMO_LABEL_HALF && ' · 50%'}
                      {sizePromoPreview[s.l] === PROMO_LABEL_FREE && ' · gratis'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="group">
              <div className="group-label">
                <span>Adiciones</span>
                <span className="group-hint">cada una suma al total</span>
              </div>
              <div className="opt-row">
                {visibleAdds.map((a) => (
                  <button
                    key={a.l}
                    type="button"
                    className="opt"
                    aria-pressed={selectedAdds.has(a.l)}
                    onClick={() => toggleAdd(a.l)}
                  >
                    {a.l} · +{fmt(a.p)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {currentPromo && (
          <p className="sheet-promo-current">
            {currentPromo === PROMO_LABEL_FREE
              ? '🎉 Con esta selección, este granizado sale gratis.'
              : '🎉 Con esta selección, este granizado sale a mitad de precio.'}
          </p>
        )}
        <div className="sheet-footer">
          <div className="amt">
            <span>Total</span>
            {currentPromo && <s className="amt-was">{fmt(total)}</s>}
            <b>{fmt(previewTotal)}</b>
          </div>
          <button className="add-btn" onClick={handleAdd} disabled={!product.available || added}>
            {!product.available ? product.availLabel : added ? '¡Agregado!' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

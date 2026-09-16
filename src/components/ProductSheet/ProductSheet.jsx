import { useEffect, useRef, useState } from 'react'
import CupArt from '../CupArt'
import { PRODUCTS, fmt } from '../../data/products'
import { useCart } from '../../context/CartContext'
import './ProductSheet.css'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ProductSheet({ productId, onClose }) {
  const { addItem } = useCart()
  const product = PRODUCTS[productId]
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? (product.sizes.find((s) => s.sel) ?? product.sizes[0]).l : null,
  )
  const [selectedAdds, setSelectedAdds] = useState(new Set(product.adds.filter((a) => a.sel).map((a) => a.l)))
  const [added, setAdded] = useState(false)

  const sheetRef = useRef(null)
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

  const total =
    (product.sizes ? product.sizes.find((s) => s.l === selectedSize).p : product.base) +
    product.adds.filter((a) => selectedAdds.has(a.l)).reduce((sum, a) => sum + a.p, 0)

  function toggleAdd(label) {
    setSelectedAdds((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize,
      adds: product.adds.filter((a) => selectedAdds.has(a.l)).map((a) => a.l),
      total,
    })
    setAdded(true)
    setTimeout(() => onClose(), 550)
  }

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>
      <div className="sheet" ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="sheetName">
        <div className="sheet-scroll">
          <div className="sheet-hero">
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
                {product.adds.map((a) => (
                  <button
                    key={a.l}
                    type="button"
                    className="opt"
                    aria-pressed={selectedAdds.has(a.l)}
                    disabled={!a.av}
                    onClick={() => toggleAdd(a.l)}
                  >
                    {a.l} · +{fmt(a.p)}
                    {!a.av ? ' · agotado' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="sheet-footer">
          <div className="amt">
            <span>Total</span>
            <b>{fmt(total)}</b>
          </div>
          <button className="add-btn" onClick={handleAdd}>
            {added ? '¡Agregado!' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchDisponibilidad } from '../lib/disponibilidad'

const DisponibilidadContext = createContext(null)

const REFRESH_INTERVAL_MS = 3 * 60 * 1000 // 3 minutos

export function DisponibilidadProvider({ children }) {
  // Mapa { id: true/false } tal como llega de la hoja. Empieza en null (aún
  // no se sabe nada) y solo se reemplaza cuando una consulta SÍ responde
  // bien — si una consulta falla, se conserva el último resultado bueno en
  // vez de perderlo.
  const [remote, setRemote] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function refresh() {
      const data = await fetchDisponibilidad()
      if (!cancelled && data) setRemote(data)
    }

    refresh()
    const intervalId = setInterval(refresh, REFRESH_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [])

  const value = useMemo(() => {
    // `fallback` es el valor que ya trae products.js (el `available` de un
    // producto, o el `av` de una adición): se usa si todavía no hay
    // respuesta de la hoja, si la hoja no conoce ese id, o si nunca se pudo
    // conectar con la API — así la carta nunca se queda sin mostrar nada
    // por un fallo de red.
    function isAvailable(id, fallback) {
      if (remote && Object.prototype.hasOwnProperty.call(remote, id)) {
        return remote[id]
      }
      return fallback
    }
    return { isAvailable }
  }, [remote])

  return <DisponibilidadContext.Provider value={value}>{children}</DisponibilidadContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located con su provider a propósito
export function useDisponibilidad() {
  const ctx = useContext(DisponibilidadContext)
  if (!ctx) throw new Error('useDisponibilidad debe usarse dentro de <DisponibilidadProvider>')
  return ctx
}

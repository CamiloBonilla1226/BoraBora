import { useEffect, useState } from 'react'

/**
 * Devuelve la hora actual y la refresca cada minuto, para que el letrero de
 * "Abierto/Cerrado" y la promo del día se mantengan correctos si alguien deja
 * la página abierta mientras cruza esas horas.
 */
export function useNow(intervalMs = 60000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}

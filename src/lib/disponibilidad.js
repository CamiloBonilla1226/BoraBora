const API_URL = import.meta.env.VITE_DISPONIBILIDAD_API_URL

/**
 * Consulta la API de disponibilidad (hoja de Google Sheets publicada como
 * Google Apps Script, de solo lectura) y devuelve el mapa { id: true/false }
 * con el estado de cada producto y cada adición.
 *
 * Nunca lanza: si falta la URL, la petición falla, hay error de red, o la
 * respuesta no es un objeto JSON válido, devuelve null. La carta nunca debe
 * romperse ni quedar en blanco por un fallo de esta API — quien la use debe
 * respaldarse en los datos locales de products.js cuando esto pasa.
 */
export async function fetchDisponibilidad() {
  if (!API_URL) return null

  try {
    const res = await fetch(API_URL)
    if (!res.ok) return null

    const data = await res.json()
    if (!data || typeof data !== 'object' || Array.isArray(data)) return null

    return data
  } catch {
    return null
  }
}

// Reglas de negocio del horario y la promo de BoraBora.
// Si el horario real cambia, este es el único lugar que hay que tocar.

/** Días de promo (50% o gratis en un granizado pequeño): martes y miércoles. */
const PROMO_DAYS = [2, 3] // 0=domingo, 1=lunes, 2=martes, 3=miércoles...

/** Jueves, viernes, sábado y domingo abren hasta la 1am (horario extendido). */
const LATE_NIGHT_DAYS = [4, 5, 6, 0]

const OPEN_HOUR = 17 // 5pm, igual todos los días

/** Texto del horario para mostrar en la app (sección "Nosotros"). */
export const SCHEDULE_TEXT = [
  { days: 'Jueves a domingo', hours: '5:00 pm – 1:00 am' },
  { days: 'Lunes a miércoles', hours: '5:00 pm – 11:00 pm' },
]

/** true si `date` cae en martes o miércoles (día de promo). */
export function isPromoDay(date = new Date()) {
  return PROMO_DAYS.includes(date.getDay())
}

/**
 * true si a la hora de `date` el local está abierto, según:
 * - jueves, viernes, sábado y domingo: 5pm a 1am (del día siguiente)
 * - lunes, martes y miércoles: 5pm a 11pm
 */
export function isOpenNow(date = new Date()) {
  const day = date.getDay()
  const hour = date.getHours()
  const dayBefore = (day + 6) % 7

  // Ya empezó el turno de hoy (5pm en adelante).
  if (hour >= OPEN_HOUR) {
    return LATE_NIGHT_DAYS.includes(day) || hour < 23
  }
  // Sigue el turno de anoche, que se extiende hasta la 1am.
  if (hour < 1 && LATE_NIGHT_DAYS.includes(dayBefore)) {
    return true
  }
  return false
}

/**
 * Combina el `available`/`availLabel` estático de un producto (products.js)
 * con el valor real que resuelve la hoja de disponibilidad, para que las
 * tarjetas y la ficha de producto muestren siempre el estado vigente en vez
 * del que quedó escrito en el código.
 *
 * Solo reemplaza el texto (`availLabel`) cuando el valor resuelto es
 * distinto al estático — así se conservan etiquetas propias como
 * "Disponible · sirve 4" en el caso normal, y solo se usa un texto genérico
 * cuando la hoja contradice lo que dice products.js.
 */
export function resolveProductAvailability(product, isAvailable) {
  const available = isAvailable(product.id, product.available)
  if (available === product.available) return product
  return { ...product, available, availLabel: available ? 'Disponible' : 'Agotado' }
}

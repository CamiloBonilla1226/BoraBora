// Quita tildes/acentos y pasa a minusculas, para poder comparar texto sin
// que importe como lo haya escrito el cliente (con o sin acentos, mayusculas, etc).
// normalize('NFD') separa cada letra acentuada en la letra base + una marca
// de acento aparte (rango Unicode 0x0300-0x036f), así que basta con quitar
// esas marcas para quedarnos solo con las letras base.
function normalize(text) {
  let result = ''
  for (const ch of text.normalize('NFD')) {
    const code = ch.codePointAt(0)
    if (code >= 0x0300 && code <= 0x036f) continue
    result += ch
  }
  return result.toLowerCase()
}

/**
 * true si `product` coincide con lo que el cliente escribio en el buscador.
 * Busca como substring (no hace falta escribir el nombre completo) dentro
 * del nombre y de la descripcion corta, ignorando mayusculas y acentos.
 */
export function matchesQuery(product, query) {
  const q = normalize(query.trim())
  if (!q) return true
  return normalize(product.name).includes(q) || normalize(product.contains).includes(q)
}

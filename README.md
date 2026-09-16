# BoraBora — Carta digital

Aplicación React + Vite que replica la carta digital de BoraBora (granizados, micheladas, peceras y licor): navegación por Inicio / Menú / Carrito, ficha de producto con tamaño y adiciones, y carrito de compra manejado con Context + reducer.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción a dist/
npm run lint     # eslint
```

## ⚠️ Datos de ejemplo

Los precios, nombres, descripciones y disponibilidad de los productos en
[`src/data/products.js`](src/data/products.js) son **datos de ejemplo (mock)**,
escritos directamente en el código del frontend para efectos de este prototipo.

**Antes de usar esta app con clientes reales**, esos datos deben dejar de vivir en el
frontend y venir de un backend propio que exponga una API, con:

- Persistencia real (base de datos), no un objeto JS embebido en el bundle.
- Un panel de administrador para editar precios y disponibilidad, protegido con su
  propia autenticación (login, sesiones/tokens, control de acceso) — nunca expuesto
  sin login, ya que cualquier persona con el enlace del panel podría editar la carta.
- Ese backend es también donde deben vivir las claves/API keys reales (ver sección
  de variables de entorno abajo): nunca en el código del frontend, que es público
  porque se descarga entero al navegador del usuario.

## Seguridad

- **Sin `dangerouslySetInnerHTML`**: todos los íconos y gráficos (vasos, categorías,
  tabs) son componentes React (`src/components/Icons.jsx`, `src/components/CupArt.jsx`),
  no strings de HTML armados a mano. Si se agrega contenido dinámico en el futuro,
  debe seguir renderizándose vía JSX normal (`{variable}`), que React escapa
  automáticamente, y no vía `dangerouslySetInnerHTML` ni manipulación directa de
  `innerHTML`.
- **Sin claves ni secretos en el código.** Si en el futuro se necesita una API key:
  - Nunca se escribe directamente en el código fuente.
  - Variables que deban llegar al navegador van en un archivo `.env.local`
    (ignorado por git, ver `.gitignore`) con prefijo `VITE_...`, y aun así nunca
    deben ser secretos reales — cualquier `VITE_*` queda visible en el bundle
    final que descarga el navegador.
  - Cualquier secreto real (API key de pagos, del panel de administrador, etc.)
    vive del lado del servidor/backend, nunca en este proyecto de frontend.
  - Ver [`.env.example`](.env.example) como plantilla del patrón a seguir.
- **Cabeceras de seguridad** (`vercel.json`): `Content-Security-Policy`,
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`
  y `Permissions-Policy`. Si el despliegue no es en Vercel, hay que configurar el
  equivalente en la plataforma que se use (Netlify `_headers`, Nginx, etc.) — estas
  cabeceras no se aplican solas fuera de Vercel.
- **HTTPS en producción**: Vercel sirve todo por HTTPS y redirige HTTP→HTTPS
  automáticamente. La cabecera `Strict-Transport-Security` (HSTS) en `vercel.json`
  refuerza esto indicándole al navegador que nunca intente HTTP en este dominio.
- **`npm audit`**: se corrió antes de cada entrega funcional; 0 vulnerabilidades
  reportadas a la fecha. Antes de desplegar a producción, correr `npm audit` de
  nuevo y resolver cualquier hallazgo `high`/`critical`.
- **Inputs de usuario**: la app actualmente no tiene formularios ni campos de texto
  (no hay buscador ni inputs). Si se agrega alguno (por ejemplo un buscador de
  productos), debe: validarse (longitud, tipo esperado) y renderizarse siempre vía
  JSX normal (nunca `dangerouslySetInnerHTML`), que escapa el contenido
  automáticamente y evita inyección de HTML/script. Si el valor se usa para filtrar
  o armar una consulta a un backend, esa validación/sanitización debe repetirse
  también del lado del servidor — nunca confiar solo en la validación del cliente.

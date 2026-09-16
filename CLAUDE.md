# CLAUDE.md — Proyecto BoraBora (carta digital en React)

Este archivo son instrucciones permanentes para Claude Code en este proyecto.
Aplican a TODA tarea futura, no solo a la implementación inicial de la carta.
Antes de escribir o modificar código, relee este archivo si ha pasado tiempo
desde la última tarea.

## 1. Mantener el mismo estilo (diseño y código)

### 1.1 Diseño visual — no te apartes de esto sin que te lo pidan
- Paleta fija, definida como variables CSS en `src/styles/tokens.css`. Nunca
  hardcodees un color distinto directo en un componente; usa las variables:
  - `--bg:#0a0a10` fondo general
  - `--elev-1:#131319`, `--elev-2:#191922` superficies elevadas (tarjetas, modal)
  - `--border:rgba(255,255,255,.08)`, `--border-strong:rgba(255,255,255,.15)`
  - `--text:#f2f1f7`, `--text-dim:#9493a7`, `--text-faint:#57566a`
  - `--mint:#29ffb0`, `--mint-soft:rgba(41,255,176,.10)`, `--mint-ink:#04140d`
  - `--pink:#ff2f7e`, `--pink-soft:rgba(255,47,126,.12)`
- Tipografías: Unbounded (700/800) para títulos y acentos, Manrope (400-800)
  para el resto del texto. No agregues una tercera familia sin pedir permiso.
- Fondo negro predominante con acentos neón (verde menta y rosa) usados con
  moderación — para estados, badges, precios y llamados a la acción, no para
  fondos grandes.
- Bordes y esquinas: mantén el lenguaje visual ya usado en las pantallas
  existentes (radios, sombras, densidad de espaciado). Si vas a crear un
  componente nuevo, primero mira cómo se ven los componentes vecinos y
  replica esa consistencia en vez de inventar un estilo distinto.
- Mobile-first siempre: diseña y prueba primero en ancho de celular (~400px)
  antes de preocuparte por pantallas grandes. Nunca debe aparecer scroll
  horizontal.

### 1.2 Estilo de código
- El proyecto es JavaScript puro — no actives TypeScript ni agregues
  archivos `.ts`/`.tsx`. Componentes en `.jsx`, datos y utilidades en `.js`.
- Para seguridad de tipos sin TypeScript: usa comentarios JSDoc (`@typedef`)
  describiendo formas de datos importantes (por ejemplo un producto), y
  valida props complejas con PropTypes.
- Sigue la estructura de carpetas ya establecida dentro de `src/`:
  `components/`, `screens/`, `data/`, `context/`, `styles/`, `utils/`. No
  reorganices esta estructura ni la dupliques con otra convención distinta.
- Componentes de función con hooks de React (`useState`, `useReducer`,
  `useContext`, etc.), nunca componentes de clase.
- Estado global compartido (como el carrito) va en Context + reducer, nunca
  en variables globales sueltas ni pasando props por muchos niveles.
- Los íconos van como componentes SVG de React o archivos `.svg`
  importados — nunca como strings de HTML armados a mano.
- Antes de crear un componente nuevo, revisa si ya existe algo parecido que
  puedas reutilizar o extender en vez de duplicar lógica.

## 2. Seguridad de la web (no negociable)

- Nunca uses `dangerouslySetInnerHTML`.
- Ninguna clave, contraseña, token o secreto va escrito directamente en el
  código. Cualquier credencial futura va en variables de entorno (`.env`),
  nunca se sube a git (confirma que `.gitignore` incluya `.env`, `node_modules`
  y las carpetas de build).
- Antes de instalar una librería nueva, evalúa si es realmente necesaria;
  cada dependencia nueva es superficie de ataque adicional.
- Corre `npm audit` (o el equivalente del gestor de paquetes) periódicamente
  y corrige vulnerabilidades "high" o "critical" antes de seguir avanzando.
- Al desplegar, deben quedar activas las cabeceras de seguridad básicas:
  `Content-Security-Policy`, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.
- Todo input de usuario (buscadores, formularios, campos de texto que se
  agreguen en el futuro) debe validarse y limpiarse antes de usarse, para
  evitar inyección de código.
- El sitio debe servirse solo por HTTPS en producción.
- Los datos de productos/precios actuales son de ejemplo (mock, locales).
  Cuando se conecte un backend real, cualquier operación que escriba datos
  (pedidos, panel de administrador) debe tener su propia autenticación —
  nunca queda abierta sin validar quién hace la petición.
- No expongas en el cliente ninguna lógica o dato que debería vivir solo en
  el backend (por ejemplo, reglas de negocio sensibles o llaves de servicios
  externos).

## 3. Mejores prácticas

- ESLint debe estar configurado con la config recomendada de React y sin
  errores pendientes antes de dar una tarea por terminada.
- Accesibilidad: modales/bottom-sheets deben poder cerrarse con Escape,
  clic fuera (backdrop) y un botón visible; el foco de teclado debe quedar
  atrapado dentro del modal mientras está abierto. Usa etiquetas y roles
  ARIA donde corresponda (botones, inputs, elementos interactivos).
- Comentarios claros donde el código no sea autoexplicativo, especialmente
  en lógica de negocio (por ejemplo el cálculo de precios o promociones).
  Marca con un comentario explícito cualquier dato o lógica que sea
  temporal/de ejemplo y deba reemplazarse más adelante (por ejemplo:
  "Datos de ejemplo — reemplazar por una API/base de datos real").
- Evita duplicar lógica: si una regla de negocio (como el cálculo de un
  precio total o una condición de horario) se usa en más de un lugar,
  ponla en una sola función reutilizable en `utils/`, no la repitas.
- Haz commits pequeños y con mensajes claros describiendo qué cambió y por
  qué. No incluyas `node_modules` ni archivos `.env` en ningún commit.
- Antes de dar una tarea por terminada: pruébala en el navegador, en ancho
  de celular, y confirma que no rompiste ninguna pantalla que ya
  funcionaba.

## 4. Implementar de la manera más óptima

- Prioriza siempre simplicidad y legibilidad sobre soluciones ingeniosas
  pero difíciles de mantener. Este proyecto lo sigue construyendo alguien
  que no es programador de profesión — el código debe poder entenderse
  releyéndolo.
- No sobre-diseñes: implementa lo que la tarea pide, sin agregar
  funcionalidades, pantallas o abstracciones que no se pidieron todavía.
- Evita cálculos o renders innecesarios (por ejemplo, no recalcules el
  total del carrito en cada render si no cambió nada relevante; usa
  memoización solo cuando de verdad se note una mejora, no por costumbre).
- Prefiere las soluciones ya nativas de React/JavaScript moderno antes de
  agregar una librería nueva solo para resolver algo pequeño.
- Cuando haya más de una forma razonable de resolver algo, explica
  brevemente por qué elegiste esa antes de implementarla, si el impacto en
  la arquitectura del proyecto es grande.
- Si detectas que una instrucción pedida choca con alguna de las reglas de
  este archivo (estilo, seguridad, buenas prácticas), dilo antes de
  implementar y sugiere la alternativa correcta, en vez de aplicar la
  instrucción tal cual si eso introduce un riesgo o rompe la consistencia
  del proyecto.

## Contexto del proyecto

BoraBora es un negocio real de granizados, micheladas, peceras y licor. Esta
app es la carta digital para el cliente (sin pedidos por WhatsApp, solo
consulta y armado de carrito). Planeado a futuro: panel de administrador y
base de datos real compartiendo backend con esta app cliente (arquitectura
tipo dos apps en Vercel + una sola base de datos). No implementes esa parte
todavía a menos que se pida explícitamente.
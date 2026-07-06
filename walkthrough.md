# Walkthrough - Prototipo de Likuid

Hemos completado la estructuración base de la plataforma **Likuid**, la organización de los componentes de diseño, la configuración del soporte para TypeScript, la integración de navegación interactiva, la migración masiva de la tipografía local del proyecto y la implementación de la Landing Page principal con diseño oscuro, alineación asimétrica simétrica y micro-animaciones de scroll.

---

## Cambios Realizados

### Fase 1: Estructuración Next.js y Vistas Barebones
1. **Inicialización**: Creamos la aplicación Next.js en el directorio raíz usando JavaScript, App Router y sin Tailwind CSS.
2. **Navegación e Interfaces**:
   - `/` (Landing Page): Enlace a inicio de sesión.
   - `/login` (Login Page): Formulario con mock inputs, enlace a recuperación de contraseña y simulación de roles.
   - `/forgot-password`: Formulario básico para recuperar contraseña.
   - `/student`: Inicio del estudiante con solicitudes sugeridas, notificaciones y resumen de portafolio.
   - `/student/portfolio`: Proyectos mock, repositorios, barra de habilidades y contactos.
   - `/student/reviews`: Promedio general/específico y tabla detallada de reseñas.
   - `/student/requests`: Listado de solicitudes de trabajo activas.
   - `/student/jobs`: Buscador reactivo de trabajos con filtros por tags.
   - `/student/teams`: Estado de equipos de desarrollo y listado descriptivo.
   - `/client`: Panel de reclutador con listado de estudiantes y ofertas publicadas.

### Fase 2: Assets, Fuentes y Baneo de Emojis
1. **Directorio de Assets**: Creamos la estructura en `src/assets/` dividida en `components/`, `videos/`, `images/` y `fonts/`.
2. **Reglas del Proyecto**: Registramos en `AGENTS.md` el baneo total de emojis para la interfaz, dictando el uso exclusivo de vectores SVG.
3. **SVG Icons**: Creamos el componente funcional reutilizable `StarIcon` en `src/assets/components/Icons.js`.
4. **Remoción de Emojis**: Reemplazamos todos los caracteres unicode `★` y emojis `⭐` en `portfolio/page.js` y `reviews/page.js` por elementos `<StarIcon />` limpios.
5. **Script de Migración de Fuentes**: Desarrollamos `scripts/migrate-font.js` que toma una fuente `.ttf`, la comprime a `.woff2` usando `wawoff2` de WebAssembly y genera la definición `@font-face` en `src/assets/fonts/fonts.css`.

### Fase 3: Integración de StaggeredMenu y Soporte TypeScript
1. **Soporte TypeScript**: Generamos el archivo `tsconfig.json` e instalamos `typescript` y los paquetes de tipos `@types/react` y `@types/node` necesarios para habilitar la compilación e inspección del editor de archivos `.tsx` con JSX.
2. **Reorganización de design_elements**:
   - Creamos subcarpetas independientes para cada componente visual: `liquid-glass/` (con `GlassSurface`) y `StaggeredMenu/` (con `StaggeredMenu` y su wrapper).
3. **Configuración de Navegación**: Creamos el archivo de configuración `src/config/navigation.ts` que centraliza los datos de navegación, cargando iconos SVG nativos desde `lucide-react`.
4. **Integración en el Layout**: Importamos e integramos el componente `<StaggeredMenuIntegration />` en el layout del estudiante (`src/app/student/layout.js`).
5. **Corrección de prerenderizado**: Añadimos `"use client"` a `/forgot-password` para solucionar un error de compilación de producción.
6. **Ajustes de Estilos en StaggeredMenu**:
   - **Remoción del Logo**: Retiramos el parámetro `panelLogoUrl` en el Wrapper para remover la caja de imagen superior ("L") y dejar el espacio libre.
   - **Colores de Animación**: Cambiamos la paleta de capas de transición del menú de verde/teal a un azul claro moderno (`#38bdf8`), aplicando el mismo tono al color de acento (`accentColor`).

### Fase 4: Conversión Masiva y Inteligente de Fuentes (TTF a WOFF2)
1. **Soporte de Directorios e Inspección Recursiva**: Optimizamos `scripts/migrate-font.js` para detectar si el argumento proporcionado es un archivo `.ttf` o un directorio completo.
2. **Deducción de Metadatos de Nombre**: Implementamos lógica inteligente para extraer de manera automatizada la familia tipográfica, peso (`font-weight` de 100 a 900) y estilo (`font-style: italic` o `normal`).
3. **Conversión en Masa**: Corrimos el script procesando las 55 fuentes existentes, comprimiéndolas a WOFF2 y poblando un único archivo consolidado [fonts.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/fonts/fonts.css).
4. **Carga Global**: Importamos `fonts.css` de manera global en el archivo principal [globals.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/globals.css).

### Fase 5: Landing Page Premium de Likuid (Tema Oscuro, Tipografía Mixta y Alineación Asimétrica)
1. **Estilo Monocromático de Alto Contraste**: Modificamos [landing.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/landing.css) para usar una paleta puramente oscura en negros de pantalla OLED (`#000000`) y grises sutiles, con acentos y botones en blanco y plata.
2. **Alineación Asimétrica con Desplazamiento a la Izquierda**:
   - Modificamos el diseño para que todo el contenido (cabecera pill, hero, títulos, grids, y timeline) se alinee de manera consistente hacia el **extremo izquierdo** del viewport.
   - **Desplazamiento Mayor a la Izquierda**: Cambiamos el padding izquierdo de la columna de contenido `.landing-content-col` del `8%` al **`5%`**, otorgándole un respiro visual más amplio y reduciendo la compresión contra la zona blanca lateral.
3. **Títulos con Línea Blanca Sólida de Mayor Grosor**:
   - Reconfiguramos las líneas decorativas a la derecha de los títulos para que sean de color **blanco sólido** (`#ffffff`), eliminando los degradados.
   - Incrementamos su grosor a **`3px`** para dotarlas de mayor fuerza y continuidad visual, manteniendo el efecto de expansión horizontal.
4. **Cursive en Celeste Sky Blue y Corrección de Altura (Baseline Alignment)**:
   - Cambiamos la tipografía manuscrita fluida `Amsterdam Four` a un color **azul/celeste moderno** (`#38bdf8`) con su respectiva sombra de resplandor.
   - Para resolver la caída visual y la ruptura de continuidad de las letras manuscritas con respecto a la tipografía Roboto, aplicamos `transform: translateY(-0.16em);` a `.highlight-font` y `.highlight-font-title`. Esto desplaza verticalmente hacia arriba la tipografía manuscrita celeste, alineando de manera perfecta sus baselines visuales en todos los títulos.
5. **División del Hero, Ajuste de Wraps y Prevención de Traslapes**:
   - **Spans con white-space nowrap**: En [page.js](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/page.js), forzamos a que las dos líneas del Hero (`Vinculación Sociolaboral` y `Mentoría Universitaria`) utilicen `white-space: nowrap;` y redujimos el font-size de la cabecera a `2.35rem`. Esto previene de manera absoluta que las palabras se rompan en 4 líneas a causa de la columna lateral.
   - **Remoción de Mayúsculas Forzadas**: Eliminamos `text-transform: uppercase` del estilo de títulos seccionales.
6. **Integración y Refactorización del Componente PillNav**:
   - Rediseñamos el componente `PillNav` para actuar como un único header centrado horizontalmente (`left: 50%`, `transform: translateX(-50%)`).
   - El logo `logotipo_black_likuid.png` se integra directamente a la izquierda de la píldora principal sin círculo de fondo, y los botones de menú se ubican a la derecha.
   - **Remoción del Giro y Botón de Menú Móvil**: Eliminamos la animación de giro (`rotate 360`) al hacer hover sobre el logo, de modo que permanece estático. Removemos por completo el botón de menú tipo hamburguesa (`=`) y la estructura del popover móvil.
   - **Escalado del Logo**: Incrementamos la altura del logotipo dentro del menú de `35px` a `50px` para una perfecta legibilidad.
   - Los botones inician con estado transparente y texto negro, transicionando a fondo negro y texto blanco mediante la expansión del círculo de hover de GSAP.
   - Ajustamos la navegación del logo para apuntar directamente a `/`.
   - **Corrección de Keys Duplicadas**: Ajustamos la generación de la propiedad `key` en los mapas del menú móvil y escritorio para concatenar el índice del elemento (`${item.href}-${i}`), resolviendo la advertencia de React sobre elementos duplicados.
   - **Animación Secuencial de Entrada con Cargador (GSAP Loader Circle)**:
     - Diseñamos una transición de entrada donde al cargar la página se presenta en el centro superior un círculo blanco flotante que contiene el logo negro `logo_black.png` girando a 360 grados.
     - **Morfosis Unificada sin Costuras (Seamless Morphing)**: Refactorizamos el cargador ubicándolo dentro del propio contenedor del menú `.pill-nav`. Al iniciar la página, la píldora completa permanece colapsada como un círculo perfecto de `70px` de ancho con el cargador giratorio en el centro. Al finalizar el ciclo de rotación, la imagen del cargador se desvanece y la píldora blanca se expande simétricamente desde su misma masa horizontal, eliminando cualquier desfase de opacidad, solapamiento de sombras o saltos en la interfaz. Once expandido, se revelan el logo grande definitivo y los accesos del menú.
7. **Remoción de Pedestal y Reflector (Logo Puro)**:
   - Eliminamos completamente el pedestal de tarjeta biselada (`.pedestal`) y el cono reflector de luz superior (`.spotlight`).
   - Ubicamos el logo puro `logo.png` directamente flotando en su columna visual derecha, aumentamos su tamaño a **`220px`** y conservamos un **brillo blanco tenue** al rededor (`filter: drop-shadow`).
8. **Diseño de Fondo Dividido (Split Layout) y Máscara de Scroll**:
   - Dividimos el fondo de la pantalla de forma vertical: la columna izquierda (`.landing-content-col`) que contiene todo el contenido técnico mantiene su color negro, mientras que la columna derecha (`.landing-sidebar-col`) asume un fondo blanco sólido (`#ffffff`) que inicia a partir del límite del contenedor de contenido.
   - La cabecera superior se mantiene en fondo negro continuo a lo largo de todo el ancho del viewport (zona de la "Línea Azul" horizontal).
   - **Degradado Suave Permanente**: Implementamos una máscara de degradado continuo `.landing-header-bg-mask` de negro a transparente en el límite de la cabecera que se sitúa a una altura retraída de `95px` (alineada perfectamente al borde inferior de la píldora de navegación) y con una atenuación de transición más corta (`30px`), garantizando que la transición a blanco siempre sea suave y libre de cortes tanto al inicio como durante el desplazamiento.
   - **Fondo Dividido de Altura Completa (100% Height Split Background)**: Aplicamos el gradiente dividido (`linear-gradient`) de dos colores directamente al contenedor principal `.landing-main-layout` en lugar de pintar cada columna de manera individual. Esto soluciona los problemas de altura asincrónica causados por diferencias de longitud en el contenido scrollable, garantizando que la franja blanca lateral derecha se extienda de forma inmutable hasta el 100% de la altura real de la página sin dejar espacios vacíos en negro al final de la página.
   - **Remoción de Relleno del Contenedor Padre**: Eliminamos el `padding-top` y `padding-bottom` del elemento `.landing-page-body` en `landing.css`, removiendo la brecha de aire negra que impedía que el fondo dividido y la columna blanca tocaran de manera absoluta el borde inferior y superior de la pantalla.
9. **Integración del Componente Interactivo LiquidChrome**:
   - Instalamos la dependencia WebGL `ogl` e implementamos el componente dinámico interactivo `LiquidChrome` en `src/assets/components/design_elements/liquid-chrome/`.
   - Incorporamos el shader de distorsión WebGL reaccionando a la posición del mouse y gestos táctiles, cargando el tono celeste/azul claro (`[0.05, 0.45, 0.75]`) indicado por el usuario.
   - **Acoplamiento Fluido y Efecto Adhesivo (Sticky)**: Confinamos el shader de WebGL dentro de `.sidebar-chrome-wrapper` utilizando posicionamiento `position: sticky; top: 95px; height: calc(100vh - 95px);`. Esto asegura que el canvas WebGL no exceda el alto del viewport y flote de manera fija acompañando al usuario durante todo el recorrido de scroll de la Landing Page sobre el fondo blanco, ofreciendo un comportamiento suave, libre de gaps y con un rendimiento optimizado al renderizar a tamaño fijo de pantalla.
10. **Ajuste y Corrección del Título de Disponibilidad**:
    - Reestructuramos la cabecera de la sección de disponibilidad en `page.js` para corregir la separación silábica incorrecta de "Disponibilidad", transformándolo en una palabra completa en fuente normal, y añadiendo al costado el término "Multiplataforma" estilizado con la tipografía manuscrita fluida celeste.
11. **Optimización Extrema de Renderizado (Prevención de Lag)**:
    - **Aislamiento de Estado del Tipeado:** Creamos el componente de hoja `TypewriterText` para encapsular el estado de la escritura automatizada del Hero y del Manifiesto, evitando que cada pulsación de letra vuelva a renderizar todo el árbol padre de la Landing Page.
    - **Propiedades de Referencia Estable (baseColor e items):** Definimos el color float de WebGL `LIQUID_CHROME_COLOR` y el array de elementos de navegación `PILL_NAV_ITEMS` fuera del componente principal, previniendo la recreación de contextos WebGL de OGL y reloads del PillNav en las mutaciones de estado del Roadmap y acordeones.
12. **Interactividad en Botones CTA y Easter Egg del Logo en CSS Puro**:
    - **Buscar Talento:** Al hacer hover, el fondo cambia a celeste brillante (`#38bdf8`) y las letras se vuelven blancas.
    - **Explorar Oportunidades:** Al hacer hover, el fondo se vuelve blanco sólido y las letras negras.
    - **Easter Egg en CSS Puro y Escalado del Logo:**
      - Ubicamos ambos logos en una caja relativa de dimensiones fijas (220px por 220px).
      - Escalamos el logo oscuro `logo_black.png` a una magnitud de `scale(1.45)` de base para que coincida exactamente con la escala visual del logo claro `logo.png`.
      - **Doble Outline Fino:** Aplicamos filtros drop-shadow repetidos en CSS (`drop-shadow(1px 0px 0px #ffffff)`) en cuatro direcciones para dibujar un borde blanco fino de `1px` alrededor de la silueta transparente de ambos sellos, sin alterar sus respectivos resplandores suaves (`filter: drop-shadow(0 0 35px)`).
13. **Acordeones Horizontales Compactos**:
    - Ajustamos la separación de los paneles reduciendo el gap a `0.75rem` e incrementando el ancho colapsado a `110px`.
    - **Corrección de Desbordamiento de Texto:** Ocultamos totalmente los títulos `.panel-title` en las secciones colapsadas (`display: none;`) para evitar que las letras se deformen o envuelvan verticalmente a los lados de la numeración `XX` y el icono.
14. **Perspectiva 3D de Dispositivos de Alta Escala**:
   - Reemplazamos la ilustración vectorial por un simulador con perspectiva isométrica y efecto de profundidad donde un monitor de escritorio se sitúa al fondo a la izquierda (`rotateY(12deg)`) y un teléfono móvil de gran escala destaca al frente a la derecha (`rotateY(-15deg)`), recortado exactamente a sus 3/4 partes hacia abajo mediante una máscara de contenedor de desbordamiento oculto.
15. **Timeline Snakey con Progreso Dinámico**:
   - Creamos una línea temporal reactiva al scroll del usuario, donde una barra de progreso celeste se va deslizando por el eje del roadmap. Al golpear cada dot se ilumina el nodo y se rellena la tarjeta del sprint correspondiente con fondo celeste y texto negro.
16. **Footer Global Competitivo**:
   - Integramos un pie de página global para la aplicación con el logo `logotipo_likuid.png`, una descripción de la plataforma, un mapa de enlaces jerárquicos (Recursos y Legal) y un botón interactivo para el Libro de Reclamaciones con su respectivo vector.
17. **Escritura Inteligente y Cursor de Terminal**:
   - **Activación por Viewport (IntersectionObserver):** Optimizamos el componente `TypewriterText` para suspender el ciclo de tipeado hasta que el elemento respectivo entra en la zona visible del viewport, evitando ejecuciones invisibles y optimizando los ciclos del procesador.
   - **Cursor de Bloque Real:** Modificamos el cursor intermitente de la escritura para presentar un bloque rectangular blanco (`#ffffff`) estilizado de forma nativa que parpadea continuamente al ritmo de una terminal.
18. **Eliminación Total de Comentarios y Actualización de .gitignore**:
    - Realizamos una limpieza profunda de comentarios de desarrollo en [page.js](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/page.js), [landing.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/landing.css), [StaggeredMenuWrapper.tsx](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/StaggeredMenu/StaggeredMenuWrapper.tsx), [migrate-font.js](file:///c:/Users/lenovo/Desktop/Likuid_web/scripts/migrate-font.js) and [fonts.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/fonts/fonts.css) para entregar código limpio y apto para producción.
    - Agregamos directorios de configuración de IDEs (`.vscode/`, `.idea/`), patrones de variables locales (`*.local`, `.env.*.local`), el archivo de directivas del agente `AGENTS.md` y bitácoras de cambios (`walkthrough.md`, `routes.md`) a [.gitignore](file:///c:/Users/lenovo/Desktop/Likuid_web/.gitignore).

---

## Verificación

Se realizaron validaciones estáticas del código para asegurar la consistencia del DOM y CSS.

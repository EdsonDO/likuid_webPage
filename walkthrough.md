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
1. **Soporte de Directorios e Inspección Recursiva**: Desarrollamos `scripts/migrate-font.js` para detectar si el argumento proporcionado es un archivo `.ttf` o un directorio completo.
2. **Deducción de Metadatos de Nombre**: Implementamos lógica inteligente para extraer de manera automatizada la familia tipográfica, peso y estilo.
3. **Conversión en Masa**: Corrimos el script procesando las 55 fuentes existentes, comprimiéndolas a WOFF2 y poblando un único archivo consolidado [fonts.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/fonts/fonts.css).
4. **Carga Global**: Importamos `fonts.css` de manera global en el archivo principal [globals.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/globals.css).

### Fase 5: Landing Page Premium de Likuid (Tema Oscuro, Tipografía Mixta y Alineación Asimétrica)
1. **Estilo Monocromático de Alto Contraste**: Modificamos [landing.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/landing.css) para usar una paleta puramente oscura en negros de pantalla OLED (`#000000`) y grises sutiles, con acentos y botones en blanco y plata.
2. **Alineación Asimétrica con Desplazamiento a la Izquierda**:
   - Modificamos el diseño para que todo el contenido se alinee de manera consistente hacia el **extremo izquierdo** del viewport.
3. **Títulos con Línea Blanca Sólida de Mayor Grosor**:
   - Reconfiguramos las líneas decorativas a la derecha de los títulos para que sean de color **blanco sólido** (`#ffffff`) con grosor de **`3px`**.
4. **Cursive en Celeste Sky Blue y Corrección de Altura (Baseline Alignment)**:
   - Cambiamos la tipografía manuscrita fluida `Amsterdam Four` a un color **azul/celeste moderno** (`#38bdf8`) con su respectiva sombra de resplandor.
5. **División del Hero, Ajuste de Wraps y Prevención de Traslapes**:
   - **Spans con white-space nowrap**: Forzamos a que las dos líneas del Hero utilicen `white-space: nowrap;` y redujimos el font-size de la cabecera a `2.35rem`.
6. **Integración y Refactorización del Componente PillNav**:
   - El logo `logotipo_black_likuid.png` se integra directamente a la izquierda de la píldora principal sin círculo de fondo.
   - **Automorfosis Unificada sin Costuras (Seamless Morphing)**: Refactorizamos el cargador ubicándolo dentro del propio contenedor del menú `.pill-nav`. Al iniciar la página, la píldora completa permanece colapsada como un círculo perfecto con el cargador giratorio en el centro. Al finalizar el ciclo de rotación, la píldora blanca se expande simétricamente desde su misma masa horizontal.
7. **Remoción de Pedestal y Reflector (Logo Puro)**:
   - Ubicamos el logo puro `logo.png` directamente flotando en su columna visual derecha, aumentamos su tamaño a **`220px`** y conservamos un **brillo blanco tenue** al rededor (`filter: drop-shadow`).
8. **Diseño de Fondo Dividido (Split Layout) y Máscara de Scroll**:
   - Dividimos el fondo de la pantalla de forma vertical: la columna izquierda mantiene su color negro, mientras que la columna derecha asume un fondo blanco sólido (`#ffffff`).
9. **Integración del Componente Interactivo LiquidChrome**:
   - **Acoplamiento Fluido y Efecto Adhesivo (Sticky)**: Confinamos el shader de WebGL dentro de `.sidebar-chrome-wrapper` utilizando posicionamiento `position: sticky; top: 95px; height: calc(100vh - 95px);`.
10. **Ajuste y Corrección del Título de Disponibilidad**:
    - Reestructuramos la cabecera de la sección de disponibilidad en `page.js` para corregir la separación silábica incorrecta de "Disponibilidad".
11. **Optimización Extrema de Renderizado (Prevención de Lag)**:
    - **Aislamiento de Estado del Tipeado:** Creamos el componente de hoja `TypewriterText` para encapsular el estado de la escritura automatizada.
12. **Interactividad en Botones CTA y Easter Egg del Logo en CSS Puro**:
    - **Doble Outline Fino:** Aplicamos filtros drop-shadow repetidos en CSS (`drop-shadow(1px 0px 0px #ffffff)`) en cuatro direcciones para dibujar un borde blanco fino de `1px` alrededor de la silueta transparente de ambos sellos.
13. **Acordeones Horizontales Compactos**:
    - **Corrección de Desbordamiento de Texto:** Ocultamos totalmente los títulos `.panel-title` en las secciones colapsadas (`display: none;`).
14. **Perspectiva 3D de Dispositivos de Alta Escala**:
   - Reemplazamos la ilustración por un simulador con perspectiva isométrica y efecto de profundidad de monitor y teléfono móvil.
15. **Timeline Snakey con Progreso Dinámico**:
   - Creamos una línea temporal reactiva al scroll del usuario, donde una barra de progreso celeste se va deslizando por el eje del roadmap.
16. **Footer Global Competitivo**:
   - Integramos un pie de página global para la aplicación con el logo `logotipo_likuid.png`, una descripción de la plataforma, un mapa de enlaces jerárquicos (Recursos y Legal) y un botón interactivo para el Libro de Reclamaciones con su respectivo vector.
17. **Escritura Inteligente y Cursor de Terminal**:
   - **Activación por Viewport (IntersectionObserver):** Optimización de `TypewriterText` para suspender el tipeado hasta que el elemento respectivo entra en la zona visible del viewport.
   - **Cursor de Bloque Real:** Cursor intermitente rectangular blanco (`#ffffff`) que parpadea continuamente al ritmo de una terminal.

---

## Fase 6: Adaptación e Integración de Super-Componente de Login (ONEKORA a LIKUID)
1. **Traducción de Tailwind a CSS Nativo**:
   - Creamos el archivo de estilos consolidado [login-shared.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/login-page-shared/login-shared.css) traduciendo todas las clases de utilidad de Tailwind en reglas semánticas y variables HSL.
2. **Remoción de Dependencias Externas (Framer Motion y Radix UI)**:
   - **Fondo Animado con GSAP (BallpitBackground):** Reescribimos el componente `ballpit-background.tsx` utilizando la librería GSAP para animar las órbitas de las burbujas celestes.
   - **HTML5 Semántico:** Reemplazamos Radix Checkbox y Slot por etiquetas nativas `<input type="checkbox">` y `<button>` en `checkbox.tsx` y `button.tsx` internos de `ui/`.
   - **Validación Manual de Servidor:** Removimos la librería `zod` de `login.action.ts`, programando un validador manual robusto y eficiente en JavaScript.
3. **Hard-coding de Credenciales de Inicio de Sesión**:
   - Programamos la Server Action para validar de forma local las siguientes credenciales simuladas:
     - **edsondionicioo@gmail.com** con clave **12345** redirige a `/student`.
     - **dannielsmn@gmail.com** con clave **12345** redirige a `/client`.
     - Cualquier otra combinación deniega el acceso con un mensaje de banner de estado en rojo.
4. **Branding de Likuid en Login**:
   - Reemplazamos la portada Onekora por un diseño OLED negro profundo.
   - Montamos el logo puro `logo.png` a la izquierda con su correspondiente outline blanco fino y brillo sutil.
5. **Delegación de Ruta App Router**:
   - Modificamos [page.js](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/login/page.js) para delegar de forma directa el renderizado al super-componente adaptado y sanitizado de la carpeta compartida.

---

## Fase 7: Compactación y Ajuste de Escala Visual (Mejoras UX/UI)
1. **Reducción General de Spacings y Márgenes**:
   - Achicamos los márgenes de los títulos seccionales en `landing.css` a `4rem 0 1.5rem 0` para una lectura vertical mucho más fluida.
   - Redujimos el padding superior general de la columna de contenido izquierda de `140px` a `110px` para ajustarse al menú más bajo.
2. **Escala de Fuentes**:
   - Redujimos la tipografía principal del Hero de `2.35rem` a `1.9rem` y el párrafo descriptivo a `0.95rem`.
   - Ajustamos el tamaño de las fuentes de los títulos de secciones a `1.25rem`.
3. **Optimización de Elementos del Hero y CTAs**:
   - Redujimos el padding de los botones principales a `0.6rem 1.6rem` y su fuente a `0.85rem` para darles un aspecto moderno de botón píldora.
4. **Compresión del Header Dock (PillNav)**:
   - Rediseñamos las dimensiones de `PillNav` reduciendo su altura de `70px` a `54px` (y su radio a `27px`).
   - Redujimos el tamaño de la tipografía de los botones de navegación a `0.78rem`, su padding a `18px` y la altura del logo dentro de la píldora a `72px` para mantener un balance visual perfecto.
   - Ajustamos la animación inicial de entrada con GSAP para que el estado de carga comience colapsado simétricamente a un ancho de `54px` antes de expandirse horizontalmente.
5. **Ajuste de Tarjetas de Acordeón**:
   - Redujimos la altura máxima de los acordeones horizontales de `280px` a `220px`.
   - Ajustamos la tipografía interna de las tarjetas (`.panel-number` a `1.2rem`, `.panel-title` a `1rem` y el párrafo del panel expandido a `0.85rem`) con un gap interno menor.
6. **Reducción de Dispositivos en Perspectiva 3D**:
   - Redujimos la altura del contenedor de simulación a `200px`.
   - Ajustamos el monitor de escritorio a `190px` por `120px` y el teléfono a `90px` por `180px`.
7. **Compresión de Footer**:
   - Redujimos la altura de los enlaces a `0.75rem`, el logo de footer a `35px` de alto, el texto de descripción a `0.8rem` y el padding general del footer a `2.5rem 5% 1.5rem 5%`.
8. **Liquid Chrome Intacto**:
   - Mantuvimos la columna derecha `.landing-sidebar-col` y el shader interactivo de WebGL `LiquidChrome` sin ningún cambio, preservando su comportamiento fluido y su posición intacta según la directiva.

---

## Fase 8: Interconexión de Autenticación, Tipografía Cursive y Ajuste de Inputs Selectores
1. **Interconexión Directa (Login ⇄ Registro)**:
   - Modificamos [LoginForm.tsx](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/login-page-shared/components/LoginForm.tsx) para incluir un enlace limpio de navegación hacia el portal de registro (`/register`) junto a la opción de contactar administrador.
2. **Tipografía Cursive de Alta Definición**:
   - Modificamos [login-shared.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/login-page-shared/login-shared.css) asignando la tipografía manuscrita fluida local `'Amsterdam Four', cursive` a los títulos principales `<h2>` de ambas pantallas ("Bienvenido" y "Crear Cuenta") en un color negro profundo sólido (`#000000`) y ajustando el line-height a `1.1`.
3. **Prevención de Solapamiento de Labels (Selector)**:
   - Forzamos la clase `has-value` de manera inmutable en el contenedor del selector desplegable de perfil en [RegisterForm.tsx](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/login-page-shared/components/RegisterForm.tsx), manteniendo la etiqueta `Tipo de perfil` en su posición superior flotante desde la carga inicial y eliminando la superposición con el texto de opción por defecto.

---

## Fase 9: Carga de Fuentes Globales, Estabilidad de Altura e Identidad de Slogan
1. **Definición Global de @font-face**:
   - Registramos la declaración de la familia tipográfica `'Amsterdam Four'` al inicio de [globals.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/globals.css) apuntando a múltiples formatos locales. Esto asegura que la tipografía manuscrita celeste y negra se cargue de forma inmutable al refrescar o navegar entre sub-rutas de autenticación sin recurrir a fuentes del sistema por defecto.
2. **Continuidad Visual de Alturas**:
   - Modificamos la tarjeta `.login-card` en [login-shared.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/login-page-shared/login-shared.css) asignándole una altura fija de **`530px`** en ordenadores de escritorio. Esto nivela los contenedores del login y del registro de forma idéntica, eliminando los saltos verticales y el redimensionamiento del card al alternar de página.
3. **Slogan de Branding Cursive**:
   - Modificamos la clase `.login-left-footer p` en [login-shared.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/login-page-shared/login-shared.css) para renderizar "Conectando Talento y Empresa" en la fuente `'Amsterdam Four', cursive` en color blanco sólido y un tamaño de `1.6rem`, agregándole un leve brillo resplandeciente para sintonizar con la estética del proyecto.

---

## Verificación

Se realizaron validaciones estáticas del código para asegurar la consistencia del DOM y CSS.

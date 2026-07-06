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
   - Modificamos el diseño para que todo el contenido (cabecera pill, hero, títulos, grids, y timeline) se alinee de manera consistente hacia el **extremo izquierdo** del viewport (`margin-left: 8%` en pantallas grandes).
   - **Alineación de Bloques de Contenido**: Implementamos la clase `.landing-section-content` para los párrafos, listas y citas de las secciones de texto. Esto desplaza el contenido completo a la izquierda de la pantalla, alineándolo con las guías de los títulos y removiendo la centración que existía previamente.
3. **Títulos con Línea Blanca Sólida de Mayor Grosor**:
   - Reconfiguramos las líneas decorativas a la derecha de los títulos para que sean de color **blanco sólido** (`#ffffff`), eliminando los degradados.
   - Incrementamos su grosor a **`3px`** para dotarlas de mayor fuerza y continuidad visual, manteniendo el efecto de expansión horizontal.
4. **Cursive en Verde Claro y Corrección de Altura (Baseline Alignment)**:
   - Cambiamos la tipografía manuscrita fluida `Amsterdam Four` a un color **verde claro vibrante** (`#4ade80`) con su respectiva sombra de resplandor.
   - Para resolver la caída visual y la ruptura de continuidad de las letras manuscritas con respecto a la tipografía Roboto, aplicamos `transform: translateY(-0.16em);` a `.highlight-font` y `.highlight-font-title`. Esto desplaza verticalmente hacia arriba la tipografía manuscrita verde, alineando de manera perfecta sus baselines visuales en todos los títulos.
5. **División del Hero, Ajuste de Wraps y Prevención de Traslapes**:
   - **Spans con white-space nowrap**: En [page.js](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/page.js), forzamos a que las dos líneas del Hero (`Vinculación Sociolaboral` y `Mentoría Universitaria`) utilicen `white-space: nowrap;` y redujimos el font-size de la cabecera a `2.35rem`. Esto previene de manera absoluta que las palabras se rompan en 4 líneas a causa de la columna lateral.
   - **Remoción de Mayúsculas Forzadas**: Eliminamos `text-transform: uppercase` del estilo de títulos seccionales.
6. **Nuevo Header Flotante en forma de Píldora con Relieve**:
   - Diseñamos un nuevo header de **color blanco** con forma de píldora flotante (`border-radius: 35px`, alineado al `8%` del margen izquierdo).
   - Aplicamos **sombras de relieve 3D biseladas** (`box-shadow` e `inset shadow`) para darle volumen táctil sobre la pantalla.
   - Integramos la variante oscura del logo `logotipo_black_likuid.png` en el interior izquierdo, y cambiamos el color de los accesos y cortes separadores a color negro para alto contraste.
7. **Remoción de Pedestal y Reflector (Logo Puro)**:
   - Eliminamos completamente el pedestal de tarjeta biselada (`.pedestal`) y el cono reflector de luz superior (`.spotlight`).
   - Ubicamos el logo puro `logo.png` directamente flotando en su columna visual derecha, aumentamos su tamaño a **`220px`** y conservamos un **brillo blanco tenue** alrededor (`filter: drop-shadow`).
8. **Nuevo Componente PillNav**:
   - Agregamos el componente animado de barra de navegación `PillNav` en `src/assets/components/design_elements/pill-nav/` con soporte para animaciones de GSAP.
   - Sanitizamos el componente para integrarse correctamente con Next.js, reemplazando las importaciones de `react-router-dom` por el enrutador federado nativo `next/link` y asegurando tipado TypeScript estricto.
9. **Eliminación Total de Comentarios y Actualización de .gitignore**:
   - Realizamos una limpieza profunda de comentarios de desarrollo en [page.js](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/page.js), [landing.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/landing.css), [StaggeredMenuWrapper.tsx](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/components/design_elements/StaggeredMenu/StaggeredMenuWrapper.tsx), [migrate-font.js](file:///c:/Users/lenovo/Desktop/Likuid_web/scripts/migrate-font.js) y [fonts.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/assets/fonts/fonts.css) para entregar código limpio y apto para producción.
   - Agregamos directorios de configuración de IDEs (`.vscode/`, `.idea/`), patrones de variables locales (`*.local`, `.env.*.local`) y el archivo de directivas del agente `AGENTS.md` a [.gitignore](file:///c:/Users/lenovo/Desktop/Likuid_web/.gitignore).
10. **Resolución de Carga de Fuente y Doble Fallback**:
    - Copiamos tanto el formato comprimido `.woff2` como el original `.ttf` en el directorio `/public/fonts`.
    - Agregamos la definición `@font-face` directamente al inicio de [landing.css](file:///c:/Users/lenovo/Desktop/Likuid_web/src/app/landing.css).

---

## Verificación

Se realizaron validaciones estáticas del código para asegurar la consistencia del DOM y CSS.

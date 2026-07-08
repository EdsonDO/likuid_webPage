<p align="center">
  <img src="src/assets/images/logotipo_likuid.png" alt="Likuid Logotipo" width="320" />
</p>

---

# Likuid

Plataforma de vinculación sociolaboral y mentoría estudiantil diseñada para conectar a estudiantes novatos y talentos académicos de la **Universidad de Huánuco (UDH)** con proyectos de digitalización y necesidades técnicas en **MyPes** de la región.

## Stack Tecnológico

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-F15A24?style=for-the-badge&logo=lucide&logoColor=white)

---

## Características Principales

* **Portal del Estudiante**: Feed de publicaciones, visualizador de ofertas de empleo con filtros avanzados y gestión de portafolio conectado directamente a repositorios locales.
* **Portal de Reclutador (MyPes)**: Panel bento-grid interactivo con métricas de embudo de contratación y saturación de postulantes por carrera.
* **Asistente Neural Lucy**: Chatbot con memoria integrada y directivas de personalidad de soporte. Asiste a los estudiantes en la búsqueda de empleo y orienta a los reclutadores sugiriendo perfiles de alumnos.
* **CdT3k (Captador de Trabajadores 3000)**: Escáner reactivo que filtra un pool estructurado de 75 candidatos basándose en las consultas de reclutamiento hechas en el chat.
* **Alertas de Postulantes en Tiempo Real**: Notificaciones simuladas con temporizador para la presentación en vivo de la demo de reclutamiento.

---

## Guía de Puesta en Marcha

Para clonar y ejecutar este proyecto en tu entorno de desarrollo local, sigue estos pasos:

### 1. Clonar el Repositorio
Ejecuta el comando en tu terminal para obtener el código fuente:
```bash
git clone https://github.com/EdsonDO/likuid_webPage.git
cd likuid_webPage
```

### 2. Instalar las Dependencias
Descarga e instala todos los paquetes necesarios del ecosistema de Next.js:
```bash
npm install
```

### 3. Configurar las Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto para habilitar las integraciones de IA (puedes usar Google AI Studio o OpenRouter como respaldo):
```env
GEMINI_API_KEY=tu_clave_de_google_ai_studio_aqui
OPENROUTER_API_KEY=tu_clave_de_openrouter_aqui
```

### 4. Lanzar el Servidor de Desarrollo
Inicia el servidor local de Next.js:
```bash
npm run dev
```

### 5. Abrir la Aplicación
Abre tu navegador de preferencia y dirígete a:
```text
http://localhost:3000
```

*   **Acceso para Estudiantes**: Inicia sesión utilizando las credenciales `edsondionicioo@gmail.com` y contraseña `12345`.
*   **Acceso para MyPes**: Inicia sesión utilizando las credenciales `dannielsmn@gmail.com` y contraseña `12345`.

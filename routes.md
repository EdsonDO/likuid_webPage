# Rutas del Prototipo - Likuid

A continuación se detallan todas las rutas activas en la plataforma Next.js de Likuid, formateadas en un bloque CSV:

```csv
Ruta,Rol de Acceso,Ubicación del Archivo,Propósito e Interacciones
/,Público (Landing),/src/app/page.js,Presentación de la plataforma con propuesta de valor de ingeniería, garantías de seguridad institucional, y el roadmap de evolución ecosistémica sin emojis.
/login,Público (Acceso),/src/app/login/page.js,Formulario de inicio de sesión con validación de credenciales de usuario y redireccionamiento inteligente según el perfil del usuario (Estudiante o Reclutador).
/forgot-password,Público (Soporte),/src/app/forgot-password/page.js,Formulario de recuperación de credenciales y envío de instrucciones de restablecimiento de contraseña al correo institucional.
/student,Estudiante (Inicio),/src/app/student/page.js,Dashboard principal del alumno. Muestra resumen del portafolio, notificaciones operativas y listado de convocatorias de vinculación sugeridas.
/student/portfolio,Estudiante (Portafolio),/src/app/student/portfolio/page.js,Portafolio técnico del alumno. Presenta carrusel de proyectos destacados, repositorios Git sincronizados, métricas de habilidades y canales de contacto directo.
/student/reviews,Estudiante (Evaluaciones),/src/app/student/reviews/page.js,Bandeja de calificaciones y comentarios cualitativos recíprocos otorgados por las MyPes asociadas al finalizar los servicios técnicos.
/student/requests,Estudiante (Peticiones),/src/app/student/requests/page.js,Historial y bandeja de entrada de solicitudes de vinculación, con filtros de estados activos y archivados.
/student/jobs,Estudiante (Buscador),/src/app/student/jobs/page.js,Buscador avanzado de vacantes y micro-trabajos de digitalización con filtros dinámicos por tags y modalidades.
/student/teams,Estudiante (Grupos),/src/app/student/teams/page.js,Visualización de equipos de desarrollo asignados y estado de proyectos interciclos del campus.
/client,Cliente/MyPe (Panel),/src/app/client/page.js,Dashboard principal de la organización o MyPe. Permite buscar perfiles de estudiantes por habilidades, gestionar postulaciones y publicar nuevos requerimientos de soporte.
```

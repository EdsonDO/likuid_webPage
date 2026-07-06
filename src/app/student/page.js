export default function StudentDashboardPage() {
  return (
    <div>
      <h1>Inicio del Estudiante</h1>
      
      <section style={{ marginBottom: "2rem" }}>
        <h3>Notificaciones de Petición</h3>
        <p>Aquí se muestran las alertas importantes de los reclutadores o mentores.</p>
        <ul>
          <li>Notificación 1: Nueva invitación al equipo de IA.</li>
          <li>Notificación 2: Tu solicitud a "Desarrollador Web" cambió de estado.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Solicitudes Relacionadas a su Interés</h3>
        <p>Basado en tus intereses de Desarrollo de Software:</p>
        <ul>
          <li>Trabajo: Backend Developer en Acme Corp (Filtros: Node.js, Express)</li>
          <li>Trabajo: React Developer en TechStart (Filtros: React, Next.js)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Resumen de Portafolio</h3>
        <p>Un vistazo rápido a tu información profesional activa:</p>
        <ul>
          <li>Proyectos destacados: 3</li>
          <li>Habilidad principal: JavaScript/TypeScript</li>
          <li>Calificación promedio de reseñas: 4.8 / 5</li>
        </ul>
      </section>
    </div>
  );
}

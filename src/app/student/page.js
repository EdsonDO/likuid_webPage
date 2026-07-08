import "./student-dashboard.css";

export default function StudentDashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="student-page-header">
        <h1>Inicio</h1>
        <p>Panel de control del estudiante y alertas del sistema</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Notificaciones de Petición</h3>
          <p className="card-desc">Alertas importantes de reclutadores y mentores universitarios.</p>
          <ul className="dashboard-list">
            <li className="dashboard-list-item warning">
              <strong>Invitación a Equipo:</strong> Tienes una nueva invitación para unirte al equipo de desarrollo de IA.
            </li>
            <li className="dashboard-list-item success">
              <strong>Estado de Petición:</strong> Tu solicitud de postulación al rol de "Desarrollador Web" ha sido aprobada.
            </li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Solicitudes Relacionadas</h3>
          <p className="card-desc">Ofertas y mentorías sugeridas basadas en tus intereses de desarrollo.</p>
          <ul className="dashboard-list">
            <li className="dashboard-list-item">
              <strong>Backend Developer</strong> en Acme Corp (Filtros: Node.js, Express)
            </li>
            <li className="dashboard-list-item">
              <strong>React Developer</strong> en TechStart (Filtros: React, Next.js)
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard-card" style={{ width: "100%" }}>
        <h3 className="card-title">Resumen de Portafolio</h3>
        <p className="card-desc">Métricas activas e historial profesional en la plataforma.</p>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-num">12</span>
            <span className="stat-label">Proyectos Registrados</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">React/Next</span>
            <span className="stat-label">Habilidad Principal</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">4.9 / 5</span>
            <span className="stat-label">Calificación de Reseñas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

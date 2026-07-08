export default function StudentRequestsPage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div className="student-page-header">
        <h1>Mis Solicitudes</h1>
        <p>Historial de postulaciones y estado de peticiones sociolaborales</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Total Solicitudes</h4>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a" }}>3</span>
        </div>
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Estados de Proceso</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 600, color: "#16a34a" }}>Aceptadas</span>
              <span style={{ fontWeight: 700 }}>1</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 600, color: "#f97316" }}>Pendientes</span>
              <span style={{ fontWeight: 700 }}>1</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 600, color: "#dc2626" }}>Rechazadas</span>
              <span style={{ fontWeight: 700 }}>1</span>
            </div>
          </div>
        </div>
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Última Actualización</h4>
          <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", display: "block", marginTop: "0.5rem" }}>
            Hace 2 días
          </span>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Solicitud en Financiera Express</span>
        </div>

        <div className="bento-card bento-card-large">
          <h4 style={{ margin: "0 0 1rem 0", color: "#0f172a" }}>Listado de Solicitudes</h4>
          <div className="table-wrapper">
            <table className="bento-table">
              <thead>
                <tr>
                  <th>Trabajo</th>
                  <th>Fecha & Hora</th>
                  <th>Organización</th>
                  <th>Descripción breve</th>
                  <th>Estado</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>React Developer</strong></td>
                  <td>2026-07-01 09:30</td>
                  <td>TechStart</td>
                  <td>Desarrollo de nuevas interfaces de usuario en React.</td>
                  <td>
                    <span style={{ color: "#f97316", fontWeight: "bold" }}>Pendiente</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <span className="project-tag">React</span>
                      <span className="project-tag">CSS</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>Backend Engineer</strong></td>
                  <td>2026-06-28 15:45</td>
                  <td>Financiera Express</td>
                  <td>Mantenimiento de microservicios financieros con Node.js.</td>
                  <td>
                    <span style={{ color: "#16a34a", fontWeight: "bold" }}>Aceptada</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <span className="project-tag">Node.js</span>
                      <span className="project-tag">PostgreSQL</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>QA Tester Intern</strong></td>
                  <td>2026-06-20 11:00</td>
                  <td>SoftLabs</td>
                  <td>Pruebas manuales y automatización básica de APIs.</td>
                  <td>
                    <span style={{ color: "#dc2626", fontWeight: "bold" }}>Rechazada</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <span className="project-tag">QA</span>
                      <span className="project-tag">API Testing</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

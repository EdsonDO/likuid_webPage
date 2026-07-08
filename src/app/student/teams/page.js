export default function StudentTeamsPage() {
  const teams = [
    { name: "Team Cybernet", objective: "Desarrollar app móvil para entregas rápidas.", status: "Activo", members: 5, date: "2026-01-10", tags: ["Desarrollo Móvil", "React Native"] },
    { name: "AI Explorers", objective: "Prototipar asistente de voz con LLMs locales.", status: "Activo", members: 4, date: "2026-03-01", tags: ["IA", "Python", "API"] },
    { name: "Web Legacy", objective: "Migrar portal universitario antiguo a HTML5.", status: "Inactivo", members: 3, date: "2025-05-15", tags: ["Web", "Vanilla JS"] },
    { name: "Security Audit", objective: "Análisis y parchado de fallas de seguridad en el campus.", status: "Cerrado", members: 6, date: "2025-08-20", tags: ["Ciberseguridad", "Audit"] }
  ];

  const activeCount = teams.filter(t => t.status === "Activo").length;
  const inactiveCount = teams.filter(t => t.status === "Inactivo").length;
  const closedCount = teams.filter(t => t.status === "Cerrado").length;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div className="student-page-header">
        <h1>Equipos de Desarrollo</h1>
        <p>Grupos de trabajo académico y proyectos colaborativos</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Equipos Activos</h4>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "#16a34a" }}>{activeCount}</span>
        </div>
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Otros Estados</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", justifycontent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 600, color: "#f97316" }}>Inactivos</span>
              <span style={{ fontWeight: 700 }}>{inactiveCount}</span>
            </div>
            <div style={{ display: "flex", justifycontent: "space-between", fontSize: "0.85rem" }}>
              <span style={{ fontWeight: 600, color: "#dc2626" }}>Cerrados</span>
              <span style={{ fontWeight: 700 }}>{closedCount}</span>
            </div>
          </div>
        </div>
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Total Participantes</h4>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a" }}>18</span>
        </div>

        <div className="bento-card bento-card-large">
          <h4 style={{ margin: "0 0 1rem 0", color: "#0f172a" }}>Listado de Equipos</h4>
          <div className="table-wrapper">
            <table className="bento-table">
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>Objetivo del Proyecto</th>
                  <th>Estado</th>
                  <th>Miembros</th>
                  <th>Fecha de Formación</th>
                  <th>Habilidades</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={idx}>
                    <td><strong>{team.name}</strong></td>
                    <td>{team.objective}</td>
                    <td>
                      <span style={{ 
                        fontWeight: "bold", 
                        color: team.status === "Activo" ? "#16a34a" : team.status === "Inactivo" ? "#f97316" : "#dc2626" 
                      }}>
                        {team.status}
                      </span>
                    </td>
                    <td>{team.members}</td>
                    <td>{team.date}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {team.tags.map(tag => (
                          <span key={tag} className="project-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

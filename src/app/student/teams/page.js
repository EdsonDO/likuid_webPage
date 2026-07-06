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
    <div>
      <h1>Equipos de Desarrollo</h1>

      <section style={{ display: "flex", gap: "2rem", marginBottom: "2rem", border: "1px solid #eee", padding: "1rem", borderRadius: "4px" }}>
        <div>
          <strong>Equipos Activos:</strong> <span style={{ color: "green" }}>{activeCount}</span>
        </div>
        <div>
          <strong>Equipos Inactivos:</strong> <span style={{ color: "orange" }}>{inactiveCount}</span>
        </div>
        <div>
          <strong>Equipos Cerrados:</strong> <span style={{ color: "red" }}>{closedCount}</span>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Listado de Equipos</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
              <th style={{ padding: "0.5rem" }}>Equipo</th>
              <th style={{ padding: "0.5rem" }}>Objetivo</th>
              <th style={{ padding: "0.5rem" }}>Estado</th>
              <th style={{ padding: "0.5rem" }}>Miembros</th>
              <th style={{ padding: "0.5rem" }}>Fecha de Formación</th>
              <th style={{ padding: "0.5rem" }}>Tags</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.5rem" }}><strong>{team.name}</strong></td>
                <td style={{ padding: "0.5rem" }}>{team.objective}</td>
                <td style={{ padding: "0.5rem" }}>
                  <span style={{ 
                    fontWeight: "bold", 
                    color: team.status === "Activo" ? "green" : team.status === "Inactivo" ? "orange" : "red" 
                  }}>
                    {team.status}
                  </span>
                </td>
                <td style={{ padding: "0.5rem" }}>{team.members}</td>
                <td style={{ padding: "0.5rem" }}>{team.date}</td>
                <td style={{ padding: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                    {team.tags.map(tag => (
                      <span key={tag} style={{ background: "#eee", padding: "0.1rem 0.4rem", borderRadius: "3px", fontSize: "0.7rem" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

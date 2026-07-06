export default function StudentRequestsPage() {
  return (
    <div>
      <h1>Mis Solicitudes</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Resumen</h3>
        <p><strong>Cantidad total de solicitudes realizadas:</strong> 3</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Listado de Solicitudes</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
              <th style={{ padding: "0.5rem" }}>Trabajo</th>
              <th style={{ padding: "0.5rem" }}>Fecha & Hora</th>
              <th style={{ padding: "0.5rem" }}>Organización</th>
              <th style={{ padding: "0.5rem" }}>Descripción breve</th>
              <th style={{ padding: "0.5rem" }}>Estado</th>
              <th style={{ padding: "0.5rem" }}>Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>React Developer</td>
              <td style={{ padding: "0.5rem" }}>2026-07-01 09:30</td>
              <td style={{ padding: "0.5rem" }}>TechStart</td>
              <td style={{ padding: "0.5rem" }}>Desarrollo de nuevas interfaces de usuario en React.</td>
              <td style={{ padding: "0.5rem", color: "orange", fontWeight: "bold" }}>Pendiente</td>
              <td style={{ padding: "0.5rem" }}>React, CSS, Git</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>Backend Engineer</td>
              <td style={{ padding: "0.5rem" }}>2026-06-28 15:45</td>
              <td style={{ padding: "0.5rem" }}>Financiera Express</td>
              <td style={{ padding: "0.5rem" }}>Mantenimiento de microservicios financieros con Node.js.</td>
              <td style={{ padding: "0.5rem", color: "green", fontWeight: "bold" }}>Aceptada</td>
              <td style={{ padding: "0.5rem" }}>Node.js, PostgreSQL</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>QA Tester Intern</td>
              <td style={{ padding: "0.5rem" }}>2026-06-20 11:00</td>
              <td style={{ padding: "0.5rem" }}>SoftLabs</td>
              <td style={{ padding: "0.5rem" }}>Pruebas manuales y automatización básica de APIs.</td>
              <td style={{ padding: "0.5rem", color: "red", fontWeight: "bold" }}>Rechazada</td>
              <td style={{ padding: "0.5rem" }}>QA, Cypress, API Testing</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

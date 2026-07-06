import Link from "next/link";

export default function ClientDashboardPage() {
  const students = [
    { name: "Juan Pérez", cycle: "8vo Ciclo", specialty: "Ingeniería de Software", skills: ["React", "Next.js", "TypeScript"] },
    { name: "Maria Gomez", cycle: "9no Ciclo", specialty: "Ingeniería Informática", skills: ["Python", "SQL", "Django"] },
    { name: "Carlos Ruiz", cycle: "7mo Ciclo", specialty: "Ciencia de la Computación", skills: ["C++", "Java", "Linux"] }
  ];

  const publishedJobs = [
    { title: "React Developer (Full Time)", status: "Activo", applicants: 5, date: "2026-06-30" },
    { title: "Backend Intern (Part Time)", status: "Activo", applicants: 3, date: "2026-07-01" },
    { title: "QA Analyst", status: "Inactivo (Cerrado)", applicants: 12, date: "2026-05-10" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #ccc", paddingBottom: "1rem", marginBottom: "1rem" }}>
        <h2>Likuid - Cliente / Reclutador</h2>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Panel de Reclutamiento</span>
          <Link href="/login" style={{ color: "red" }}>Cerrar Sesión</Link>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <h1>Inicio de Cliente</h1>

        <section style={{ marginBottom: "2.5rem" }}>
          <h3>Listado de Estudiantes Disponibles</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                <th style={{ padding: "0.5rem" }}>Nombre</th>
                <th style={{ padding: "0.5rem" }}>Ciclo</th>
                <th style={{ padding: "0.5rem" }}>Especialidad</th>
                <th style={{ padding: "0.5rem" }}>Habilidades (Skills)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.5rem" }}><strong>{student.name}</strong></td>
                  <td style={{ padding: "0.5rem" }}>{student.cycle}</td>
                  <td style={{ padding: "0.5rem" }}>{student.specialty}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      {student.skills.map(skill => (
                        <span key={skill} style={{ background: "#eee", padding: "0.1rem 0.4rem", borderRadius: "3px", fontSize: "0.75rem" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <h3>Mis Trabajos Publicados</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                <th style={{ padding: "0.5rem" }}>Título de Trabajo</th>
                <th style={{ padding: "0.5rem" }}>Estado</th>
                <th style={{ padding: "0.5rem" }}>Postulantes</th>
                <th style={{ padding: "0.5rem" }}>Fecha de Publicación</th>
              </tr>
            </thead>
            <tbody>
              {publishedJobs.map((job, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.5rem" }}><strong>{job.title}</strong></td>
                  <td style={{ padding: "0.5rem" }}>{job.status}</td>
                  <td style={{ padding: "0.5rem" }}>{job.applicants} postulantes</td>
                  <td style={{ padding: "0.5rem" }}>{job.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid #ccc", marginTop: "2rem", paddingTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
        <p>&copy; {new Date().getFullYear()} Likuid - Vista de Cliente. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

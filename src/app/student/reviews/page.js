import { StarIcon } from "@/assets/components/Icons";

export default function StudentReviewsPage() {
  return (
    <div>
      <h1>Reseñas</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Promedio de Puntajes</h3>
        <p><strong>Puntaje General:</strong> <StarIcon size={16} /> 4.8 / 5.0</p>
        <ul>
          <li><strong>Habilidad Técnica:</strong> 4.9 / 5.0</li>
          <li><strong>Comunicación:</strong> 4.7 / 5.0</li>
          <li><strong>Puntualidad:</strong> 4.8 / 5.0</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Listado de Reseñas</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
              <th style={{ padding: "0.5rem" }}>Trabajo</th>
              <th style={{ padding: "0.5rem" }}>Fecha & Hora</th>
              <th style={{ padding: "0.5rem" }}>Organización / Individuo</th>
              <th style={{ padding: "0.5rem" }}>Detalles</th>
              <th style={{ padding: "0.5rem" }}>Puntuación</th>
              <th style={{ padding: "0.5rem" }}>Reseña</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>Frontend Developer Intern</td>
              <td style={{ padding: "0.5rem" }}>2026-06-15 14:00</td>
              <td style={{ padding: "0.5rem" }}>Acme Corp</td>
              <td style={{ padding: "0.5rem" }}>Desarrollo de landing pages con Next.js y CSS.</td>
              <td style={{ padding: "0.5rem" }}><StarIcon size={16} /> 5/5</td>
              <td style={{ padding: "0.5rem" }}>"Excelente desempeño y proactividad."</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>Asistente de Base de Datos</td>
              <td style={{ padding: "0.5rem" }}>2026-03-10 10:30</td>
              <td style={{ padding: "0.5rem" }}>Laboratorios ABC</td>
              <td style={{ padding: "0.5rem" }}>Optimización de consultas SQL y migraciones de esquemas.</td>
              <td style={{ padding: "0.5rem" }}><StarIcon size={16} /> 4.6/5</td>
              <td style={{ padding: "0.5rem" }}>"Muy buena comunicación y entrega a tiempo."</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

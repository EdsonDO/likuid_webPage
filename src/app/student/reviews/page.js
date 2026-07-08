import { StarIcon } from "@/assets/components/Icons";
import "./reviews.css";

const REVIEWS_DATA = [
  {
    project: "Onekora",
    date: "2026-05-12 10:30",
    reviewer: "Municipalidad de Huánuco",
    details: "Implementación integral del sistema de geolocalización de camiones y recolección inteligente.",
    rating: "5.0",
    comment: "Desarrollo impecable. Edson asumió toda la arquitectura solo, desde las bases de datos hasta las aplicaciones de choferes. Ahorró meses de presupuesto municipal."
  },
  {
    project: "Petto",
    date: "2026-06-20 16:15",
    reviewer: "Clínica Veterinaria San José",
    details: "Diseño del sistema administrativo de historiales clínicos y control de recetas.",
    rating: "4.9",
    comment: "Una solución robusta y limpia. El control de stock de insumos veterinarios funciona a la perfección. Es proactivo y maneja un nivel técnico excepcional."
  },
  {
    project: "Triboulet",
    date: "2026-06-02 11:45",
    reviewer: "Lora & Asociados (Consultora Legal)",
    details: "Integración de pasarela de pago, motor de traducción IA y bot de WhatsApp.",
    rating: "5.0",
    comment: "El asistente de traducción legal por inteligencia artificial funciona de maravilla. La integración con la API de WhatsApp es rápida y fluida."
  }
];

export default function StudentReviewsPage() {
  return (
    <div className="reviews-container">
      <div className="student-page-header">
        <h1>Mis Reseñas</h1>
        <p>Calificaciones y comentarios de proyectos reales validados en la plataforma</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card">
          <h4 style={{ margin: "0 0 1rem 0", color: "#475569" }}>Puntuación General</h4>
          <div className="rating-header">
            <span>4.97</span>
            <div className="rating-stars">
              <StarIcon size={20} />
            </div>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.5rem 0 0 0" }}>Basado en 3 proyectos validados</p>
        </div>

        <div className="bento-card">
          <h4 style={{ margin: "0 0 1rem 0", color: "#475569" }}>Métricas de Desempeño</h4>
          <div className="rating-breakdown">
            <div className="breakdown-row">
              <span className="breakdown-label">Habilidad Técnica</span>
              <span className="breakdown-val">5.0 / 5.0</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Resolución de Problemas</span>
              <span className="breakdown-val">5.0 / 5.0</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Autonomía de Desarrollo</span>
              <span className="breakdown-val">5.0 / 5.0</span>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <h4 style={{ margin: "0 0 1rem 0", color: "#475569" }}>Estadísticas de Entrega</h4>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Proyectos Completados</span>
              <span className="stat-val" style={{ color: "#0f172a" }}>3 / 3</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tasa de Éxito</span>
              <span className="stat-val">100%</span>
            </div>
          </div>
        </div>

        <div className="bento-card bento-card-large">
          <h4 style={{ margin: "0 0 1rem 0", color: "#0f172a" }}>Historial Detallado de Reseñas</h4>
          <div className="table-wrapper">
            <table className="bento-table">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Fecha</th>
                  <th>Reclutador / Empresa</th>
                  <th>Detalles del Trabajo</th>
                  <th>Puntaje</th>
                  <th>Reseña</th>
                </tr>
              </thead>
              <tbody>
                {REVIEWS_DATA.map((rev, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="project-tag">{rev.project}</span>
                    </td>
                    <td>{rev.date.split(" ")[0]}</td>
                    <td><strong>{rev.reviewer}</strong></td>
                    <td>{rev.details}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: "700", color: "#fbbf24" }}>
                        <StarIcon size={14} />
                        <span style={{ color: "#0f172a" }}>{rev.rating}</span>
                      </div>
                    </td>
                    <td>
                      <span className="review-text">"{rev.comment}"</span>
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

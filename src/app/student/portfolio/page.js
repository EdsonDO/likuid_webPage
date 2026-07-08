import "./portfolio.css";

export default function StudentPortfolioPage() {
  return (
    <div className="portfolio-container">
      <div className="student-page-header">
        <h1>Mi Portafolio</h1>
        <p>Historial de proyectos, repositorios y habilidades profesionales de Edson Dionicio</p>
      </div>

      <header className="portfolio-header">
        <h2 className="portfolio-name" style={{ fontSize: "1.8rem" }}>EDSON RAUL DIONICIO ORIHUELA</h2>
        <p className="portfolio-title">Ingeniero de Software y de Sistemas / Programador Fullstack</p>
        <div className="portfolio-meta">
          <span><strong>Especialidad:</strong> Arquitectura e Ingeniería de Sistemas</span>
          <span><strong>Ciclo:</strong> Egresado / Estudiante UDH</span>
        </div>
        <div className="portfolio-desc-box">
          Programador Fullstack autónomo con amplia experiencia diseñando, desarrollando y desplegando
          arquitecturas de software de extremo a extremo (Frontend, Backend, Motores Matemáticos, Motores de IA, Bases de Datos e Infraestructura de Servidores).
          Desarrollador único de múltiples plataformas complejas para el sector público municipal, salud animal, educación y gestión de finanzas personales.
        </div>
      </header>

      <section className="bento-card" style={{ marginTop: "2rem" }}>
        <h3 className="portfolio-section-title" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>Presentación Profesional</h3>
        <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.6", margin: 0 }}>
          Apasionado por resolver problemas complejos a través de código limpio, algoritmos eficientes y arquitecturas escalables. 
          En mis proyectos actúo como desarrollador de todas las capas, asumiendo la responsabilidad del análisis, 
          diseño de base de datos, programación del servidor y del cliente móvil/web, así como la configuración y despliegue del entorno productivo.
        </p>
      </section>

      <section className="bento-card" style={{ marginTop: "1.5rem" }}>
        <h3 className="portfolio-section-title" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>Información Académica y de Contacto</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ fontSize: "0.85rem", color: "#475569" }}>
            <p><strong>Universidad:</strong> Universidad de Huánuco (UDH)</p>
            <p><strong>Carrera:</strong> Ingeniería de Sistemas y Computación</p>
            <p><strong>Idiomas:</strong> Español (Nativo), Inglés (Intermedio-Avanzado Técnico)</p>
          </div>
          <div style={{ fontSize: "0.85rem", color: "#475569" }}>
            <p><strong>Email:</strong> edson.orihuela@udh.edu.pe</p>
            <p><strong>GitHub:</strong> github.com/edsondionicio</p>
            <p><strong>Ubicación:</strong> Huánuco, Perú</p>
          </div>
        </div>
      </section>
    </div>
  );
}

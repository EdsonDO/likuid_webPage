import { SKILLS } from "../data";
import "../portfolio.css";

export default function StudentSkillsPage() {
  return (
    <div className="portfolio-container">
      <div className="student-page-header">
        <h1>Mis Habilidades</h1>
        <p>Tecnologías, stacks y nivel de dominio técnico de ingeniería</p>
      </div>

      <section className="bento-card" style={{ marginBottom: "2rem" }}>
        <h3 className="portfolio-section-title" style={{ fontSize: "1.2rem", margin: "0 0 1rem 0" }}>Stack de Especialización</h3>
        <div className="skills-grid">
          {SKILLS.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="bento-card">
        <h3 className="portfolio-section-title" style={{ fontSize: "1.2rem", margin: "0 0 1.5rem 0" }}>Gráfico de Competencias</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "600px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>
              <span>Backend & APIs (Node.js, Go, PHP, Python)</span>
              <span>95%</span>
            </div>
            <div style={{ background: "#f1f5f9", width: "100%", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ background: "#38bdf8", width: "95%", height: "100%" }}></div>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>
              <span>Frontend & Frameworks (React, Next.js, Angular, Astro)</span>
              <span>90%</span>
            </div>
            <div style={{ background: "#f1f5f9", width: "100%", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ background: "#38bdf8", width: "90%", height: "100%" }}></div>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>
              <span>Bases de Datos & Querys (MySQL, MongoDB, SQLite, PostgreSQL)</span>
              <span>85%</span>
            </div>
            <div style={{ background: "#f1f5f9", width: "100%", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ background: "#38bdf8", width: "85%", height: "100%" }}></div>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.3rem" }}>
              <span>Mobile Dev (React Native)</span>
              <span>80%</span>
            </div>
            <div style={{ background: "#f1f5f9", width: "100%", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ background: "#38bdf8", width: "80%", height: "100%" }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { PROJECTS } from "../data";
import "../portfolio.css";

export default function StudentReposPage() {
  return (
    <div className="portfolio-container">
      <div className="student-page-header">
        <h1>Mis Repositorios</h1>
        <p>Proyectos desarrollados y código fuente validado en la plataforma</p>
      </div>

      <section>
        <div className="projects-grid">
          {PROJECTS.map((proj, index) => (
            <div key={index} className="project-card">
              <div>
                <div className="project-header">
                  <h3 className="project-title">{proj.title}</h3>
                  <span className="project-date">{proj.date}</span>
                </div>
                <p className="project-tagline">{proj.tagline}</p>
                <p className="project-desc">{proj.desc}</p>
              </div>

              <div className="project-footer">
                <div className="project-badge-row">
                  <span className={
                    proj.badge === "solo" ? "project-badge-solo" :
                    proj.badge === "team" ? "project-badge-team" :
                    "project-badge-fail"
                  }>
                    {proj.badgeText}
                  </span>
                </div>
                <div className="project-stack">
                  {proj.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="stack-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";

const INITIAL_JOBS = [
  { id: 1, title: "React Developer", org: "TechStart", tags: ["React", "Frontend", "CSS"], desc: "Desarrollo de interfaces web responsivas y dinámicas." },
  { id: 2, title: "Backend Developer", org: "Acme Corp", tags: ["Node.js", "Express", "SQL"], desc: "Diseño y mantenimiento de APIs REST e integraciones." },
  { id: 3, title: "Data Analyst", org: "DataMetrics", tags: ["Python", "SQL", "Pandas"], desc: "Procesamiento de datos y generación de reportes interactivos." },
  { id: 4, title: "UX/UI Designer", org: "Creative Labs", tags: ["Figma", "Design", "CSS"], desc: "Creación de wireframes, prototipos y diseño visual." }
];

export default function StudentJobsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const allTags = Array.from(new Set(INITIAL_JOBS.flatMap(job => job.tags)));

  const filteredJobs = INITIAL_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                          job.org.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? job.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div className="student-page-header">
        <h1>Buscar Trabajos</h1>
        <p>Buscador de ofertas laborales, proyectos y vacantes activas</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card" style={{ gridColumn: "span 2" }}>
          <h4 style={{ margin: "0 0 1rem 0", color: "#475569" }}>Filtros de Búsqueda</h4>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
                Buscar por Trabajo u Organización:
              </label>
              <input 
                type="text" 
                placeholder="Ej. TechStart o Developer..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  padding: "0.5rem 0.75rem", 
                  width: "100%", 
                  borderRadius: "8px", 
                  border: "1px solid #cbd5e1",
                  fontSize: "0.85rem",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ width: "180px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
                Filtrar por Habilidad:
              </label>
              <select 
                value={selectedTag} 
                onChange={(e) => setSelectedTag(e.target.value)} 
                style={{ 
                  padding: "0.5rem 0.75rem", 
                  width: "100%", 
                  borderRadius: "8px", 
                  border: "1px solid #cbd5e1",
                  fontSize: "0.85rem",
                  backgroundColor: "#ffffff"
                }}
              >
                <option value="">Todas</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Resultados</h4>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "#38bdf8" }}>
            {filteredJobs.length}
          </span>
          <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.5rem 0 0 0" }}>Vacantes encontradas</p>
        </div>

        <div className="bento-card bento-card-large" style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filteredJobs.length === 0 ? (
              <div className="bento-card" style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: "#64748b", margin: 0 }}>No se encontraron trabajos con los criterios seleccionados.</p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className="bento-card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>{job.title}</h4>
                    <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "#64748b", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.2rem 0.6rem", borderRadius: "6px" }}>
                      {job.org}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#475569", lineHeight: "1.5" }}>{job.desc}</p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem" }}>
                    {job.tags.map(tag => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

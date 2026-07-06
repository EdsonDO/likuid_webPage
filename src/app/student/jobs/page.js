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
    <div>
      <h1>Buscar Trabajos</h1>

      <section style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Buscar por Trabajo u Organización:</label>
          <input 
            type="text" 
            placeholder="Ej. TechStart o Developer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "0.4rem", width: "250px" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Filtrar por Habilidad (Tag):</label>
          <select 
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)} 
            style={{ padding: "0.4rem" }}
          >
            <option value="">Todas</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <h3>Listado de Trabajos ({filteredJobs.length})</h3>
        {filteredJobs.length === 0 ? (
          <p>No se encontraron trabajos con los criterios seleccionados.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredJobs.map(job => (
              <li key={job.id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "4px" }}>
                <h4>{job.title}</h4>
                <p><strong>Organización:</strong> {job.org}</p>
                <p>{job.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {job.tags.map(tag => (
                    <span key={tag} style={{ background: "#eee", padding: "0.2rem 0.5rem", borderRadius: "3px", fontSize: "0.75rem" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

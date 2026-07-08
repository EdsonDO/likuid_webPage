"use client";

import { useState } from "react";
import { JOBS } from "./data";
import Link from "next/link";
import { Search, DollarSign, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function StudentJobsPage() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [onlyRemunerated, setOnlyRemunerated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const allAreas = Array.from(new Set(JOBS.map((job) => job.area)));

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.mype.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());
    const matchesArea = selectedArea ? job.area === selectedArea : true;
    const matchesRemuneration = onlyRemunerated ? job.remunerated : true;
    return matchesSearch && matchesArea && matchesRemuneration;
  });

  const displayedJobs = filteredJobs.slice(0, visibleCount);

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <div className="student-page-header">
        <h1>Buscar Trabajos</h1>
        <p>Encuentra oportunidades locales de sustento económico y mentoría para estudiantes</p>
      </div>

      <div className="bento-grid">
        {/* Filtros Bento */}
        <div className="bento-card" style={{ gridColumn: "span 2" }}>
          <h4 style={{ margin: "0 0 1rem 0", color: "#475569" }}>Filtros de Búsqueda</h4>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 2, minWidth: "220px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
                Buscar por Trabajo, MYPE o Palabra clave:
              </label>
              <div style={{ position: "relative" }}>
                <input 
                  type="text" 
                  placeholder="Ej. Ayudante, Pastelería, AutoCAD..." 
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(12);
                  }}
                  style={{ 
                    padding: "0.5rem 0.75rem 0.5rem 2.25rem", 
                    width: "100%", 
                    borderRadius: "8px", 
                    border: "1px solid #cbd5e1",
                    fontSize: "0.85rem",
                    boxSizing: "border-box"
                  }}
                />
                <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              </div>
            </div>

            <div style={{ flex: 1, minWidth: "150px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
                Filtrar por Área / Rubro:
              </label>
              <select 
                value={selectedArea} 
                onChange={(e) => {
                  setSelectedArea(e.target.value);
                  setVisibleCount(12);
                }} 
                style={{ 
                  padding: "0.5rem 0.75rem", 
                  width: "100%", 
                  borderRadius: "8px", 
                  border: "1px solid #cbd5e1",
                  fontSize: "0.85rem",
                  backgroundColor: "#ffffff"
                }}
              >
                <option value="">Todos los rubros</option>
                {allAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
              <input 
                type="checkbox" 
                checked={onlyRemunerated}
                onChange={(e) => {
                  setOnlyRemunerated(e.target.checked);
                  setVisibleCount(12);
                }}
                style={{ cursor: "pointer" }}
              />
              Solo mostrar trabajos remunerados
            </label>
          </div>
        </div>

        {/* Contador Bento */}
        <div className="bento-card">
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#475569" }}>Oportunidades</h4>
          <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "#38bdf8" }}>
            {filteredJobs.length}
          </span>
          <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0.5rem 0 0 0" }}>Vacantes que coinciden</p>
        </div>

        {/* Contenido Bento Listado */}
        <div className="bento-card bento-card-large" style={{ backgroundColor: "transparent", border: "none", boxShadow: "none", padding: 0 }}>
          {filteredJobs.length === 0 ? (
            <div className="bento-card" style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "#64748b", margin: 0 }}>No se encontraron trabajos con los criterios seleccionados.</p>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.25rem" }}>
                {displayedJobs.map((job) => (
                  <div key={job.id} className="bento-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "260px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span className="project-tag" style={{ fontSize: "0.7rem", padding: "0.15rem 0.4rem" }}>
                          {job.area}
                        </span>
                        <span style={{ 
                          fontSize: "0.7rem", 
                          fontWeight: "700", 
                          color: job.remunerated ? "#16a34a" : "#64748b",
                          backgroundColor: job.remunerated ? "#f0fdf4" : "#f8fafc",
                          border: `1px solid ${job.remunerated ? "#bbf7d0" : "#e2e8f0"}`,
                          padding: "0.15rem 0.4rem",
                          borderRadius: "4px"
                        }}>
                          {job.remunerated ? "REMUNERADO" : "AD HONOREM"}
                        </span>
                      </div>

                      <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>{job.title}</h4>
                      <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#0284c7", fontWeight: "600" }}>{job.mype}</p>
                      
                      <p style={{ 
                        margin: "0 0 0.75rem 0", 
                        fontSize: "0.8rem", 
                        color: "#475569", 
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {job.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "0.25rem",
                        borderTop: "1px solid #f1f5f9", 
                        paddingTop: "0.5rem",
                        marginBottom: "0.75rem"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", color: "#64748b" }}>
                          <DollarSign size={12} />
                          <span>{job.pay}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", color: "#64748b" }}>
                          <Calendar size={12} />
                          <span>{job.schedule}</span>
                        </div>
                      </div>

                      <Link 
                        href={`/student/jobs/info_mypes?id=${job.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          backgroundColor: "#000000",
                          color: "#ffffff",
                          textDecoration: "none",
                          padding: "0.4rem 1rem",
                          borderRadius: "15px",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          transition: "background-color 0.2s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#334155"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#000000"}
                      >
                        Ver Detalles
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {filteredJobs.length > visibleCount && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      padding: "0.6rem 1.5rem",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.borderColor = "#94a3b8";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                  >
                    Cargar más trabajos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

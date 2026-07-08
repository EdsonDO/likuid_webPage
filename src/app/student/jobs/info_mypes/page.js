"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { JOBS } from "../data";
import { ArrowLeft, Briefcase, DollarSign, Calendar, MapPin, CheckCircle, MessageCircle } from "lucide-react";
import { useState, Suspense } from "react";

function InfoMypesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idStr = searchParams.get("id");
  const jobId = idStr ? parseInt(idStr) : 1;

  const job = JOBS.find((j) => j.id === jobId) || JOBS[0];

  const [hasApplied, setHasApplied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApply = () => {
    setHasApplied(true);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => router.push("/student/jobs")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          color: "#64748b",
          fontSize: "0.9rem",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "1.5rem",
          padding: 0
        }}
      >
        <ArrowLeft size={16} />
        Volver a listado de trabajos
      </button>

      <div className="bento-card" style={{ padding: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="project-tag" style={{ display: "inline-block", marginBottom: "0.5rem" }}>
              {job.area}
            </span>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.5rem 0" }}>
              {job.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#0284c7", fontWeight: "700", margin: 0 }}>
              {job.mype}
            </p>
          </div>

          <div style={{
            backgroundColor: job.remunerated ? "#f0fdf4" : "#f8fafc",
            color: job.remunerated ? "#16a34a" : "#64748b",
            border: `1px solid ${job.remunerated ? "#bbf7d0" : "#e2e8f0"}`,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: "700",
            textAlign: "center"
          }}>
            {job.remunerated ? "REMUNERADO" : "AD HONOREM"}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
          borderTop: "1px solid #f1f5f9",
          borderBottom: "1px solid #f1f5f9",
          margin: "2rem 0",
          padding: "1.25rem 0"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ color: "#0284c7" }}>
              <DollarSign size={20} />
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Compensación / Pago</span>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#334155" }}>{job.pay}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ color: "#0284c7" }}>
              <Calendar size={20} />
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Horario / Tiempo</span>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#334155" }}>{job.schedule}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ color: "#0284c7" }}>
              <MapPin size={20} />
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>Modalidad</span>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#334155" }}>{job.modality}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>Descripción del puesto</h3>
          <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", margin: "0 0 2rem 0" }}>
            {job.description}
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>Habilidades y requerimientos</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {job.skills.map((skill, index) => (
              <span key={index} className="project-tag" style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={handleApply}
            disabled={hasApplied}
            style={{
              backgroundColor: hasApplied ? "#16a34a" : "#000000",
              color: "#ffffff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "24px",
              fontSize: "0.9rem",
              fontWeight: "700",
              cursor: hasApplied ? "default" : "pointer",
              transition: "background-color 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            {hasApplied && <CheckCircle size={16} />}
            {hasApplied ? "Postulado" : "Postular con mi Perfil"}
          </button>

          <a
            href={`https://wa.me/51999999999?text=Hola,%20estoy%20interesado%20en%20el%20puesto%20de%20${encodeURIComponent(job.title)}%20en%20${encodeURIComponent(job.mype)}%20visto%20en%20Likuid.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "1px solid #e2e8f0",
              padding: "0.75rem 1.5rem",
              borderRadius: "24px",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#334155",
              textDecoration: "none",
              backgroundColor: "#ffffff",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
          >
            <MessageCircle size={16} style={{ color: "#16a34a" }} />
            Contactar por WhatsApp
          </a>
        </div>

        {showSuccess && (
          <div style={{
            marginTop: "1.5rem",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#16a34a",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: "600"
          }}>
            ¡Tu postulación ha sido enviada con éxito! Tus datos y portafolio de Likuid ya están compartidos con la MYPE.
          </div>
        )}
      </div>
    </div>
  );
}

export default function InfoMypesPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <InfoMypesContent />
    </Suspense>
  );
}

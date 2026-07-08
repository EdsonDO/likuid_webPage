"use client";

import { useState } from "react";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: "EDSON RAUL DIONICIO ORIHUELA",
    title: "Ingeniero de Software y de Sistemas / Programador Fullstack",
    desc: "Programador Fullstack autónomo con amplia experiencia diseñando, desarrollando y desplegando arquitecturas de software de extremo a extremo.",
    specialty: "Arquitectura e Ingeniería de Sistemas",
    cycle: "Egresado / Estudiante UDH"
  });

  const [skills, setSkills] = useState([
    "Next.js", "React", "Node.js", "Go", "Python", "MySQL", "MongoDB"
  ]);
  const [newSkill, setNewSkill] = useState("");

  const [languages, setLanguages] = useState([
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Avanzado Técnico" }
  ]);
  const [newLang, setNewLang] = useState("");
  const [newLangLevel, setNewLangLevel] = useState("Básico");

  const [saveStatus, setSaveStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus("Cambios guardados con éxito.");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 800);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddLang = (e) => {
    e.preventDefault();
    if (newLang.trim()) {
      setLanguages([...languages, { name: newLang.trim(), level: newLangLevel }]);
      setNewLang("");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <div className="student-page-header">
        <h1>Mi Perfil</h1>
        <p>Configura tus habilidades, idiomas e información académica en la plataforma</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card bento-card-large">
          <h4 style={{ margin: "0 0 1rem 0", color: "#0f172a", fontSize: "1.1rem" }}>Datos Generales del Perfil</h4>
          <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", fontWeight: "600" }}>Nombre Completo:</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", fontWeight: "600" }}>Título Profesional:</label>
                <input 
                  type="text" 
                  value={profile.title} 
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", fontWeight: "600" }}>Especialidad / Rama:</label>
                <input 
                  type="text" 
                  value={profile.specialty} 
                  onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", fontWeight: "600" }}>Ciclo Académico:</label>
                <input 
                  type="text" 
                  value={profile.cycle} 
                  onChange={(e) => setProfile({ ...profile, cycle: e.target.value })}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", fontWeight: "600" }}>Biografía de Perfil:</label>
              <textarea 
                value={profile.desc} 
                onChange={(e) => setProfile({ ...profile, desc: e.target.value })}
                rows={3}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.5rem" }}>
              <button 
                type="submit" 
                disabled={isSaving}
                style={{ 
                  backgroundColor: "#000000", 
                  color: "#ffffff", 
                  border: "none", 
                  padding: "0.5rem 1.25rem", 
                  borderRadius: "20px", 
                  fontSize: "0.85rem", 
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
              {saveStatus && (
                <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: "600" }}>{saveStatus}</span>
              )}
            </div>
          </form>
        </div>

        <div className="bento-card">
          <h4 style={{ margin: "0 0 1rem 0", color: "#0f172a", fontSize: "1.1rem" }}>Habilidades (Skills)</h4>
          <form onSubmit={handleAddSkill} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input 
              type="text" 
              placeholder="Nueva habilidad..." 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)}
              style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.8rem" }}
            />
            <button 
              type="submit"
              style={{ 
                backgroundColor: "#38bdf8", 
                color: "#ffffff", 
                border: "none", 
                padding: "0.4rem 0.8rem", 
                borderRadius: "6px", 
                fontSize: "0.8rem", 
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Añadir
            </button>
          </form>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {skills.map((skill, idx) => (
              <span 
                key={idx} 
                style={{ 
                  backgroundColor: "#f1f5f9", 
                  color: "#334155", 
                  padding: "0.3rem 0.6rem", 
                  borderRadius: "12px", 
                  fontSize: "0.75rem", 
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill)}
                  style={{ border: "none", background: "none", color: "#ef4444", cursor: "pointer", fontWeight: "700", padding: 0 }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bento-card">
          <h4 style={{ margin: "0 0 1rem 0", color: "#0f172a", fontSize: "1.1rem" }}>Idiomas</h4>
          <form onSubmit={handleAddLang} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input 
                type="text" 
                placeholder="Idioma..." 
                value={newLang} 
                onChange={(e) => setNewLang(e.target.value)}
                style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.8rem" }}
              />
              <select 
                value={newLangLevel} 
                onChange={(e) => setNewLangLevel(e.target.value)}
                style={{ padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.8rem", backgroundColor: "#ffffff" }}
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Nativo">Nativo</option>
              </select>
            </div>
            <button 
              type="submit"
              style={{ 
                backgroundColor: "#38bdf8", 
                color: "#ffffff", 
                border: "none", 
                padding: "0.4rem", 
                borderRadius: "6px", 
                fontSize: "0.8rem", 
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Agregar Idioma
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {languages.map((lang, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  backgroundColor: "#f8fafc", 
                  padding: "0.4rem 0.75rem", 
                  borderRadius: "8px", 
                  fontSize: "0.8rem",
                  border: "1px solid #f1f5f9"
                }}
              >
                <span style={{ fontWeight: "600", color: "#334155" }}>{lang.name}</span>
                <span style={{ fontWeight: "700", color: "#64748b" }}>{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

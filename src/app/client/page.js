"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Bell,
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  X,
  ChevronRight,
  Sparkles,
  Filter
} from "lucide-react";
import "./client-dashboard.css";

const INITIAL_STUDENTS = [
  { name: "Edson Raul Dionicio", cycle: "Egresado", specialty: "Ingeniería de Software", skills: ["Next.js", "React", "Node.js", "Go"], bio: "Desarrollador Fullstack apasionado por la creación de soluciones escalables. Líder técnico del proyecto municipal Onekora para optimización de recursos y Petto para adopción." },
  { name: "Maria Gomez", cycle: "9no Ciclo", specialty: "Ingeniería Informática", skills: ["Python", "SQL", "Django", "Excel"], bio: "Especialista en estructuración de bases de datos y control financiero digital. Apoya a MYPES locales en el costeo automatizado de insumos y auditoría de inventarios." },
  { name: "Carlos Ruiz", cycle: "7mo Ciclo", specialty: "Ciencia de la Computación", skills: ["C++", "Java", "Linux", "Algoritmos"], bio: "Interesado en optimización de procesos informáticos complejos y desarrollo de software embebido. Ganador del concurso local de robótica." },
  { name: "Sofía Medina", cycle: "6to Ciclo", specialty: "Enfermería", skills: ["Primeros Auxilios", "Inyectables", "Geriatría"], bio: "Estudiante vocacional dedicada a la atención de salud comunitaria y cuidado geriátrico a domicilio en el sector céntrico de Huánuco." },
  { name: "Ana Flores", cycle: "8vo Ciclo", specialty: "Repostería", skills: ["Decoración", "Costos Pasteleros", "Panificación"], bio: "Entusiasta de la gastronomía dulce. Domina costeo de mermas y horneado a escala comercial para microempresas de panificación." },
  { name: "Luis Castro", cycle: "5to Ciclo", specialty: "Ingeniería Civil", skills: ["AutoCAD", "Planos 2D", "Presupuestos S10"], bio: "Dibujante técnico orientado a la digitalización ágil de planos estructurales y apoyo a consultorías de obras civiles provinciales." }
];

const INITIAL_JOBS = [
  { title: "React Developer (Full Time)", status: "Activo", applicants: 5, date: "2026-06-30" },
  { title: "Backend Intern (Part Time)", status: "Activo", applicants: 3, date: "2026-07-01" },
  { title: "Ayudante de Cocina (Part Time)", status: "Activo", applicants: 2, date: "2026-07-05" },
  { title: "Dibujante AutoCAD", status: "Inactivo (Cerrado)", applicants: 12, date: "2026-05-10" }
];

export default function ClientDashboardPage() {
  const [students] = useState(INITIAL_STUDENTS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("Todos");

  const [cdtCandidates, setCdtCandidates] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isNewJobOpen, setIsNewJobOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobArea, setNewJobArea] = useState("Sistemas");
  const [newJobStatus, setNewJobStatus] = useState("Activo");

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleCandidates = (e) => {
      setCdtCandidates(e.detail.candidates);
      showToast("CdT3k: Solicitud correcta. 25 perfiles de universitarios cargados.");
    };
    window.addEventListener("likuid-candidates-matched", handleCandidates);
    return () => window.removeEventListener("likuid-candidates-matched", handleCandidates);
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      studentName: "Edson Raul Dionicio",
      specialty: "Ingeniería de Software",
      jobTitle: "React Developer (Full Time)",
      matchPercentage: 95,
      time: "Hace 2 minutos",
      status: "pending"
    },
    {
      id: 2,
      studentName: "María Gómez",
      specialty: "Ingeniería Informática",
      jobTitle: "Backend Intern (Part Time)",
      matchPercentage: 88,
      time: "Hace 15 minutos",
      status: "pending"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const names = ["Carlos Ruiz", "Sofía Medina", "Ana Flores", "Luis Castro"];
      const specialties = ["Ciencia de la Computación", "Enfermería", "Repostería", "Ingeniería Civil"];
      const positions = ["React Developer (Full Time)", "Backend Intern (Part Time)", "Ayudante de Cocina (Part Time)", "Dibujante AutoCAD"];

      const idx = Math.floor(Math.random() * names.length);
      const randomName = names[idx];
      const randomSpec = specialties[idx];
      const randomJob = positions[Math.floor(Math.random() * positions.length)];
      const randomMatch = Math.floor(Math.random() * 20) + 75;

      const newNotif = {
        id: Date.now(),
        studentName: randomName,
        specialty: randomSpec,
        jobTitle: randomJob,
        matchPercentage: randomMatch,
        time: "Ahora mismo",
        status: "pending"
      };

      setNotifications(prev => [newNotif, ...prev.slice(0, 3)]);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationAction = (id, action) => {
    setNotifications(prev =>
      prev.map(n => {
        if (n.id === id) {
          return { ...n, status: action };
        }
        return n;
      })
    );

    if (action === "accepted") {
      const match = notifications.find(n => n.id === id);
      setJobs(prev =>
        prev.map(j => {
          if (j.title === match.jobTitle) {
            return { ...j, applicants: j.applicants + 1 };
          }
          return j;
        })
      );
      showToast(`Postulación aceptada. Se ha enviado una propuesta de entrevista a ${match.studentName}.`);
    } else {
      showToast("Postulación archivada con éxito.");
    }
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const newJob = {
      title: newJobTitle,
      status: newJobStatus,
      applicants: 0,
      date: new Date().toISOString().split("T")[0]
    };

    setJobs([newJob, ...jobs]);
    setNewJobTitle("");
    setIsNewJobOpen(false);
    showToast(`Puesto "${newJobTitle}" publicado de forma exitosa.`);
  };

  const handleSendProposal = (studentName) => {
    setSelectedStudent(null);
    showToast(`Propuesta de proyecto enviada a ${studentName} con éxito.`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = specialtyFilter === "Todos" || student.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const activeApplicationsCount = notifications.filter(n => n.status === "pending").length;

  return (
    <div className="client-dashboard-container">
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          zIndex: 9999,
          fontSize: "0.875rem",
          fontWeight: "600",
          animation: "slideIn 0.25s ease-out"
        }}>
          {toastMessage}
        </div>
      )}

      <div className="client-header">
        <h1>Inicio de Cliente</h1>
        <p>Gestiona tus vacantes, revisa postulaciones de estudiantes de la UDH y conéctate con nuevos talentos</p>
      </div>

      <div className="bento-grid-client">

        <div className="bento-card-client span-4">
          <div className="client-profile-card">
            <div className="client-profile-avatar">
              DM
            </div>
            <div className="client-profile-info">
              <h3>Danniels Martel Neira</h3>
              <p>Reclutador local • Huánuco</p>
            </div>
          </div>
          <div className="client-stats-grid">
            <div className="client-stat-box">
              <span className="client-stat-val">{jobs.filter(j => j.status === "Activo").length}</span>
              <span className="client-stat-lbl">Puestos Activos</span>
            </div>
            <div className="client-stat-box">
              <span className="client-stat-val">{jobs.reduce((acc, curr) => acc + curr.applicants, 0)}</span>
              <span className="client-stat-lbl">Postulantes</span>
            </div>
            <div className="client-stat-box">
              <span className="client-stat-val">{activeApplicationsCount}</span>
              <span className="client-stat-lbl">Alertas</span>
            </div>
          </div>
        </div>

        <div className="bento-card-client span-8 notification-banner-wrapper">
          <div className="bento-card-title">
            <Bell size={18} style={{ color: "#0284c7" }} />
            <span>Alertas de Postulación Recientes</span>
          </div>
          <div className="notification-list">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`notification-item ${notif.status === "accepted" ? "accepted" : notif.status === "rejected" ? "rejected" : ""}`}
              >
                <div className="notification-content">
                  <div className="notification-title">
                    {notif.studentName}
                    <span className="match-badge">Match: {notif.matchPercentage}%</span>
                  </div>
                  <div className="notification-desc">
                    {notif.specialty} aplicó a <strong>{notif.jobTitle}</strong> • {notif.time}
                  </div>
                </div>
                <div className="notification-actions">
                  {notif.status === "pending" ? (
                    <>
                      <button
                        className="notif-btn-accept"
                        onClick={() => handleNotificationAction(notif.id, "accepted")}
                      >
                        Aceptar
                      </button>
                      <button
                        className="notif-btn-reject"
                        onClick={() => handleNotificationAction(notif.id, "rejected")}
                      >
                        Archivar
                      </button>
                    </>
                  ) : (
                    <span className={`notif-status-badge ${notif.status === "accepted" ? "accepted" : "rejected"}`}>
                      {notif.status === "accepted" ? "Aceptado" : "Archivado"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bento-card-client span-8">
          {!cdtCandidates ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", textAlign: "center", padding: "2rem" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Sparkles size={32} style={{ color: "#64748b" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>
                CdT3k - Captador de Trabajadores 3000
              </h3>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "#ffe4e6", color: "#9f1239", fontSize: "0.75rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#e11d48", display: "inline-block" }} />
                ESTADO: INACTIVO
              </div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", maxWidth: "460px", lineHeight: "1.6" }}>
                El escáner está listo. Abre el Chat de Soporte de Lucy en la esquina inferior y solicita perfiles específicos (ej. <em>"Busco programador Next.js"</em> o haz click en los filtros rápidos del chat) para iniciar el filtrado algorítmico de perfiles.
              </p>
            </div>
          ) : (
            <>
              <div className="bento-card-title" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Sparkles size={18} style={{ color: "#0284c7" }} />
                  <span>CdT3k - {cdtCandidates.length} Candidatos Universitarios Identificados</span>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "#d1fae5", color: "#065f46", fontSize: "0.75rem", fontWeight: "700" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }} />
                  Solicitud Correcta.
                </div>
              </div>

              <div className="search-filter-row" style={{ marginTop: "1rem" }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    type="text"
                    className="search-input-client"
                    placeholder="Buscar por nombre o habilidad en los resultados..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="select-filter-client"
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                >
                  <option value="Todos">Todas las Especialidades</option>
                  <option value="Ingeniería de Software">Ingeniería de Software</option>
                  <option value="Ingeniería Informática">Ingeniería Informática</option>
                  <option value="Ciencia de la Computación">Ciencia de la Computación</option>
                  <option value="Enfermería">Enfermería</option>
                  <option value="Repostería">Repostería</option>
                  <option value="Ingeniería Civil">Ingeniería Civil</option>
                  <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                  <option value="Diseño Gráfico">Diseño Gráfico</option>
                </select>
              </div>

              <table className="client-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Match</th>
                    <th>Especialidad</th>
                    <th>Habilidades (Skills)</th>
                  </tr>
                </thead>
                <tbody>
                  {cdtCandidates
                    .filter(student => {
                      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        student.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
                      const matchesSpecialty = specialtyFilter === "Todos" || student.specialty === specialtyFilter;
                      return matchesSearch && matchesSpecialty;
                    })
                    .map((student, idx) => (
                      <tr key={idx} onClick={() => setSelectedStudent(student)}>
                        <td><strong>{student.name}</strong></td>
                        <td>
                          <span className="match-badge" style={{ margin: 0 }}>
                            {student.matchPercentage}% Match
                          </span>
                        </td>
                        <td>{student.specialty} • {student.cycle}</td>
                        <td>
                          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                            {student.skills.map(skill => (
                              <span key={skill} className="pill-skill">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="bento-card-client span-4">
          <div className="bento-card-title" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Briefcase size={18} style={{ color: "#0284c7" }} />
              <span>Mis Trabajos Publicados</span>
            </div>
            <button
              className="btn-primary-client"
              style={{ padding: "0.25rem 0.5rem", borderRadius: "6px", fontSize: "0.75rem" }}
              onClick={() => setIsNewJobOpen(true)}
            >
              <Plus size={14} />
              Publicar
            </button>
          </div>

          <table className="client-table" style={{ fontSize: "0.8rem" }}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Postulantes</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr key={idx}>
                  <td><strong>{job.title}</strong></td>
                  <td>{job.applicants}</td>
                  <td>
                    <span className={`pill-status ${job.status === "Activo" ? "active" : "inactive"}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bento-card-client span-6">
          <div className="bento-card-title">
            <Sparkles size={18} style={{ color: "#0284c7" }} />
            <span>Actividad del Embudo de Selección</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                <span>Postulaciones Totales</span>
                <span>22 Alumnos</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#0284c7" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                <span>Entrevistas Programadas</span>
                <span>8 Coordinadas</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "36%", height: "100%", backgroundColor: "#f59e0b" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                <span>Estudiantes Contratados</span>
                <span>4 Confirmados</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "18%", height: "100%", backgroundColor: "#10b981" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card-client span-6">
          <div className="bento-card-title">
            <Filter size={18} style={{ color: "#0284c7" }} />
            <span>Saturación por Especialidad</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                <span>Ingeniería de Software / Sistemas</span>
                <span>12 Alumnos (54%)</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "54%", height: "100%", backgroundColor: "#0284c7" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                <span>Repostería / Cocina</span>
                <span>6 Alumnos (27%)</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "27%", height: "100%", backgroundColor: "#ea580c" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                <span>Ingeniería Civil</span>
                <span>4 Alumnos (18%)</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ width: "18%", height: "100%", backgroundColor: "#64748b" }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {selectedStudent && (
        <div className="drawer-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Detalles del Estudiante</h3>
              <button className="drawer-close" onClick={() => setSelectedStudent(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="student-detail-profile">
                <div className="detail-avatar-large">
                  {selectedStudent.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="detail-info-center">
                  <h2>{selectedStudent.name}</h2>
                  <p>{selectedStudent.specialty} • {selectedStudent.cycle}</p>
                </div>
                <div>
                  <h4 className="detail-section-title">Sobre mí</h4>
                  <div className="detail-section-content">
                    {selectedStudent.bio}
                  </div>
                </div>
                <div>
                  <h4 className="detail-section-title">Habilidades Técnicas</h4>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    {selectedStudent.skills.map(s => (
                      <span key={s} className="pill-skill" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="detail-section-title">Universidad de Procedencia</h4>
                  <div className="detail-section-content">
                    Universidad de Huánuco (UDH) • Campus Central Huánuco
                  </div>
                </div>
              </div>
            </div>
            <div className="drawer-footer">
              <button
                className="btn-primary-client"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => handleSendProposal(selectedStudent.name)}
              >
                Enviar Propuesta de Trabajo
              </button>
              <button
                className="notif-btn-reject"
                style={{ flex: 0.5 }}
                onClick={() => setSelectedStudent(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isNewJobOpen && (
        <div className="drawer-overlay" onClick={() => setIsNewJobOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Publicar Nueva Vacante</h3>
              <button className="drawer-close" onClick={() => setIsNewJobOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateJob} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div className="drawer-body">
                <div className="form-group-client">
                  <label>Título del Puesto</label>
                  <input
                    type="text"
                    placeholder="Ej. Desarrollador Web Junior"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-client">
                  <label>Área de Especialidad</label>
                  <select
                    value={newJobArea}
                    onChange={(e) => setNewJobArea(e.target.value)}
                  >
                    <option value="Sistemas">Sistemas / Software</option>
                    <option value="Repostería">Repostería / Cocina</option>
                    <option value="Civil">Ingeniería Civil</option>
                    <option value="Enfermería">Enfermería / Salud</option>
                    <option value="Industrial">Ingeniería Industrial</option>
                    <option value="Diseño">Diseño Gráfico / Social Media</option>
                  </select>
                </div>
                <div className="form-group-client">
                  <label>Estado Inicial</label>
                  <select
                    value={newJobStatus}
                    onChange={(e) => setNewJobStatus(e.target.value)}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo (Cerrado)">Inactivo</option>
                  </select>
                </div>
                <div className="form-group-client">
                  <label>Descripción del Trabajo</label>
                  <textarea
                    rows={4}
                    placeholder="Describe brevemente las tareas del puesto y la remuneración estimada..."
                  />
                </div>
              </div>
              <div className="drawer-footer">
                <button
                  type="submit"
                  className="btn-primary-client"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Confirmar Publicación
                </button>
                <button
                  type="button"
                  className="notif-btn-reject"
                  style={{ flex: 0.5 }}
                  onClick={() => setIsNewJobOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

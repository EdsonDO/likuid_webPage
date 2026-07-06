"use client";

import { useEffect } from "react";
import Link from "next/link";
import logotipoBlackLikuid from "@/assets/images/logotipo_black_likuid.png";
import logoImage from "@/assets/images/logo.png";
import PillNav from "@/assets/components/design_elements/pill-nav/PillNav";
import "./landing.css";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("line-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const titleContainers = document.querySelectorAll(".section-title-container");
    titleContainers.forEach((el) => observer.observe(el));

    return () => {
      titleContainers.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="landing-page-body">
      <PillNav
        logo={logotipoBlackLikuid.src}
        logoAlt="Likuid Logo Black"
        items={[
          { label: 'Inicio de Sesión', href: '/login' },
          { label: 'Creación de Cuenta', href: '/login' }
        ]}
        activeHref="/"
        baseColor="#ffffff"
        pillColor="#000000"
        hoveredPillTextColor="#000000"
        pillTextColor="#ffffff"
        ease="power2.easeOut"
        initialLoadAnimation
      />

      <div className="hero-wrapper">
        <div className="hero-text-content">
          <section className="landing-hero" style={{ margin: 0 }}>
            <h1>
              <span style={{ display: "block", marginBottom: "0.5rem", whiteSpace: "nowrap" }}>
                Vinculación <span className="highlight-font">Sociolaboral</span>
              </span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                Mentoría <span className="highlight-font">Universitaria</span>
              </span>
            </h1>
            <p style={{ marginTop: "1.5rem" }}>
              Conectando el conocimiento técnico universitario con las necesidades de digitalización de las MyPes de la región de Huánuco.
            </p>
            <div className="hero-ctas">
              <Link href="/login" className="cta-button cta-primary">
                Buscar Talento
              </Link>
              <Link href="/login" className="cta-button cta-secondary">
                Explorar Oportunidades
              </Link>
            </div>
          </section>
        </div>
        
        <div className="hero-visual-content">
          <div className="logo-container-hero">
            <img 
              src={logoImage.src} 
              className="logo-image" 
              alt="Likuid Seal Logo Glow" 
            />
          </div>
        </div>
      </div>

      <div id="proposito" className="section-title-container">
        <h2 className="section-title">
          Por qué <span className="highlight-font-title">lo hacemos</span>
        </h2>
        <div className="title-line"></div>
      </div>

      <section className="landing-section-content">
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "#888888" }}>
          El diagnóstico inicial en la <strong>Universidad de Huánuco (UDH)</strong> detectó que los estudiantes enfrentan una alta vulnerabilidad socioeconómica y necesitan generar ingresos flexibles. Sin embargo, las ofertas laborales tradicionales imponen jornadas rígidas de 8 horas que sabotean el rendimiento académico y elevan notablemente el riesgo de deserción escolar.
        </p>
        <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem", color: "#888888" }}>
          En paralelo, las microempresas de la región necesitan digitalización y soporte técnico urgente, pero recurren a la informalidad o a la inacción por la falta de un canal seguro y centralizado para encontrar talento disponible.
        </p>
        <div style={{ 
          background: "rgba(255, 255, 255, 0.02)", 
          border: "1px solid rgba(255, 255, 255, 0.06)", 
          padding: "1.5rem 2rem", 
          borderRadius: "12px",
          color: "#ffffff",
          fontWeight: "500",
          fontSize: "1.05rem",
          lineHeight: "1.6",
          maxWidth: "850px"
        }}>
          "Existimos para resolver esta desarticulación, permitiendo que el conocimiento técnico actúe como un motor de reactivación económica local sin perjudicar los estudios de nadie."
        </div>
      </section>

      <div className="section-title-container">
        <h2 className="section-title">
          Qué <span className="highlight-font-title">ofrecemos</span>
        </h2>
        <div className="title-line"></div>
      </div>

      <section className="grid-container">
        <div className="feature-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Portafolio de Habilidades</h3>
          <p>
            Un repositorio digital donde los estudiantes cargan sus proyectos académicos, enlaces a repositorios Git y evidencias técnicas verificadas interciclos para construir un historial profesional transparente.
          </p>
        </div>

        <div className="feature-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
            </svg>
          </div>
          <h3>Motor de Emparejamiento</h3>
          <p>
            Un sistema de búsqueda avanzada con filtros dinámicos (por carrera, ciclo académico y habilidades técnicas específicas) para que las MyPes localicen con precisión el perfil exacto que necesitan sin intermediarios.
          </p>
        </div>

        <div className="feature-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Mensajería Directa</h3>
          <p>
            Un canal síncrono de comunicación en tiempo real diseñado para coordinar requerimientos del servicio, programar entregas y resolver dudas de soporte técnico de manera ágil y fluida.
          </p>
        </div>

        <div className="feature-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3>Gobernanza y Reputación</h3>
          <p>
            Un sistema inmutable de calificaciones y reseñas cualitativas recíprocas post-servicio que mitiga la desconfianza transaccional y asegura el compromiso y seriedad de ambas partes.
          </p>
        </div>
      </section>

      <div className="section-title-container">
        <h2 className="section-title">
          Garantías <span className="highlight-font-title">de Ingeniería</span>
        </h2>
        <div className="title-line"></div>
      </div>

      <section className="grid-container">
        <div className="convince-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3>Identidad Institucional</h3>
          <p>
            Acceso estrictamente federado mediante protocolo OAuth 2.0 y limitado exclusivamente a estudiantes con el dominio de correo institucional <code>@udh.edu.pe</code>, bloqueando el acceso a perfiles falsos.
          </p>
        </div>

        <div className="convince-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="9" y1="22" x2="9" y2="16"></line>
              <line x1="15" y1="22" x2="15" y2="16"></line>
              <line x1="9" y1="16" x2="15" y2="16"></line>
              <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"></path>
            </svg>
          </div>
          <h3>Validación de Clientes</h3>
          <p>
            Las microempresas y clientes externos deben registrar de manera obligatoria su número de RUC vigente (validado con las reglas de SUNAT) para publicar ofertas y contratar servicios.
          </p>
        </div>

        <div className="convince-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3>Protección de Datos</h3>
          <p>
            Toda información personal y las interacciones se rigen bajo el cumplimiento irrestricto de la Ley N° 29733 (Ley de Protección de Datos Personales en el Perú), aplicando cifrado AES-256 en base de datos.
          </p>
        </div>

        <div className="convince-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 17.5L3 6m0 0l3-3 11.5 11.5m-14.5-8.5l3 3M13 19h8M17 15h4"></path>
            </svg>
          </div>
          <h3>Marco de Mediación</h3>
          <p>
            El Manual de Gobernanza establece un protocolo de arbitraje neutral para congelar transacciones y evaluar las evidencias del servicio ante cualquier disputa laboral surgida en un micro-trabajo.
          </p>
        </div>
      </section>

      <div className="section-title-container">
        <h2 className="section-title">
          Disponi<span className="highlight-font-title">bilidad</span>
        </h2>
        <div className="title-line"></div>
      </div>

      <section className="accessibility-section">
        <div className="accessibility-content">
          <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#ffffff" }}>Compatibilidad Multiplataforma</h3>
          <p style={{ color: "#888888", lineHeight: "1.7", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Likuid cuenta con una arquitectura web responsiva, optimizada para funcionar con fluidez en todas las plataformas y dispositivos necesarios en el campus y en el campo de trabajo:
          </p>
          <ul style={{ paddingLeft: "1.2rem", color: "#888888", lineHeight: "1.8", fontSize: "0.9rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Entorno Web:</strong> Optimizado para computadoras de escritorio y estaciones de trabajo dentro de los laboratorios físicos de computación de la UDH.
            </li>
            <li>
              <strong>Entorno Móvil:</strong> Interfaz adaptativa nativa para teléfonos inteligentes, permitiendo a los estudiantes monitorear notificaciones y responder llamadas de soporte al instante entre clases.
            </li>
          </ul>
        </div>
        <div className="accessibility-devices">
          <svg viewBox="0 0 200 120" width="100%" height="auto" style={{ maxWidth: "220px" }}>
            <rect x="10" y="10" width="120" height="75" rx="4" fill="#000000" stroke="#222222" strokeWidth="1.5" />
            <rect x="15" y="15" width="110" height="60" rx="2" fill="#0c0c0c" />
            <line x1="20" y1="65" x2="30" y2="65" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="40" y1="65" x2="70" y2="65" stroke="#444444" strokeWidth="1.5" />
            <path d="M60 85 l-10 20 h40 l-10 -20 z" fill="#222222" />
            <rect x="40" y="105" width="60" height="3" fill="#222222" />
            
            <rect x="140" y="35" width="40" height="75" rx="6" fill="#000000" stroke="#444444" strokeWidth="1.5" />
            <rect x="144" y="42" width="32" height="60" rx="2" fill="#0c0c0c" />
            <circle cx="160" cy="106" r="2.5" fill="#444444" />
            <circle cx="160" cy="55" r="3.5" fill="#ffffff" />
            <rect x="150" y="65" width="20" height="2" fill="#888888" />
            <rect x="153" y="70" width="14" height="2" fill="#444444" />
          </svg>
        </div>
      </section>

      <div className="section-title-container">
        <h2 className="section-title">
          Roadmap <span className="highlight-font-title">Ecosistémico</span>
        </h2>
        <div className="title-line"></div>
      </div>

      <section className="landing-section-content" style={{ marginBottom: "4rem" }}>
        <p style={{ textAlign: "left", color: "#888888", marginBottom: "3rem", fontSize: "1.1rem" }}>
          Likuid tiene como fin supremo el beneficio y desarrollo socioeconómico de la comunidad universitaria y regional, estructurando sus sprints sobre un modelo social libre de fines de lucro.
        </p>

        <div className="timeline">
          <div className="timeline-item active">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>Etapa 1: Cimentación y Despliegue del Core (Actual)</h4>
              <p>
                Implementación inicial del núcleo de vinculación sociolaboral, motor de emparejamiento básico y repositorio microscópico de perfiles académicos, enfocado en las carreras de Ingeniería de Sistemas e Informática.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>Etapa 2: Expansión Interfacultades</h4>
              <p>
                Apertura y diversificación de las categorías de servicios para integrar habilidades técnicas de otras escuelas profesionales (Administración, Negocios, Contabilidad, Derecho), ampliando la oferta de digitalización hacia las MyPes.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>Etapa 3: Educación y Capacitación Comercial</h4>
              <p>
                Despliegue de programas formativos obligatorios integrados sobre costos, presupuestos and trámites tributarios peruanos (como la emisión de Recibos por Honorarios Electrónicos), reduciendo la brecha comercial del estudiante independiente.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>Etapa 4: Sostenibilidad Reinvestida</h4>
              <p>
                Establecimiento de la infraestructura para el <strong>Fondo Semilla Institucional</strong> de la UDH. Todo excedente o balance financiero se destina exclusivamente a financiar, bajo auditoría y comités técnicos transparentes, las mejores iniciativas tecnológicas y proyectos de innovación de los propios estudiantes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

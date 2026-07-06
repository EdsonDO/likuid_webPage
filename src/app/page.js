"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import logotipoBlackLikuid from "@/assets/images/logotipo_black_likuid.png";
import logotipoLikuid from "@/assets/images/logotipo_likuid.png";
import logoImage from "@/assets/images/logo.png";
import logoBlack from "@/assets/images/logo_black.png";
import PillNav from "@/assets/components/design_elements/pill-nav/PillNav";
import LiquidChrome from "@/assets/components/design_elements/liquid-chrome/LiquidChrome";
import "./landing.css";

const LIQUID_CHROME_COLOR = [0.05, 0.45, 0.75];

const PILL_NAV_ITEMS = [
  { label: 'Inicio de Sesión', href: '/login' },
  { label: 'Creación de Cuenta', href: '/login' }
];

function TypewriterText({ text, speed = 10, delay = 0, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const containerRef = useRef(null);
  const hasStarted = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping || hasStarted.current) return;
    hasStarted.current = true;

    let index = 0;
    let timer;
    
    const runTyping = () => {
      timer = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(timer);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, speed);
    };

    const delayTimer = setTimeout(runTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [startTyping, text, speed, delay]);

  return <span ref={containerRef}>{displayedText}</span>;
}

export default function LandingPage() {
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const [activeFeature, setActiveFeature] = useState(0);
  const [activeGuarantee, setActiveGuarantee] = useState(0);

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

    const handleTimelineScroll = () => {
      const timeline = document.querySelector(".timeline");
      const progressLine = document.querySelector(".timeline-progress-line");
      if (!timeline || !progressLine) return;
      
      const rect = timeline.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const start = rect.top - viewHeight * 0.7;
      const total = rect.height;
      const scrolled = -start;
      
      let progress = Math.max(0, Math.min(100, (scrolled / total) * 110));
      progressLine.style.height = `${progress}%`;
      
      const items = document.querySelectorAll(".timeline-item");
      items.forEach((item, idx) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < viewHeight * 0.6) {
          item.classList.add("filled");
        } else {
          item.classList.remove("filled");
        }
      });
    };

    window.addEventListener("scroll", handleTimelineScroll);

    return () => {
      titleContainers.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleTimelineScroll);
    };
  }, []);

  const features = [
    {
      title: "Portafolio de Habilidades",
      desc: "Un repositorio digital donde los estudiantes cargan sus proyectos académicos, enlaces a repositorios Git y evidencias técnicas verificadas interciclos para construir un historial profesional transparente.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      title: "Motor de Emparejamiento",
      desc: "Un sistema de búsqueda avanzada con filtros dinámicos (por carrera, ciclo académico y habilidades técnicas específicas) para que las MyPes localicen con precisión el perfil exacto que necesitan sin intermediarios.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
        </svg>
      )
    },
    {
      title: "Mensajería Directa",
      desc: "Un canal síncrono de comunicación en tiempo real diseñado para coordinar requerimientos del servicio, programar entregas y resolver dudas de soporte técnico de manera ágil y fluida.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      title: "Gobernanza y Reputación",
      desc: "Un sistema inmutable de calificaciones y reseñas cualitativas recíprocas post-servicio que mitiga la desconfianza transaccional y asegura el compromiso y seriedad de ambas partes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  const guarantees = [
    {
      title: "Identidad Institucional",
      desc: "Acceso estrictamente federado mediante protocolo OAuth 2.0 y limitado exclusivamente a estudiantes con el dominio de correo institucional @udh.edu.pe, bloqueando el acceso a perfiles falsos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    },
    {
      title: "Validación de Clientes",
      desc: "Las microempresas y clientes externos deben registrar de manera obligatoria su número de RUC vigente (validado con las reglas de SUNAT) para publicar ofertas y contratar servicios.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <line x1="9" y1="22" x2="9" y2="16"></line>
          <line x1="15" y1="22" x2="15" y2="16"></line>
          <line x1="9" y1="16" x2="15" y2="16"></line>
          <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"></path>
        </svg>
      )
    },
    {
      title: "Protección de Datos",
      desc: "Toda información personal y las interacciones se rigen bajo el cumplimiento irrestricto de la Ley N° 29733 (Ley de Protección de Datos Personales en el Perú), aplicando cifrado AES-256 en base de datos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      title: "Marco de Mediación",
      desc: "El Manual de Gobernanza establece un protocolo de arbitraje neutral para congelar transacciones y evaluar las evidencias del servicio ante cualquier disputa laboral surgida en un micro-trabajo.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 17.5L3 6m0 0l3-3 11.5 11.5m-14.5-8.5l3 3M13 19h8M17 15h4"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="landing-page-body">
      <div className="landing-header-bg-mask"></div>

      <PillNav
        logo={logotipoBlackLikuid.src}
        logoAlt="Likuid Logo Black"
        items={PILL_NAV_ITEMS}
        activeHref="/"
        baseColor="#ffffff"
        pillColor="#000000"
        hoveredPillTextColor="#000000"
        pillTextColor="#ffffff"
        ease="power2.easeOut"
        initialLoadAnimation
      />

      <div className="landing-main-layout">
        <div className="landing-content-col">
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
                <p className="typing-paragraph" style={{ marginTop: "1.5rem" }}>
                  <TypewriterText 
                    text="Conectando el conocimiento técnico universitario con las necesidades de digitalización de las MyPes de la región de Huánuco." 
                    speed={8}
                    onComplete={() => setShowTestimonial(true)}
                  />
                  {!showTestimonial && <span className="typing-cursor">|</span>}
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
                  className="logo-image logo-normal" 
                  alt="Likuid Seal Logo Glow" 
                />
                <img 
                  src={logoBlack.src} 
                  className="logo-image logo-hover-variant" 
                  alt="Likuid Seal Logo Black" 
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
            <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
              El diagnóstico inicial en la <strong>Universidad de Huánuco (UDH)</strong> detectó que los estudiantes enfrentan una alta vulnerabilidad socioeconómica y necesitan generar ingresos flexibles. Sin embargo, las ofertas laborales tradicionales imponen jornadas rígidas de 8 horas que sabotean el rendimiento académico y elevan notablemente el riesgo de deserción escolar.
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem" }}>
              En paralelo, las microempresas de la región necesitan digitalización y soporte técnico urgente, pero recurren a la informalidad o a la inacción por la falta de un canal seguro y centralizado para encontrar talento disponible.
            </p>
            <div style={{ 
              background: "rgba(255, 255, 255, 0.02)", 
              border: "1px solid rgba(255, 255, 255, 0.06)", 
              padding: "2rem", 
              borderRadius: "12px",
              color: "#ffffff",
              fontWeight: "500",
              fontSize: "1.05rem",
              lineHeight: "1.6",
              maxWidth: "850px",
              minHeight: "120px",
              position: "relative"
            }}>
              {showTestimonial && (
                <p className="typing-quote">
                  "
                  <TypewriterText 
                    text="Existimos para resolver esta desarticulación, permitiendo que el conocimiento técnico actúe como un motor de reactivación económica local sin perjudicar los estudios de nadie." 
                    speed={8}
                    onComplete={() => setShowSignature(true)}
                  />
                  "
                  {!showSignature && <span className="typing-cursor">|</span>}
                </p>
              )}
              {showSignature && (
                <div className="signature-container" style={{ marginTop: "1.5rem", textAlign: "right" }}>
                  <span style={{ color: "#888888", fontSize: "0.95rem" }}>
                    - Danniels R. M. N. (Líder del Proyecto <span className="highlight-font" style={{ fontSize: "1.1rem" }}>Likuid</span>)
                  </span>
                </div>
              )}
            </div>
          </section>

          <div className="section-title-container">
            <h2 className="section-title">
              Qué <span className="highlight-font-title">ofrecemos</span>
            </h2>
            <div className="title-line"></div>
          </div>

          <section className="accordion-wrapper-section">
            <div className="horizontal-accordion">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className={`accordion-panel ${activeFeature === idx ? "expanded" : "collapsed"}`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <div className="panel-header">
                    <span className="panel-number">0{idx + 1}</span>
                    <div className="panel-icon">{item.icon}</div>
                    <h3 className="panel-title">{item.title}</h3>
                  </div>
                  <div className="panel-body">
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="section-title-container">
            <h2 className="section-title">
              Garantías <span className="highlight-font-title">de Ingeniería</span>
            </h2>
            <div className="title-line"></div>
          </div>

          <section className="accordion-wrapper-section">
            <div className="horizontal-accordion">
              {guarantees.map((item, idx) => (
                <div
                  key={idx}
                  className={`accordion-panel guarantee-panel ${activeGuarantee === idx ? "expanded" : "collapsed"}`}
                  onClick={() => setActiveGuarantee(idx)}
                >
                  <div className="panel-header">
                    <span className="panel-number">0{idx + 1}</span>
                    <div className="panel-icon">{item.icon}</div>
                    <h3 className="panel-title">{item.title}</h3>
                  </div>
                  <div className="panel-body">
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="section-title-container">
            <h2 className="section-title">
              Disponibilidad <span className="highlight-font-title">Multiplataforma</span>
            </h2>
            <div className="title-line"></div>
          </div>

          <section className="accessibility-section">
            <div className="accessibility-content">
              <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#ffffff" }}>Compatibilidad Multiplataforma</h3>
              <p style={{ color: "#cccccc", lineHeight: "1.7", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Likuid cuenta con una arquitectura web responsiva, optimizada para funcionar con fluidez en todas las plataformas y dispositivos necesarios en el campus y en el campo de trabajo:
              </p>
              <ul style={{ paddingLeft: "1.2rem", color: "#cccccc", lineHeight: "1.8", fontSize: "0.9rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Entorno Web:</strong> Optimizado para computadoras de escritorio y estaciones de trabajo dentro de los laboratorios físicos de computación de la UDH.
                </li>
                <li>
                  <strong>Entorno Móvil:</strong> Interfaz adaptativa nativa para teléfonos inteligentes, permitiendo a los estudiantes monitorear notificaciones y responder llamadas de soporte al instante entre clases.
                </li>
              </ul>
            </div>
            <div className="devices-perspective-container">
              <div className="device-monitor">
                <div className="monitor-screen">
                  <div className="monitor-top-bar"></div>
                  <div className="monitor-content-mockup">
                    <div className="mock-nav"></div>
                    <div className="mock-grid">
                      <div className="mock-box"></div>
                      <div className="mock-box"></div>
                      <div className="mock-box"></div>
                    </div>
                  </div>
                </div>
                <div className="monitor-stand"></div>
                <div className="monitor-base"></div>
              </div>
              <div className="device-phone">
                <div className="phone-screen">
                  <div className="phone-notch"></div>
                  <div className="phone-content-mockup">
                    <div className="phone-mock-logo"></div>
                    <div className="phone-mock-lines">
                      <div className="phone-line"></div>
                      <div className="phone-line"></div>
                      <div className="phone-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="section-title-container">
            <h2 className="section-title">
              Roadmap <span className="highlight-font-title">Ecosistémico</span>
            </h2>
            <div className="title-line"></div>
          </div>

          <section className="landing-section-content" style={{ marginBottom: "4rem" }}>
            <p style={{ textAlign: "left", color: "#cccccc", marginBottom: "3rem", fontSize: "1.1rem" }}>
              Likuid tiene como fin supremo el beneficio y desarrollo socioeconómico de la comunidad universitaria y regional, estructurando sus sprints sobre un modelo social libre de fines de lucro.
            </p>

            <div className="timeline">
              <div className="timeline-track-line"></div>
              <div className="timeline-progress-line"></div>

              <div className="timeline-item">
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

        <div className="landing-sidebar-col">
          <div className="sidebar-chrome-wrapper">
            <LiquidChrome
              baseColor={LIQUID_CHROME_COLOR}
              speed={0.2}
              amplitude={0.41}
              interactive
            />
          </div>
        </div>
      </div>

      <footer className="global-footer">
        <div className="footer-container">
          <div className="footer-brand-section">
            <img src={logotipoLikuid.src} alt="Likuid logotipo" className="footer-logo" />
            <p className="footer-desc">
              Plataforma de vinculación sociolaboral y mentoría universitaria de la Universidad de Huánuco. Conectando talento técnico académico con la digitalización de las MyPes locales.
            </p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Recursos</h4>
              <ul>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/login">Portal Estudiantes</Link></li>
                <li><Link href="/login">Portal Reclutadores</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/forgot-password">Términos de Servicio</Link></li>
                <li><Link href="/forgot-password">Política de Privacidad</Link></li>
                <li><Link href="/forgot-password">Manual de Gobernanza</Link></li>
              </ul>
            </div>
            <div className="footer-column-reclamaciones">
              <h4>Atención</h4>
              <Link href="/forgot-password" className="libro-reclamaciones-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                Libro de Reclamaciones
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Likuid. Todos los derechos reservados. Universidad de Huánuco.</p>
        </div>
      </footer>
    </div>
  );
}

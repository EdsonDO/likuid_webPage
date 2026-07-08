import Link from "next/link";
import StaggeredMenuIntegration from "@/assets/components/design_elements/StaggeredMenu/StaggeredMenuWrapper";
import logotipoLikuid from "@/assets/images/logotipo_likuid.png";
import { AIChatbot } from "@/assets/components/design_elements/AIChatbot/AIChatbot";

export default function ClientLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#ffffff", color: "#111111" }}>
      <StaggeredMenuIntegration />
      <AIChatbot />

      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 30,
        padding: "2.5rem 2rem 1rem 2rem",
        pointerEvents: "auto"
      }}>
        <Link href="/login" className="student-logout-btn">
          Cerrar Sesión
        </Link>
      </div>

      <main style={{ flex: 1, paddingTop: "7.5rem", paddingLeft: "4rem", paddingRight: "4rem", paddingBottom: "2rem" }}>
        {children}
      </main>

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
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/login">Portal Estudiantes</Link></li>
                <li><Link href="/login">Portal Reclutadores</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
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

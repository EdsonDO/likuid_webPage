import { BallpitBackground } from "../components/ballpit-background";
import { RegisterForm } from "../components/RegisterForm";
import logoImage from "@/assets/images/logo.png";
import "../login-shared.css";

export default function RegisterPage() {
  return (
    <div className="login-page-container">
      <BallpitBackground variant="login" count={45} />

      <main className="login-card">
        <section className="login-left-panel">
          <div className="login-left-bg" />

          <div className="login-left-branding">
            <div className="login-left-logo-wrapper">
              <img
                src={logoImage.src}
                alt="Likuid Logo"
                className="login-left-logo"
              />
            </div>
          </div>

          <div className="login-left-footer">
            <p>Conectando Talento y Empresa</p>
          </div>
        </section>

        <section className="login-right-panel">
          <div className="mobile-branding-container">
            <span className="mobile-branding-text">LIKUID</span>
          </div>

          <RegisterForm />
        </section>
      </main>
    </div>
  );
}

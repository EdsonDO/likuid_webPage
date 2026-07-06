"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main>
      <h1>Olvidé mi Contraseña</h1>
      <p>Introduce tu correo electrónico para enviarte un enlace de recuperación.</p>
      
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px", marginBottom: "1.5rem" }}>
        <label>
          Correo electrónico:
          <input type="email" placeholder="correo@ejemplo.com" required style={{ width: "100%", padding: "0.25rem" }} />
        </label>
        <button type="submit" style={{ padding: "0.5rem" }}>Recuperar Contraseña</button>
      </form>

      <nav>
        <ul>
          <li>
            <Link href="/login">Volver al Login</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

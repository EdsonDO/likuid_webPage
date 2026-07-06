"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1>Iniciar Sesión</h1>
      <p>Introduce tus credenciales para acceder a Likuid.</p>
      
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px", marginBottom: "1.5rem" }}>
        <label>
          Correo electrónico:
          <input type="email" placeholder="correo@ejemplo.com" required style={{ width: "100%", padding: "0.25rem" }} />
        </label>
        <label>
          Contraseña:
          <input type="password" placeholder="••••••••" required style={{ width: "100%", padding: "0.25rem" }} />
        </label>
        <button type="submit" style={{ padding: "0.5rem" }}>Iniciar Sesión (Mock)</button>
      </form>

      <nav>
        <ul>
          <li>
            <Link href="/forgot-password">Olvidé la contraseña</Link>
          </li>
          <li>
            <Link href="/student">Simular Ingreso como Estudiante</Link>
          </li>
          <li>
            <Link href="/client">Simular Ingreso como Cliente</Link>
          </li>
          <li>
            <Link href="/">Volver a Inicio (Landing Page)</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

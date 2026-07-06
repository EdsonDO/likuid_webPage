import Link from "next/link";
import StaggeredMenuIntegration from "@/assets/components/design_elements/StaggeredMenu/StaggeredMenuWrapper";

export default function StudentLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <StaggeredMenuIntegration />
      <header style={{ borderBottom: "1px solid #ccc", paddingBottom: "1rem", marginBottom: "1rem" }}>
        <h2>Likuid - Estudiante</h2>
        <nav>
          <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none", padding: 0 }}>
            <li>
              <Link href="/student">Inicio</Link>
            </li>
            <li>
              <Link href="/student/portfolio">Portafolio</Link>
            </li>
            <li>
              <Link href="/student/reviews">Reseñas</Link>
            </li>
            <li>
              <Link href="/student/requests">Solicitudes</Link>
            </li>
            <li>
              <Link href="/student/jobs">Trabajos</Link>
            </li>
            <li>
              <Link href="/student/teams">Equipos</Link>
            </li>
            <li style={{ marginLeft: "auto" }}>
              <Link href="/login" style={{ color: "red" }}>Cerrar Sesión</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <footer style={{ borderTop: "1px solid #ccc", marginTop: "2rem", paddingTop: "1rem", fontSize: "0.875rem", color: "#666" }}>
        <p>&copy; {new Date().getFullYear()} Likuid - Vinculación Sociolaboral Universitaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

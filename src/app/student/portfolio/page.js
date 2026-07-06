import { StarIcon } from "@/assets/components/Icons";

export default function StudentPortfolioPage() {
  return (
    <div>
      <h1>Portafolio de Estudiante</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Información General</h3>
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Especialidad:</strong> Ingeniería de Software</p>
        <p><strong>Ciclo:</strong> 8vo Ciclo</p>
        <p><strong>Descripción:</strong> Apasionado por el desarrollo web y la arquitectura de software.</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Carrusel de Trabajos Destacados (Mock)</h3>
        <div style={{ border: "1px solid #ccc", padding: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <button style={{ padding: "0.5rem" }}>&lt; Anterior</button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <h4>Proyecto 1: Sistema de Inventario Inteligente</h4>
            <p>Implementación de un software de control de stock usando algoritmos predictivos.</p>
          </div>
          <button style={{ padding: "0.5rem" }}>Siguiente &gt;</button>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Listado de Repositorios (GitHub Mock)</h3>
        <ul>
          <li><strong>react-dashboard:</strong> Panel de control modular con React Router y Hooks. (<StarIcon size={12} /> 12)</li>
          <li><strong>neural-net-experiments:</strong> Red neuronal simple programada desde cero. (<StarIcon size={12} /> 8)</li>
          <li><strong>likuid-prototype:</strong> Prototipo frontend de Vinculación Sociolaboral. (<StarIcon size={12} /> 1)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Gráfico de Habilidades (Mock)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}>
          <div>
            <span>JavaScript / TypeScript:</span>
            <div style={{ background: "#eee", width: "100%", height: "10px" }}>
              <div style={{ background: "#333", width: "90%", height: "100%" }}></div>
            </div>
          </div>
          <div>
            <span>Next.js / React:</span>
            <div style={{ background: "#eee", width: "100%", height: "10px" }}>
              <div style={{ background: "#333", width: "85%", height: "100%" }}></div>
            </div>
          </div>
          <div>
            <span>SQL / NoSQL Databases:</span>
            <div style={{ background: "#eee", width: "100%", height: "10px" }}>
              <div style={{ background: "#333", width: "70%", height: "100%" }}></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3>Métodos de Contacto</h3>
        <ul>
          <li><strong>Correo:</strong> juan.perez@universidad.edu</li>
          <li><strong>LinkedIn:</strong> linkedin.com/in/juan-perez-mock</li>
          <li><strong>GitHub:</strong> github.com/juanperez-mock</li>
        </ul>
      </section>
    </div>
  );
}

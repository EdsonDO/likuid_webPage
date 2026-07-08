import { PageTransition } from "@/assets/components/design_elements/PageTransition";
import "./globals.css";

export const metadata = {
  title: "Likuid - Plataforma de Vinculación Sociolaboral",
  description: "Plataforma de Vinculación Sociolaboral y Mentoría Universitaria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

import { Home, User, Star, FileText, Briefcase, Users, Settings, LogOut } from "lucide-react";

export interface NavigationConfig {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    title: string;
    url: string;
    icon?: any;
    items?: { title: string; url: string }[];
  }[];
  systemNav: {
    title: string;
    url: string;
    icon?: any;
  }[];
}

export function getSidebarConfig(role = "student"): NavigationConfig {
  return {
    user: {
      name: "Edson Solo",
      email: "edson.solo@likuid.edu.pe",
      avatar: ""
    },
    navMain: [
      { 
        title: "Inicio", 
        url: "/student", 
        icon: Home 
      },
      { 
        title: "Portafolio", 
        url: "/student/portfolio", 
        icon: User,
        items: [
          { title: "Mis Repositorios", url: "/student/portfolio#repos" },
          { title: "Habilidades", url: "/student/portfolio#skills" }
        ]
      },
      { 
        title: "Reseñas", 
        url: "/student/reviews", 
        icon: Star 
      },
      { 
        title: "Solicitudes", 
        url: "/student/requests", 
        icon: FileText 
      },
      { 
        title: "Trabajos", 
        url: "/student/jobs", 
        icon: Briefcase 
      },
      { 
        title: "Equipos", 
        url: "/student/teams", 
        icon: Users 
      }
    ],
    systemNav: [
      { title: "Configuración", url: "/settings", icon: Settings },
      { title: "Cerrar Sesión", url: "/login", icon: LogOut }
    ]
  };
}

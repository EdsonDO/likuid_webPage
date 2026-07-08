import { Home, User, Folder, Star, FileText, Briefcase, Users, Settings, LogOut, PlusCircle, Search, Mail } from "lucide-react";

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
  if (role === "client") {
    return {
      user: {
        name: "Danniels Martel Neira",
        email: "dannielsmn@gmail.com",
        avatar: ""
      },
      navMain: [
        { 
          title: "Inicio", 
          url: "/client", 
          icon: Home 
        },
        {
          title: "Publicar Trabajo",
          url: "/client#post-job",
          icon: PlusCircle
        },
        {
          title: "Buscar Talento",
          url: "/client#talent-search",
          icon: Search
        },
        {
          title: "Mensajes",
          url: "/client#messages",
          icon: Mail
        },
        {
          title: "Mi Empresa",
          url: "/client#company",
          icon: User
        }
      ],
      systemNav: [
        { title: "Configuración", url: "/settings", icon: Settings },
        { title: "Cerrar Sesión", url: "/login", icon: LogOut }
      ]
    };
  }

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
        title: "Perfil",
        url: "/student/profile",
        icon: User
      },
      { 
        title: "Portafolio", 
        url: "/student/portfolio", 
        icon: Folder,
        items: [
          { title: "Mis Repositorios", url: "/student/portfolio/repos" },
          { title: "Habilidades", url: "/student/portfolio/skills" }
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

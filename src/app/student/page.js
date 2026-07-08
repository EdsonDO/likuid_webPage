"use client";

import { useState } from "react";
import { 
  Image, 
  Video, 
  Calendar, 
  FileText, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Send,
  X 
} from "lucide-react";
import Link from "next/link";
import "./student-dashboard.css";

export default function StudentDashboardPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Municipalidad Provincial de Huánuco",
      avatarInitials: "M",
      avatarBg: "#16a34a",
      title: "Entidad Gubernamental • Huánuco",
      time: "Hace 2 horas",
      content: "¡Exitosa implementación del proyecto municipal Onekora! Queremos felicitar al alumno Edson Dionicio de la Universidad de Huánuco por liderar el desarrollo y despliegue del sistema móvil y administrativo para el trackeo de combustible y rutas de residuos sólidos. Ejemplar aporte tecnológico para nuestra provincia.",
      hashtags: "#Onekora #InnovacionSocial #UDH #HuanucoDigital",
      likes: 42,
      comments: 7,
      hasLiked: false
    },
    {
      id: 2,
      author: "Panadería & Pastelería Don Lucho",
      avatarInitials: "D",
      avatarBg: "#ea580c",
      title: "MYPE Local • Sector Alimentario",
      time: "Hace 5 horas",
      content: "Buscamos estudiante de Ingeniería de Sistemas / Computación para el desarrollo de un catálogo digital autogestionado. Es un proyecto de corta duración enfocado en permitir pedidos en línea para la zona céntrica. Proyecto remunerado y con opción a mentoría técnica. Aplicar directamente en la sección de Trabajos.",
      hashtags: "#TrabajoEstudiantil #DesarrolloWeb #MypesHuanuco",
      likes: 18,
      comments: 3,
      hasLiked: false
    },
    {
      id: 3,
      author: "Likuid Hub",
      avatarInitials: "L",
      avatarBg: "#0f172a",
      title: "Plataforma UDH • Administración",
      time: "Ayer",
      content: "¡Se abren las inscripciones para la Hackathon UDH 2026! Concursa junto a tus compañeros diseñando soluciones de software orientadas a digitalizar los procesos de venta, cobro o inventario de las MyPes huanuqueñas. Financiamiento directo para los prototipos ganadores y certificación oficial.",
      hashtags: "#Hackathon2026 #TalentoAcademico #VinculacionLaboral",
      likes: 56,
      comments: 12,
      hasLiked: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !post.hasLiked
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Edson Raul Dionicio Orihuela",
      avatarInitials: "ED",
      avatarBg: "#0284c7",
      title: "Estudiante UDH • Ingeniero de Software",
      time: "Ahora mismo",
      content: newPostContent,
      hashtags: "#LikuidProfile #ComunidadEstudiantil",
      likes: 0,
      comments: 0,
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsModalOpen(false);
  };

  return (
    <div className="feed-container">
      <div className="student-page-header">
        <h1>Inicio</h1>
        <p>Novedades, eventos y publicaciones de la comunidad sociolaboral</p>
      </div>

      <div className="feed-layout">
        {/* Columna Izquierda: Tarjeta Perfil Corto */}
        <aside className="feed-sidebar-left">
          <div className="feed-card">
            <div className="profile-sidebar-banner" />
            <div className="profile-sidebar-avatar-wrapper">
              <div className="avatar-circle">ED</div>
            </div>
            <div className="profile-sidebar-info">
              <h3 className="profile-sidebar-name">Edson Raul Dionicio</h3>
              <p className="profile-sidebar-title">Ingeniero de Software y de Sistemas / Fullstack</p>
            </div>
            <div className="profile-sidebar-stats">
              <div className="profile-stat-row">
                <span>Vistas de perfil</span>
                <span className="profile-stat-val">142</span>
              </div>
              <div className="profile-stat-row">
                <span>Impresiones del post</span>
                <span className="profile-stat-val">308</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Columna Centro: Feed de Novedades */}
        <main className="feed-main-content">
          {/* Share Box */}
          <div className="feed-card share-box">
            <div className="share-box-top">
              <div className="avatar-circle sm" style={{ backgroundColor: "#0284c7" }}>ED</div>
              <button 
                className="share-input-placeholder"
                onClick={() => setIsModalOpen(true)}
              >
                ¿De qué quieres hablar hoy, Edson?
              </button>
            </div>
            <div className="share-box-actions">
              <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                <Image className="size-5 text-sky-500" style={{ color: "#38bdf8" }} />
                <span className="share-action-text">Foto</span>
              </button>
              <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                <Video className="size-5 text-emerald-500" style={{ color: "#10b981" }} />
                <span className="share-action-text">Video</span>
              </button>
              <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                <Calendar className="size-5 text-amber-500" style={{ color: "#f59e0b" }} />
                <span className="share-action-text">Evento</span>
              </button>
              <button className="share-action-btn" onClick={() => setIsModalOpen(true)}>
                <FileText className="size-5 text-rose-500" style={{ color: "#f43f5e" }} />
                <span className="share-action-text">Escribir artículo</span>
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <div key={post.id} className="feed-card post-card">
              <div className="post-header">
                <div className="post-author-info">
                  <div className="avatar-circle sm" style={{ backgroundColor: post.avatarBg }}>
                    {post.avatarInitials}
                  </div>
                  <div>
                    <h4 className="post-author-name">{post.author}</h4>
                    <p className="post-author-title">{post.title}</p>
                  </div>
                </div>
                <span className="post-time">{post.time}</span>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
                {post.hashtags && <p className="post-hashtags">{post.hashtags}</p>}
              </div>

              <div className="post-stats-bar">
                <span>{post.likes} Reacciones</span>
                <span>{post.comments} Comentarios</span>
              </div>

              <div className="post-actions">
                <button 
                  className={`post-action-btn ${post.hasLiked ? "active" : ""}`}
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp className="size-4" />
                  <span>Reaccionar</span>
                </button>
                <button className="post-action-btn">
                  <MessageSquare className="size-4" />
                  <span>Comentar</span>
                </button>
                <button className="post-action-btn">
                  <Share2 className="size-4" />
                  <span>Compartir</span>
                </button>
                <button className="post-action-btn">
                  <Send className="size-4" />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* Columna Derecha: Eventos y Concursos */}
        <aside className="feed-sidebar-right">
          <div className="feed-card events-widget">
            <h4 className="widget-title">Eventos UDH & MyPes</h4>
            <div className="widget-list">
              <div className="widget-item">
                <Link href="/student" className="widget-item-title">
                  Hackathon UDH 2026
                </Link>
                <span className="widget-item-desc">Inscripciones abiertas • Región Huánuco</span>
              </div>
              <div className="widget-item">
                <Link href="/student" className="widget-item-title">
                  Webinar: Next.js y Server Actions
                </Link>
                <span className="widget-item-desc">Viernes 17:00 UDH • Aula Magna</span>
              </div>
              <div className="widget-item">
                <Link href="/student" className="widget-item-title">
                  Feria de Prototipos Tecnológicos
                </Link>
                <span className="widget-item-desc">Mype y Academia de Huánuco</span>
              </div>
            </div>
          </div>

          <div className="feed-card events-widget">
            <h4 className="widget-title">Sugerencias para seguir</h4>
            <div className="widget-list">
              <div className="widget-item">
                <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#334155" }}>Asociación de Emprendedores UDH</span>
                <span className="widget-item-desc">Comunidad de Mentorías y Proyectos</span>
              </div>
              <div className="widget-item">
                <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#334155" }}>Dirección de Posgrado UDH</span>
                <span className="widget-item-desc">Ingeniería y Vinculación Laboral</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal de Publicar */}
      {isModalOpen && (
        <div className="create-post-modal">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Crear una publicación</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePost}>
              <div className="modal-body">
                <textarea 
                  className="modal-textarea"
                  placeholder="¿De qué quieres hablar hoy, Edson?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="modal-cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="modal-submit-btn"
                  disabled={!newPostContent.trim()}
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

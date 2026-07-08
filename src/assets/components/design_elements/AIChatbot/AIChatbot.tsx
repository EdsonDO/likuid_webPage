"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageSquare, ArrowRight } from "lucide-react";
import { JOBS } from "@/app/student/jobs/data";
import Link from "next/link";
import "./AIChatbot.css";
import { usePathname } from "next/navigation";
import { STUDENTS_POOL } from "@/app/client/students_pool";

interface ChatMessage {
  id: number;
  sender: "ai" | "user";
  text: string;
  jobs?: typeof JOBS;
}

export function AIChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isClient = pathname && pathname.startsWith("/client");
    setMessages([
      {
        id: 1,
        sender: "ai",
        text: isClient
          ? "¡Hola, Danniels! Soy Lucy, tu asistente de reclutamiento en Likuid. Puedo sugerirte perfiles destacados de alumnos de la UDH para tus vacantes o redactar especificaciones de puesto. ¿Qué perfil buscas?"
          : "¡Hola, Edson! Soy Lucy, tu asistente de vinculación inteligente en Likuid. Puedo ayudarte a buscar trabajo entre las 100 oportunidades locales de Huánuco o darte consejos. ¿En qué rubro estás buscando hoy?"
      }
    ]);
  }, [pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    const dispatchClientCandidates = (query: string) => {
      const text = query.toLowerCase();
      let filterCareers = [];
      if (text.includes("sistema") || text.includes("web") || text.includes("programador") || text.includes("software") || text.includes("next")) {
        filterCareers = ["Ingeniería de Software", "Ingeniería Informática", "Ciencia de la Computación"];
      } else if (text.includes("repostería") || text.includes("pastelería") || text.includes("cocina") || text.includes("repostero")) {
        filterCareers = ["Repostería"];
      } else if (text.includes("civil") || text.includes("autocad") || text.includes("planos") || text.includes("dibujante")) {
        filterCareers = ["Ingeniería Civil"];
      } else if (text.includes("enfermería") || text.includes("salud") || text.includes("médico") || text.includes("geriátrico")) {
        filterCareers = ["Enfermería"];
      } else if (text.includes("industrial") || text.includes("inventario") || text.includes("procesos") || text.includes("almacén")) {
        filterCareers = ["Ingeniería Industrial"];
      } else if (text.includes("diseño") || text.includes("gráfico") || text.includes("foto") || text.includes("flyer")) {
        filterCareers = ["Diseño Gráfico"];
      }

      let candidatesList = [];
      if (filterCareers.length > 0) {
        candidatesList = STUDENTS_POOL.filter(s => filterCareers.includes(s.specialty));
      }
      const remainder = STUDENTS_POOL.filter(s => !filterCareers.includes(s.specialty));
      let matchedCandidates = [...candidatesList, ...remainder].slice(0, 25);

      matchedCandidates = matchedCandidates.map(c => {
        let match = c.matchPercentage;
        if (filterCareers.includes(c.specialty)) {
          match = Math.floor(Math.random() * 8) + 88;
        } else {
          match = Math.floor(Math.random() * 15) + 60;
        }
        return { ...c, matchPercentage: match };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage);

      const event = new CustomEvent("likuid-candidates-matched", {
        detail: { candidates: matchedCandidates }
      });
      window.dispatchEvent(event);
    };

    try {
      const role = pathname && pathname.startsWith("/client") ? "client" : "student";
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: updatedMessages, role })
      });

      setIsTyping(false);

      if (response.ok) {
        const data = await response.json();
        if (data.error === "NO_API_KEY") {
          const simulated = generateAIResponse(textToSend);
          if (role === "client") {
            dispatchClientCandidates(textToSend);
          }
          setMessages((prev) => [
            ...prev,
            simulated,
            {
              id: Date.now() + 1,
              sender: "ai",
              text: data.text
            }
          ]);
        } else {
          if (role === "client" && data.candidates) {
            const event = new CustomEvent("likuid-candidates-matched", {
              detail: { candidates: data.candidates }
            });
            window.dispatchEvent(event);
          }
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: "ai",
              text: data.text,
              jobs: data.jobs
            }
          ]);
        }
      } else {
        const simulated = generateAIResponse(textToSend);
        if (role === "client") {
          dispatchClientCandidates(textToSend);
        }
        setMessages((prev) => [...prev, simulated]);
      }
    } catch (err) {
      setIsTyping(false);
      const simulated = generateAIResponse(textToSend);
      if (pathname && pathname.startsWith("/client")) {
        dispatchClientCandidates(textToSend);
      }
      setMessages((prev) => [...prev, simulated]);
    }
  };

  const generateAIResponse = (input: string): ChatMessage => {
    const text = input.toLowerCase();
    const isClient = pathname && pathname.startsWith("/client");
    const result: ChatMessage = {
      id: Date.now(),
      sender: "ai",
      text: "",
    };

    if (isClient) {
      if (text.includes("sistema") || text.includes("web") || text.includes("programador") || text.includes("next")) {
        result.text = "He localizado un perfil sobresaliente para tu vacante: Edson Dionicio. Egresado de Sistemas UDH con 95% de coincidencia. Domina Next.js, React, Node.js y Go, y lideró de inicio a fin los proyectos Onekora y Petto.";
      } else if (text.includes("repostería") || text.includes("pastelería") || text.includes("cocina") || text.includes("repostero")) {
        result.text = "Para tu pastelería, te sugiero a: Maria Gomez (9no ciclo, Sistemas e Informática UDH). Domina herramientas de control de inventarios, costeo de insumos en Excel y tiene conocimientos prácticos de horneado y decoración de bocaditos.";
      } else if (text.includes("consejo") || text.includes("retener") || text.includes("junior")) {
        result.text = "Los estudiantes valoran la flexibilidad horaria para no descuidar sus clases, tareas claras de corta duración y mentoría técnica directa de tu parte. Facilitar un canal ágil como WhatsApp aumenta su lealtad.";
      } else {
        result.text = "Hola, Danniels. En Likuid contamos con perfiles de alumnos de la UDH calificados en Sistemas, Repostería, Civil, Enfermería, Industrial y Diseño. Dime qué tipo de proyecto necesitas realizar.";
      }
    } else {
      if (text.includes("sistema") || text.includes("web") || text.includes("programador") || text.includes("software")) {
        const matchJobs = JOBS.filter((j) => j.area === "Sistemas").slice(0, 3);
        result.text = "He analizado las 100 ofertas en la base de datos de Likuid. Encontré vacantes de Sistemas y Desarrollo Web para estudiantes novatos. Aquí tienes algunas coincidencias recomendadas:";
        result.jobs = matchJobs;
      } else if (text.includes("repostería") || text.includes("pastelería") || text.includes("cocina") || text.includes("dulce")) {
        const matchJobs = JOBS.filter((j) => j.area === "Repostería").slice(0, 3);
        result.text = "¡Excelente! En repostería y pastelería, varias MyPes locales de Huánuco buscan ayudantes part-time para que ganen experiencia y un sustento. Mira estas opciones:";
        result.jobs = matchJobs;
      } else if (text.includes("civil") || text.includes("autocad") || text.includes("planos") || text.includes("dibujante")) {
        const matchJobs = JOBS.filter((j) => j.area === "Civil").slice(0, 3);
        result.text = "Para estudiantes de Ingeniería Civil, hay MyPes y consultoras buscando digitalizadores en AutoCAD de distribución de planos y presupuestos iniciales. Aquí tienes:";
        result.jobs = matchJobs;
      } else if (text.includes("enfermería") || text.includes("salud") || text.includes("médico") || text.includes("presión")) {
        const matchJobs = JOBS.filter((j) => j.area === "Enfermería").slice(0, 3);
        result.text = "En el área de Enfermería y Salud, hay opciones de acompañamiento domiciliario, apoyo en boticas o campañas de salud comunitaria. Te sugiero estas:";
        result.jobs = matchJobs;
      } else if (text.includes("industrial") || text.includes("inventario") || text.includes("procesos") || text.includes("almacén")) {
        const matchJobs = JOBS.filter((j) => j.area === "Industrial").slice(0, 3);
        result.text = "Para Ingeniería Industrial, las empresas locales buscan apoyo en control de calidad, cronometraje de tiempos de costura o clasificación de inventarios. Mira estas opciones:";
        result.jobs = matchJobs;
      } else if (text.includes("diseño") || text.includes("foto") || text.includes("flyer") || text.includes("canvas") || text.includes("ilustrador")) {
        const matchJobs = JOBS.filter((j) => j.area === "Diseño").slice(0, 3);
        result.text = "Si te gusta el diseño gráfico o la fotografía de catálogo, hay MyPes comerciales en la ciudad buscando apoyo para redes, logos o retoques digitales:";
        result.jobs = matchJobs;
      } else if (text.includes("consejo") || text.includes("novato") || text.includes("miedo")) {
        result.text = "Es normal tener temor al principio. Las MyPes locales valoran mucho la proactividad y ganas de aprender. Te aconsejo postular a proyectos sencillos como maquetación estática o digitalización básica de AutoCAD para que crees tu primer portafolio.";
      } else {
        result.text = "Entendido. En la base de datos de Likuid tenemos 100 ofertas activas de MyPes en rubros como Sistemas, Repostería, Civil, Enfermería, Industrial, Diseño, Administración y Veterinaria. Dime qué área te interesa y buscaré de inmediato.";
      }
    }

    return result;
  };

  return (
    <div className="ai-chatbot-wrapper">
      {isOpen && (
        <div className="ai-chatbot-panel">
          <header className="ai-chatbot-header">
            <div className="ai-chatbot-header-info">
              <div className="ai-chatbot-avatar">
                <Bot size={18} />
              </div>
              <div>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", display: "block" }}>
                  Asistente IA Likuid
                </span>
                <div className="ai-chatbot-status-indicator">
                  <span className="status-dot" />
                  <span>En línea</span>
                </div>
              </div>
            </div>
            <button className="ai-chatbot-close" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </header>

          <div className="ai-chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
                {msg.jobs && msg.jobs.length > 0 && (
                  <div style={{ marginTop: "0.5rem" }}>
                    {msg.jobs.map((job) => (
                      <div key={job.id} className="chat-job-card">
                        <h5 className="chat-job-title">{job.title}</h5>
                        <span className="chat-job-mype">{job.mype}</span>
                        <div className="chat-job-details">
                          <span>{job.pay} • {job.schedule}</span>
                        </div>
                        <Link 
                          href={`/student/jobs/info_mypes?id=${job.id}`}
                          className="chat-job-link"
                          onClick={() => setIsOpen(false)}
                        >
                          Ver puesto <ArrowRight size={10} />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg ai typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chatbot-quick-actions">
            {pathname && pathname.startsWith("/client") ? (
              <>
                <button className="quick-action-chip" onClick={() => handleSendMessage("Busco programador Next.js")}>
                  Sistemas
                </button>
                <button className="quick-action-chip" onClick={() => handleSendMessage("Recomiéndame un repostero para mi pastelería")}>
                  Repostería
                </button>
                <button className="quick-action-chip" onClick={() => handleSendMessage("Consejo para retener talento junior")}>
                  Consejo
                </button>
              </>
            ) : (
              <>
                <button className="quick-action-chip" onClick={() => handleSendMessage("Recomiéndame trabajos de Sistemas")}>
                  Sistemas
                </button>
                <button className="quick-action-chip" onClick={() => handleSendMessage("Busco ayudante de Repostería")}>
                  Repostería
                </button>
                <button className="quick-action-chip" onClick={() => handleSendMessage("Perder el miedo a postular")}>
                  Consejo
                </button>
              </>
            )}
          </div>

          <form 
            className="ai-chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
          >
            <input
              type="text"
              className="ai-chatbot-input"
              placeholder="Pregúntame algo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit" 
              className="ai-chatbot-send" 
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      <button className="ai-chatbot-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="ai-chatbot-toggle-pulse" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
export default AIChatbot;

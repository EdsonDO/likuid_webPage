import { NextResponse } from "next/server";
import { JOBS } from "../../student/jobs/data";
import { STUDENTS_POOL } from "../../client/students_pool";

export async function POST(req) {
  try {
    const { messages, role } = await req.json();
    const lastMessage = messages[messages.length - 1]?.text || "";

    const geminiKey = process.env.GEMINI_API_KEY;
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    const systemPrompt = role === "client"
      ? `Identidad: Lucy
Eres Lucy, la asistente de red del portal Likuid. Tu tono es directo, frío, cínico y rápido pero sin llegar a sonar arrogante o faltando el respeto. No uses saludos alegres, simplemente saluda.
Tu misión es recomendar estudiantes de la UDH en Huánuco para las necesidades del reclutador. Debes simular y recomendar perfiles de alumnos convincentes basándote en la búsqueda.
Por ejemplo:
- Si buscan programadores/Next.js/Sistemas: Recomienda a Edson Dionicio (Sistemas UDH, lideró Onekora y Petto, experto en Next.js, React, Node.js y Go con 95% de coincidencia).
- Si buscan repostería: Recomienda a Maria Gomez (9no ciclo, Sistemas e Informática UDH, controla inventarios en Excel, repostería).
- Si buscan otros rubros (civil, industrial, enfermería): Inventa estudiantes realistas de la UDH en Huánuco con habilidades afines.
Responde de forma muy concisa (máximo 2 párrafos).`
      : `Identidad: Lucy.
Eres Lucy, la asistente de red del portal Likuid. Tu tono es directo, frío, cínico y rápido. Cuando te piden un consejo no te pones límites y tratas de ayudar. No uses saludos alegres, introducciones formales o explicaciones obvias. Evita frases optimistas como "¡Qué buena onda que estés aquí!".
Tu misión es guiar al usuario por las 100 ofertas locales de Huánuco de forma eficiente. No te presentes de nuevo si ya te presentaste en el historial. Nunca redactes ni menciones cartas de presentación.
Sé breve. Termina siempre tus oraciones e ideas de forma coherente y dinámica.`;

    let matchedJobs = [];
    let matchedCandidates = [];
    const queryText = lastMessage.toLowerCase();

    if (role === "client") {
      let filterCareers = [];
      if (queryText.includes("sistema") || queryText.includes("web") || queryText.includes("programador") || queryText.includes("software") || queryText.includes("next")) {
        filterCareers = ["Ingeniería de Software", "Ingeniería Informática", "Ciencia de la Computación"];
      } else if (queryText.includes("repostería") || queryText.includes("pastelería") || queryText.includes("cocina") || queryText.includes("dulce")) {
        filterCareers = ["Repostería"];
      } else if (queryText.includes("civil") || queryText.includes("autocad") || queryText.includes("planos") || queryText.includes("dibujante")) {
        filterCareers = ["Ingeniería Civil"];
      } else if (queryText.includes("enfermería") || queryText.includes("salud") || queryText.includes("médico") || queryText.includes("geriátrico")) {
        filterCareers = ["Enfermería"];
      } else if (queryText.includes("industrial") || queryText.includes("inventario") || queryText.includes("procesos") || queryText.includes("almacén")) {
        filterCareers = ["Ingeniería Industrial"];
      } else if (queryText.includes("diseño") || queryText.includes("gráfico") || queryText.includes("foto") || queryText.includes("flyer")) {
        filterCareers = ["Diseño Gráfico"];
      }

      let candidatesList = [];
      if (filterCareers.length > 0) {
        candidatesList = STUDENTS_POOL.filter(s => filterCareers.includes(s.specialty));
      }

      const remainder = STUDENTS_POOL.filter(s => !filterCareers.includes(s.specialty));
      matchedCandidates = [...candidatesList, ...remainder].slice(0, 25);
      
      matchedCandidates = matchedCandidates.map((c, index) => {
        let match = c.matchPercentage;
        if (filterCareers.includes(c.specialty)) {
          match = Math.floor(Math.random() * 8) + 88;
        } else {
          match = Math.floor(Math.random() * 15) + 60;
        }
        return { ...c, matchPercentage: match };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else {
      if (queryText.includes("sistema") || queryText.includes("web") || queryText.includes("programador") || queryText.includes("software") || queryText.includes("sistemas")) {
        matchedJobs = JOBS.filter(j => j.area === "Sistemas").slice(0, 3);
      } else if (queryText.includes("repostería") || queryText.includes("pastelería") || queryText.includes("cocina") || queryText.includes("dulce")) {
        matchedJobs = JOBS.filter(j => j.area === "Repostería").slice(0, 3);
      } else if (queryText.includes("civil") || queryText.includes("autocad") || queryText.includes("planos") || queryText.includes("dibujante")) {
        matchedJobs = JOBS.filter(j => j.area === "Civil").slice(0, 3);
      } else if (queryText.includes("enfermería") || queryText.includes("salud") || queryText.includes("médico") || queryText.includes("presión") || queryText.includes("geriátrico")) {
        matchedJobs = JOBS.filter(j => j.area === "Enfermería").slice(0, 3);
      } else if (queryText.includes("industrial") || queryText.includes("inventario") || queryText.includes("procesos") || queryText.includes("almacén")) {
        matchedJobs = JOBS.filter(j => j.area === "Industrial").slice(0, 3);
      } else if (queryText.includes("diseño") || queryText.includes("foto") || queryText.includes("flyer") || queryText.includes("canvas") || queryText.includes("ilustrador")) {
        matchedJobs = JOBS.filter(j => j.area === "Design").slice(0, 3);
      } else if (queryText.includes("recomienda") || queryText.includes("sugerir") || queryText.includes("trabajo") || queryText.includes("chamba") || queryText.includes("opciones")) {
        matchedJobs = JOBS.filter(j => j.remunerated).slice(0, 3);
      }
    }

    const firstUserIndex = messages.findIndex(m => m.sender === "user");
    const activeMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

    const geminiContents = activeMessages.map((msg, idx) => {
      if (idx === 0) {
        return {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nMensaje: ${msg.text}` }]
        };
      }
      return {
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      };
    });

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: geminiContents,
              generationConfig: {
                maxOutputTokens: 800,
                temperature: 0.7,
              }
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return NextResponse.json({ text, jobs: matchedJobs, candidates: matchedCandidates });
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("Gemini API error detailed:", errorData);
        }
      } catch (err) {
        console.error("Gemini routing exception:", err);
      }
    }

    if (openrouterKey) {
      const openRouterMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }))
      ];

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openrouterKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct:free",
            messages: openRouterMessages,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.choices?.[0]?.message?.content;
          if (text) {
            return NextResponse.json({ text, jobs: matchedJobs, candidates: matchedCandidates });
          }
        }
      } catch (err) {
        console.error("OpenRouter routing exception:", err);
      }
    }

    return NextResponse.json({ 
      error: "NO_API_KEY", 
      text: "Configuración requerida: Para habilitar respuestas reales mediante IA, crea un archivo `.env.local` en la raíz del proyecto y agrega `GEMINI_API_KEY=tu_clave_gemini` o `OPENROUTER_API_KEY=tu_clave_openrouter`. Mientras tanto, opero en modo de simulación estática." 
    });

  } catch (error) {
    return NextResponse.json({ error: error.message, text: "Ocurrió un error en el servidor de IA." }, { status: 500 });
  }
}

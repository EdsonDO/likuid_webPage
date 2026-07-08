const firstNames = ["Edson", "Maria", "Carlos", "Sofía", "Ana", "Luis", "Juan", "Gabriela", "Diego", "Lucía", "Mateo", "Camila", "Javier", "Valentina", "Pedro", "Elena", "Lucas", "Isabella", "Marcos", "Victoria", "Raúl", "Daniela", "Alejandro", "Natalia", "Renzo", "Paola", "Gabriel", "Andrea", "Sebastián", "Clara"];
const lastNames = ["Dionicio", "Gómez", "Ruiz", "Medina", "Flores", "Castro", "Pérez", "Neira", "Martel", "Alvarado", "Ramos", "Espinoza", "Palacios", "Salazar", "Reyes", "Vásquez", "Torres", "Morales", "Herrera", "Gutiérrez", "Mendoza", "Rojas", "Solís", "Ortega", "Quispe", "Cruz", "Beraún", "Figueroa", "Dávila", "Soto"];
const careers = [
  "Ingeniería de Software",
  "Ingeniería Informática",
  "Ciencia de la Computación",
  "Enfermería",
  "Repostería",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Diseño Gráfico",
  "Administración de Empresas",
  "Medicina Veterinaria"
];

const skillsByCareer = {
  "Ingeniería de Software": ["React", "Next.js", "Node.js", "Go", "TypeScript", "TailwindCSS", "Git", "PostgreSQL"],
  "Ingeniería Informática": ["Python", "SQL", "Django", "Excel", "Docker", "Machine Learning", "FastAPI"],
  "Ciencia de la Computación": ["C++", "Java", "Linux", "Algoritmos", "Rust", "Estructuras de Datos"],
  "Enfermería": ["Primeros Auxilios", "Inyectables", "Geriatría", "Triaje", "Farmacología", "Cuidado Pediátrico"],
  "Repostería": ["Decoración", "Costos Pasteleros", "Panificación", "Chocolatería", "Inocuidad Alimentaria"],
  "Ingeniería Civil": ["AutoCAD", "Planos 2D", "Presupuestos S10", "Topografía", "Suelo", "Metrados"],
  "Ingeniería Industrial": ["Procesos", "Inventarios", "Logística", "Gestión de Calidad", "Seguridad Industrial"],
  "Diseño Gráfico": ["Photoshop", "Illustrator", "Figma", "Redes Sociales", "Logotipos", "Branding"],
  "Administración de Empresas": ["Contabilidad", "Excel Avanzado", "Plan de Negocios", "Liderazgo", "Ventas"],
  "Medicina Veterinaria": ["Clínica Menores", "Cirugía Básica", "Vacunación", "Nutrición Animal", "Zootecnia"]
};

function generatePool() {
  const list = [
    {
      id: 1,
      name: "Edson Raul Dionicio",
      cycle: "Egresado",
      specialty: "Ingeniería de Software",
      skills: ["Next.js", "React", "Node.js", "Go", "TypeScript"],
      bio: "Desarrollador Fullstack con alta experiencia. Lideró el proyecto Onekora para optimización de combustibles provinciales y Petto para adopción animal. Especialista en arquitecturas de alto rendimiento.",
      matchPercentage: 95
    },
    {
      id: 2,
      name: "Maria Gomez",
      cycle: "9no Ciclo",
      specialty: "Ingeniería Informática",
      skills: ["Python", "SQL", "Django", "Excel"],
      bio: "Especialista en estructuración de bases de datos y control financiero digital. Apoya a MYPES locales en el costeo automatizado de insumos y auditoría de inventarios.",
      matchPercentage: 88
    },
    {
      id: 3,
      name: "Luis Castro",
      cycle: "5to Ciclo",
      specialty: "Ingeniería Civil",
      skills: ["AutoCAD", "Planos 2D", "Presupuestos S10"],
      bio: "Dibujante técnico orientado a la digitalización ágil de planos estructurales y apoyo a consultorías de obras civiles provinciales.",
      matchPercentage: 91
    }
  ];

  let seed = 42;
  function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 4; i <= 75; i++) {
    const fn = firstNames[Math.floor(random() * firstNames.length)];
    const ln = lastNames[Math.floor(random() * lastNames.length)];
    const career = careers[Math.floor(random() * careers.length)];
    const careerSkills = skillsByCareer[career] || ["Word", "Excel"];
    
    const numSkills = Math.floor(random() * 3) + 3;
    const selectedSkills = [];
    const tempSkills = [...careerSkills];
    for (let s = 0; s < numSkills; s++) {
      if (tempSkills.length > 0) {
        const idx = Math.floor(random() * tempSkills.length);
        selectedSkills.push(tempSkills.splice(idx, 1)[0]);
      }
    }

    const cycles = ["5to Ciclo", "6to Ciclo", "7mo Ciclo", "8vo Ciclo", "9no Ciclo", "10mo Ciclo"];
    const cycle = cycles[Math.floor(random() * cycles.length)];

    list.push({
      id: i,
      name: `${fn} ${ln}`,
      cycle,
      specialty: career,
      skills: selectedSkills,
      bio: `Estudiante destacado de la Universidad de Huánuco de la carrera de ${career}. Con habilidades técnicas en ${selectedSkills.join(", ")}. Comprometido con la digitalización y el soporte técnico a MyPes locales.`,
      matchPercentage: Math.floor(random() * 25) + 70
    });
  }

  return list;
}

export const STUDENTS_POOL = generatePool();

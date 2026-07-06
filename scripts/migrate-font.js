const fs = require('fs');
const path = require('path');
const wawoff2 = require('wawoff2');

const WEIGHTS = {
  thin: "100",
  hairline: "100",
  extralight: "200",
  ultralight: "200",
  light: "300",
  regular: "400",
  normal: "400",
  book: "400",
  medium: "500",
  semibold: "600",
  demibold: "600",
  bold: "700",
  extrabold: "800",
  ultrabold: "800",
  black: "900",
  heavy: "900"
};

function parseFontFileName(fileName) {
  const name = fileName.replace(/\.[^/.]+$/, "");
  
  const isItalic = /italic/i.test(name);
  const fontStyle = isItalic ? "italic" : "normal";
  
  let cleanName = name.replace(/italic/i, "");
  
  let fontWeight = "400";
  const numMatch = cleanName.match(/\b(100|200|300|400|500|600|700|800|900)\b/);
  if (numMatch) {
    fontWeight = numMatch[1];
    cleanName = cleanName.replace(numMatch[0], "");
  }
  
  let fontFamily = cleanName;
  if (cleanName.includes("-")) {
    const parts = cleanName.split("-");
    fontFamily = parts[0];
    if (fontWeight === "400") {
      const weightPart = parts[1].trim().toLowerCase();
      fontWeight = WEIGHTS[weightPart] || "400";
    }
  } else {
    if (fontWeight === "400") {
      const lowerName = cleanName.toLowerCase();
      for (const [key, val] of Object.entries(WEIGHTS)) {
        if (lowerName.includes(key)) {
          fontWeight = val;
          break;
        }
      }
    }
  }
  
  fontFamily = fontFamily
    .replace(/_ttf|ttf|otf|font/ig, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
    
  return { fontFamily, fontWeight, fontStyle };
}

function getTtfFilesRecursive(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getTtfFilesRecursive(filePath, fileList);
    } else if (path.extname(file).toLowerCase() === '.ttf') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function convertFontFile(ttfPath, destFontsDir, cssPath) {
  const baseName = path.basename(ttfPath);
  const { fontFamily, fontWeight, fontStyle } = parseFontFileName(baseName);
  
  const sanitizedName = baseName
    .replace(/\.[^/.]+$/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");
  
  const destWoff2Path = path.join(destFontsDir, `${sanitizedName}.woff2`);
  
  console.log(`- Procesando: ${baseName} -> Familia: "${fontFamily}", Peso: ${fontWeight}, Estilo: ${fontStyle}`);
  
  const ttfBuffer = fs.readFileSync(ttfPath);
  const woff2Buffer = await wawoff2.compress(ttfBuffer);
  fs.writeFileSync(destWoff2Path, woff2Buffer);
  
  const cssDeclaration = `
@font-face {
  font-family: '${fontFamily}';
  src: url('/fonts/${sanitizedName}.woff2') format('woff2');
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  font-display: swap;
}
`;
  fs.appendFileSync(cssPath, cssDeclaration);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Uso: node scripts/migrate-font.js <ruta-a-archivo-ttf-o-directorio>");
    process.exit(1);
  }

  const targetPath = path.resolve(args[0]);
  if (!fs.existsSync(targetPath)) {
    console.error(`Error: La ruta '${targetPath}' no existe.`);
    process.exit(1);
  }

  const destFontsDir = path.join(__dirname, '..', 'public', 'fonts');
  if (!fs.existsSync(destFontsDir)) {
    fs.mkdirSync(destFontsDir, { recursive: true });
  }

  const destCssDir = path.join(__dirname, '..', 'src', 'assets', 'fonts');
  if (!fs.existsSync(destCssDir)) {
    fs.mkdirSync(destCssDir, { recursive: true });
  }
  
  const cssPath = path.join(destCssDir, 'fonts.css');

  const stat = fs.statSync(targetPath);
  let ttfFiles = [];

  if (stat.isDirectory()) {
    console.log(`Escaneando directorio: ${targetPath}`);
    ttfFiles = getTtfFilesRecursive(targetPath);
    console.log(`Se encontraron ${ttfFiles.length} archivos .ttf para procesar.`);
  } else {
    if (path.extname(targetPath).toLowerCase() !== '.ttf') {
      console.error("Error: El archivo debe tener extensión .ttf");
      process.exit(1);
    }
    ttfFiles = [targetPath];
  }

  if (ttfFiles.length === 0) {
    console.log("No se encontraron archivos .ttf para convertir.");
    process.exit(0);
  }

  if (ttfFiles.length > 1) {
    fs.writeFileSync(cssPath, "");
  }

  console.log("Iniciando compresión masiva a WOFF2...");
  let successCount = 0;
  for (const ttfPath of ttfFiles) {
    try {
      await convertFontFile(ttfPath, destFontsDir, cssPath);
      successCount++;
    } catch (err) {
      console.error(`Error al convertir ${path.basename(ttfPath)}:`, err);
    }
  }

  console.log(`\n¡Migración finalizada! Se convirtieron exitosamente ${successCount}/${ttfFiles.length} fuentes.`);
  console.log(`Archivos WOFF2 guardados en public/fonts/`);
  console.log(`Estilos CSS actualizados en: ${cssPath}\n`);
}

main();

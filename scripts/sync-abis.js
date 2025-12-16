const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../foundry/out');
const targetDir = path.join(__dirname, '../apps/web/lib/contracts');

console.log('Sincronizando ABIs...');

// Crear carpeta si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Función recursiva para encontrar archivos .json
function findJsonFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    console.log('⚠️  Carpeta out/ no existe. Ejecuta "pnpm build:contracts" primero.');
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip build-info directories
      if (entry.name !== 'build-info') {
        findJsonFiles(fullPath, files);
      }
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Copiar archivos JSON
const jsonFiles = findJsonFiles(outDir);
let count = 0;

for (const file of jsonFiles) {
  const fileName = path.basename(file);
  const targetPath = path.join(targetDir, fileName);

  try {
    fs.copyFileSync(file, targetPath);
    console.log(`✓ ${fileName}`);
    count++;
  } catch (error) {
    console.error(`✗ Error copiando ${fileName}:`, error.message);
  }
}

console.log(`\n✓ ${count} ABIs sincronizados`);

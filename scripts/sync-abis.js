const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../foundry/out');
const targetDir = path.join(__dirname, '../apps/web/lib/contracts');

console.log('Syncing ABIs...');

if (!fs.existsSync(outDir)) {
  console.log('⚠️  foundry/out/ not found. Run "forge build" first.');
  process.exit(1);
}

// Create target directory
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get all contract directories in out/
const contracts = fs.readdirSync(outDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name !== 'build-info')
  .map(entry => entry.name.replace('.sol', ''));

let count = 0;

for (const contract of contracts) {
  const abiFile = path.join(outDir, `${contract}.sol`, `${contract}.json`);
  const targetFile = path.join(targetDir, `${contract}.json`);

  if (fs.existsSync(abiFile)) {
    fs.copyFileSync(abiFile, targetFile);
    console.log(`✓ ${contract}.json`);
    count++;
  }
}

console.log(`\n✓ ${count} ABIs synced`);

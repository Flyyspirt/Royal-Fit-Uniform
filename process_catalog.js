const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'E:\\Royal Fit Uniform\\Catelogs';
const DEST_DIR = path.join(__dirname, '..', '..', 'company', '08-portfolio', 'royal-fit-website', 'public', 'catalog');
const DATA_FILE = path.join(__dirname, '..', '..', 'company', '08-portfolio', 'royal-fit-website', 'src', 'lookbookData.js');

// Create dest dir if not exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Ensure the src directory exists for data file
const SRC_DIR = path.dirname(DATA_FILE);
if (!fs.existsSync(SRC_DIR)) {
  fs.mkdirSync(SRC_DIR, { recursive: true });
}

const lookbookData = {};
const lookbookCards = []; // to help build the HTML later

// Helper to make an ID
function makeId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function processDirectory(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      result.push({
        type: 'dir',
        name: entry.name,
        path: path.join(dirPath, entry.name),
        rel: path.join(relativePath, entry.name),
        children: await processDirectory(path.join(dirPath, entry.name), path.join(relativePath, entry.name))
      });
    } else if (entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name)) {
      result.push({
        type: 'file',
        name: entry.name,
        path: path.join(dirPath, entry.name),
        rel: path.join(relativePath, entry.name)
      });
    }
  }
  return result;
}

async function run() {
  console.log('Reading source directory...');
  const tree = await processDirectory(SOURCE_DIR);
  
  console.log('Processing tree...');
  
  // Top level: Categories (e.g. Front Office)
  for (const category of tree) {
    if (category.type !== 'dir') continue;
    if (category.name === 'JustDial' || category.name === 'GBP') continue; // skip these? Or just keep them? Let's keep for now unless it's a specific file. Actually some subfolders were named 'GBP' or 'JustDial', they might be ad materials.
    
    const catName = category.name;
    const catId = makeId(catName);
    
    // Level 2: Products (e.g. WaistCoat)
    for (const product of category.children) {
      if (product.type !== 'dir') continue;
      if (product.name.toLowerCase() === 'gbp' || product.name.toLowerCase().includes('justdial')) continue;
      
      const prodName = product.name;
      const prodId = makeId(`${catName}-${prodName}`);
      
      const colors = [];
      
      // Let's check if the children are files or directories (Colors)
      const hasSubDirs = product.children.some(c => c.type === 'dir' && c.name.toLowerCase() !== 'gbp' && !c.name.toLowerCase().includes('justdial'));
      
      if (hasSubDirs) {
        // Level 3: Colors
        for (const color of product.children) {
          if (color.type !== 'dir') continue;
          if (color.name.toLowerCase() === 'gbp' || color.name.toLowerCase().includes('justdial')) continue;
          
          const colorName = color.name;
          const images = [];
          
          for (const file of color.children) {
            if (file.type !== 'file') continue;
            // process image
            const destName = makeId(`${prodId}-${colorName}-${file.name.replace(/\.[^.]+$/, '')}`) + '.webp';
            const destPath = path.join(DEST_DIR, destName);
            
            console.log(`Processing: ${file.name} -> ${destName}`);
            await sharp(file.path)
              .resize({ width: 1000, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(destPath);
              
            images.push(`/catalog/${destName}`);
          }
          
          if (images.length > 0) {
            colors.push({ name: colorName, images });
          }
        }
      } else {
        // Files are directly under product
        const images = [];
        for (const file of product.children) {
          if (file.type !== 'file') continue;
          const destName = makeId(`${prodId}-${file.name.replace(/\.[^.]+$/, '')}`) + '.webp';
          const destPath = path.join(DEST_DIR, destName);
          
          console.log(`Processing: ${file.name} -> ${destName}`);
          await sharp(file.path)
            .resize({ width: 1000, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(destPath);
            
          images.push(`/catalog/${destName}`);
        }
        
        if (images.length > 0) {
          colors.push({ name: 'Default', images });
        }
      }
      
      if (colors.length > 0) {
        lookbookData[prodId] = {
          category: catId,
          categoryName: catName,
          title: prodName,
          desc: `${catName} - ${prodName}. Premium fit and materials.`,
          image: colors[0].images[0], // first image of first color as main thumbnail
          colors: colors // all available colors and angles
        };
      }
    }
    
    // Check for files directly in the category directory
    const categoryFiles = category.children.filter(c => c.type === 'file' && /\.(png|jpe?g)$/i.test(c.name) && c.name.toLowerCase() !== 'gbp' && !c.name.toLowerCase().includes('justdial'));
    
    if (categoryFiles.length > 0) {
        const prodName = category.name;
        const prodId = makeId(`${catName}-${prodName}-default`);
        const images = [];
        
        for (const file of categoryFiles) {
           const destName = makeId(`${prodId}-${file.name.replace(/\.[^.]+$/, '')}`) + '.webp';
           const destPath = path.join(DEST_DIR, destName);
           
           console.log(`Processing direct file: ${file.name} -> ${destName}`);
           await sharp(file.path)
             .resize({ width: 1000, withoutEnlargement: true })
             .webp({ quality: 80 })
             .toFile(destPath);
             
           images.push(`/catalog/${destName}`);
        }
        
        if (images.length > 0) {
           lookbookData[prodId] = {
             category: catId,
             categoryName: catName,
             title: prodName,
             desc: `${catName}. Premium fit and materials.`,
             image: images[0],
             colors: [{ name: 'Default', images }]
           };
        }
    }
  }
  
  // Write JS file
  const jsContent = `export const lookbookData = ${JSON.stringify(lookbookData, null, 2)};\n`;
  fs.writeFileSync(DATA_FILE, jsContent);
  console.log('Successfully generated lookbookData.js');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

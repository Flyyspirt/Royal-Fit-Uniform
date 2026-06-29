const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = process.env.CATALOG_SOURCE_DIR || path.join(__dirname, 'Catelogs');
const DEST_DIR = path.join(__dirname, 'public', 'catalog');
const DATA_FILE = path.join(__dirname, 'src', 'lookbookData.js');

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

// Helper to make an ID
function makeId(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}

const isExcluded = (name) => ['justdial', 'gbp'].some(ex => name.toLowerCase().includes(ex));

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      result.push({
        type: 'dir',
        name: entry.name,
        path: path.join(dirPath, entry.name),
        children: await processDirectory(path.join(dirPath, entry.name))
      });
    } else if (entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name)) {
      result.push({
        type: 'file',
        name: entry.name,
        path: path.join(dirPath, entry.name)
      });
    }
  }
  return result;
}

// Helper to process a batch of images concurrently
async function processImages(imagesData) {
  const promises = imagesData.map(async ({ source, dest }) => {
    try {
      console.log(`Processing file: ${path.basename(source)} -> ${path.basename(dest)}`);
      await sharp(source)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest);
    } catch (err) {
      console.error(`[Build Error] Failed to process image: ${source}`, err);
      throw err;
    }
  });
  await Promise.all(promises);
}

async function run() {
  console.log('Reading source directory...');
  const tree = await processDirectory(SOURCE_DIR);
  
  console.log('Processing tree...');
  
  // Top level: Categories (e.g. Front Office)
  for (const category of tree) {
    if (category.type !== 'dir') continue;
    if (isExcluded(category.name)) continue;
    
    const catName = category.name;
    const catId = makeId(catName);
    
    // Check for files directly in the category directory
    const categoryFiles = category.children.filter(c => c.type === 'file' && /\.(png|jpe?g)$/i.test(c.name) && !isExcluded(c.name));
    
    console.log(`Category: ${catName} - Direct files found: ${categoryFiles.length}`);
    
    if (categoryFiles.length > 0) {
        const prodName = category.name;
        const prodId = makeId(`${catName}-${prodName}-default`);
        const images = [];
        const imagesToProcess = [];
        
        for (const file of categoryFiles) {
           const destName = makeId(`${prodId}-${file.name.replace(/\.[^.]+$/, '')}`) + '.webp';
           const destPath = path.join(DEST_DIR, destName);
           
           imagesToProcess.push({ source: file.path, dest: destPath });
           images.push(`/catalog/${destName}`);
        }
        
        await processImages(imagesToProcess);
        
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
    
    // Level 2: Products (e.g. WaistCoat)
    for (const product of category.children) {
      if (product.type !== 'dir') continue;
      if (isExcluded(product.name)) continue;
      
      const prodName = product.name;
      const prodId = makeId(`${catName}-${prodName}`);
      
      const colors = [];
      
      // Let's check if the children are files or directories (Colors)
      const hasSubDirs = product.children.some(c => c.type === 'dir' && !isExcluded(c.name));
      
      if (hasSubDirs) {
        // Level 3: Colors
        for (const color of product.children) {
          if (color.type !== 'dir') continue;
          if (isExcluded(color.name)) continue;
          
          // Skip redundant numbered white variations as requested
          if (color.name.toLowerCase().match(/white.*?\d+/)) continue;
          
          const colorName = color.name;
          const images = [];
          const imagesToProcess = [];
          
          for (const file of color.children) {
            if (file.type !== 'file') continue;
            const destName = makeId(`${prodId}-${colorName}-${file.name.replace(/\.[^.]+$/, '')}`) + '.webp';
            const destPath = path.join(DEST_DIR, destName);
            
            imagesToProcess.push({ source: file.path, dest: destPath });
            images.push(`/catalog/${destName}`);
          }
          
          await processImages(imagesToProcess);
          
          if (images.length > 0) {
            colors.push({ name: colorName, images });
          }
        }
      } else {
        // Files are directly under product
        const images = [];
        const imagesToProcess = [];
        
        for (const file of product.children) {
          if (file.type !== 'file') continue;
          const destName = makeId(`${prodId}-${file.name.replace(/\.[^.]+$/, '')}`) + '.webp';
          const destPath = path.join(DEST_DIR, destName);
          
          imagesToProcess.push({ source: file.path, dest: destPath });
          images.push(`/catalog/${destName}`);
        }
        
        await processImages(imagesToProcess);
        
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

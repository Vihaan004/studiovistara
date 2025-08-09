const fs = require('fs');
const path = require('path');

// Simple YAML frontmatter parser for Node.js
function parseMarkdownWithFrontmatter(markdownContent) {
  const parts = markdownContent.split('---');
  
  if (parts.length < 3) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }

  const frontmatterText = parts[1].trim();
  const content = parts.slice(2).join('---').trim();

  // Parse YAML frontmatter manually (basic implementation)
  const metadata = {};
  const lines = frontmatterText.split('\n');
  
  let currentKey = '';
  let isArray = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    if (trimmedLine.startsWith('- ')) {
      // Array item
      if (isArray && currentKey) {
        if (!metadata[currentKey]) metadata[currentKey] = [];
        metadata[currentKey].push(trimmedLine.substring(2).trim());
      }
    } else if (trimmedLine.includes(':')) {
      // Key-value pair
      const colonIndex = trimmedLine.indexOf(':');
      const key = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();
      
      currentKey = key;
      
      if (value === '') {
        // Likely start of an array
        isArray = true;
        metadata[key] = [];
      } else {
        isArray = false;
        metadata[key] = value;
      }
    }
  }

  return {
    metadata,
    content
  };
}

function generateProjectsJson() {
  const publicProjectsDir = path.join(__dirname, '..', 'public', 'projects');
  const outputPath = path.join(__dirname, '..', 'public', 'projects.json');
  
  if (!fs.existsSync(publicProjectsDir)) {
    console.error('Projects directory not found:', publicProjectsDir);
    return;
  }

  const projects = [];
  const projectDirs = fs.readdirSync(publicProjectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log('Found project directories:', projectDirs);

  for (const projectDir of projectDirs) {
    const metadataPath = path.join(publicProjectsDir, projectDir, 'metadata.md');
    
    if (fs.existsSync(metadataPath)) {
      try {
        const markdownContent = fs.readFileSync(metadataPath, 'utf-8');
        const parsed = parseMarkdownWithFrontmatter(markdownContent);
        
        // Add hasDescription flag based on content length
        parsed.metadata.hasDescription = parsed.content.trim().length > 0;
        
        // Convert year to number
        if (parsed.metadata.year && typeof parsed.metadata.year === 'string') {
          parsed.metadata.year = parseInt(parsed.metadata.year, 10);
        }
        
        projects.push(parsed.metadata);
        console.log(`✓ Processed project: ${parsed.metadata.name}`);
      } catch (error) {
        console.error(`Error processing ${projectDir}/metadata.md:`, error.message);
      }
    } else {
      console.warn(`⚠ No metadata.md found for project: ${projectDir}`);
    }
  }

  // Write projects.json
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`\n✅ Generated projects.json with ${projects.length} projects`);
  console.log(`📁 Output: ${outputPath}`);
}

// Run the script
generateProjectsJson();
interface ProjectMetadata {
  id: string;
  name: string;
  category: 'Residential' | 'Housing' | 'Commercial';
  practices: string[];
  location: string;
  year: number;
  description: string;
  coverImage: string;
  images: string[];
  status: string;
  hasDescription: boolean;
}

interface ParsedMarkdown {
  metadata: ProjectMetadata;
  content: string;
}

export function parseMarkdownWithFrontmatter(markdownContent: string): ParsedMarkdown {
  // Split frontmatter and content
  const parts = markdownContent.split('---');
  
  if (parts.length < 3) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }

  const frontmatterText = parts[1].trim();
  const content = parts.slice(2).join('---').trim();

  // Parse YAML frontmatter manually (basic implementation)
  const metadata: any = {};
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

  // Set hasDescription based on content length
  const projectMetadata = metadata as ProjectMetadata;
  projectMetadata.hasDescription = content.trim().length > 0;
  
  // Convert year to number
  if (projectMetadata.year && typeof projectMetadata.year === 'string') {
    projectMetadata.year = parseInt(projectMetadata.year, 10);
  }

  return {
    metadata: projectMetadata,
    content
  };
}

export async function fetchProjectFromMarkdown(projectId: string): Promise<ParsedMarkdown | null> {
  try {
    const response = await fetch(`/projects/${projectId}/metadata.md`);
    if (!response.ok) {
      throw new Error('Project not found');
    }
    
    const markdownContent = await response.text();
    return parseMarkdownWithFrontmatter(markdownContent);
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    return null;
  }
}

export async function fetchAllProjects(): Promise<ProjectMetadata[]> {
  // For now, we'll need to hardcode the project IDs
  // In a future enhancement, this could read from a directory listing
  const projectIds = ['villa-sunrise', 'urban-loft-renovation', 'green-office-complex', 'courtyard-housing-complex', 'heritage-boutique-hotel'];
  
  const projects: ProjectMetadata[] = [];
  
  for (const projectId of projectIds) {
    const parsed = await fetchProjectFromMarkdown(projectId);
    if (parsed) {
      projects.push(parsed.metadata);
    }
  }
  
  return projects;
}
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAssetPath } from '../utils/paths';

interface Project {
  id: string;
  name: string;
  category: 'Residential' | 'Housing' | 'Commercial';
  practices: string[];
  location: string;
  date: string;
  description: string;
  coverImage: string;
  images: string[];
  hasDescription: boolean;
  status: string;
}

interface ProjectsGalleryProps {
  projects: Project[];
}

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPractice, setSelectedPractice] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc');
  
  const router = useRouter();

  // Get unique values for filter dropdowns
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const practices = ['All', ...new Set(projects.flatMap(p => p.practices))];
  const locations = ['All', ...new Set(projects.map(p => p.location))];

  useEffect(() => {
    let filtered = [...projects];

    // Apply filters
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedPractice !== 'All') {
      filtered = filtered.filter(p => p.practices.includes(selectedPractice));
    }
    
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(p => p.location === selectedLocation);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedPractice, selectedLocation, sortBy]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="projects-gallery">
      {/* Filters and Sort Controls */}
      <div className="controls">
        <div className="filters">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Practice:</label>
            <select 
              value={selectedPractice} 
              onChange={(e) => setSelectedPractice(e.target.value)}
            >
              {practices.map(practice => (
                <option key={practice} value={practice}>{practice}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Location:</label>
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="results-count">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Project Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="project-image">
              <Image
                src={getAssetPath(`/projects/${project.id}/${project.coverImage}`)}
                alt={project.name}
                width={400}
                height={300}
                className="cover-image"
              />
              <div className="project-overlay">
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-location">{project.location}</p>
                  <div className="project-practices">
                    {project.practices.map(practice => (
                      <span key={practice} className="practice-tag">
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
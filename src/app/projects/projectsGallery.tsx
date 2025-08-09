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
  year: number;
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

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
          return b.year - a.year;
        case 'date-asc':
          return a.year - b.year;
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

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionSelect = (type: string, value: string) => {
    switch (type) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'practice':
        setSelectedPractice(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      case 'sort':
        setSortBy(value as any);
        break;
    }
    setOpenDropdown(null);
  };

  const getSortDisplayValue = (value: string) => {
    switch (value) {
      case 'date-desc': return 'Date (Newest)';
      case 'date-asc': return 'Date (Oldest)';
      case 'name-asc': return 'Name (A-Z)';
      case 'name-desc': return 'Name (Z-A)';
      default: return value;
    }
  };

  return (
    <div className="projects-gallery">
      {/* Filters and Sort Controls */}
      <div className="controls">
        <div className="filters">
          <div className="filter-group">
            <div 
              className={`custom-dropdown ${openDropdown === 'category' ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('category');
              }}
            >
              <div className="dropdown-button">
                <div className="dropdown-label">CATEGORY</div>
                <div className="dropdown-value">{selectedCategory}</div>
              </div>
              {openDropdown === 'category' && (
                <div className="dropdown-options">
                  {categories.map(cat => (
                    <div 
                      key={cat} 
                      className="dropdown-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('category', cat);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-group">
            <div 
              className={`custom-dropdown ${openDropdown === 'practice' ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('practice');
              }}
            >
              <div className="dropdown-button">
                <div className="dropdown-label">PRACTICE</div>
                <div className="dropdown-value">{selectedPractice}</div>
              </div>
              {openDropdown === 'practice' && (
                <div className="dropdown-options">
                  {practices.map(practice => (
                    <div 
                      key={practice} 
                      className="dropdown-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('practice', practice);
                      }}
                    >
                      {practice}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-group">
            <div 
              className={`custom-dropdown ${openDropdown === 'location' ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('location');
              }}
            >
              <div className="dropdown-button">
                <div className="dropdown-label">LOCATION</div>
                <div className="dropdown-value">{selectedLocation}</div>
              </div>
              {openDropdown === 'location' && (
                <div className="dropdown-options">
                  {locations.map(location => (
                    <div 
                      key={location} 
                      className="dropdown-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect('location', location);
                      }}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-group">
            <div 
              className={`custom-dropdown ${openDropdown === 'sort' ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownToggle('sort');
              }}
            >
              <div className="dropdown-button">
                <div className="dropdown-label">SORT</div>
                <div className="dropdown-value">{getSortDisplayValue(sortBy)}</div>
              </div>
              {openDropdown === 'sort' && (
                <div className="dropdown-options">
                  <div 
                    className="dropdown-option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect('sort', 'date-desc');
                    }}
                  >
                    Date (Newest)
                  </div>
                  <div 
                    className="dropdown-option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect('sort', 'date-asc');
                    }}
                  >
                    Date (Oldest)
                  </div>
                  <div 
                    className="dropdown-option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect('sort', 'name-asc');
                    }}
                  >
                    Name (A-Z)
                  </div>
                  <div 
                    className="dropdown-option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect('sort', 'name-desc');
                    }}
                  >
                    Name (Z-A)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="results-count">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div> */}
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
            </div>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p className="project-year">{project.year}</p>
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
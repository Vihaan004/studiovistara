'use client';

import { useState, useEffect } from 'react';
import '../styles/page.css';
import '../styles/projectsGallery.css';
import Poster from '../components/poster';
import ProjectsGallery from '../components/projectsGallery';

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        const projectsData: Project[] = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className='wrapper'>
      <Poster />
      <div className="page-content">
        <div className="projects-page">
          <div className="page-header">
            <h1>Our Projects</h1>
            <p>Explore our diverse portfolio of architectural works across residential, housing, and commercial projects.</p>
          </div>
          
          {loading ? (
            <div className="loading-projects">Loading projects...</div>
          ) : (
            <ProjectsGallery projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
}

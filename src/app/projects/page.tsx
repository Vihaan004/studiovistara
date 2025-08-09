'use client';

import { useState, useEffect } from 'react';
import '../styles/page.css';
import './projectsGallery.css';
import Poster from '../components/poster';
import ProjectsGallery from './projectsGallery';
import { fetchAllProjects } from '../utils/markdownParser';

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await fetchAllProjects();
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
          {/* <div className="page-header">
            <h1>Our Projects</h1>
            <p>Explore our diverse portfolio of architectural works across residential, housing, and commercial projects.</p>
          </div> */}
          
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

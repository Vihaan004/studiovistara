'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Poster from '../../components/poster';
import { getAssetPath } from '../../utils/paths';
import '../../styles/projectDetail.css';

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

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Project | null>(null);
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch project data
        const response = await fetch('/projects.json');
        const projects: Project[] = await response.json();
        const foundProject = projects.find(p => p.id === projectId);
        
        if (foundProject) {
          setProject(foundProject);
          setSelectedImage(foundProject.coverImage);
          
          // Fetch description if it exists
          if (foundProject.hasDescription) {
            try {
              const descResponse = await fetch(getAssetPath(`/projects/${projectId}/description.md`));
              if (descResponse.ok) {
                const descText = await descResponse.text();
                setProjectDescription(descText);
              }
            } catch (error) {
              console.log('No description file found');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="wrapper">
        <Poster />
        <div className="page-content">
          <div className="loading">Loading project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="wrapper">
        <Poster />
        <div className="page-content">
          <div className="error">
            <h2>Project not found</h2>
            <Link href="/projects" className="back-link">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Poster />
      <div className="page-content">
        <div className="project-detail">
          {/* Navigation */}
          <div className="project-nav">
            <Link href="/projects" className="back-link">
              ← Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="project-header">
            <h1>{project.name}</h1>
            <div className="project-meta">
              <span className="category">{project.category}</span>
              <span className="location">{project.location}</span>
              <span className="date">{new Date(project.date).getFullYear()}</span>
            </div>
            <div className="project-practices">
              {project.practices.map(practice => (
                <span key={practice} className="practice-tag">
                  {practice}
                </span>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="main-image">
            <Image
              src={getAssetPath(`/projects/${project.id}/${selectedImage}`)}
              alt={project.name}
              width={1200}
              height={800}
              className="featured-image"
            />
          </div>

          {/* Image Gallery */}
          {project.images.length > 1 && (
            <div className="image-gallery">
              <h3>Gallery</h3>
              <div className="thumbnail-grid">
                {project.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={getAssetPath(`/projects/${project.id}/${image}`)}
                      alt={`${project.name} - Image ${index + 1}`}
                      width={150}
                      height={100}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Description */}
          <div className="project-content">
            <div className="project-description">
              <p>{project.description}</p>
              
              {projectDescription && (
                <div className="detailed-description">
                  <pre>{projectDescription}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Navigation to Other Projects */}
          <div className="project-footer">
            <Link href="/projects" className="view-all-projects">
              View All Projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
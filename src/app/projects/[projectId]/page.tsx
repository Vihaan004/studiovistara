import Poster from '../../components/poster';
import ProjectDetailClient from '../projectDetailClient';
import '../projectDetail.css';

// Generate static params for all projects
export async function generateStaticParams() {
  // Hardcode the project IDs for static generation
  return [
    { projectId: 'villa-sunrise' },
    { projectId: 'urban-loft-renovation' },
    { projectId: 'green-office-complex' },
    { projectId: 'courtyard-housing-complex' },
    { projectId: 'heritage-boutique-hotel' }
  ];
}

interface ProjectDetailPageProps {
  params: { projectId: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <div className="wrapper">
      <Poster />
      <div className="page-content">
        <ProjectDetailClient projectId={params.projectId} />
      </div>
    </div>
  );
}
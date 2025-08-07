'use client';

import '../styles/page.css';
import './team.css';
import Poster from '../components/poster';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import teamMembersData from '../data/teamMembers.json';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  profilePicture: string;
}

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [teamMembers] = useState<TeamMember[]>(teamMembersData);

  const assetPrefix = process.env.ASSET_PREFIX || '';

  const groupedMembers = teamMembers.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  return (
    <div className='wrapper'>
      <Poster />
      <div className="page-content">
        {/* Team page content will go here */}
        <div className='team-wrapper'>
          <div className='grid'>
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className={`grid-item ${hoveredMember === member.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Image
                  src={`${assetPrefix}${member.profilePicture}`}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="member-image"
                />
              </div>
            ))}
          </div>



          <div className='team'>
            {Object.entries(groupedMembers).map(([role, members]) => (
              <div key={role} className='role-block'>
                <div className='role'>{role}</div>
                <div className='members'>
                  {members.map((member) => (
                    <p 
                      key={member.id}
                      className={hoveredMember === member.id ? 'hovered' : ''}
                      onMouseEnter={() => setHoveredMember(member.id)}
                      onMouseLeave={() => setHoveredMember(null)}
                    >
                      {member.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

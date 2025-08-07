'use client';

import '../styles/page.css';
import './team.css';
import Poster from '../components/poster';

export default function TeamPage() {
  return (
    <div className='wrapper'>
      <Poster />
      <div className="page-content">
        {/* Team page content will go here */}
        <div className='team-wrapper'>
          <div className='grid'>
            
          </div>



          <div className='team'>
            <div className='role-block'>
              <div className='role'>FOUNDING ARCHITECT</div>
              <div className='members'>
                <p>INDRAKANT PATEL</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>PRINCIPAL ARCHITECT</div>
              <div className='members'>
                <p>TEJAS PATEL</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>PRINCIPAL INTERIOR DESIGNER</div>
              <div className='members'>
                <p>MONA PATEL</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>SENIOR ENGINEERS</div>
              <div className='members'>
                <p>JIGNESH SHAH</p>
                <p>ROHIT HINGURAO</p>
                <p>GOVIND DESAI</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>SENIOR ARCHITECT</div>
              <div className='members'>
                <p>MAYANK DUBEY</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>JUNIOR ARCHITECTS</div>
              <div className='members'>
                <p>NIMISHA SIHOTA</p>
                <p>RINKAL KARAVADIA</p>
                <p>VISHAL KHIMYANI</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>INTERNS</div>
              <div className='members'>
                <p>DHRUVI THAKKER</p>
              </div>
            </div>

            <div className='role-block'>
              <div className='role'>PEN-PUSHER</div>
              <div className='members'>
                <p>SANTOSH CHANDRATRE</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

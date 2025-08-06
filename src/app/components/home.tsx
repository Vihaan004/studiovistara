import '../styles/home.css';

interface HomeProps {
  isTransitioning?: boolean;
}

export default function Home({ isTransitioning = false }: HomeProps) {
  return (
    <div className='home-section'>

        <div className='home-1'>
            <div className={`quote ${isTransitioning ? 'hidden' : ''}`}>
                <p>Society needs a good image of itself. That is the job of the Architect.</p>
                <p className='author'>— Walter Gropius</p>
            </div>
            <div className={`subsidiaries ${isTransitioning ? 'hidden' : ''}`}>
                <div className={`dot ${isTransitioning ? 'hidden' : ''}`}></div>
                <h1>associated verticals</h1>
                <p>STUDIO<span className='orange-text'>WORX</span></p>
                <p>STUDIO<span className='orange-text'>ESTATES</span></p>
                <p>STUDIO<span className='orange-text'>EXHIBITS</span></p>
            </div>
        </div>



      {/* <div className='content-container'>
        <div className='col-1'>
          <div className='col-1-row-1'>
            <div className='tag'>
              COMMERCIAL
            </div>
          </div>
          <div className='col-1-row-2'>
            <div className='col-1-row-2-col-1'>
              <div className='tag'>
                HOUSING
              </div>
            </div>
            <div className='col-1-row-2-col-2'>
              <div className='tag'>
                DESIGN
              </div>
            </div>
          </div>
        </div>
        <div className='col-2 category'>
          <div className='tag'>
            HOMES
          </div>
        </div>
      </div> */}


        
    </div>
  );
}

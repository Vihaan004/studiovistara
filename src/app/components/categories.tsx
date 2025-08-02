import '../styles/categories.css';

export default function Categories() {
  return (
    <div className='categories-section'>
      <div className='categories-container'>
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
      </div>
        
    </div>
  );
}
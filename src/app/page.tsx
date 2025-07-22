import './styles/page.css';
import Gallery from './components/gallery'

export default function Home() {
  return (
    <div>
      <div className="header">
        <div className="studiovistara">
          studiovistara
        </div>
        <div className="contact">
          contact
        </div>
      </div>
      <div className="intro">
        <div className='tagline'>
          Where design starts to breathe.
        </div>
        <Gallery />
      </div>
    </div>
  );
}

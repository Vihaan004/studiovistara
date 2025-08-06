import './styles/page.css';
import Stripes from './components/stripes'
import Poster from './components/poster'
import Gallery from './components/gallery'
import Home from './components/home';

export default function Page() {
  return (
    <div className='wrapper'>
      <Poster />
      {/* <Stripes /> */}
      <Home />
    </div>
  );
}

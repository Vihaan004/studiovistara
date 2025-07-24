import './styles/page.css';
import Stripes from './components/stripes'
import Poster from './components/poster'
import Gallery from './components/gallery'

export default function Home() {
  return (
    <div>
      <Poster />
      <Stripes />
    </div>
  );
}

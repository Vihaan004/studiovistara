import './styles/page.css';
import Stripes from './components/stripes'
import Poster from './components/poster'
import Gallery from './components/gallery'
import Content from './components/content';

export default function Home() {
  return (
    <div>
      <Poster />
      {/* <Stripes /> */}
      <Content />
    </div>
  );
}

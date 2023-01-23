import HomeBrief from './brief';
import HomeHero from './hero';
import HomeWhat from './what';
import HomeHow from './how';
import HomePartner from './partner';
import HomeFooter from './footer';
import './home.css';
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeBrief />
      <HomeWhat />
      <HomeHow />
      <HomePartner />
      <HomeFooter />
    </>
  );
}

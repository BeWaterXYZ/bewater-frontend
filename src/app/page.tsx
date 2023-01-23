import HomeBrief from './(home)/brief';
import HomeHero from './(home)/hero';
import HomeWhat from './(home)/what';
import HomeHow from './(home)/how';
import HomePartner from './(home)/partner';
import HomeFooter from './(home)/footer';

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log('searchParams: ', searchParams);
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

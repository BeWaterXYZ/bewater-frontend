import { Aspect } from '@/components/aspect';

export function Card() {
  let url =
    'https://source.unsplash.com/random/?Cryptocurrency&' + Math.random();
  return (
    <div>
      <Aspect ratio={4 / 3}>
        <img src={url} alt="crypto" className="object-cover w-full h-full" />
      </Aspect>
      <div className="p-4 bg-white/5 border-l border-r border-b border-ibis">
        <h2 className="heading-4">Awesome DeFi Idea</h2>
        <p className="body-3 text-gray-400 text-left">
          Yet another Layer 2 Idea is placeholder text used in commonly used in
          the...Yet another Layer 2 Idea is placeholder text used in commonly
          used in the...
        </p>

        <div className="h-[20px] invisible">_</div>
        <p className="body-2 text-left">Golder team</p>
        <div className="flex justify-between">
          <div className="body-3">avatars</div>
          <div className="body-3">stats</div>
        </div>
      </div>
    </div>
  );
}

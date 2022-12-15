import { Aspect } from '@/components/aspect';
import { unsplash } from '@/utils/unsplash';

export default function ChallengeIntro() {
  return (
    <div className="container  p-4 body-1">
      <div className="body-1 text-center bg-cyan-400 h-20">time schedule</div>

      <div className="flex flex-wrap">
        <div className="w-full md:w-48">left</div>
        <div className="w-full md:flex-1">
          <h3 className="heading-3 my-4">Description</h3>
          <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing for previewing layouts and visual mockups like this.
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing for previewing layouts and visual mockups like this
            ...
          </p>

          <h3 className="heading-3 my-4">Requirements</h3>
          <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing for previewing layouts and visual mockups like this.
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing for previewing layouts and visual mockups like this
            ...
          </p>

          <h3 className="heading-3 my-4">Speaker & Judges</h3>
          <div className="grid gap-5 grid-cols-100">
            {new Array(8).fill(0).map((_, index) => {
              return (
                <div key={index}>
                  <Aspect ratio={1 / 1}>
                    <img
                      src={unsplash('women')}
                      className="object-cover w-full h-full rounded"
                      alt=""
                    />
                  </Aspect>
                  <p className="body-3">Mila Yakonvenko</p>
                  <p className="body-3 text-gray-400">
                    Designer @ Crypto Capital
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

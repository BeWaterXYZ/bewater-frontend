import { Aspect } from '@/components/aspect';
import Link from 'next/link';
import { unsplash } from '../../utils/unsplash';
export default function ChallengePage() {
  return (
    <div className="container my-4">
      <div className="border-b py-4">
        <h2 className="heading-2">Happening Now</h2>
        <ul>
          <li>
            <Link href="/challenge/123/intro">
              <div className="grid gap-4 grid-cols-300">
                <div className="flex flex-col justify-around py-4">
                  <div className="body-1">Jul 05, 2023 - Aug 07, 2023</div>
                  <div className="body-1">BUIDL IN PROGRESS</div>
                </div>
                <div className="flex flex-col justify-around py-4">
                  <div className="body-1">Sample Online Challenge</div>
                  <div className="body-1">xxxx xxx xxxx</div>
                </div>
                <div>
                  <Aspect ratio={5 / 2}>
                    <img
                      src={unsplash()}
                      alt="crypto"
                      className="object-cover w-full h-full"
                    />
                  </Aspect>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-b py-4">
        <h2 className="heading-2">Up Next</h2>
        <ul>
          <li>
            <div className="grid gap-4 grid-cols-300">
              <div className="flex flex-col justify-around py-4">
                <div className="body-1">Jul 05, 2023 - Aug 07, 2023</div>
                <div className="body-1">BUIDL IN PROGRESS</div>
              </div>
              <div className="flex flex-col justify-around py-4">
                <div className="body-1">Sample Online Challenge</div>
                <div className="body-1">xxxx xxx xxxx</div>
              </div>
              <div>
                <Aspect ratio={5 / 2}>
                  <img
                    src={unsplash()}
                    alt="crypto"
                    className="object-cover w-full h-full"
                  />
                </Aspect>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="border-b py-4">
        <h2 className="heading-2">Completed</h2>
        <ul>
          <li>
            <div className="grid gap-4 grid-cols-300">
              <div className="flex flex-col justify-around py-4">
                <div className="body-1">Jul 05, 2023 - Aug 07, 2023</div>
                <div className="body-1">BUIDL IN PROGRESS</div>
              </div>
              <div className="flex flex-col justify-around py-4">
                <div className="body-1">Sample Online Challenge</div>
                <div className="body-1">xxxx xxx xxxx</div>
              </div>
              <div>
                <Aspect ratio={5 / 2}>
                  <img
                    src={unsplash()}
                    alt="crypto"
                    className="object-cover w-full h-full"
                  />
                </Aspect>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

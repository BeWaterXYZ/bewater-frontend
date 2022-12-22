import { Avatar } from '@/components/avatar';
import { LabelRole } from '@/components/label/role';

export function TeamItem() {
  return (
    <div className="flex flex-col md:grid grid-cols-[1fr,_2fr,_3fr,_1fr] text-left border border-gray-400/20 p-4 my-4  bg-white/5">
      <div>
        <div className="body-2">Dream Team</div>
        <Avatar size="small" />
      </div>

      <div>
        <div className="body-2">Yet another Layer 2 Idea</div>
        <div>
          <span className="mono-4 border rounded p-[1px] m-1 opacity-80">
            ETHERUM
          </span>
          <span className="mono-4 border rounded p-[1px] m-1 opacity-80">
            LAYER2
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-1">
          <LabelRole label="Designer" />
          <LabelRole label="Frontend Developer" />
          <LabelRole label="Backend Developer" />
          <LabelRole label="Blockchain Developer" />
        </div>

        <div className="flex gap-1">
          {['#React', '#Swift', '#SwiftUI'].map((skill) => {
            return (
              <span
                key={skill}
                className="rounded-full h-6 bg-gray-400/20  body-4 px-3 py-1 m-1 text-white/50 "
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="btn btn-secondary w-28"> JOIN </button>
      </div>
    </div>
  );
}

import { Milestone } from '@/services/types';
import clsx from 'clsx';
import { differenceInDays, isSameDay, parseISO } from 'date-fns';

function prepareData(milestones: Milestone[]) {
  let nodes = [];
  let today = new Date();
  for (let i = 0; i < milestones.length; i++) {
    let prevDate = parseISO(milestones[i].dueDate);

    nodes.push({
      type: 'date',
      date: milestones[i].dueDate,
      stage: milestones[i].stageName,
      passed: prevDate < today,
      isOn: isSameDay(today, prevDate),
    });
    if (i !== milestones.length - 1) {
      let nextDate = parseISO(milestones[i + 1].dueDate);
      let progress =
        differenceInDays(today, prevDate) /
        differenceInDays(nextDate, prevDate);
      nodes.push({
        type: 'duration',
        duration: differenceInDays(nextDate, prevDate),
        progress: Math.max(0, Math.min(progress, 1)),
      });
    }
  }
  return nodes;
}

const glowing =
  "h-[10px] w-[10px] rounded-full bg-day  shadow-[0_0_0_2px_white,_0_0_0_3px_theme('colors.day'),_0_0_14px_2px_white]";

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  let data = prepareData(milestones);
  return (
    <div className="body-1 text-center border border-[#334155] flex justify-between items-center p-12 lg:px-32 lg:my-16">
      {data.map((node, index) =>
        node.type === 'date' ? (
          <div className="w-4 flex flex-col items-center" key={index}>
            <p className="whitespace-nowrap body-3 font-bold">{node.stage}</p>
            {index === data.length - 1 ? (
              <div className="my-4 relative -top-[2px] w-4 h-0  px-1  border-t-[6px] border-b-[6px] rounded-sm border-white border-l-4 border-r-4   border-r-transparent">
                <div className="w-[1px] h-3 bg-white absolute top-1 -left-1"></div>
              </div>
            ) : (
              <div
                className={clsx('w-4 h-4 rounded-full bg-white my-4', {
                  '!bg-day': node.passed,
                  [glowing]: node.isOn,
                })}
              ></div>
            )}
            <p className="mono-2 whitespace-nowrap">{node.date}</p>
          </div>
        ) : (
          <div
            key={index}
            className="flex-1 h-1 bg-white flex justify-start items-center"
            style={{ flexGrow: node.duration, flexBasis: 100 }}
          >
            <div
              className="bg-day h-full "
              style={{ width: node.progress! * 100 + '%' }}
            ></div>
            {node.progress! > 0 && node.progress! < 1 && (
              <div className={glowing}> </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}

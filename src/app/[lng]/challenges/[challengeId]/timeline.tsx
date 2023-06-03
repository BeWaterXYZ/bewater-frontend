import { Milestone } from '@/services/types';
import clsx from 'clsx';
import { differenceInDays, format, isSameDay, parseISO } from 'date-fns';

const labelMaps: Record<Milestone['stageName'], string> = {
  Preparation: '赛事信息公布',
  Teaming: '创建团队信息及提交项目',
  'Project Submission': '项目初筛',
  Review: '线上评审',
  Result: '公布结果',
};

function prepareData(milestones: Milestone[]) {
  let nodes = [];
  let today = new Date();
  for (let i = 0; i < milestones.length; i++) {
    let prevDate = parseISO(milestones[i].dueDate);

    nodes.push({
      type: 'date',
      date: milestones[i].dueDate,
      dateFormatted: format(prevDate, 'MM.dd'),
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
  "rounded-full bg-day  shadow-[0_0_0_1px_theme('colors.day')_inset,_0_0_0_3px_white_inset]";

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  let data = prepareData(milestones);
  return (
    <>
      <div className="hidden md:flex body-1 text-center border border-midnight  justify-between items-center p-12 lg:px-32 mt-[100px] ">
        {data.map((node, index) =>
          node.type === 'date' ? (
            <div className="w-4 flex flex-col items-center" key={index}>
              <p className="whitespace-nowrap body-3 font-bold">
                {labelMaps[node.stage!]}
              </p>
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
              <p className="body-3 whitespace-nowrap">{node.dateFormatted}</p>
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
                <div className={clsx(glowing, 'w-4 h-4')}> </div>
              )}
            </div>
          ),
        )}
      </div>
      {/* mobile view */}
      <div className="flex md:hidden flex-col body-1 text-center border border-midnight  justify-between items-center p-12 lg:px-32 lg:mt-[100px] pr-[280px] mt-16 h-[450px] ">
        {data.map((node, index) =>
          node.type === 'date' ? (
            <div
              className=" h-4 flex gap-2 flex-row items-center relative "
              key={index}
            >
              {index === data.length - 1 ? (
                <div className="my-4 relative -top-[2px] w-4 h-0  px-1  border-t-[6px] border-b-[6px] rounded-sm border-white border-l-4 border-r-4   border-r-transparent">
                  <div className="w-[1px] h-3 bg-white absolute top-1 -left-1"></div>
                </div>
              ) : (
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full bg-white my-4 relative',
                    {
                      '!bg-day': node.passed,
                      [glowing]: node.isOn,
                    },
                  )}
                ></div>
              )}
              <p className="body-3 whitespace-nowrap absolute left-[30px]">
                {node.dateFormatted}
              </p>
              <p className="whitespace-nowrap body-3 font-bold absolute left-[90px]">
                {labelMaps[node.stage!]}
              </p>
            </div>
          ) : (
            <div
              key={index}
              className="flex-1 w-1 bg-white flex flex-col justify-start items-center relative"
              style={{ flexGrow: node.duration, flexBasis: 20 }}
            >
              <div
                className="bg-day w-full "
                style={{ height: node.progress! * 100 + '%' }}
              ></div>
              {node.progress! > 0 && node.progress! < 1 && (
                <div className={clsx(glowing, 'w-4 h-4')}> </div>
              )}
            </div>
          ),
        )}
      </div>
    </>
  );
}

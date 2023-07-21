import { Milestone } from '@/services/types';
import clsx from 'clsx';
import { differenceInDays, format, isSameDay, parseISO } from 'date-fns';

function prepareData(milestones: Milestone[]) {
  let nodes = [];
  let today = new Date();
  let index = 0;
  for (let i = 0; i < milestones.length; ++i) {
    if (milestones[i].showName === 'NOP') {
      continue;
    }
    if (!milestones[i].showName) {
      if (milestones[i].stageName === 'NOP') {
        continue;
      } else {
        milestones[i].showName = milestones[i].stageName;
      }
    }

    let prevDate = parseISO(milestones[i].dueDate);
    nodes.push({
      type: 'date',
      date: milestones[i].dueDate,
      dateFormatted: format(prevDate, 'MM.dd'),
      stage: milestones[i].showName,
      passed: prevDate < today,
      isOn: isSameDay(today, prevDate),
      index: index++,
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

export function Timeline({
  milestones,
  lng,
  id,
}: {
  milestones: any;
  lng: string;
  id: string;
}) {
  if (id === '4') {
    milestones = [
      {
        dueDate: '2023-07-15',
        showName: 'Launch',
      },
      {
        dueDate: '2023-07-22',
        showName: 'ZK Curriculum',
      },
      {
        dueDate: '2023-08-14',
        showName: 'ZK Hackathon',
      },
      {
        dueDate: '2023-09-15',
        showName: 'DEMO Day',
      },
    ];
  }
  if (id === '5') {
    milestones = [
      {
        dueDate: '2023-06-20',
        showName: 'Registration',
      },
      {
        dueDate: '2023-07-31',
        showName: 'First round screening',
      },
      {
        dueDate: '2023-08-12',
        showName: 'Online Demo Day',
      },
      {
        dueDate: '2023-08-15',
        showName: 'Offline Demo Day',
      },
    ];
  }
  if (id === '6') {
    milestones = [
      {
        dueDate: '2023-07-13',
        showName: '赛事信息发布',
      },
      {
        dueDate: '2023-07-15',
        showName: '开放组队和作品提交',
      },
      {
        dueDate: '2023-08-15',
        showName: 'Demo DAY & 项目评审',
      },
      {
        dueDate: '2023-09-01',
        showName: '线上颁奖',
      },
    ];
  }

  let data = prepareData(milestones);
  return (
    <>
      <div className="hidden md:flex body-1 text-center border border-midnight  justify-between items-center p-12 lg:px-32 mt-[100px] ">
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
              <p
                className="whitespace-nowrap body-3 font-bold absolute left-[90px]"
                style={{
                  wordBreak: 'normal',
                  wordWrap: 'break-word',
                  width: '214px',
                  whiteSpace: 'normal',
                  textAlign: 'left',
                }}
              >
                {node.stage}
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

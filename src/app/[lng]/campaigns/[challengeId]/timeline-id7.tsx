import { Milestone } from '@/services/types';
import clsx from 'clsx';
import { differenceInDays, format, isSameDay, parseISO } from 'date-fns';
import Image from 'next/image';

function prepareData(milestones: Milestone[]) {
  let nodes = [];
  let today = new Date();
  for (let i = 0; i < milestones.length; i++) {
    let prevDate = parseISO(milestones[i].dueDate);

    nodes.push({
      type: 'date',
      date: milestones[i].dueDate,
      dateFormatted: format(prevDate, 'M.dd HH:mm'),
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

export default function Timeline7({
  milestones,
  lng,
  id,
}: {
  milestones: any;
  lng: string;
  id: string;
}) {
  if (id === '7') {
    milestones = [
      {
        dueDate: '2023-07-14 13:00',
        stageName: '开发者签到',
      },
      {
        dueDate: '2023-07-14 15:00',
        stageName: 'Unity 混合现实开发分享',
      },
      {
        dueDate: '2023-07-14 15:20',
        stageName: 'visionOS 开发分享',
      },
      {
        dueDate: '2023-07-14 15:40',
        stageName: '亚马逊云科技分享',
      },
      {
        dueDate: '2023-07-14 16:00',
        stageName: '48小时极限开发挑战开始',
      },
      {
        dueDate: '2023-07-16 16:00',
        stageName: '作品汇报交流',
      },
    ];
  }
  let data = prepareData(milestones);
  return (
    <>
      <div className="hidden md:flex body-1 text-center border border-midnight  justify-between items-center p-12 lg:px-32 mt-[100px] " suppressHydrationWarning >
        <Image
          src="/challenge/assets/timeline7-1.jpg"
          width={591}
          height={519}
          alt=""
          className="mx-auto mb-2 md:mb-3 w-[580px] md:w-[509px]"
        />
      </div>
      {/* mobile view */}
      <div className="flex md:hidden flex-col body-1 text-center border border-midnight  justify-between items-center p-12 lg:px-32 lg:mt-[100px] pr-[280px] mt-16 h-[450px] " suppressHydrationWarning >
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
                className="whitespace-nowrap body-3 absolute left-[90px]"
                style={{
                  wordBreak: 'normal',
                  wordWrap: 'break-word',
                  width: '235px',
                  whiteSpace: 'normal',
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

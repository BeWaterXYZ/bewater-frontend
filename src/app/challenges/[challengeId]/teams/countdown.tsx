'use client';
import { parseISO } from 'date-fns';
import { formatDuration, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

function padStart(number: number, pad: string) {
  return number.toString().padStart(2, pad);
}
export function Countdown({ deadline }: { deadline: string }) {
  let deadlineDate = parseISO(deadline);
  let [durationStr, durationStrSet] = useState('');

  useEffect(() => {
    let t = setInterval(() => {
      let duration = intervalToDuration({
        start: new Date(),
        end: deadlineDate,
      });
      let durationStr = formatDuration(duration, {
        format: ['months', 'days'],
        delimiter: ', ',
      });
      durationStrSet(
        `${durationStr} ${padStart(duration.hours!, '0')}:${padStart(
          duration.minutes!,
          '0',
        )}:${padStart(duration.seconds!, '0')}`,
      );
    }, 1000);

    return () => clearInterval(t);
  }, [deadlineDate]);

  return (
    <span className="body-1 tabular-nums text-[24px] uppercase">
      {durationStr}{' '}
    </span>
  );
}

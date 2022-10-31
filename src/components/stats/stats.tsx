import clsx from 'clsx';
import { StatsItem } from './stats-item';

interface Props {
  type: string;
  className?: string;
}

export const Stats = ({ className }: Props) => {
  return (
    <div className={clsx('flex flex-row gap-2 w-full h-20', className)}>
      <StatsItem
        title={'Member Since'}
        description={'2023-05-25'}
        type={'number'}
      />
      <StatsItem
        title={'Total Prize'}
        description={'$60,000'}
        type={'number'}
      />
      <StatsItem title={'Teammates'} description={'4'} type={'number'} />
      <StatsItem
        title={'Most Played Role'}
        description={'Designer'}
        type={'role'}
      />
    </div>
  );
};

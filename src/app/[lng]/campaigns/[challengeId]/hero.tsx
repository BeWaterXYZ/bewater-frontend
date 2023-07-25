import { Challenge } from '@/services/types';
import { formatYYYYMMMDD, formatMMMDDYYYY } from '@/utils/date';
import { isMileStoneEnabled } from './utils';
import Link from 'next/link';
import Image from 'next/image';

interface ChallengeHeroProps {
  challenge: Challenge;
  lng: string;
  t: any;
}

export function ChallengeHero({ challenge, lng, t }: ChallengeHeroProps) {
  let isTeamingEnabled = false;
  if (challenge.milestones?.length > 0) {
    isTeamingEnabled = isMileStoneEnabled('Teaming', challenge);
  }
  let topRegisterBtnText: any = challenge.yotadata?.topRegisterBtnText
    ? challenge.yotadata.topRegisterBtnText
    : t('campaign.t4');
  if (challenge.type === 'HACKATHON') {
    topRegisterBtnText = challenge.yotadata?.topRegisterBtnText
      ? challenge.yotadata.topRegisterBtnText
      : null;
  }
  return (
    <div
      className={`relative overflow-hidden pb-12 md:pb-30 pt-[93px] md:pt-[160px] text-center flex flex-col justify-center  bg-cover bg-center `}
      style={{ backgroundImage: `url("${challenge.bannerUrl}")` }}
    >
      {challenge.hostIcon?.length ? (
        <>
          <Image
            src={challenge.hostIcon}
            width={144}
            height={40}
            alt=""
            className="mx-auto mb-2 md:mb-3 w-[80px] md:w-[144px]"
          />
        </>
      ) : (
        <p className="body-4 md:text-[20px]">{challenge.hostName ?? ''}</p>
      )}
      <h1 className="heading-6 md:heading-2 pb-2 md:pb-3">{challenge.title}</h1>
      <h1 className="body-4 md:text-[24px] uppercase font-light">
        {challenge.id !== '3' && challenge.id !== '7'
          ? challenge.location === 'OTHERS'
            ? ''
            : challenge.location
          : challenge.id === '3'
          ? 'SHANGHAI'
          : '北京市朝阳区东三环中路20号乐成中心A座18层'}{' '}
        {challenge.location === 'OTHERS' ? '' : '|'}{' '}
        {`${
          lng === 'zh'
            ? formatYYYYMMMDD(challenge.startTime)
            : formatMMMDDYYYY(challenge.startTime)
        } - ${
          lng === 'zh'
            ? formatYYYYMMMDD(challenge.endTime)
            : formatMMMDDYYYY(challenge.endTime)
        }`}
      </h1>
      {challenge.type === 'HACKATHON' ? (
        isTeamingEnabled ? (
          <div className="mt-6 md:mt-12">
            <Link
              href={`/${lng}/campaigns/${challenge.id}/teams`}
              className="btn btn-primary-invert body-4 text-day uppercase px-4 py-3 md:px-8 md:py-6"
            >
              {t('campaign.t1')}
            </Link>
          </div>
        ) : (
          <div className="mt-6 md:mt-12">
            {/* <div className="btn btn-primary-invert body-4 text-day/70 border-day/30 uppercase px-4 py-3 md:px-8 md:py-6 hover:border-day/30 hover:bg-transparent hover:text-day/70 hover:cursor-default bg-transparent"> */}
            <div className="body-3 md:body-1 md:font-normal text-day/70 md:text-day/70 uppercase px-4 py-3 md:px-8 md:py-6 tracking-widest">
              {`${t('campaign.t2')} ${formatYYYYMMMDD(
                challenge.milestones.find((ms) => ms.stageName === 'Teaming')
                  ?.dueDate!,
              )} ${t('campaign.t3')}`}
            </div>
          </div>
        )
      ) : null}
      {challenge.type === 'HACKATHON' && topRegisterBtnText ? (
        challenge.joinLink ? (
          <div className="mt-6 md:mt-12">
            <Link
              target="_blank"
              href={challenge.joinLink}
              className={`btn btn-primary rounded-none body-4 text-night uppercase ${
                topRegisterBtnText.length > 26
                  ? 'px-4 py-8 md:px-8 md:py-10'
                  : 'px-4 py-3 md:px-8 md:py-6'
              }`}
            >
              <p
                className="text-center max-w-[250px]"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {topRegisterBtnText}
              </p>
            </Link>
          </div>
        ) : null
      ) : null}
      {challenge.type === 'WORKSHOP' ? (
        challenge.joinLink ? (
          <div className="mt-6 md:mt-12">
            <Link
              target="_blank"
              href={challenge.joinLink}
              className={`btn btn-primary rounded-none body-4 text-night uppercase ${
                topRegisterBtnText.length > 26
                  ? 'px-4 py-8 md:px-8 md:py-10'
                  : 'px-4 py-3 md:px-8 md:py-6'
              }`}
            >
              <p
                className="text-center max-w-[250px]"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {topRegisterBtnText}
              </p>
            </Link>
          </div>
        ) : null
      ) : null}
    </div>
  );
}

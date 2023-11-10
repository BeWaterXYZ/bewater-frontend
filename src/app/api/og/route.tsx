import { ImageResponse } from "@vercel/og";
import { NextRequest } from 'next/server';
import { formatMMMDDYYYY } from "@/utils/date";

export const runtime = "edge"
export const revalidate = 10

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const challengeId = searchParams.get('challengeId');

  const ogimg = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 128,
        background: 'lavender',
      }}
    >
      Bewater.xyz
    </div>
  );

  const ops = {
    width: 1008,
    height: 530,
  };

  if (!challengeId) {
    return new ImageResponse(ogimg, ops);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/challenge/${challengeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const { data } = await response.json();
    const challenge = data.challenge;

    // console.log(challenge)

    return new ImageResponse(
      (
        <div style={{
          fontFamily: 'var(--font-secondary), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundImage: `url(${challenge.yotadata?.mainBanner ?? challenge.bannerUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {challenge.hostIcon?.length ? (
          <img
            width="144"
            src={challenge.yotadata?.mainIcon ?? challenge.hostIcon}
          />
        ) : (
          <p style={{
            color: "white",
            fontWeight: "normal",
            fontSize: '20px',
          }}>{challenge.hostName ?? ""}</p>
        )}
        <h1 style={{
          color: "white",
          fontWeight: "bold",
        }}>{challenge.title}</h1>
        <p style={{
          color: "white",
          fontWeight: '300',
          fontSize: "24px",
          textTransform: "uppercase",
        }}>
          {challenge.location === "ONLINE" ? 'ONLINE | ' : null}
          {(challenge.location === "OFFLINE" ||
            challenge.location === "MIXED" ||
            challenge.location === "OTHERS") &&
            challenge.city
            ? `${challenge.city} | `
            : null}
          {formatMMMDDYYYY(challenge.startTime)}
          {challenge.startTime !== challenge.endTime &&
            ` - ${formatMMMDDYYYY(challenge.endTime)}`}
        </p>
      </div>
      ), ops);
  } catch(e) {
    return new ImageResponse(ogimg, ops);
  }

}

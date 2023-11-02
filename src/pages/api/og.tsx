import { ImageResponse } from "@vercel/og";
import { NextRequest } from 'next/server';
import { formatMMMDDYYYY } from "@/utils/date";

export const config = {
  runtime: 'edge',
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const challengeId = searchParams.get('challengeId');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/challenge/${challengeId}`);
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
        justifyContent: 'center',
        backgroundImage: `url("${challenge.yotadata?.mainBanner ?? challenge.bannerUrl}")`,
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
    ),
    {
      width: 1008,
      height: 530,
    },
  );
}

import dynamicLoad from "next/dynamic";
import { redirect } from "next/navigation";
import { getChallengeById } from "@/services/challenge";
import { Metadata } from "next";
import { segmentSchema } from "./param-schema";
import { useTranslation } from "@/app/i18n";
import { isWorkshop, RegexDigit } from "./utils";

const ChallengeHero = dynamicLoad(() => import("./hero"), { ssr: false });
const ChallengeNav = dynamicLoad(() => import("./nav"), { ssr: false });

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { challengeId: string; lng: string };
}) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  const { lng } = segmentSchema.lng.parse(params);

  if (RegexDigit.test(challengeId) || challenge.externalId !== challengeId) {
    return redirect(`/${lng}/campaigns/${challenge.externalId}`);
  }

  return (
    <div
      style={{
        fontFamily: "var(--font-secondary)",
      }}
    >
      <ChallengeHero challenge={challenge} lng={lng} />
      {!isWorkshop(challenge) ? (
        <ChallengeNav challenge={challenge} lng={lng} />
      ) : null}
      <div>{children}</div>
    </div>
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { lng } = segmentSchema.lng.parse(params);
  const challenge = await getChallengeById(challengeId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  if (challenge.yotadata?.title) {
    challenge.title =
      lng === "zh"
        ? challenge.yotadata.title.zh ?? challenge.yotadata.title.en
        : challenge.yotadata.title.en ?? challenge.yotadata.title.zh;
  }

  if (challenge.yotadata?.description) {
    challenge.description =
      lng === "zh"
        ? challenge.yotadata.description.zh ?? challenge.yotadata.description.en
        : challenge.yotadata.description.en ??
          challenge.yotadata.description.zh;
  }

  return {
    title: t("bewater") + " - " + challenge.title,
    description: challenge.description,
    twitter: {
      site: "BeWater",
      card: "summary_large_image",
      title: "BeWater - " + challenge.title,
      description: challenge.description,
      images: challenge.yotadata?.ogImgUri
        ? challenge.yotadata.ogImgUri
        : `/api/og?challengeId=${challenge.id}`,
    },
    openGraph: {
      type: "website",
      title: "BeWater - " + challenge.title,
      description: challenge.description,
      images: challenge.yotadata?.ogImgUri
        ? challenge.yotadata.ogImgUri
        : `/api/og?challengeId=${challenge.id}`,
    },
  };
}

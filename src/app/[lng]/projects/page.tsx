import { getChallenges } from "@/services/challenge";
import { Metadata } from "next";
import ProjectList from "./project-list";
import { useTranslation } from "@/app/i18n";

export default async function ChallengePage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng = "en" } = params || {};
  return (
    <ProjectList></ProjectList>
  );
}

// export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { lng = "en" } = params || {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  return {
    title: t("title"),
    description:
      "BeWater is the ultimate builder community based on the SOP management system we built for open innovation campaigns including hackathon, design contest, demo day and more. It serves cutting-edge fields and also connects traditional industries. BeWater engages builders with different skill sets to build a better future together.",
  };
}

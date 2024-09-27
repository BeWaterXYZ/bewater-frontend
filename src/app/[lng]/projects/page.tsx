import { getChallenges } from "@/services/challenge";
import { Metadata } from "next";
import ProjectList from "./project-list";
import { useTranslation } from "@/app/i18n";
import Link from "next/link";

export default async function ProjectsPage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng = "en" } = params || {};
  return (
    <>
      <div className="container mx-auto px-4 pt-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[rgb(0,255,255)] drop-shadow-md">
          BeWater Open Network 
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Link builders and projects with the BeWater Open Network
        </p>
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
          Check the deck & contact with us 👉{" "}
          <Link
            href="https://drive.google.com/file/d/1_y3wfbIeZN855S8_sBmWvFdsLTBT2qPU/view?usp=sharing"
            className="text-[rgb(0,255,255)] hover:text-white hover:underline font-medium transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deck
          </Link>
        </p>
      </div>
      <ProjectList lng={lng}></ProjectList>
    </>
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

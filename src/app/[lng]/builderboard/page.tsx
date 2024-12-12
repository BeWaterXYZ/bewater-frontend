"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  rank: number;
}

export default function BuilderBoard({ params: { lng } }: { params: { lng: string } }) {
  const { t } = useTranslation(lng, "translation");
  const [builders, setBuilders] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // moke
    const mockData: GitHubUser[] = [
      {
        login: "developer1",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/developer1",
        contributions: 328,
        rank: 1
      },
      {
        login: "developer2",
        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
        html_url: "https://github.com/developer2",
        contributions: 256,
        rank: 2
      },
      {
        login: "developer3",
        avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
        html_url: "https://github.com/developer3",
        contributions: 198,
        rank: 3
      }
    ];

    setTimeout(() => {
      setBuilders(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col items-center">
        <h1 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center mb-12">
          {t("builderboard.title")}
        </h1>

        {loading ? (
          <div className="text-day">{t("common.loading")}</div>
        ) : (
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 gap-4">
              {builders.map((builder) => (
                <a
                  key={builder.login}
                  href={builder.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-[#0B0C24] border border-[#24254E] rounded-lg hover:border-day transition-colors"
                >
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 relative mr-4">
                      <Image
                        src={builder.avatar_url}
                        alt={builder.login}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-day font-bold">{builder.login}</h3>
                      <p className="text-white/60">
                        {builder.contributions} contributions
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-day">
                    #{builder.rank}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
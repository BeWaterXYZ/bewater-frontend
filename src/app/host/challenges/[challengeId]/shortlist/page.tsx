import getSymbolFromCurrency from "currency-symbol-map";
import { formatMoney } from "@/utils/numeral";
import { Aspect } from "@/components/aspect";
import HoverCard from "@/components/hover-card";
import { useLoadingStoreAction } from "@/components/loading/store";
import { getShortlistByChallenge } from "@/services/challenge";
import { getChallengeTProjects } from "@/services/project"
import { useFetchChallengeById } from "@/services/challenge.query";
import { Judge, Project } from "@/services/types";
import { formatYYYYMMMDD } from "@/utils/date";
import {
  CheckIcon,
  OpenInNewWindowIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Balancer from "react-wrap-balancer";
import Markdown from "@/components/markdown";
import { segmentSchema } from "../../../segment-params";
import async from "react-select/dist/declarations/src/async/index";

export default async function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  let projects: Project[] = await getChallengeTProjects(challengeId);
  const shortlist   = await getShortlistByChallenge(challengeId);

  projects = projects.map((it) => {
    if (shortlist.ids.some((projectId) => projectId === it.id)) {
      it.promoted = true;
    }
    return it;
  })

  return (
    <div>
      hello world
    </div>
  );
}

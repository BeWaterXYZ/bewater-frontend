import { redirect } from "next/navigation";
import { languages, fallbackLng } from "../i18n/settings";

export default function Home({ params }: { params: { lng: string } }) {
  let { lng = "en" } = params || {};

  if (languages.indexOf(lng) < 0) {
    lng = fallbackLng;
  }

  return redirect(`/${lng}/campaigns`);
}

import RezClient from "../../components/rez-client";
import { pageMeta } from "../../components/site-meta";

export const metadata = pageMeta("/rezerwacja/");

export default function Page() {
  return <RezClient />;
}

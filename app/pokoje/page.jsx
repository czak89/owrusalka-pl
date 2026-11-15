import PokojePage from "../../components/pokoje-page";
import { pageMeta } from "../../components/site-meta";

export const metadata = pageMeta("/pokoje/");

export default function Page() {
  return <PokojePage />;
}

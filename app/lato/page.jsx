import SubPage from "../../components/sub-page";
import { pageMeta } from "../../components/site-meta";

export const metadata = pageMeta("/lato/");

export default function Page() {
  return <SubPage page="lato" />;
}

import SubPage from "../../components/sub-page";
import { pageMeta } from "../../components/site-meta";

export const metadata = pageMeta("/cennik/");

export default function Page() {
  return <SubPage page="cennik" />;
}

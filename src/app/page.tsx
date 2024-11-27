import HomePage from "@/components/pages/Homepage";
import type { Metadata} from "next";

export const metadata: Metadata = {
  title: 'Bütçe Uygulaması',
}
export default function Home() {
  return <HomePage />;
}

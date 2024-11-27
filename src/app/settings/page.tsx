import Settings from "@/components/pages/Settings";

import type { Metadata} from "next";

export const metadata: Metadata = {
  title: 'Settings',
}
export default function SettingsPage() {
  return <Settings />;
}

import Expense from "@/components/pages/Expense";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense",
};
export default function ExpensePage() {
  return <Expense />;
}

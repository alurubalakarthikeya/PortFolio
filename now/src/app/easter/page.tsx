import type { Metadata } from "next";
import { EasterClientPage } from "./components/EasterClientPage";

export const metadata: Metadata = {
  title: "Easter",
  description: "A playful personal side page with interests, friends, and off-work details.",
};

export default function EasterPage() {
  return <EasterClientPage />;
}

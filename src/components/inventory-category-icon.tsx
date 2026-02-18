import {
  Package,
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Monitor,
  BookOpen,
  SprayCan,
} from "lucide-react";
import type { InventoryCategory } from "@/types";

// Simple wireframe hanger for clothing (Lucide has no hanger icon)
function HangerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V12a2 2 0 0 1 2.5-1.9l5 2a2 2 0 0 1 1.5 1.9V22" />
      <path d="M6 12l6-4 6 4" />
      <path d="M12 8v14" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<InventoryCategory, React.ComponentType<{ className?: string }>> = {
  "Furniture": Sofa,
  "Bedding & linens": BedDouble,
  "Kitchen & dining": UtensilsCrossed,
  "Electronics": Monitor,
  "Clothing & shoes": HangerIcon,
  "School supplies": BookOpen,
  "Toiletries & personal care": SprayCan,
  "Other": Package,
};

export function InventoryCategoryIcon({
  category,
  className = "h-6 w-6",
}: {
  category: string;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[category as InventoryCategory] ?? Package;
  return <Icon className={className} />;
}

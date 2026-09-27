import {
  BrainCircuit,
  BriefcaseBusiness,
  CodeXml,
  Database,
  GraduationCap,
  MapPin,
  Rocket,
  Scale,
  ShoppingBag,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/portfolio";

const icons: Record<IconName, LucideIcon> = {
  smartphone: Smartphone,
  code: CodeXml,
  database: Database,
  brain: BrainCircuit,
  wrench: Wrench,
  rocket: Rocket,
  graduation: GraduationCap,
  briefcase: BriefcaseBusiness,
  scale: Scale,
  shopping: ShoppingBag,
  map: MapPin,
};

export function ContentIcon({
  name,
  size = 28,
  strokeWidth = 2.2,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = icons[name];

  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      size={size}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}

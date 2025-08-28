import { Phone, Users, TrendingUp, CheckCircle2 } from "lucide-react";

export const categories = [
  {
    value: "lead_generation",
    label: "Lead Generation",
    icon: Phone,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    value: "relationship_building",
    label: "Relationship Building",
    icon: Users,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    value: "marketing",
    label: "Marketing",
    icon: TrendingUp,
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    value: "administrative",
    label: "Administrative",
    icon: CheckCircle2,
    color: "bg-neutral-100 text-neutral-600 border-neutral-200",
  },
];

export const priorities = [
  {
    value: "high",
    label: "High",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    value: "low",
    label: "Low",
    color: "bg-green-100 text-green-700 border-green-200",
  },
];

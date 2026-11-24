import {
  Brain, ClipboardList, Clock, FileCheck2, MessageCircleQuestion, Presentation, Sparkles, TrendingUp, UserRound,
  Target, Trophy, Lightbulb, Globe2, BookOpen, Calculator, GraduationCap, HeartHandshake, type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Brain, ClipboardList, Clock, FileCheck2, MessageCircleQuestion, Presentation, Sparkles, TrendingUp, UserRound,
  Target, Trophy, Lightbulb, Globe2, BookOpen, Calculator, GraduationCap, HeartHandshake,
};

export const iconNames = Object.keys(iconMap);

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = iconMap[name] ?? Sparkles;
  return <C className={className} aria-hidden="true" />;
}

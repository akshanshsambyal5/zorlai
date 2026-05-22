import React from 'react';
import {
  Code2,
  Sparkles,
  Video,
  Radio,
  Brain,
  Activity,
  Palette,
  Terminal,
  Flame,
  Volume2,
  Compass,
  BrainCircuit,
  Layers,
  Speech,
  Cpu,
  Calendar,
  Bookmark,
  Heart,
  ExternalLink,
  Search,
  Plus,
  ArrowUp,
  Inbox,
  User,
  Settings,
  Shield,
  Star,
  ChevronRight,
  Send,
  HelpCircle,
  Menu,
  X as CloseIcon,
  Sparkle,
  LogOut,
  LogIn,
  AlertCircle,
  LayoutDashboard,
  ChevronDown,
  Mail,
  Lock,
} from 'lucide-react';

type IconComponent = React.ComponentType<{ className?: string }>;

/** Use "Close" not "X" — avoids collisions with the Lucide X component in lookups. */
const iconsMap: Record<string, IconComponent> = {
  Code2,
  Sparkles,
  Video,
  Radio,
  Brain,
  Activity,
  Palette,
  Terminal,
  Flame,
  Volume2,
  Compass,
  BrainCircuit,
  Layers,
  Speech,
  Cpu,
  Calendar,
  Bookmark,
  Heart,
  ExternalLink,
  Search,
  Plus,
  ArrowUp,
  Inbox,
  User,
  Settings,
  Shield,
  Star,
  ChevronRight,
  Send,
  HelpCircle,
  Menu,
  Close: CloseIcon,
  X: CloseIcon,
  Sparkle,
  LogOut,
  LogIn,
  AlertCircle,
  LayoutDashboard,
  ChevronDown,
  Mail,
  Lock,
};

interface LucideIconProps {
  name: string;
  className?: string;
  fallback?: string;
}

export function LucideIcon({ name, className, fallback = 'Sparkles' }: LucideIconProps) {
  const IconComponent =
    iconsMap[name] ?? iconsMap[fallback] ?? Sparkles;
  return <IconComponent className={className} />;
}

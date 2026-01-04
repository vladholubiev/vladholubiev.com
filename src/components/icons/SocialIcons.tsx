import { Github, Instagram, Layers, Linkedin, PenLine, X } from 'lucide-react';

type IconProps = { className?: string };

export function XIcon({ className }: IconProps) {
  return <X className={className} strokeWidth={1.5} />;
}

export function InstagramIcon({ className }: IconProps) {
  return <Instagram className={className} strokeWidth={1.5} />;
}

export function GitHubIcon({ className }: IconProps) {
  return <Github className={className} strokeWidth={1.5} />;
}

export function LinkedInIcon({ className }: IconProps) {
  return <Linkedin className={className} strokeWidth={1.5} />;
}

export function MediumIcon({ className }: IconProps) {
  return <PenLine className={className} strokeWidth={1.5} />;
}

export function StackOverflowIcon({ className }: IconProps) {
  return <Layers className={className} strokeWidth={1.5} />;
}

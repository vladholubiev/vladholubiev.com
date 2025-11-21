import {HugeiconsIcon} from '@hugeicons/react';
import {
  GithubIcon as HugeGithubIcon,
  InstagramIcon as HugeInstagramIcon,
  Linkedin01Icon,
  MediumIcon as HugeMediumIcon,
  NewTwitterIcon,
  LayersIcon,
} from '@hugeicons/core-free-icons';

type IconProps = {className?: string};

export function XIcon({className}: IconProps) {
  return <HugeiconsIcon icon={NewTwitterIcon} className={className} strokeWidth={1.5} />;
}

export function InstagramIcon({className}: IconProps) {
  return <HugeiconsIcon icon={HugeInstagramIcon} className={className} strokeWidth={1.5} />;
}

export function GitHubIcon({className}: IconProps) {
  return <HugeiconsIcon icon={HugeGithubIcon} className={className} strokeWidth={1.5} />;
}

export function LinkedInIcon({className}: IconProps) {
  return <HugeiconsIcon icon={Linkedin01Icon} className={className} strokeWidth={1.5} />;
}

export function MediumIcon({className}: IconProps) {
  return <HugeiconsIcon icon={HugeMediumIcon} className={className} strokeWidth={1.5} />;
}

export function StackOverflowIcon({className}: IconProps) {
  return <HugeiconsIcon icon={LayersIcon} className={className} strokeWidth={1.5} />;
}

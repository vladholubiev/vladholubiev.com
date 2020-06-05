export function trackSocialClick(label: string): void {
  return trackLinkClick('social', label);
}

export function trackLinkClick(kind: string, label: string): void {
  const meta = {
    event_category: `${kind}_links`,
    event_label: label
  };

  console.debug('link_click', meta);
  (window as any).gtag && (window as any).gtag('event', 'link_click', meta);
}

export function trackSocialClick(label) {
  return trackLinkClick('social', label);
}

export function trackLinkClick(kind, label) {
  const meta = {
    event_category: `${kind}_links`,
    event_label: label
  };

  console.debug('link_click', meta);
  window.gtag && window.gtag('event', 'link_click', meta);
}
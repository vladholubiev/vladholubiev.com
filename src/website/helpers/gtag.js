export function trackSocialClick(label) {
  const meta = {
    event_category: 'social_links',
    event_label: label
  };

  console.debug('link_click', meta);
  window.gtag && window.gtag('event', 'link_click', meta);
}

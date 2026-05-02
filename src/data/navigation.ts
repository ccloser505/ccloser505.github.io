export interface NavItem {
  label: string;
  href: string;
}

// Order matters — this is the order shown in the menu overlay.
export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Research', href: '/research/' },
  { label: 'Presentations', href: '/presentations/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'CV', href: '/cv/' },
];

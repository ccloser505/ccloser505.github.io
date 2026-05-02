export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'About', href: '/' },
  { label: 'Research', href: '/research/' },
  { label: 'Presentations', href: '/presentations/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'CV', href: '/cv/' },
];

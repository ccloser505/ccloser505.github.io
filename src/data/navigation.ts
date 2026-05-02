export interface NavItem {
  label: string;
  href: string;
}

// Brand link in Nav already serves as Home, so it's omitted here.
export const navigation: NavItem[] = [
  { label: 'Research', href: '/research/' },
  { label: 'Presentations', href: '/presentations/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'CV', href: '/cv/' },
];

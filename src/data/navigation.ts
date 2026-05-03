export interface NavItem {
  label: string;
  href: string;
}

// Anchor links — single-page layout. Brand link (Nav.astro) scrolls to top.
export const navigation: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Presentations', href: '#presentations' },
  { label: 'Blog', href: '#blog' },
  { label: 'CV', href: '#cv' },
];

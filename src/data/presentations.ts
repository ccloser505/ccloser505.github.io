export type PresentationType = 'invited' | 'conference';

export interface Presentation {
  slug: string;
  title: string;
  event: string;
  location: string;
  date: string;
  type: PresentationType;
  note?: string;
  abstract?: string;
  keywords?: string[];
  doi?: string;
  url?: string;
  /**
   * Path (relative to public/) of slides PDF stored in this repo.
   * Example: 'slides/buffalo-2026.pdf' → served at /slides/buffalo-2026.pdf
   * Leave undefined when no slides PDF is available.
   */
  pdf?: string;
}

export const presentations: Presentation[] = [
  // ─── Invited ───
  {
    slug: 'buffalo-2026-non-marital-childbearing',
    type: 'invited',
    title: "Between 'Deficit' and 'Choice': Shifting Dynamics of Non-marital Childbearing in South Korea, 1997–2024",
    event: 'Workshop on Family Formation in Transition',
    location: 'University at Buffalo, Buffalo, NY, USA',
    date: 'April 2026',
    note: 'Funded',
  },
  {
    slug: 'keio-2025-decoupling-partnership',
    type: 'invited',
    title: "Decoupling Partnership and Reproduction from Marriage: Period Effects on Korean Women's Attitudes toward Non-marital Cohabitation and Childbearing after 2010",
    event: 'Public Seminar: Family and Children in East Asia',
    location: 'Keio University, Tokyo, Japan',
    date: 'December 2025',
  },

  // ─── Conference ───
  {
    slug: 'ksa-2024-marriage-partnership-reproduction',
    type: 'conference',
    title: "The Shifting Relationship Between Marriage, Partnership, and Reproduction: Changes in South Korean Women's Attitudes toward Non-marital Cohabitation and Childbirth, 2010–2022",
    event: 'Korean Sociological Association Annual Meeting',
    location: 'Seoul, South Korea',
    date: 'December 2024',
  },
  {
    slug: 'sungshin-2023-foreign-domestic-workers',
    type: 'conference',
    title: 'A Discourse Analysis of the Policy of the Introduction of Foreign Domestic Workers',
    event: '18th Humanities Week Symposium',
    location: 'Sungshin Women\'s University, Seoul, South Korea',
    date: 'October 2023',
  },
];

export const presentationsByType = {
  'invited': presentations.filter((p) => p.type === 'invited'),
  'conference': presentations.filter((p) => p.type === 'conference'),
};

export const presentationTypeLabel: Record<PresentationType, string> = {
  'invited': 'Invited Talk',
  'conference': 'Conference Presentation',
};

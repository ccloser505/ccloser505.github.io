export type PresentationType = 'invited' | 'conference';

export interface Presentation {
  title: string;
  event: string;
  location: string;
  date: string;
  type: PresentationType;
  note?: string;
}

export const presentations: Presentation[] = [
  // ─── Invited ───
  {
    type: 'invited',
    title: "Between 'Deficit' and 'Choice': Shifting Dynamics of Non-marital Childbearing in South Korea, 1997–2024",
    event: 'Workshop on Family Formation in Transition',
    location: 'University at Buffalo, Buffalo, NY, USA',
    date: 'April 2026',
    note: 'Funded',
  },
  {
    type: 'invited',
    title: "Decoupling Partnership and Reproduction from Marriage: Period Effects on Korean Women's Attitudes toward Non-marital Cohabitation and Childbearing after 2010",
    event: 'Public Seminar: Family and Children in East Asia',
    location: 'Keio University, Tokyo, Japan',
    date: 'December 2025',
  },

  // ─── Conference ───
  {
    type: 'conference',
    title: "The Shifting Relationship Between Marriage, Partnership, and Reproduction: Changes in South Korean Women's Attitudes toward Non-marital Cohabitation and Childbirth, 2010–2022",
    event: 'Korean Sociological Association Annual Meeting',
    location: 'Seoul, South Korea',
    date: 'December 2024',
  },
  {
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

export type PublicationType = 'peer-reviewed' | 'report' | 'work-in-progress';

export interface Publication {
  title: string;
  authors: string;
  year: string;
  venue: string;
  type: PublicationType;
  language?: 'English' | 'Korean';
  note?: string;
  url?: string;
}

export const publications: Publication[] = [
  // ─── Peer-Reviewed ───
  {
    type: 'peer-reviewed',
    authors: 'Hwayeon Kim and Yool Choi',
    year: 'Forthcoming',
    title: 'Childcare Arrangement Trends, 2010–2020: Evidence from Population and Housing Census Data',
    venue: 'Korea Journal of Population Studies',
    language: 'Korean',
  },
  {
    type: 'peer-reviewed',
    authors: 'Hwayeon Kim and Nayoung Lee',
    year: '2024',
    title: 'Critical Discourse Analysis on the Foreign Domestic Worker Policy: Reproduction of Racialized Gender Order',
    venue: 'Korea Social Policy Review, 31(3), 181–210',
    language: 'Korean',
  },

  // ─── Research Reports ───
  {
    type: 'report',
    authors: 'Bongoh Kye, Jong-Seok Byun, Sam-Hyun Yoo, Keun-Tae Kim, Yool Choi, and Hwayeon Kim',
    year: '2025',
    title: 'A Study to Enhance Accuracy and Data Utilization of the 2025 Population and Housing Census',
    venue: 'Ministry of Data and Statistics, Republic of Korea',
    language: 'Korean',
  },
  {
    type: 'report',
    authors: 'Jeongin Kim, Jisu Kim, Hwayeon Kim, and Juhee Cheon',
    year: '2022',
    title: 'A Study on the Actual Condition of Young Women Researchers in the Fields of Humanities and Social Sciences',
    venue: 'Humanities Policy Research Series 2022-06, National Research Council for Economics, Humanities and Social Sciences (NRC)',
    language: 'Korean',
  },

  // ─── Works in Progress ───
  {
    type: 'work-in-progress',
    authors: 'Hwayeon Kim, Yool Choi, and Jiwon Lee',
    year: 'Under preparation',
    title: "Between 'Deficit' and 'Choice': Shifting Dynamics of Non-marital Childbearing in South Korea, 1997–2024",
    venue: 'Abstract selected for the Journal of Comparative Family Studies special issue',
  },
  {
    type: 'work-in-progress',
    authors: 'Hwayeon Kim and Yool Choi',
    year: 'Under preparation',
    title: "Decoupling Partnership and Reproduction from Marriage: Changes in Korean Women's Attitudes toward Non-marital Cohabitation and Birth, Focusing on the 2016–2018 Period Effects",
    venue: 'Working paper',
  },
  {
    type: 'work-in-progress',
    authors: 'Hwayeon Kim and Yool Choi',
    year: 'Under preparation',
    title: 'Who Supports Elderly Parents in Need? The Structure of Active and Latent Intergenerational Ties in Korea',
    venue: 'Working paper',
  },
];

export const publicationsByType = {
  'peer-reviewed': publications.filter((p) => p.type === 'peer-reviewed'),
  'report': publications.filter((p) => p.type === 'report'),
  'work-in-progress': publications.filter((p) => p.type === 'work-in-progress'),
};

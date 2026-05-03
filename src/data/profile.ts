export const profile = {
  name: {
    en: 'Hwayeon Kim',
    hanja: '金花淵',
    ko: '김화연',
  },
  title: 'MA in Sociology',
  affiliation: 'Chung-Ang University',
  location: 'Seoul, South Korea',
  email: 'ccloser505@gmail.com',
  profileImage: 'images/profile.jpg',
  tagline: 'Sociologist working on family, demography, and gender.',
  bio: [
    "I work at the intersection of family, demography, and gender in contemporary South Korea. My research examines how partnership, reproduction, and marriage are being decoupled in late-low-fertility societies, and how shifting attitudes toward non-marital cohabitation and childbearing reshape the meaning of family. Lately, I have been moving these interests closer to the ground, toward actual demographic behavior and the everyday decisions that aggregate into population-level change.",
    "I hold an MA in Sociology from Chung-Ang University, where my thesis was awarded the Outstanding Master's Thesis Award by the Korean Social Science Data Archive (KOSSDA). Before turning to sociology, I studied Cinema Studies at the Korea National University of Arts. Methodologically, I work primarily with quantitative data: survey microdata, census records, and longitudinal panels, using Stata, R, and Python.",
    "I am currently preparing to apply to doctoral programs, eager to bring these questions into a new research environment. Outside of research, I find my balance on the yoga mat!",
  ],
  education: [
    {
      degree: 'M.A. in Sociology',
      institution: 'Chung-Ang University',
      location: 'Seoul, South Korea',
      year: '2025',
      note: "Outstanding Master's Thesis Award (KOSSDA, 2026)",
    },
    {
      degree: 'B.A. in Cinema Studies',
      institution: 'Korea National University of Arts',
      location: 'Seoul, South Korea',
      year: '2016',
    },
  ],
  researchInterests: [
    'Family Demography',
    'Gender & Sexuality',
    'Non-marital Cohabitation & Childbearing',
    'Quantitative Methods',
  ],
  skills: ['Stata', 'R', 'Python'],
  links: {
    cv: 'files/cv-hwayeon-kim.pdf',
    email: 'mailto:ccloser505@gmail.com',
  },
} as const;

export type Profile = typeof profile;

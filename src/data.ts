import { CVData } from "./types";

export const demoCVData: CVData = {
  personalInfo: {
    fullName: "Alexandre Dupuis",
    jobTitle: "Product Designer & Développeur Front-End",
    email: "alexandre.dupuis@nouvance.ia",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    website: "https://dupuis-design.dev",
    linkedin: "linkedin.com/in/alexandredupuis",
    summary: "Designer UI/UX passionné et développeur front-end spécialisé dans la création d'interfaces épurées, intuitives et performantes. Fort de plus de 5 ans d'expérience dans la conception d'applications web SaaS d'envergure, j'allie rigueur esthétique et propreté du code pour offrir des expériences utilisateurs mémorables."
  },
  experiences: [
    {
      id: "exp-1",
      role: "Lead Product Designer & Dev Front-End",
      company: "Nouvance IA",
      location: "Paris (Hybride)",
      startDate: "2023-09",
      endDate: "",
      current: true,
      description: "• Direction artistique et conception de l'identité visuelle de l'ensemble de la suite SaaS.\n• Refonte globale de l'interface utilisateur (UI), améliorant le taux de conversion de 24%.\n• Développement de composants React modernes réutilisables sous forme de Design System interne avec Tailwind CSS.\n• Collaboration étroite avec l'équipe produit pour transformer des concepts complexes en workflows simples et fluides."
    },
    {
      id: "exp-2",
      role: "UI/UX Designer & Développeur React",
      company: "CréaTech Solutions",
      location: "Lyon, France",
      startDate: "2021-03",
      endDate: "2023-08",
      current: false,
      description: "• Conception d'interfaces mobiles et web (Figma, wireframing, prototypage haute fidélité).\n• Intégration d'interfaces interactives dynamiques en React.js et TypeScript.\n• Amélioration de l'accessibilité numérique (conformité RGAA) sur l'ensemble des plateformes clients.\n• Réalisation de tests utilisateurs qualitatifs pour valider l'ergonomie des fonctionnalités clés."
    },
    {
      id: "exp-3",
      role: "Designer Graphique & Intégrateur Web",
      company: "Pixel & Code Studio",
      location: "Bordeaux, France",
      startDate: "2019-06",
      endDate: "2021-02",
      current: false,
      description: "• Création de chartes graphiques et d'identités visuelles pour des startups et PME.\n• Développement de sites vitrines sur mesure en HTML5, CSS3/Tailwind et JavaScript.\n• Optimisation SEO on-page et performances de chargement des applications clients (score Lighthouse moyen de 95+)."
    }
  ],
  educations: [
    {
      id: "edu-1",
      degree: "Master en Design d'Interaction & Technologies Web",
      school: "École Supérieure du Digital (ESD)",
      city: "Paris",
      year: "2019"
    },
    {
      id: "edu-2",
      degree: "Licence Professionnelle Métiers du Numérique",
      school: "IUT de Bordeaux",
      city: "Bordeaux",
      year: "2017"
    }
  ],
  skills: [
    "Design UI/UX",
    "Figma",
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Design System",
    "Prototypage",
    "Accessibilité Web",
    "Optimisation SEO",
    "Git / GitHub"
  ],
  languages: [
    {
      id: "lang-1",
      name: "Français",
      level: "Maternelle"
    },
    {
      id: "lang-2",
      name: "Anglais",
      level: "Courant (C1 - IELTS 7.5)"
    },
    {
      id: "lang-3",
      name: "Espagnol",
      level: "Intermédiaire (B1)"
    }
  ]
};

export const defaultEmptyCVData: CVData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: ""
  },
  experiences: [],
  educations: [],
  skills: [],
  languages: []
};

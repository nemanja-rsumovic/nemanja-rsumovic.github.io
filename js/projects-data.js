/* ==========================================================================
   PROJEKTI
   ==========================================================================

   {
     title:       "Ime projekta",
     category:    "graphics" | "data" | "tools" | "web"   (bira u koji filter spada)
     tags:        ["Tag1", "Tag2"],                        (male oznake na kartici)
     description: "Kratak opis, 1-2 rečenice.",
     image:       "slike/ime-slike.png",                   (slika u /slike folderu)
     featured:    true ili false,                          (true = velika, istaknuta kartica - koristi za NAJBOLJI projekat, po pravilu samo 1)
     status:      "In progress" ili null,                  (opciono, značka u gornjem desnom uglu slike)
     links: [
       { label: "GitHub", icon: "fa-brands fa-github", href: "https://..." },
       { label: "Live demo", icon: "fa-solid fa-arrow-up-right-from-square", href: "https://..." },
     ],
   },

   Kategorije koje se koriste u filterima (ne moraju se menjati, ali ako
   dodaš potpuno novu vrstu projekta možeš dodati novu kategoriju ovde I u
   CATEGORY_LABELS ispod):
     - graphics : grafika, igre, vizuelni projekti
     - data     : data mining, istraživanje, bioinformatika
     - tools    : alati, sistemsko/DevOps, CLI
     - web      : web aplikacije, punstack, frontend

   Ikonice (Font Awesome, već učitan u index.html):
     fa-brands fa-github, fa-brands fa-gitlab, fa-solid fa-file-pdf,
     fa-solid fa-arrow-up-right-from-square, fa-brands fa-npm, fa-solid fa-play
   ========================================================================== */

const CATEGORY_LABELS = {
  graphics: "Graphics & Games",
  data: "Data & Research",
  tools: "Tools & Systems",
  web: "Web & Apps",
};

const PROJECTS = [
  {
    title: "Computer Graphics Project",
    category: "graphics",
    tags: ["C++", "OpenGL", "Graphics"],
    description:
      "A real-time 3D scene built from scratch in C++ and OpenGL for the Computer Graphics course - custom shaders, lighting, and camera controls.",
    image: "slike/computer-graphics-project.jpg",
    featured: true,
    status: null,
    links: [
      { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/nemanja-rsumovic/computer-graphics-project" },
    ],
  },
  {
    title: "pobedi-me-ako-znas",
    category: "web",
    tags: ["Software Engineering", "Team project", "Quiz"],
    description:
      "A two-player quiz platform built for the Software Development course - a set of mini-games testing knowledge and reflexes as players race for points.",
    image: "slike/pobedi-me-ako-znas.png",
    featured: false,
    status: null,
    links: [
      { label: "GitLab", icon: "fa-brands fa-gitlab", href: "https://gitlab.com/matf-bg-ac-rs/course-rs/projects-2023-2024/pobedi-me-ako-znas" },
    ],
  },
  {
    title: "Brain Tumor Dataset - Data Mining",
    category: "data",
    tags: ["Data Mining", "SPSS", "Machine Learning"],
    description:
      "Classification, clustering, and association-rule mining applied to a brain tumor dataset in SPSS, built for the Data Mining course.",
    image: "slike/data-mining-project.png",
    featured: false,
    status: null,
    links: [
      { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/MATF-istrazivanje-podataka-1/2023_Data_Mining_Brain_tumor_Dataset" },
    ],
  },
  {
    title: "Repetitive Sequences in E. coli Pathogenicity Islands",
    category: "data",
    tags: ["Bioinformatics", "Research", "Data Mining"],
    description:
      "A research paper analyzing deviations in the occurrence of four types of repetitive sequences within pathogenic islands of Escherichia coli.",
    image: "slike/e.coli.png",
    featured: false,
    status: null,
    links: [
      { label: "Read paper", icon: "fa-solid fa-file-pdf", href: "files/e.coli-paper.pdf" },
    ],
  },
  {
    title: "Audio Recorder",
    category: "tools",
    tags: ["Rust", "CLI"],
    description:
      "A terminal application for recording audio, written in Rust for the Programming Paradigms course.",
    image: "slike/audio-recorde-project.png",
    featured: false,
    status: null,
    links: [
      { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/nemanja-rsumovic/2023_Audio-Recorder" },
    ],
  },
  {
    title: "azrs-tracking",
    category: "tools",
    tags: ["Tooling", "DevOps", "C++"],
    description:
      "A toolkit built for the Software Development Tools course, wiring together Git hooks, static analysis, and CI-style checks to catch issues in source code automatically.",
    image: "slike/banner3.jpg",
    featured: false,
    status: null,
    links: [],
  },
  {
    title: "Snake",
    category: "graphics",
    tags: ["JavaScript", "Game"],
    description: "The classic Snake game, built from scratch in vanilla JavaScript.",
    image: "slike/snake_img.png",
    featured: false,
    status: null,
    links: [
      { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/nemanja-rsumovic/snake-game" },
    ],
  },
  {
    title: "Tic-Tac-Toe",
    category: "graphics",
    tags: ["C++", "Game"],
    description: "A simple two-player Tic-Tac-Toe game written in C++.",
    image: "slike/tic-tac-toe.png",
    featured: false,
    status: null,
    links: [
      { label: "GitHub", icon: "fa-brands fa-github", href: "https://github.com/nemanja-rsumovic/tic-tac-toe" },
    ],
  },
];

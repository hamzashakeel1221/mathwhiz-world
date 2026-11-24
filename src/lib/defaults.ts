// Default content. Used to seed the database and as a fallback when the
// database is unreachable, so the public site always renders.

export type ExamPaper = { name: string; duration: string; marks: string; weight: string; note?: string };

export type CurriculumData = {
  slug: string;
  title: string;
  shortTitle: string;
  code: string | null;
  board: string;
  level: string;
  yearRange: string;
  tagline: string;
  summary: string;
  description: string;
  topics: string[];
  highlights: string[];
  examStructure: ExamPaper[] | null;
  accent: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type ServiceData = { title: string; description: string; icon: string; sortOrder: number; published: boolean };
export type FaqData = { question: string; answer: string; category: string; sortOrder: number; published: boolean };

export const defaultCurricula: CurriculumData[] = [
  {
    slug: "o-level-mathematics-4024",
    title: "Cambridge O Level Mathematics (4024)",
    shortTitle: "O-Level Maths",
    code: "4024",
    board: "Cambridge (CAIE)",
    level: "O Level",
    yearRange: "Year 9 – 11 (Grades 9–11)",
    tagline: "Struggling with O-Level Maths? Let's make it easier.",
    summary:
      "Complete one-to-one online tutoring for Cambridge O Level Mathematics 4024: concepts made simple, topic-by-topic mastery, past-paper practice and proven exam strategies for both papers.",
    description:
      "O Level Mathematics is our core speciality. Every lesson starts with understanding: why a method works, not just how to use it. We then practise with carefully chosen questions, apply the idea to real exam-style problems, and build the speed and accuracy needed for Paper 1 (non-calculator) and Paper 2 (calculator).\n\nStudents get a personalised plan based on their current level and target grade, regular topical worksheets, timed past papers with full mark-scheme walkthroughs, and progress reports for parents. Whether you are aiming to pass comfortably or chasing an A*, we tailor every session to you.",
    topics: [
      "Number: fractions, percentages, standard form, bounds, ratio & proportion",
      "Algebra: expressions, equations, inequalities, sequences, indices",
      "Functions & graphs: linear, quadratic, cubic, reciprocal, gradients",
      "Coordinate geometry: straight lines, midpoints, lengths, parallel & perpendicular",
      "Geometry: angles, polygons, circle theorems, similarity & congruence",
      "Mensuration: perimeter, area, surface area, volume, arcs & sectors",
      "Trigonometry: SOHCAHTOA, sine & cosine rule, bearings, 3D problems",
      "Transformations & vectors: reflection, rotation, enlargement, vector geometry",
      "Probability: single & combined events, tree diagrams, Venn diagrams",
      "Statistics: averages, cumulative frequency, histograms, scatter graphs",
    ],
    highlights: [
      "Concepts made simple, step by step",
      "Topical & full past-paper practice",
      "Non-calculator techniques for Paper 1",
      "Exam strategies & time management",
      "Mark-scheme based answer writing",
      "Progress reports for parents",
    ],
    examStructure: [
      { name: "Paper 1 — Non-calculator", duration: "2 hours", marks: "100 marks", weight: "50%" },
      { name: "Paper 2 — Calculator", duration: "2 hours", marks: "100 marks", weight: "50%" },
    ],
    accent: "orange",
    featured: true,
    published: true,
    sortOrder: 1,
    seoTitle: "O Level Maths Tutor Online | Cambridge O Level Mathematics 4024",
    seoDescription:
      "Expert one-to-one online O Level Maths (4024) tutoring. Concepts made simple, past-paper practice and exam strategies for Paper 1 & 2. Book a FREE demo class today.",
  },
  {
    slug: "igcse-mathematics-0580",
    title: "Cambridge IGCSE Mathematics (0580)",
    shortTitle: "IGCSE Maths 0580",
    code: "0580",
    board: "Cambridge (CAIE)",
    level: "IGCSE",
    yearRange: "Year 9 – 11",
    tagline: "Core or Extended: master every topic with confidence.",
    summary:
      "Personalised tutoring for Cambridge IGCSE Mathematics 0580, covering both Core and Extended tiers with concept building, topical practice and full past-paper preparation.",
    description:
      "IGCSE 0580 rewards students who truly understand the ideas behind each topic. We work through the syllabus at the right pace for each learner, strengthen weak areas, and then sharpen exam technique using recent past papers and mark schemes.\n\nWe help students and parents decide between Core and Extended, set a realistic target grade, and track progress with regular reports.",
    topics: [
      "Number", "Algebra and graphs", "Coordinate geometry", "Geometry", "Mensuration",
      "Trigonometry", "Transformations and vectors", "Probability", "Statistics",
    ],
    highlights: ["Core & Extended tiers", "Calculator & non-calculator skills", "Past papers with mark schemes", "Target-grade planning"],
    examStructure: [
      { name: "Core: Paper 1 (non-calculator) + Paper 3 (calculator)", duration: "1h 30m each", marks: "80 marks each", weight: "50% each" },
      { name: "Extended: Paper 2 (non-calculator) + Paper 4 (calculator)", duration: "2 hours each", marks: "100 marks each", weight: "50% each" },
    ],
    accent: "teal",
    featured: true,
    published: true,
    sortOrder: 2,
    seoTitle: "IGCSE Maths 0580 Tutor Online | Core & Extended",
    seoDescription: "One-to-one online tutoring for Cambridge IGCSE Mathematics 0580 (Core & Extended). Concept building, past papers and exam technique. Free demo class.",
  },
  {
    slug: "igcse-additional-mathematics-0606",
    title: "Cambridge IGCSE Additional Mathematics (0606)",
    shortTitle: "Add Maths 0606",
    code: "0606",
    board: "Cambridge (CAIE)",
    level: "IGCSE",
    yearRange: "Year 10 – 11",
    tagline: "Bridge the gap to A Level with Additional Maths.",
    summary:
      "Focused support for IGCSE Additional Mathematics 0606: functions, calculus, trigonometry and more, taught clearly for strong students aiming high.",
    description:
      "Additional Mathematics introduces ideas that many students meet for the first time, including calculus, logarithms and radian measure. We break each topic into clear steps, connect it to what students already know, and practise extensively with exam-style questions so that tricky problems become routine.",
    topics: [
      "Functions", "Quadratic functions", "Factors of polynomials", "Equations, inequalities and graphs",
      "Simultaneous equations", "Logarithmic and exponential functions", "Straight-line graphs",
      "Coordinate geometry of the circle", "Circular measure", "Trigonometry",
      "Permutations and combinations", "Series", "Vectors in two dimensions", "Calculus",
    ],
    highlights: ["Calculus made intuitive", "Excellent A Level preparation", "Challenging problem practice", "Past papers & mark schemes"],
    examStructure: [
      { name: "Paper 1", duration: "2 hours", marks: "80 marks", weight: "50%" },
      { name: "Paper 2", duration: "2 hours", marks: "80 marks", weight: "50%" },
    ],
    accent: "blue",
    featured: true,
    published: true,
    sortOrder: 3,
    seoTitle: "IGCSE Additional Maths 0606 Tutor Online",
    seoDescription: "Expert online tutoring for Cambridge IGCSE Additional Mathematics 0606: calculus, functions, logarithms and trigonometry. Book a free demo.",
  },
  {
    slug: "igcse-international-mathematics-0607",
    title: "Cambridge IGCSE International Mathematics (0607)",
    shortTitle: "Int'l Maths 0607",
    code: "0607",
    board: "Cambridge (CAIE)",
    level: "IGCSE",
    yearRange: "Year 9 – 11",
    tagline: "Graphic-calculator maths with real-world modelling.",
    summary:
      "Tutoring for Cambridge IGCSE International Mathematics 0607, including graphic display calculator skills, investigation and modelling.",
    description:
      "International Mathematics combines a broad syllabus with the use of a graphic display calculator and an investigation and modelling component. We teach the content clearly, build confident calculator technique, and practise the reasoning and communication skills that investigation questions reward.",
    topics: [
      "Number", "Algebra", "Functions", "Coordinate geometry", "Geometry", "Mensuration",
      "Trigonometry", "Vectors and transformations", "Probability", "Statistics",
    ],
    highlights: ["Graphic calculator technique", "Investigation & modelling skills", "Core & Extended support", "Past-paper practice"],
    examStructure: null,
    accent: "violet",
    featured: false,
    published: true,
    sortOrder: 4,
    seoTitle: "IGCSE International Maths 0607 Tutor Online",
    seoDescription: "One-to-one online tutoring for Cambridge IGCSE International Mathematics 0607 with graphic calculator and modelling skills. Free demo class.",
  },
  {
    slug: "gcse-mathematics",
    title: "GCSE Mathematics (Edexcel, AQA & OCR)",
    shortTitle: "GCSE Maths",
    code: null,
    board: "Edexcel / AQA / OCR",
    level: "GCSE",
    yearRange: "Year 9 – 11",
    tagline: "Foundation or Higher: aim for your best grade (9–1).",
    summary:
      "Online GCSE Maths tutoring for UK exam boards Edexcel, AQA and OCR, Foundation and Higher tiers, with targeted revision and past-paper practice.",
    description:
      "We follow your exam board's specification closely, identify gaps quickly, and build a revision plan around your target grade. Lessons combine clear explanations, worked examples, and timed practice so students walk into every paper prepared.",
    topics: [
      "Number", "Algebra", "Ratio, proportion and rates of change", "Geometry and measures", "Probability", "Statistics",
    ],
    highlights: ["Edexcel, AQA & OCR specifications", "Foundation & Higher tiers", "Grade 9–1 target planning", "Topic & full-paper practice"],
    examStructure: [
      { name: "Paper 1 — Non-calculator", duration: "1h 30m", marks: "80 marks", weight: "33⅓%" },
      { name: "Paper 2 — Calculator", duration: "1h 30m", marks: "80 marks", weight: "33⅓%" },
      { name: "Paper 3 — Calculator", duration: "1h 30m", marks: "80 marks", weight: "33⅓%" },
    ],
    accent: "teal",
    featured: true,
    published: true,
    sortOrder: 5,
    seoTitle: "GCSE Maths Tutor Online | Edexcel, AQA & OCR",
    seoDescription: "Online one-to-one GCSE Maths tutoring for Edexcel, AQA and OCR (Foundation & Higher). Personalised revision and past papers. Free demo.",
  },
  {
    slug: "edexcel-international-gcse-mathematics",
    title: "Edexcel International GCSE Mathematics",
    shortTitle: "Edexcel IGCSE",
    code: "4MA1",
    board: "Pearson Edexcel",
    level: "International GCSE",
    yearRange: "Year 9 – 11",
    tagline: "Clear teaching for every Edexcel International GCSE topic.",
    summary:
      "Tutoring for Pearson Edexcel International GCSE Mathematics (Specification A), Foundation and Higher tiers.",
    description:
      "We cover the full Edexcel International GCSE specification with a strong focus on method, accuracy and presentation. Students practise with past papers and examiner-style questions to maximise marks.",
    topics: [
      "Numbers and the number system", "Equations, formulae and identities", "Sequences, functions and graphs",
      "Geometry and trigonometry", "Vectors and transformation geometry", "Statistics and probability",
    ],
    highlights: ["Foundation & Higher tiers", "Examiner-style questions", "Past papers & mark schemes", "Flexible worldwide timings"],
    examStructure: [
      { name: "Paper 1", duration: "2 hours", marks: "100 marks", weight: "50%" },
      { name: "Paper 2", duration: "2 hours", marks: "100 marks", weight: "50%" },
    ],
    accent: "blue",
    featured: false,
    published: true,
    sortOrder: 6,
    seoTitle: "Edexcel International GCSE Maths Tutor Online (4MA1)",
    seoDescription: "Online tutoring for Pearson Edexcel International GCSE Mathematics 4MA1, Foundation & Higher. Book a free demo session.",
  },
  {
    slug: "cambridge-lower-secondary-mathematics",
    title: "Cambridge Lower Secondary Mathematics",
    shortTitle: "Lower Secondary",
    code: null,
    board: "Cambridge (CAIE)",
    level: "Lower Secondary",
    yearRange: "Year 7 – 9",
    tagline: "Strong foundations before IGCSE and O Level.",
    summary:
      "Building confident, curious mathematicians in Years 7 to 9, aligned with the Cambridge Lower Secondary framework and Checkpoint.",
    description:
      "Lower Secondary is where key ideas in algebra, geometry and data are formed. We make those foundations solid with clear explanations, visual learning on a live whiteboard, and plenty of guided practice, so that the step up to IGCSE or O Level feels natural.",
    topics: ["Number", "Algebra", "Geometry and measure", "Statistics and probability", "Thinking and working mathematically"],
    highlights: ["Checkpoint preparation", "Visual, interactive lessons", "Homework & doubt support", "Smooth path to IGCSE / O Level"],
    examStructure: null,
    accent: "teal",
    featured: false,
    published: true,
    sortOrder: 7,
    seoTitle: "Cambridge Lower Secondary Maths Tutor (Year 7–9)",
    seoDescription: "Online maths tutoring for Cambridge Lower Secondary (Year 7–9) and Checkpoint. Build strong foundations. Free demo class.",
  },
  {
    slug: "cambridge-primary-mathematics",
    title: "Cambridge Primary Mathematics",
    shortTitle: "Primary Maths",
    code: null,
    board: "Cambridge (CAIE) / British Curriculum",
    level: "Primary",
    yearRange: "Year 4 – 6",
    tagline: "Make maths fun, visual and confidence-building.",
    summary:
      "Friendly, engaging online maths lessons for Years 4 to 6, following the Cambridge Primary and British curriculum.",
    description:
      "Young learners thrive when maths makes sense. We use visual models, games and interactive whiteboard activities to build number sense, fluency and problem-solving, with regular updates for parents.",
    topics: ["Number and place value", "Calculation", "Fractions, decimals and percentages", "Geometry and measure", "Statistics and probability"],
    highlights: ["Fun, visual learning", "Times tables & fluency", "Problem-solving skills", "Regular parent updates"],
    examStructure: null,
    accent: "orange",
    featured: false,
    published: true,
    sortOrder: 8,
    seoTitle: "Cambridge Primary Maths Tutor Online (Year 4–6)",
    seoDescription: "Engaging one-to-one online maths tutoring for Cambridge Primary and British curriculum, Year 4–6. Free demo class.",
  },
];

export const defaultServices: ServiceData[] = [
  { title: "One-to-One Online Tutoring", description: "Personalised attention for better progress. Every lesson is planned around one student.", icon: "UserRound", sortOrder: 1, published: true },
  { title: "Live Interactive Whiteboard", description: "Engaging, visual learning. Solve problems together in real time.", icon: "Presentation", sortOrder: 2, published: true },
  { title: "Past Papers & Exam Support", description: "Build skills and boost confidence with targeted, timed past-paper practice.", icon: "FileCheck2", sortOrder: 3, published: true },
  { title: "Flexible Timings Worldwide", description: "Learn at a time that suits your schedule, in your own time zone.", icon: "Clock", sortOrder: 4, published: true },
  { title: "Progress Updates & Reports", description: "Track improvement and celebrate success with regular reports for parents.", icon: "TrendingUp", sortOrder: 5, published: true },
  { title: "Homework & Doubt Support", description: "Guidance whenever your child needs it, so no question stays unanswered.", icon: "MessageCircleQuestion", sortOrder: 6, published: true },
  { title: "Concept Building & Problem Solving", description: "Go beyond memorisation. Understand maths for life, then apply it.", icon: "Brain", sortOrder: 7, published: true },
  { title: "Worksheets, Quizzes & Assessments", description: "Topical worksheets and quizzes to practise, check and close every gap.", icon: "ClipboardList", sortOrder: 8, published: true },
];

export const defaultFaqs: FaqData[] = [
  { question: "Do you offer a free demo class?", answer: "Yes. Your first demo session is completely free with no obligation. Book it using the form on our Contact page or message us on WhatsApp at +92 349 5047810.", category: "Getting started", sortOrder: 1, published: true },
  { question: "Which O Level Mathematics syllabus do you teach?", answer: "We specialise in Cambridge O Level Mathematics (4024), covering every syllabus topic plus exam technique for both Paper 1 (non-calculator) and Paper 2 (calculator), with extensive past-paper practice.", category: "O Level", sortOrder: 2, published: true },
  { question: "Which other curricula and exam boards do you cover?", answer: "Cambridge IGCSE 0580, Additional Mathematics 0606, International Mathematics 0607, GCSE (Edexcel, AQA, OCR), Edexcel International GCSE, Cambridge Primary and Lower Secondary, and the British curriculum, from Year 4 to Year 11 and beyond.", category: "Curricula", sortOrder: 3, published: true },
  { question: "How do online lessons work?", answer: "Lessons are live and one-to-one over video, using an interactive whiteboard so we can solve problems together. All you need is a laptop or tablet and a stable internet connection.", category: "Lessons", sortOrder: 4, published: true },
  { question: "Do you teach students outside Pakistan?", answer: "Yes. We are based in Islamabad, Pakistan and teach students worldwide, including the UK, Middle East, Europe and beyond. Lessons are scheduled in your own time zone.", category: "Lessons", sortOrder: 5, published: true },
  { question: "How will I know my child is improving?", answer: "We share regular progress updates and reports covering topics completed, test and past-paper scores, strengths, and the next areas to focus on.", category: "Progress", sortOrder: 6, published: true },
  { question: "Can you help with homework and doubts between lessons?", answer: "Yes. Homework and doubt support is part of our service, so students can get guidance when they are stuck.", category: "Lessons", sortOrder: 7, published: true },
  { question: "How long is each session and how often should we book?", answer: "Most students take 1-hour sessions two or three times a week. Exam-year students often add extra past-paper sessions closer to the exams. We will recommend a plan after the free demo.", category: "Getting started", sortOrder: 8, published: true },
];

export const sampleReviews = [
  { name: "Sample review (edit or delete)", role: "Parent of an O-Level student", country: "Pakistan", curriculum: "O Level 4024", rating: 5, content: "This is a sample review created by the setup script. Approve real reviews from the admin panel, then delete this one." },
];

export type SettingField = { key: string; label: string; help?: string; type?: "text" | "textarea" | "url"; group: string };

export const settingFields: SettingField[] = [
  { key: "announcement", label: "Announcement bar text", help: "Leave empty to hide the bar.", group: "General" },
  { key: "heroBadge", label: "Hero badge", group: "Home hero" },
  { key: "heroTitle", label: "Hero title", group: "Home hero" },
  { key: "heroHighlight", label: "Hero highlighted words", group: "Home hero" },
  { key: "heroSubtitle", label: "Hero subtitle", type: "textarea", group: "Home hero" },
  { key: "oLevelIntro", label: "O-Level spotlight intro", type: "textarea", group: "O-Level" },
  { key: "aboutText", label: "About page text", type: "textarea", group: "About" },
  { key: "contactEmail", label: "Contact email", group: "Contact" },
  { key: "whatsappNumber", label: "WhatsApp number (digits, with country code)", help: "Example: 923495047810", group: "Contact" },
  { key: "whatsappDisplay", label: "WhatsApp number (display)", group: "Contact" },
  { key: "location", label: "Location", group: "Contact" },
  { key: "facebookUrl", label: "Facebook page URL", type: "url", group: "Social" },
  { key: "instagramUrl", label: "Instagram URL", type: "url", group: "Social" },
  { key: "youtubeUrl", label: "YouTube URL", type: "url", group: "Social" },
];

export const defaultSettings: Record<string, string> = {
  announcement: "Free demo class for O-Level, IGCSE & GCSE Maths. Limited slots each week!",
  heroBadge: "O-Level Mathematics 4024 Specialists",
  heroTitle: "Master O-Level Maths with",
  heroHighlight: "confidence.",
  heroSubtitle:
    "Personalised one-to-one online maths tutoring for O-Level, IGCSE, GCSE and Cambridge learners from Year 4 to 11. Concepts first, formula second. Students worldwide.",
  oLevelIntro:
    "Struggling with O-Level Maths? Let's make it easier. Our O Level Mathematics (4024) programme turns tricky topics into clear, step-by-step understanding, then builds exam confidence with past papers and proven strategies.",
  aboutText:
    "MathWhiz World Academy is an online maths academy based in Islamabad, Pakistan, helping students around the world understand, practise, apply and succeed in mathematics. We believe every student can succeed when concepts are explained clearly and practice is purposeful.\n\nWe specialise in Cambridge O Level Mathematics and support IGCSE, GCSE, Edexcel, AQA, and Cambridge Primary and Lower Secondary learners. Every lesson is one-to-one, interactive and tailored to the student's goals.",
  contactEmail: "onlinemathstutor118@gmail.com",
  whatsappNumber: "923495047810",
  whatsappDisplay: "+92 349 5047810",
  location: "Islamabad, Pakistan",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
};

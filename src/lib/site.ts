export const siteConfig = {
  name: "MathWhiz World Academy",
  shortName: "MathWhiz World",
  description:
    "Expert one-to-one online maths tutoring for O-Level Mathematics (4024), Cambridge IGCSE 0580, 0606, 0607, GCSE, Edexcel and AQA. Year 4 to 11, students worldwide. Book a free demo class.",
  taglines: {
    primary: "Understand. Practice. Apply. Succeed.",
    secondary: "Learn. Practice. Excel.",
    footer: "Building strong concepts, one lesson at a time.",
  },
  email: "onlinemathstutor118@gmail.com",
  whatsappDisplay: "+92 349 5047810",
  whatsappNumber: "923495047810",
  location: "Islamabad, Pakistan",
  areaServed: "Worldwide (online)",
  keywords: [
    "O Level maths tutor",
    "O Level Mathematics 4024 tutor",
    "online O Level maths tuition",
    "IGCSE maths tutor online",
    "Cambridge IGCSE 0580 tutor",
    "IGCSE Additional Mathematics 0606 tutor",
    "IGCSE International Mathematics 0607",
    "GCSE maths tutor online",
    "Edexcel maths tutor",
    "AQA GCSE maths tutor",
    "Cambridge Primary maths tutor",
    "Cambridge Lower Secondary maths",
    "online maths tutor Pakistan",
    "maths tutor Islamabad",
    "one to one online maths tutoring",
    "past paper practice O Level maths",
  ],
};

export const navLinks = [
  { href: "/o-level-maths-tutor", label: "O-Level Maths", highlight: true },
  { href: "/curricula", label: "Curricula" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function whatsappLink(number: string, text = "Hi MathWhiz World Academy! I'd like to book a FREE demo class.") {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function absoluteUrl(base: string, path = "/") {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

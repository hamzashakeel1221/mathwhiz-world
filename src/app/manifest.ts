import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MathWhiz World Academy",
    short_name: "MathWhiz",
    description: "Online O-Level, IGCSE & GCSE maths tutoring.",
    start_url: "/",
    display: "standalone",
    background_color: "#060f24",
    theme_color: "#060f24",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

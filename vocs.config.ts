import { defineConfig } from "vocs";

export default defineConfig({
  title: "Resume of Misato Kano",
  font: {
    default: {
      google: "Noto Sans JP",
    },
  },
  sidebar: [
    {
      text: "Download as PDF",
      link: "https://github.com/mirror-kt/resume.mirror-kt.dev/releases/latest/download/resume.pdf",
    },
  ],
  socials: [
    {
      icon: "github",
      link: "https://github.com/mirror-kt",
    },
    {
      icon: "x",
      link: "https://x.com/mirror_kt",
    },
  ],
  editLink: {
    pattern:
      "https://github.com/mirror-kt/resume.mirror-kt.dev/edit/main/docs/pages/:path",
    text: "Edit on GitHub",
  },
});

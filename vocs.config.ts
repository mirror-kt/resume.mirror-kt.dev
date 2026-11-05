import { defineConfig } from "vocs/config";

export default defineConfig({
  title: "Resume of Misato Kano",
  renderStrategy: "full-static",
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
    link: "https://github.com/mirror-kt/resume.mirror-kt.dev/edit/main/src/pages/:path",
    text: "Edit on GitHub",
  },
});

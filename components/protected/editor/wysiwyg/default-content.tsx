export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Introducing  - Blog app" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: " This is a full-stack blogging app. Built with Next.js, MySQL, and Prisma",
        },
      ],
    },

    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Bubble menu and slash menu" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image and Link insertion via url ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "/uploads/banner/banners.png",
        alt: "banners.png",
        title: "banners.png",
        width: null,
        height: null,
      },
    },
  ],
};

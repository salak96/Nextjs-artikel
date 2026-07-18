"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapUnderline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Markdown } from "tiptap-markdown";
import "@/styles/prosemirror.css";
import "@/styles/editor.css";

interface Props {
  content: string;
}

export default function ReadContent({ content }: Props) {
  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch {
    parsedContent = content || { type: "doc", content: [] };
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc list-outside leading-3 -mt-2" } },
        orderedList: { HTMLAttributes: { class: "list-decimal list-outside leading-3 -mt-2" } },
        blockquote: { HTMLAttributes: { class: "border-l-4 border-stone-700" } },
      }),
      TiptapLink.configure({
        HTMLAttributes: { class: "text-primary underline underline-offset-[3px] hover:text-primary/80 transition-colors cursor-pointer" },
      }),
      TiptapUnderline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TaskList.configure({ HTMLAttributes: { class: "not-prose pl-2" } }),
      TaskItem.configure({ HTMLAttributes: { class: "flex items-start my-4" }, nested: true }),
      Markdown.configure({ html: false, transformCopiedText: true }),
    ],
    content: parsedContent,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className="prose prose-stone dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Loader2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import slugify from "react-slugify";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { defaultEditorContent } from "@/components/protected/editor/wysiwyg/default-content";

const WysiwygEditor = dynamic(
  () => import("@/components/protected/editor/wysiwyg/wysiwyg-editor"),
  { ssr: false, loading: () => <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin" /></div> },
);

interface Category {
  id: string;
  title: string;
}

interface PostData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  categoryId: string;
  image: string | null;
}

interface Props {
  categories: Category[];
  edit?: PostData;
}

export function PostEditorModal({ categories, edit }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(edit?.title || "");
  const [slug, setSlug] = useState(edit?.slug || "");
  const [categoryId, setCategoryId] = useState(edit?.categoryId || "");
  const [description, setDescription] = useState(edit?.description || "");
  const [imageUrl, setImageUrl] = useState(edit?.image || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(edit?.content || null);
  const contentRef = useRef<string | null>(edit?.content || null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    contentRef.current = edit?.content || null;
  }, [edit?.content]);

  useEffect(() => {
    if (!edit && title && !slug) {
      setSlug(slugify(title));
    }
  }, [title, slug, edit]);

  function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max 2MB");
      return;
    }
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setImageUrl("");
  }

  function removeCover() {
    setCoverFile(null);
    setCoverPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function uploadCover(): Promise<string> {
    if (!coverFile) return imageUrl;
    const formData = new FormData();
    formData.append("file", coverFile);
    const res = await fetch("/api/paneladmin/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImage = imageUrl;
      if (coverFile) {
        finalImage = await uploadCover();
      }

      const finalContent = contentRef.current || content;
      const res = await fetch("/api/paneladmin/posts", {
        method: edit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          edit
            ? { id: edit.id, title, slug, description, content: finalContent, categoryId, image: finalImage }
            : { title, slug, description, content: finalContent, categoryId, image: finalImage },
        ),
      });
      if (res.ok) {
        setOpen(false);
        router.refresh();
      } else {
        const body = await res.json().catch(() => ({}));
        toast.error(body.error || "Failed to save post");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {edit ? (
          <button className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Pencil className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            New Post
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{edit ? "Edit Post" : "New Post"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Cover Image</label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
                >
                  <Upload className="h-4 w-4" />
                  {coverFile ? coverFile.name : "Choose file (max 2MB)"}
                </button>
                {coverPreview && (
                  <button type="button" onClick={removeCover} className="rounded-lg p-1 text-destructive hover:bg-destructive/10">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {coverPreview && (
                <img src={coverPreview} alt="Preview" className="mt-2 max-h-32 rounded-lg object-cover" />
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Content</label>
            <div className="rounded-lg border border-border dark:border-gray-700 [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3 [&_.ProseMirror]:text-foreground [&_.ProseMirror]:bg-background dark:[&_.ProseMirror]:bg-gray-900 dark:[&_.ProseMirror]:text-gray-100">
              <WysiwygEditor
                defaultValue={contentRef.current ? JSON.parse(contentRef.current) : defaultEditorContent}
                onUpdate={(editor) => {
                  contentRef.current = JSON.stringify(editor?.getJSON());
                }}
                onDebouncedUpdate={(editor) => {
                  const val = JSON.stringify(editor?.getJSON());
                  contentRef.current = val;
                  setContent(val);
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : edit ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

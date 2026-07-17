import Editor from "@/components/protected/editor/editor";
import { Separator } from "@/components/ui/separator";
import { protectedEditorConfig } from "@/config/protected";
import { Draft } from "@/types/collection";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { readdir } from "fs/promises";
import { join } from "path";

export const revalidate = 0;

interface PostEditorPageProps {
  params: { postId: string };
}

async function getPost(postId: string, userId: string) {
  const data = await prisma.draft.findUnique({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return data ? data : null;
}

async function getCoverImageFileName(
  userId: string,
  postId: string,
): Promise<string | null> {
  const dir = join(process.cwd(), "public", "uploads", userId, postId);
  try {
    const files = await readdir(dir);
    const cover = files.find(f => f.startsWith("cover-"));
    return cover || null;
  } catch {
    return null;
  }
}

function getCoverImageUrl(
  userId: string,
  postId: string,
  fileName: string | null,
): string | null {
  if (!fileName) return null;
  return `/uploads/${userId}/${postId}/${fileName}`;
}

async function getGalleryImageFileNames(
  userId: string,
  postId: string,
): Promise<string[]> {
  const dir = join(process.cwd(), "public", "uploads", userId, postId);
  try {
    const files = await readdir(dir);
    return files.filter(f => f.startsWith("gallery-"));
  } catch {
    return [];
  }
}

function getGalleryImageUrls(
  userId: string,
  postId: string,
  fileNames: string[],
): string[] {
  return fileNames.map(fileName => `/uploads/${userId}/${postId}/${fileName}`);
}

export default async function PostEditorPage({ params }: PostEditorPageProps) {
  const session = await getSession();
  if (!session) {
    return notFound();
  }

  const userId = session.userId;
  const post = await getPost(params.postId, userId);

  const coverImageFileName = await getCoverImageFileName(userId, params.postId);
  const coverImagePublicUrl = getCoverImageUrl(userId, params.postId, coverImageFileName);

  const galleryImageFileNames = await getGalleryImageFileNames(userId, params.postId);
  const galleryImagePublicUrls = getGalleryImageUrls(userId, params.postId, galleryImageFileNames);

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-5xl px-10">
      <div>
        <h3 className="text-lg font-medium">{protectedEditorConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">
          {protectedEditorConfig.description}
        </p>
      </div>
      <Separator className="mb-5 max-w-2xl" />
      <Editor
        post={post as any}
        userId={userId}
        coverImageFileName={coverImageFileName || ""}
        coverImagePublicUrl={coverImagePublicUrl || ""}
        galleryImageFileNames={galleryImageFileNames || []}
        galleryImagePublicUrls={galleryImagePublicUrls || []}
      />
    </div>
  );
}
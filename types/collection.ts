import type { Post, Draft, Comment, Category, Author, Bookmark, Profile, User } from "@prisma/client";

export type { Post, Draft, Comment, Category, Author, Bookmark, Profile, User };

export type CategoryType = Category;
export type AuthorType = Author;
export type PostType = Post;
export type CommentType = Comment;
export type BookMarkType = Bookmark;
export type ProfileType = Profile;
export type DraftType = Draft;
export type UserType = User;

export interface DraftWithCategory extends Omit<DraftType, "category"> {
  category: CategoryType;
}

export interface DraftWithCategoryWithProfile
  extends Omit<DraftWithCategory, "author"> {
  author: AuthorType;
}

export interface PostWithCategory extends Omit<PostType, "category"> {
  category: CategoryType;
}

export interface PostWithCategoryWithProfile
  extends Omit<PostWithCategory, "author"> {
  author: AuthorType;
}

export interface CategoryWithPost extends Omit<CategoryType, "posts"> {
  posts: PostType;
}

export interface BookMarkWithPost extends Omit<BookMarkType, "post"> {
  post: PostType;
}

export interface CommentWithProfile extends Omit<CommentType, "post"> {
  post: PostType;
}
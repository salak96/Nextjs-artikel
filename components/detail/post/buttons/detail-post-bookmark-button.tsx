"use client";

import { AddBookmark } from "@/actions/bookmark/add-bookmark";
import { DeleteBookmark } from "@/actions/bookmark/delete-bookmark";
import { LoginSection } from "@/components/login";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { detailBookMarkConfig } from "@/config/detail";
import { BookMarkOutlineIcon, BookMarkSolidIcon } from "@/icons";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostBookMarkButtonProps {
  id: string;
  isBookmarked?: boolean;
}

const DetailPostBookMarkButton: FC<DetailPostBookMarkButtonProps> = ({
  id,
  isBookmarked,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      setIsAuthenticated(res.ok);
    }
    checkAuth();
  }, [id]);

  async function addBookmark() {
    setIsLoading(true);
    if (id && isAuthenticated) {
      const response = await AddBookmark({ postId: id });
      if (response) {
        toast.success(detailBookMarkConfig.successAdd);
        router.refresh();
      } else {
        toast.error(detailBookMarkConfig.errorAdd);
      }
    } else {
      toast.error(detailBookMarkConfig.errorAdd);
    }
    setIsLoading(false);
  }

  async function deleteBookmark() {
    setIsLoading(true);
    if (id && isAuthenticated) {
      const response = await DeleteBookmark({ id });
      if (response) {
        toast.success(detailBookMarkConfig.successDelete);
        router.refresh();
      } else {
        toast.error(detailBookMarkConfig.errorDelete);
      }
    } else {
      toast.error(detailBookMarkConfig.errorDelete);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isAuthenticated ? (
        isBookmarked ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={deleteBookmark}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
          >
            {isLoading ? (
              <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
            ) : isHovering ? (
              <BookMarkOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            ) : (
              <BookMarkSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
            )}
            <span className="ml-2 hidden text-sm text-gray-400 md:flex">
              {isHovering
                ? detailBookMarkConfig.unBookmark
                : detailBookMarkConfig.bookmarked}
            </span>
          </button>
        ) : (
          <button
            type="button"
            disabled={isLoading}
            onClick={addBookmark}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
          >
            {isLoading ? (
              <SpinnerIcon className="-ml-0.5 h-5 w-5 animate-spin" />
            ) : isHovering ? (
              <BookMarkSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
            ) : (
              <BookMarkOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            )}
            <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
              {detailBookMarkConfig.bookmark}
            </span>
          </button>
        )
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              disabled={isLoading}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="group relative mx-auto inline-flex w-full items-center justify-center rounded-md border border-black/5 bg-white py-2 hover:bg-gray-50 hover:shadow-sm"
            >
              {isHovering ? (
                <BookMarkSolidIcon className="-ml-0.5 h-5 w-5 text-gray-900" />
              ) : (
                <BookMarkOutlineIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
              )}
              <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
                {detailBookMarkConfig.bookmark}
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="font-sans sm:max-w-[425px]">
            <LoginSection />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DetailPostBookMarkButton;
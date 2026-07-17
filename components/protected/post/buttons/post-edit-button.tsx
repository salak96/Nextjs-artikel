import { DeletePost } from "@/actions/images/post/delete-post";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { protectedPostConfig } from "@/config/protected";
import {
  MoreVertical as ElipsisIcon,
  Loader2 as SpinnerIcon,
  Trash as TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PostEditButtonProps {
  id?: string;
}

const PostEditButton: FC<PostEditButtonProps> = ({ id }) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      setIsAuthenticated(res.ok);
    }
    checkAuth();
  }, []);

  // Delete post
  async function deleteMyPost() {
    setIsDeleteLoading(true);
    if (id && isAuthenticated) {
      const myPostData = {
        id: id,
      };
      const response = await DeletePost(myPostData);
      if (response) {
        setIsDeleteLoading(false);
        toast.success(protectedPostConfig.successDelete);
        router.refresh();
      } else {
        setIsDeleteLoading(false);
        toast.error(protectedPostConfig.errorDelete);
      }
    } else {
      setIsDeleteLoading(false);
      toast.error(protectedPostConfig.errorDelete);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <ElipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-sans">
          <DropdownMenuItem>
            <a
              className="flex w-full"
              onClick={() => {
                setShowLoadingAlert(true);
                router.push(`/editor/posts/${id}`);
                setShowLoadingAlert(false);
              }}
            >
              {protectedPostConfig.edit}
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            {protectedPostConfig.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Delete alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="text-md font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {protectedPostConfig.questionDelete}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {protectedPostConfig.warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{protectedPostConfig.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMyPost}>
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{protectedPostConfig.confirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Loading alert */}
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedPostConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostEditButton;
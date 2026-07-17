"use client";

import { CreatePost } from "@/actions/images/post/create-post";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { protectedPostConfig } from "@/config/protected";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const PostCreateButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      setIsAuthenticated(res.ok);
    }
    checkAuth();
  }, []);

  async function createPost() {
    setIsLoading(true);

    if (isAuthenticated) {
      const post = {
        title: protectedPostConfig.untitled,
      };

      const response = await CreatePost(post);

      if (response) {
        toast.success(protectedPostConfig.successCreate);
        router.refresh();
        router.push("/editor/posts/" + response.id);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(protectedPostConfig.errorCreate);
      }
    } else {
      setIsLoading(false);
      toast.error(protectedPostConfig.errorCreate);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={createPost}
        className="flex items-center rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
      >
        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
        {protectedPostConfig.newPost}
      </button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
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

export default PostCreateButton;
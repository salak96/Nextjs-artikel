"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  dashBoardBookMark,
  dashBoardLogout,
  dashBoardPost,
  dashBoardSettings,
} from "@/config/shared/dashboard";
import { shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LoginProfileButtonProps {
  profileImageUrl?: string;
}

const LoginProfileButton: FC<LoginProfileButtonProps> = ({
  profileImageUrl,
}) => {
  const router = useRouter();

  const signOut = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="overflow-hidden rounded-full ring-2 ring-border transition-colors hover:ring-ring">
          <Image
            src={profileImageUrl || "/images/user-placeholder.png"}
            alt="Avatar"
            height={32}
            width={32}
            className="h-8 w-8 object-cover"
            priority
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(32, 32))}`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={dashBoardPost.slug || ""}>
          <DropdownMenuItem className="cursor-pointer">
            <dashBoardPost.icon className="mr-2 h-4 w-4" />
            <span>{dashBoardPost.title}</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={dashBoardBookMark.slug || ""}>
          <DropdownMenuItem className="cursor-pointer">
            <dashBoardBookMark.icon className="mr-2 h-4 w-4" />
            <span>{dashBoardBookMark.title}</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={dashBoardSettings.slug || ""}>
          <DropdownMenuItem className="cursor-pointer">
            <dashBoardSettings.icon className="mr-2 h-4 w-4" />
            <span>{dashBoardSettings.title}</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <dashBoardLogout.icon className="mr-2 h-4 w-4" />
          <span>{dashBoardLogout.title}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginProfileButton;

"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashBoardLogout, dashBoardProfile } from "@/config/shared/dashboard";
import { shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedProfileDropDown = () => {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const signOut = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      router.refresh();
    }
  };

  useEffect(() => {
    async function fetchAvatar() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.user?.avatarUrl) {
          setAvatarUrl(data.user.avatarUrl);
        }
      }
    }
    fetchAvatar();
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={avatarUrl || "/images/user-placeholder.png"}
            alt="Avatar"
            height={40}
            width={40}
            className="h-[40px] w-[40px] rounded-full"
            priority
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(40, 40),
            )}`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans">
          <Link
            href={dashBoardProfile.slug || ""}
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-2.5 hover:bg-gray-100"
          >
            <dashBoardProfile.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="text-sm text-gray-500 group-hover:text-gray-900">
              {dashBoardProfile.title}
            </span>
          </Link>
          <DropdownMenuSeparator />

          <button
            onClick={signOut}
            type="button"
            className="group inline-flex w-full items-center rounded-md bg-white px-3 py-2.5 hover:bg-gray-100"
          >
            <dashBoardLogout.icon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-gray-900" />
            <span className="group-hover:text-gray-90 text-sm text-gray-500">
              {dashBoardLogout.title}
            </span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProtectedProfileDropDown;
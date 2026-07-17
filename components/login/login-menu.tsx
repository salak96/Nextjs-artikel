"use client";

import { useEffect, useState } from "react";
import LoginButton from "./login-button";
import LoginProfileButton from "./login-profile-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginMenu = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

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
      {avatarUrl ? (
        <LoginProfileButton profileImageUrl={avatarUrl} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
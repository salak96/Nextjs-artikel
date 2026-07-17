import { ProtectedMain } from "@/components/protected/main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({
  children,
}) => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }

  return (
    <>
      <ProtectedMain>{children}</ProtectedMain>
    </>
  );
};

export default ProtectedLayout;

import { LoginHeader, LoginSection } from "@/components/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (sessionToken) {
    redirect("/posts");
  }

  return (
    <div className="min-h-screen bg-background">
      <LoginHeader />
      <div className="mx-auto mt-10 max-w-md px-4">
        <LoginSection />
      </div>
    </div>
  );
};

export default LoginPage;

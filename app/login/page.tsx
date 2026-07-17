import { LoginHeader, LoginSection } from "@/components/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  // Check for existing JWT session
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (sessionToken) {
    // Verify the token and redirect if valid
    // This would be implemented in a separate auth service
    redirect("/editor/posts");
  }

  return (
    <>
      <LoginHeader /> 
      <div className="mx-auto mt-5 max-w-md">
        <LoginSection />
      </div>
    </>
  );
};

export default LoginPage;

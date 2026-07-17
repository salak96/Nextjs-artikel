import ProtectedSettingsProfile from "@/components/protected/settings/protected-settings-profile";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const SettingsPage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  // In a real implementation, you would verify the JWT token here
  // For now, we'll assume the token is valid and extract the user ID
  // This would be implemented in a proper auth service
  const userId = "user-id-from-token"; // Placeholder - will be replaced with actual token verification

  const data = await prisma.profile.findUnique({
    where: {
      id: userId,
    },
  });

  if (!data) {
    notFound();
    console.log("Couldn't find User profile.");
  }

  return (
    <div className="max-w-3xl px-10">
      <ProtectedSettingsProfile user={data} />
    </div>
  );
};

export default SettingsPage;

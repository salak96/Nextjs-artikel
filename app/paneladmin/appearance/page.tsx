import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AppearanceForm from "./appearance-form";

export default async function AppearancePage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  let currentLayout = "blog";
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "layout" } });
    if (setting) currentLayout = setting.value;
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
        <p className="text-sm text-muted-foreground">Customize your website layout and theme</p>
      </div>
      <AppearanceForm currentLayout={currentLayout} />
    </div>
  );
}

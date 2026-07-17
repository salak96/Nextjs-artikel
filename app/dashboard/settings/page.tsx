import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { Settings, Shield, Mail, User } from "lucide-react";

export default async function SettingsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your preferences</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Profile</h3>
              <p className="text-sm text-muted-foreground">{admin.name || "Admin"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Email</h3>
              <p className="text-sm text-muted-foreground">{admin.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Author ID</h3>
              <p className="text-sm text-muted-foreground">{admin.authorId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

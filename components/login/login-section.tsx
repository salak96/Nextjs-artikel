"use client";

import { sharedLoginConfig } from "@/config/shared";
import { LoadingDots } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  email: z
    .string({
      required_error: sharedLoginConfig.emailRequiredError,
    })
    .email(),
  password: z
    .string({
      required_error: sharedLoginConfig.passwordRequiredError,
    })
    .min(1, sharedLoginConfig.passwordRequiredError),
});

interface LoginSectionProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginSection: React.FC<LoginSectionProps> = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(data: z.infer<typeof FormSchema>) {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (res.ok) {
        setOpen?.(false);
        router.push("/paneladmin");
      } else {
        const body = await res.json();
        setError(body.error || "Login gagal");
      }
    } catch (error) {
      setError("Terjadi kesalahan. Coba lagi.");
    }
  }

  return (
    <div className="mx-auto w-full rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-border px-4 py-6 pt-8 text-center">
        <a href="https://ub.cafe">
          <Image
            src="/images/logo.png"
            alt="Logo"
            className="h-16 w-16 rounded-full"
            width={64}
            height={64}
            priority
          />
        </a>
        <h3 className="text-2xl font-bold text-card-foreground">
          {sharedLoginConfig.title}
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col space-y-4 px-4 py-8 md:px-8"
      >
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {sharedLoginConfig.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder={sharedLoginConfig.emailPlaceholder}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            {sharedLoginConfig.passwordLabel}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder={sharedLoginConfig.passwordPlaceholder}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <LoadingDots /> : sharedLoginConfig.loginButton}
        </button>
      </form>
    </div>
  );
};

export default LoginSection;

"use client";

import { sharedLoginConfig } from "@/config/shared";
import { LoadingDots } from "@/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
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

  async function handleLogin(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (res.ok) {
        setOpen?.(false);
        router.push("/posts");
      }
    } catch (error) {
      console.error('Login failed:', error);
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
            type="text"
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
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder={sharedLoginConfig.passwordPlaceholder}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

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

"use client";

import { sharedLoginConfig } from "@/config/shared";
import { GithubIcon, GoogleIcon, LoadingDots } from "@/icons";
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
});

interface LoginSectionProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginSection: React.FC<LoginSectionProps> = ({ setOpen }) => {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  async function handleLogin() {
    const { email } = form.getValues();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "" }),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <>
      <div className="mx-auto w-full justify-center rounded-md border border-black/5 bg-gray-50 align-middle shadow-md">
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center">
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
          <h3 className="font-display text-2xl font-bold">
            {sharedLoginConfig.title}
          </h3>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled
            className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border-gray-200 bg-gray-100 text-sm text-gray-400 shadow-sm cursor-not-allowed"
          >
            <GoogleIcon className="h-5 w-5" />
            <p>{sharedLoginConfig.google}</p>
          </button>

          <button
            disabled
            className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border-gray-200 bg-gray-100 text-sm text-gray-400 shadow-sm cursor-not-allowed"
          >
            <GithubIcon className="h-5 w-5" />
            <p>{sharedLoginConfig.github}</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
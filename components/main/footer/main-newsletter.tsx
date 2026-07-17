"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mainNewsLetterConfig } from "@/config/main";
import { emailSchema } from "@/lib/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const MainNewsletter = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    const response = await fetch("/api/subscribe/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });

    if (!response?.ok) {
      setIsLoading(false);
      return toast.error(mainNewsLetterConfig.error);
    }

    setIsLoading(false);
    toast.success(mainNewsLetterConfig.success);
    form.reset();
    return true;
  }

  return (
    <div className="mt-10 xl:mt-0">
      <h3 className="text-sm font-semibold text-foreground">
        {mainNewsLetterConfig.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {mainNewsLetterConfig.description}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 sm:flex sm:max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="w-full rounded-lg border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder={mainNewsLetterConfig.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3 sm:ml-3 sm:mt-0 sm:flex-shrink-0">
            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mainNewsLetterConfig.subscribe}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MainNewsletter;

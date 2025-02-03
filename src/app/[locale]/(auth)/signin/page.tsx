"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import LangSwitcher from "@/components/common/LangSwitcher";
import { FieldValues, useForm } from "react-hook-form";
import { formatExternalUrl } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("HomePage");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthState } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const OnSubmit = async (data: FieldValues) => {
    try {
      const apiUrl = formatExternalUrl("/login");

      const res = await fetch(apiUrl, {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send and receive cookies
        body: JSON.stringify(data), // Send validated data
      });

      if (res.ok) {
        setAuthState();
        const result = await res.json();
        console.log(result);
        toast({
          title: "Success",
          description: result.message,
        });

        router.push("/dashboard");
      } else {
        const result = await res.json();
        toast({
          title: "Error",
          variant: "destructive",
          description: result.error,
        });
        console.error(result);
      }
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
      });
      console.error(error);
    }
  };

  return (
    <div className="font-prompt flex min-h-screen flex-col items-center justify-center px-16 -translate-y-7">
      <div className="absolute top-12 right-6">
        <LangSwitcher />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-3 max-w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="flex flex-col gap-2 text-2xl tracking-tight">
            <span className="font-medium">{t("sign-in-to")}</span>
            <div className="flex flex-col gap-1">
              <Image
                src={"/inline-logo.svg"}
                width={1500}
                height={1000}
                alt="Logo"
              />
              <span className="text-xs font-light text-left text-gray-500 italic mb-4">
                Organization CMS Console
              </span>
            </div>
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter your email below to sign in
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    id="email"
                    placeholder="example@gmail.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                  {errors.email && (
                    <p className="error-msg">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>

                  {errors.password && (
                    <p className="error-msg">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sign in with Email
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Link
            href="/org-register"
            className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <Image
              src={"/icon/google-icon.svg"}
              width={20}
              height={20}
              alt="google-login"
            />
            <span>Sign in with Google</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

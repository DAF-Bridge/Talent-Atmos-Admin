import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import LangSwitcher from "@/components/common/LangSwitcher";

export default function LoginPage() {
  const t = useTranslations("HomePage");
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
                Organization Management Console
              </span>
            </div>
          </h1>

          <p className="text-sm text-muted-foreground">
            Enter your email below to sign in
          </p>
        </div>
        <div className="grid gap-6">
          <form>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="example@gmail.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                  />
                </div>
              </div>
              <Button>Sign in with Email</Button>
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

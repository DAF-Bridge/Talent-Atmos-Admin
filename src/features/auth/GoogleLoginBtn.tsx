import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { formatInternalUrl } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import React from "react";

export default function GoogleLoginBtn() {
  const { setAuthState } = useAuth();
  const router = useRouter();
  const login = useGoogleLogin({
    flow: "auth-code",
    // ux_mode:"redirect",
    // redirect_uri: process.env.NEXT_PUBLIC_API_URL,
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      const apiUrl = formatInternalUrl(
        "/api/auth/google-callback?code=" + tokenResponse.code
      );
      const res = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const token = await res.json();
      // console.log("token: "+token);
      if (res.ok) {
        setAuthState();
        toast({
          title: "Success",
          description: "Sign in successful",
        })
        router.push("/dashboard");
      } else {
        console.log("Golang Callback Failed");
        toast({
          title: "Error",
          variant: "destructive",
          description: "Sign in failed",
        })
      }
    },
    onError: (error) => {
      console.log("Login Flow Failed");
      console.log(error);
    },
  });
  return (
    // <GoogleLogin
    //   onSuccess={(credentialResponse) => {
    //     console.log(credentialResponse);
    //   }}
    //   onError={() => {
    //     console.log("Login Failed");
    //   }}
    //   size="large"
    // />
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 border rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground"
    >
      <Image
        src={"/icon/google-icon.svg"}
        width={20}
        height={20}
        alt="google-login"
      />
      <span>Sign in with Google</span>
    </button>
  );
}

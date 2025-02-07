"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";

export default function OAuthCallbackPage() {
  const { setAuthState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      setAuthState();
      router.push("/dashboard");
    };
    handleCallback();
  }, [router, setAuthState]);

  return <></>;
}

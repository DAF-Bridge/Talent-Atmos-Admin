"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import type { AuthContextType, UserProfile } from "@/lib/types";
import { formatInternalUrl } from "@/lib/utils";
import Cookie from "js-cookie";
import { toast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  userProfile: null,
  loading: true,
  setAuthState: () => {},
  removeAuthState: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const checkAuthFlag = useCallback(() => {
    return Cookie.get("hasAuth") === "true";
  }, []);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = formatInternalUrl("/api/auth/current-user");

      const response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setIsAuth(true);
        console.log("You are authenticated");
        // Set a flag cookie when authentication is successful
        Cookie.set("hasAuth", "true", { path: "/", sameSite: "strict" });
      } else {
        throw new Error("Authentication failed");
      }
    } catch (err) {
      console.error(err);
      setUserProfile(null);
      setIsAuth(false);
      // Remove the flag cookie and authToken on authentication failure
      Cookie.remove("hasAuth", { path: "/" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsHydrated(true);
      // Only fetch if there's an indication of authentication
      if (checkAuthFlag()) {
        try {
          await fetchUserProfile();
        } catch (error) {
          // If fetchUserProfile fails, remove both hasAuth and authToken
          Cookie.remove("hasAuth", { path: "/" });
          setIsAuth(false);
          setUserProfile(null);
        }
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile, checkAuthFlag]);

  // will set auth state if fetchUserProfile is complete
  const setAuthState = useCallback(async () => {
    await fetchUserProfile();
  }, [fetchUserProfile]);

  const removeAuthState = useCallback(async () => {
    const apiUrl = formatInternalUrl("/api/auth/logout");
    const res = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      setIsAuth(false);
      setUserProfile(null);
      // Remove both hasAuth and authToken cookies
      Cookie.remove("hasAuth", { path: "/" });
      window.location.href = "/";
    } else {
      console.log("Logout Failed");
      toast({
        title: "Logout Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuth,
      userProfile,
      loading,
      setAuthState,
      removeAuthState,
    }),
    [isAuth, userProfile, loading, setAuthState, removeAuthState]
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

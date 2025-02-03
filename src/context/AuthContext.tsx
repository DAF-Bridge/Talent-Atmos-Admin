"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { AuthContextType, UserProfile } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
import Cookie from "js-cookie";

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
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration state

  const fetchUserProfile = useCallback(async () => {
    try {
      const apiUrl = formatExternalUrl("/current-user-profile");

      const response = await fetch(apiUrl, {
        cache: "no-store", // More aggressive no-cache
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data: UserProfile = await response.json();
      setUserProfile(data);
      setIsAuth(true);
      // Set a flag cookie when authentication is successful
      Cookie.set("hasAuth", "true", { path: "/", sameSite: "strict" });
    } catch (err) {
      console.error(err);
      setIsAuth(false);
      // Remove the flag cookie on authentication failure
      Cookie.remove("hasAuth", { path: "/" });
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuthFlag = useCallback(() => {
    return Cookie.get("hasAuth") === "true";
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      // Ensure the component is hydrated
      setIsHydrated(true);

      // Only fetch if there's an indication of authentication
      if (checkAuthFlag()) {
        await fetchUserProfile();
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile, checkAuthFlag]);

  const setAuthState = useCallback(async () => {
    setIsAuth(true);
    fetchUserProfile();
  }, [fetchUserProfile]);

  const removeAuthState = useCallback(async () => {
    await fetch(formatExternalUrl("/logout"), {
      method: "POST",
      credentials: "include",
    });
    setIsAuth(false);
    setUserProfile(null);
  }, []);

  // Wrap the context value in useMemo to avoid unnecessary recalculations
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

  // Delay rendering until hydrated
  if (!isHydrated) {
    return null; // Prevent rendering during SSR
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

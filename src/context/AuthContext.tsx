"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useRef,
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
  // Track whether initial fetch has completed
  const initialFetchDone = useRef(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Start with hydrated false to prevent flash of content
  const [isHydrated, setIsHydrated] = useState(false);

  const fetchUserProfile = useCallback(async (isInitialFetch = false) => {
    try {
      const apiUrl = formatExternalUrl("/current-user-profile");
      const response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data: UserProfile = await response.json();
      setUserProfile(data);
      setIsAuth(true);
      Cookie.set("hasAuth", "true", { path: "/", sameSite: "strict" });
    } catch (err) {
      console.error(err);
      setIsAuth(false);
      setUserProfile(null);
      Cookie.remove("hasAuth", { path: "/" });
    } finally {
      // Only set loading to false after initial fetch
      if (isInitialFetch) {
        setLoading(false);
        initialFetchDone.current = true;
      }
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      // Set hydrated immediately
      setIsHydrated(true);
      
      // Check if we have an auth cookie
      const hasAuth = Cookie.get("hasAuth") === "true";
      
      if (hasAuth && !initialFetchDone.current) {
        // Keep previous user profile state while fetching
        await fetchUserProfile(true);
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile]);

  // Set up periodic refresh of user profile when authenticated
  useEffect(() => {
    if (!isAuth) return;

    const refreshInterval = setInterval(() => {
      fetchUserProfile(false);
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(refreshInterval);
  }, [isAuth, fetchUserProfile]);

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
    Cookie.remove("hasAuth", { path: "/" });
    window.location.reload();
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

  // Don't render anything until hydration is complete
  if (!isHydrated) {
    return null;
  }

  // Optional: You can also prevent rendering until initial auth check is done
  if (!initialFetchDone.current && loading) {
    return null; // or return a loading spinner
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
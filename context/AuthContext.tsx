"use client";

// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string | string[];
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  hasRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  hasRole: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("[AuthContext] Failed to fetch profile:", error.message);
      setProfile(null);
      return;
    }
    setProfile(data as UserProfile);
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  // ─── Restore session + real-time listener ──────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const {
        data: { session: existingSession },
        error,
      } = await supabase.auth.getSession();

      if (error) console.error("[AuthContext] getSession error:", error.message);

      if (existingSession?.user) {
        setSession(existingSession);
        setUser(existingSession.user);
        await fetchProfile(existingSession.user.id);
      }

      setLoading(false);
    };

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        if (newSession?.user) {
          setSession(newSession);
          setUser(newSession.user);
          await fetchProfile(newSession.user.id);
        }
      }

      if (event === "SIGNED_OUT") {
        clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, clearAuth]);

  // ─── Periodically refresh session to prevent token expiration issues ───
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) clearAuth();
      else if (data.session.user) {
        setSession(data.session);
        setUser(data.session.user);
        await fetchProfile(data.session.user.id);
      }
    }, 30 * 1000); // every 30 seconds

    return () => clearInterval(interval);
  }, [fetchProfile, clearAuth]);

  // ─── Refresh session when tab becomes visible ─────────────────────────
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        const { data } = await supabase.auth.getSession();
        if (!data.session) clearAuth();
        else if (data.session.user) {
          setSession(data.session);
          setUser(data.session.user);
          await fetchProfile(data.session.user.id);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchProfile, clearAuth]);

  const signOut = useCallback(async () => {
    clearAuth();
    await supabase.auth.signOut();
  }, [clearAuth]);

  const hasRole = useCallback(
    (role: string) => {
      if (!profile) return false;
      return Array.isArray(profile.role)
        ? profile.role.includes(role)
        : profile.role === role;
    },
    [profile]
  );

  return (
    <AuthContext.Provider
      value={{ user, session, profile, loading, signOut, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
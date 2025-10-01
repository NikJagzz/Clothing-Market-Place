import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { supabase } from "../supabaseClient";
import LoadingSpinner from "../components/LoadingSpinner";

interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  userEmail: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  console.log(userEmail);
  console.log(userName);

  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  async function loadProfile(session: any) {
    if (!session?.user) {
      setIsLoggedIn(false);
      setUserName(null);
      setUserEmail(null);

      return;
    }

    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true; // ✅ persistently track fetch state

    setIsLoggedIn(true);
    console.log("[AUTH_PROVIDER] Fetching profile for:", session.user.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", session.user.id)
      .single();

    setUserEmail(session.user.email);

    if (!error && data) {
      setUserEmail(session.user.email ?? null);

      setUserName(data.name ?? null);
    } else {
      setUserName(null);
      setUserEmail(null);
    }
  }

  useEffect(() => {
    async function initialize() {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadProfile(session);
      setLoading(false);
    }

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        loadProfile(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserName(null);
    setUserEmail(null);
    hasFetchedRef.current = false;
  }

  async function refetch() {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    hasFetchedRef.current = false;
    await loadProfile(session);
    setLoading(false);
  }

  if (loading) {
    return (
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <LoadingSpinner size={24} color="text-blue-600" />
      </nav>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userName, userEmail, loading, signOut, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

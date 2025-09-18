import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { me } from "../services/auth";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
};

type AuthCtx = {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  ready: boolean;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  token: null,
  setAuth: () => {},
  logout: () => {},
  ready: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const tk = localStorage.getItem("token");
      const raw = localStorage.getItem("user");
      if (tk && raw) {
        try {
          setToken(tk);
          setUser(JSON.parse(raw));
          // optional: xác thực lại nhưng KHÔNG xoá nếu fail
          await me(tk).catch(() => {
            // console.warn("me() failed, keep local session for now");
          });
        } catch {
          localStorage.clear();
          setUser(null);
          setToken(null);
        }
      }
      setReady(true);
    })();
  }, []);

  const setAuth = (tk: string, u: User) => {
    setToken(tk);
    setUser(u);
    localStorage.setItem("token", tk);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, setAuth, logout, ready }),
    [user, token, ready]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);

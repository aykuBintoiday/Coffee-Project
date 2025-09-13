export type User = {
  id: number;
  fullName: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
};

const TK = "token";
const US = "user";

export const session = {
  get token() {
    return localStorage.getItem(TK);
  },
  get user(): User | null {
    const raw = localStorage.getItem(US);
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },
  set(tk: string, u: User) {
    localStorage.setItem(TK, tk);
    localStorage.setItem(US, JSON.stringify(u));
  },
  clear() {
    localStorage.removeItem(TK);
    localStorage.removeItem(US);
  },
};

export type Role = "CUSTOMER" | "ADMIN";
export type User = { id: number; fullName: string; email: string; role: Role };

class Session {
  token: string | null = null;
  user: User | null = null;

  init() {
    this.token = localStorage.getItem("token");
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        this.user = JSON.parse(raw) as User;
      } catch {
        this.user = null;
      }
    }
  }

  set(token: string, user: User) {
    this.token = token;
    this.user = user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  clear() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }
}

export const session = new Session();
session.init();

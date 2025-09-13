import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { session } from "../../services/session";

const LoginPageAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      const r = await login(email, password);
      if (!r.ok || !r.token || !r.id || !r.email || !r.fullName || !r.role)
        throw new Error("Sai thông tin");
      session.set(r.token, {
        id: r.id,
        email: r.email,
        fullName: r.fullName,
        role: r.role,
      });
      if (r.role !== "ADMIN") throw new Error("Tài khoản không có quyền ADMIN");
      nav("/admin");
    } catch (e: any) {
      setErr(e.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button>Đăng nhập</button>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
      </form>
    </div>
  );
};
export default LoginPageAdmin;

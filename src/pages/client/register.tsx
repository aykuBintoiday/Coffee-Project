import { useState } from "react";
import { register } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPageClient = () => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      const r = await register(fullName, email, password);
      if (!r.ok || !r.token || !r.id || !r.email || !r.fullName || !r.role)
        throw new Error(r as any);
      setAuth(r.token, {
        id: r.id,
        email: r.email,
        fullName: r.fullName,
        role: r.role,
      });
      navigate("/client/home");
    } catch (e: any) {
      setErr(e.message || "Đăng ký thất bại");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Tạo tài khoản</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Họ tên"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu (≥8)"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button>Đăng ký</button>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
      </form>
      <p style={{ marginTop: 8 }}>
        Đã có tài khoản? <Link to="/client/login">Đăng nhập</Link>
      </p>
    </div>
  );
};
export default RegisterPageClient;

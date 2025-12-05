import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import "../../styles/client/login.scss";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { setAuth } = useAuth();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await login(email, password);
      if (!r.ok || !r.token || !r.id || !r.email || !r.fullName || !r.role)
        throw new Error("Sai email/mật khẩu");

      // cập nhật context + localStorage
      setAuth(r.token, {
        id: r.id,
        email: r.email,
        fullName: r.fullName,
        role: r.role,
      });

      nav(r.role === "ADMIN" ? "/admin" : "/");
    } catch (e: any) {
      setErr(e.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginCard">
        <h2 className="LoginTitle">Đăng nhập</h2>

        <form onSubmit={onSubmit} className="LoginForm">
          <input
            className="LoginInput"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="LoginInput"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
            required
          />

          <button className="LoginBtn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {err && <div className="LoginError">{err}</div>}
        </form>

        <p className="LoginFooter">
          Nếu bạn chưa có tài khoản hãy{" "}
          <Link to="/register" className="LoginLink">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}

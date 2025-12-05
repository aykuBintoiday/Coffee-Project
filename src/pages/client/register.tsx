import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/auth";
import "../../styles/client/register.scss";

export default function ClientRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (password.length < 8) {
      setErr("Mật khẩu tối thiểu 8 ký tự");
      return;
    }
    if (password !== confirm) {
      setErr("Xác nhận mật khẩu không khớp");
      return;
    }

    setLoading(true);
    try {
      const r = await register(fullName, email, password);
      if (!r.ok) throw new Error("Đăng ký thất bại");
      nav("/login");
    } catch (e: any) {
      setErr(e.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginCard">
        <h2 className="LoginTitle">Tạo tài khoản</h2>

        <form onSubmit={onSubmit} className="LoginForm">
          <input
            className="LoginInput"
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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

          <input
            className="LoginInput"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className="LoginBtn" disabled={loading}>
            {loading ? "Đang tạo..." : "Đăng ký"}
          </button>

          {err && <div className="LoginError">{err}</div>}
        </form>

        <p className="LoginFooter">
          Đã có tài khoản?{" "}
          <Link to="/login" className="LoginLink">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

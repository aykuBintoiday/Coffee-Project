import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/auth";
import { session } from "../../services/session";

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
      if (!r.ok || !r.token || !r.id || !r.email || !r.fullName || !r.role) {
        throw new Error("Đăng ký thất bại");
      }
      // lưu session + tự đăng nhập
      session.set(r.token, {
        id: r.id,
        email: r.email,
        fullName: r.fullName,
        role: r.role, // sẽ luôn là "CUSTOMER" từ BE
      });
      nav("/"); // hoặc điều hướng tới trang hồ sơ /information
    } catch (e: any) {
      setErr(e.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "60px auto" }}>
      <h2>Tạo tài khoản</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email (dùng để đăng nhập)"
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
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button disabled={loading}>
          {loading ? "Đang tạo..." : "Đăng ký"}
        </button>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
      </form>
      <p style={{ marginTop: 12 }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}

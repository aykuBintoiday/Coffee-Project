import { useAuth } from "../../context/AuthContext";

const HometPageClient = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <h2>Xin chào {user?.fullName}</h2>
      <p>
        Email: {user?.email} • Role: {user?.role}
      </p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
};
export default HometPageClient;

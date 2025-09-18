import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { user, ready } = useAuth();
  if (!ready) return <div style={{ padding: 24 }}>Đang tải...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

export const RequireAdmin: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { user, ready } = useAuth();
  if (!ready) return <div style={{ padding: 24 }}>Đang tải...</div>;
  return user?.role === "ADMIN" ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

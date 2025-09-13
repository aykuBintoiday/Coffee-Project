import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) {
  const { user, ready } = useAuth();
  if (!ready) return null; // hoặc spinner
  if (!user) return <Navigate to="/client/login" replace />;
  if (roles && !roles.includes(user.role))
    return <Navigate to="/client/home" replace />;
  return children;
}

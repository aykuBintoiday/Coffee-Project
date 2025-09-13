import { Outlet } from "react-router-dom";
import ClientMenu from "./pages/client/menu";

// Layout Client
export function ClientLayout() {
  return (
    <>
      <ClientMenu />
      <Outlet />
    </>
  );
}

// Layout Admin
export function AdminLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside style={{ background: "#111827", color: "#fff", padding: 16 }}>
        <h3>Admin Menu</h3>
        {/* Menu admin thật của bạn */}
      </aside>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

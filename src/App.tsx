import { Outlet } from "react-router-dom";
import ClientMenu from "./pages/client/menu";
import MenuPageAdmin from "./pages/admin/menu"; // <-- THÊM: sidebar thật

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
        gridTemplateColumns: "220px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          background: "#111827",
          color: "#fff",
          padding: 16,
          overflowY: "auto",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Admin Menu</h3>
        <MenuPageAdmin /> {/* <-- DÙNG sidebar thật để có link bấm */}
      </aside>

      <main style={{ padding: 24, background: "#f9fafb" }}>
        <Outlet />
      </main>
    </div>
  );
}

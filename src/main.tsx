import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { ClientLayout, AdminLayout } from "./App";

// ---- Pages Client ----
import Home from "./pages/client/home";
import Product from "./pages/client/product";
import Cart from "./pages/client/cart";
import Order from "./pages/client/order";
import Pay from "./pages/client/pay";
import Information from "./pages/client/information";
import ClientLogin from "./pages/client/login";

// ---- Pages Admin ----
import AdminLogin from "./pages/admin/login";
import Dashboard from "./pages/admin/dashboard";
import AdminProduct from "./pages/admin/product";
import AdminOrder from "./pages/admin/order";

import { session } from "./services/session";

// ---- Guard helpers ----
const isAuthed = () => !!session.token && !!session.user;
const isAdmin = () => isAuthed() && session.user!.role === "ADMIN";

function requireAuth(element: JSX.Element) {
  return isAuthed() ? element : <Navigate to="/login" replace />;
}
function requireAdmin(element: JSX.Element) {
  return isAdmin() ? element : <Navigate to="/admin/login" replace />;
}

// ---- Router ----
const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product", element: <Product /> },
      { path: "cart", element: requireAuth(<Cart />) },
      { path: "order", element: requireAuth(<Order />) },
      { path: "pay", element: requireAuth(<Pay />) },
      { path: "information", element: requireAuth(<Information />) },
      { path: "login", element: <ClientLogin /> },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: requireAdmin(<AdminLayout />),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product", element: <AdminProduct /> },
      { path: "order", element: <AdminOrder /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

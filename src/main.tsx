import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ClientLayout, AdminLayout } from "./App";
import "./styles/global.scss";

// Client pages
import Home from "./pages/client/home";
import Product from "./pages/client/product";
import Cart from "./pages/client/cart";
import Order from "./pages/client/order";
import Pay from "./pages/client/pay";
import Information from "./pages/client/information";
import ClientLogin from "./pages/client/login";
import ClientRegister from "./pages/client/register";
import ClientIntroduction from "./pages/client/introuduction";

// Admin pages (KHÔNG còn AdminLogin)
import Dashboard from "./pages/admin/dashboard";
import AdminProduct from "./pages/admin/product";
import AdminOrder from "./pages/admin/order";
import AdminClient from "./pages/admin/client";

import { AuthProvider } from "./context/AuthContext";
import { RequireAuth, RequireAdmin } from "./routes/guards";

const router = createBrowserRouter([
  // Client
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product", element: <Product /> },
      {
        path: "cart",
        element: (
          <RequireAuth>
            <Cart />
          </RequireAuth>
        ),
      },
      {
        path: "order",
        element: (
          <RequireAuth>
            <Order />
          </RequireAuth>
        ),
      },
      {
        path: "pay",
        element: (
          <RequireAuth>
            <Pay />
          </RequireAuth>
        ),
      },
      {
        path: "information",
        element: (
          <RequireAuth>
            <Information />
          </RequireAuth>
        ),
      },
      { path: "login", element: <ClientLogin /> },
      { path: "register", element: <ClientRegister /> },
      { path: "introduction", element: <ClientIntroduction /> },
    ],
  },

  // Admin (KHÔNG có /admin/login)
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <Dashboard /> }, // /admin -> Dashboard
      { path: "product", element: <AdminProduct /> },
      { path: "order", element: <AdminOrder /> },
      { path: "client", element: <AdminClient /> },
    ],
  },

  // fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

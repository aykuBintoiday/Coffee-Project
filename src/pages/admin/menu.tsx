// src/pages/admin/menu.tsx
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/admin/menu.scss";
import { useAuth } from "../../context/AuthContext";

const MenuPageAdmin = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "active" : ""}`;

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // hoặc navigate("/login") nếu bạn muốn về trang login
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/admin" end className={navClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/client" className={navClass}>
            Client
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/product" className={navClass}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/order" className={navClass}>
            Order
          </NavLink>
        </li>
        <li>
          {/* Đăng xuất decor như link */}
          <a
            onClick={handleLogout}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuPageAdmin;

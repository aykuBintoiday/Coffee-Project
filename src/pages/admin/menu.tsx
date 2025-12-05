// src/pages/admin/menu.tsx
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/admin/menu.scss";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/img/Logo_team_3.png";

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
      <img className="Logo_team" src={Logo} alt="" />
      <ul>
        <li>
          <NavLink to="/admin" end className={navClass}>
            Tổng Quan
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/client" className={navClass}>
            Người Dùng
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/product" className={navClass}>
            Sản Phẩm
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/order" className={navClass}>
            Thu Chi
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/chat" className={navClass}>
            Nhắn Tin
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

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // <-- dùng context
import "../../styles/client/menu.scss";

const MenuPageClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // <-- lấy user & logout từ context
  const navigate = useNavigate();

  const isClient = !!user && user.role === "CUSTOMER";

  const handleLogout = () => {
    logout(); // <-- xoá token/user + phát tín hiệu re-render
    navigate("/");
  };

  return (
    <nav className="navbar">
      <button
        aria-label="Toggle menu"
        className="hamburger"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <ul className={`menu ${isOpen ? "show" : ""}`}>
        {/* Luôn hiển thị */}
        <li className="chu_menu">
          <NavLink to="/" end>
            Trang Chủ
          </NavLink>
        </li>
        <li className="chu_menu">
          <NavLink to="/product">Sản Phẩm</NavLink>
        </li>

        {/* Hiện thêm khi client đã đăng nhập */}
        {isClient && (
          <>
            <li className="chu_menu">
              <NavLink to="/cart">Giỏ Hàng</NavLink>
            </li>
            <li className="chu_menu">
              <NavLink to="/pay">Thanh Toán</NavLink>
            </li>
            <li className="chu_menu">
              <NavLink to="/information">Thông Tin</NavLink>
            </li>
          </>
        )}

        {/* Cuối menu: Đăng nhập / Đăng xuất */}
        {!isClient ? (
          <li className="chu_menu">
            <NavLink to="/login">Đăng Nhập</NavLink>
          </li>
        ) : (
          <li className="chu_menu">
            <NavLink
              to="#"
              onClick={(e) => {
                e.preventDefault(); // ngăn điều hướng
                handleLogout();
              }}
            >
              Đăng Xuất
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MenuPageClient;

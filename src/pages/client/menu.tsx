import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/client/menu.scss";

const MenuPageClient = () => {
  const [isOpen, setIsOpen] = useState(false); // cho hamburger (nếu bạn đang dùng)
  const [isClient, setIsClient] = useState(false); // trạng thái đăng nhập client
  const navigate = useNavigate();

  // Đọc trạng thái từ localStorage
  useEffect(() => {
    const read = () => setIsClient(localStorage.getItem("role") === "USER");
    read();
    // nghe thay đổi từ tab khác (tùy chọn)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "role") read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Đăng xuất client
  const handleLogout = () => {
    if (localStorage.getItem("role") === "USER") {
      localStorage.removeItem("role");
    }
    setIsClient(false);
    navigate("/"); // quay về home
  };

  return (
    <nav className="navbar">
      {/* Hamburger (nếu cần) */}
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
        {/* Luôn có: Trang chủ, Sản phẩm */}
        <li className="chu_menu">
          <NavLink to="/" end>
            Trang Chủ
          </NavLink>
        </li>
        <li className="chu_menu">
          <NavLink to="/product">Sản Phẩm</NavLink>
        </li>

        {/* Chỉ hiện khi client đã đăng nhập */}
        {isClient && (
          <>
            <li className="chu_menu">
              <NavLink to="/cart">Giỏ Hàng</NavLink>
            </li>
            <li className="chu_menu">
              <NavLink to="/order">Theo Dõi Đơn</NavLink>
            </li>
            <li className="chu_menu">
              <NavLink to="/pay">Thanh Toán</NavLink>
            </li>
            <li className="chu_menu">
              <NavLink to="/information">Thông Tin</NavLink>
            </li>
          </>
        )}

        {/* Nút cuối: nếu chưa login -> Đăng nhập; đã login -> Đăng xuất */}
        {!isClient ? (
          <li className="chu_menu">
            <NavLink to="/login">Đăng Nhập</NavLink>
          </li>
        ) : (
          <li className="chu_menu">
            {/* dùng button để logout */}
            <button onClick={handleLogout} className="btn-logout">
              Đăng Xuất
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MenuPageClient;

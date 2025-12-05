import { useState } from "react";
import "../../styles/client/information.scss";

const InformationPageClient = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [avatar, setAvatar] = useState("/default-avatar.jpg"); // ảnh mặc định

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleViewAvatar = () => {
    setShowMenu(false);
    setShowPreview(true);
  };

  const handleUploadAvatar = () => {
    setShowMenu(false);
    document.getElementById("avatarUploadInput")?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setAvatar(imgURL);

      // SAU NÀY bạn lưu file lên database/server ở đây
      // uploadAvatarToServer(file);
    }
  };

  return (
    <>
      <div className="background" />

      {/* Avatar */}
      <div
        className="Anh_Dai_Dien"
        style={{ backgroundImage: `url(${avatar})` }}
        onClick={toggleMenu}
      ></div>

      {/* MENU */}
      {showMenu && (
        <div className="avatar-menu">
          <div onClick={handleViewAvatar}>Xem ảnh đại diện</div>
          <div onClick={handleUploadAvatar}>Thay đổi ảnh đại diện</div>
        </div>
      )}

      {/* OVERLAY XEM ẢNH */}
      {showPreview && (
        <div className="avatar-overlay">
          <span className="close-btn" onClick={() => setShowPreview(false)}>
            ×
          </span>
          <img src={avatar} alt="avatar" />
        </div>
      )}

      {/* INPUT UPLOAD FILE */}
      <input
        id="avatarUploadInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Các phần còn lại */}
      <div className="Information_Hien_Thi_Database1"></div>
      <div className="Information_Hien_Thi_Database2"></div>
      <div className="Information_Hien_Thi_Database3"></div>
    </>
  );
};

export default InformationPageClient;

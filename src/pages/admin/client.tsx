import "../../styles/admin/client.scss";

const ClientPageAdmin = () => {
  return (
    <>
      <div className="background" />
      <div className="content-no-scroll">
        <div className="Chuc_Nang">
          <button className="Them">Thêm Người Dùng</button>
          <button className="Xoa">Xóa Người Dùng</button>
          <button className="Sua">Chỉnh Sửa</button>
          <input className="Tim_Kiem" placeholder="Tìm Kiếm Người Dùng" />
        </div>
        <div className="Hien_Thi_Database"></div>
      </div>
    </>
  );
};
export default ClientPageAdmin;

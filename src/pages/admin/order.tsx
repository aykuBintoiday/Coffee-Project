import "../../styles/admin/order.scss";
const OrderPageAdmin = () => {
  return (
    <>
      <div className="background" />
      <div className="content-no-scroll">
        <div className="Chuc_Nang">
          <button className="Them_New">Cập Nhật Lương Nhân Viên</button>
          <button className="Xoa_New">Tổng Tiền Thu Sản Phẩm</button>
          <button className="Sua_New">Tổng Tiền Chi Sản Phẩm</button>
        </div>
        <div className="Hien_Thi_Database1"></div>
        <div className="Hien_Thi_Database2"></div>
      </div>
    </>
  );
};
export default OrderPageAdmin;

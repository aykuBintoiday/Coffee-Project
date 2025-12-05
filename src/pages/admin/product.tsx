import "../../styles/admin/product.scss";

const ProductPageAdmin = () => {
  return (
    <>
      <div className="background" />
      <div className="content-no-scroll">
        <div className="Chuc_Nang">
          <button className="Them">Thêm Sản Phẩm</button>
          <button className="Xoa">Xóa Sản Phẩm</button>
          <button className="Sua">Chỉnh Sửa</button>
          <button className="Cap_Nhat">Cập Nhật</button>
          <input className="Tim_Kiem" placeholder="Tìm Kiếm Sản Phẩm" />
        </div>
        <div className="Hien_Thi_Database"></div>
      </div>
    </>
  );
};
export default ProductPageAdmin;

// src/pages/client/home.tsx
import "../../styles/client/home.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* Ảnh Trang 1 */
import TrangChu_Trang1 from "../../assets/img/TrangChu_Trang1.png";
import TrangChu_Trang1_Anh1 from "../../assets/img/TrangChu_Trang1_Anh1.jpg";
import TrangChu_Trang1_Anh2 from "../../assets/img/TrangChu_Trang1_Anh2.jpg";
import TrangChu_Trang1_Anh3 from "../../assets/img/TrangChu_Trang1_Anh3.jpg";
import TrangChu_Trang1_Anh4 from "../../assets/img/TrangChu_Trang1_Anh4.png";
import TrangChu_Trang1_Anh5 from "../../assets/img/TrangChu_Trang1_Anh5.png";
import TrangChu_Trang1_Anh6 from "../../assets/img/TrangChu_Trang1_Anh6.png";
import TrangChu_Trang1_Anh7 from "../../assets/img/TrangChu_Trang1_Anh7.png";

/* Ảnh Trang 2 */
import TrangChu_Trang2_Anh1 from "../../assets/img/TrangChu_Trang2_Anh1.jpg";
import TrangChu_Trang2_Anh2 from "../../assets/img/TrangChu_Trang2_Anh2.jpg";
import TrangChu_Trang2_Anh3 from "../../assets/img/TrangChu_Trang2_Anh3.webp";

/* Ảnh Trang 3 */
import TrangChu_Trang3_Anh1 from "../../assets/img/TrangChu_Trang3_Anh1.jpg";
import TrangChu_Trang3_Anh2 from "../../assets/img/TrangChu_Trang3_Anh2.jpg";
import TrangChu_Trang3_Anh3 from "../../assets/img/TrangChu_Trang3_Anh3.jpg";

const HometPageClient = () => {
  const navigate = useNavigate();

  // Lightbox
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // Back-to-top
  const [showTop, setShowTop] = useState(false);

  // ESC để đóng lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Khoá/khôi phục scroll body khi mở/đóng lightbox
  useEffect(() => {
    document.body.style.overflow = previewSrc ? "hidden" : "auto";
  }, [previewSrc]);

  // Hiện nút back-to-top khi cuộn xuống
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const t2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!t2Ref.current) return;

    const el = t2Ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("inview"); // ✅ chỉ thêm 1 lần
            observer.unobserve(el); // ✅ ngừng theo dõi để không ẩn lại nữa
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sec = document.querySelector(".Trang3");
    if (!sec) return;

    let revealed = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !revealed) {
            revealed = true;
            sec.classList.add("reveal");
            io.unobserve(e.target); // chỉ chạy 1 lần, không ẩn lại
          }
        });
      },
      { threshold: 0.1 } // thấy khoảng 25% là reveal
    );

    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ==================== TRANG 1 ==================== */}
      <div
        className="Trang1"
        style={
          {
            // Chữ 1
            "--chu1-top": "20%",
            "--chu1-left": "32.5%",
            "--chu1-size": "84px",
            // Chữ 2
            "--chu2-top": "34%",
            "--chu2-left": "35%",
            "--chu2-size": "36px",
            // Chữ 3
            "--chu3-top": "42%",
            "--chu3-left": "17%",
            "--chu3-size": "20px",

            // Marquee
            "--marquee-top": "67%",
            "--marquee-left": "50%",
            "--marquee-width": "100%",
            "--marquee-height": "135px",
            "--marquee-gap": "55px",
            "--marquee-duration": "22s",
          } as React.CSSProperties
        }
      >
        {/* Ảnh nền (ẩn bằng SCSS, giữ để bundler resolve path) */}
        <img className="TrangChu_Trang1" src={TrangChu_Trang1} alt="" />

        {/* Hero text */}
        <p className="Trang1_chu1">Chào Mừng</p>
        <p className="Trang1_chu2">Đến Với Thế Giới Coffee</p>
        <p className="Trang1_chu3">
          Tại đây, bạn có thể dễ dàng tìm thấy nhiều thương hiệu cà phê nổi
          tiếng và được ưa chuộng nhất hiện nay, từ hương vị đậm đà truyền thống
          đến phong cách rang xay hiện đại. Chúng tôi giúp bạn so sánh, lựa chọn
          và đặt mua nhanh chóng, mang đến trải nghiệm mua cà phê tiện lợi –
          chất lượng – đúng gu. Một cú nhấp chuột, muôn hương vị cà phê cùng hội
          tụ!
        </p>

        {/* Marquee logo (nhân đôi dãy ảnh để seamless) */}
        <div className="logo-marquee" aria-label="Đối tác cà phê">
          <div className="logo-track">
            {/* Dãy 1 */}
            <img
              src={TrangChu_Trang1_Anh1}
              alt="Logo 1"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh1)}
            />
            <img
              src={TrangChu_Trang1_Anh2}
              alt="Logo 2"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh2)}
            />
            <img
              src={TrangChu_Trang1_Anh3}
              alt="Logo 3"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh3)}
            />
            <img
              src={TrangChu_Trang1_Anh4}
              alt="Logo 4"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh4)}
            />
            <img
              src={TrangChu_Trang1_Anh5}
              alt="Logo 5"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh5)}
            />
            <img
              src={TrangChu_Trang1_Anh6}
              alt="Logo 6"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh6)}
            />
            <img
              src={TrangChu_Trang1_Anh7}
              alt="Logo 7"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh7)}
            />
            {/* Dãy 2 */}
            <img
              src={TrangChu_Trang1_Anh1}
              alt="Logo 1"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh1)}
            />
            <img
              src={TrangChu_Trang1_Anh2}
              alt="Logo 2"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh2)}
            />
            <img
              src={TrangChu_Trang1_Anh3}
              alt="Logo 3"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh3)}
            />
            <img
              src={TrangChu_Trang1_Anh4}
              alt="Logo 4"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh4)}
            />
            <img
              src={TrangChu_Trang1_Anh5}
              alt="Logo 5"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh5)}
            />
            <img
              src={TrangChu_Trang1_Anh6}
              alt="Logo 6"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh6)}
            />
            <img
              src={TrangChu_Trang1_Anh7}
              alt="Logo 7"
              onClick={() => setPreviewSrc(TrangChu_Trang1_Anh7)}
            />
          </div>
        </div>
      </div>

      {/* ==================== TRANG 2 ==================== */}
      <div
        ref={t2Ref}
        className="Trang2"
        style={
          {
            // CHỮ 1 (Poppins Bold)
            "--t2-chu1-top": "21%",
            "--t2-chu1-left": "8%",
            "--t2-chu1-width": "auto",
            "--t2-chu1-height": "auto",
            "--t2-chu1-size": "72px",

            // CHỮ 2 (Work Sans)
            "--t2-chu2-top": "34%",
            "--t2-chu2-left": "8%",
            "--t2-chu2-width": "700px",
            "--t2-chu2-height": "auto",
            "--t2-chu2-size": "22px",

            // ẢNH 1
            "--t2-img1-top": "18%",
            "--t2-img1-left": "72%",
            "--t2-img1-width": "248px",
            "--t2-img1-height": "252px",

            // ẢNH 2
            "--t2-img2-top": "40%",
            "--t2-img2-left": "60%",
            "--t2-img2-width": "248px",
            "--t2-img2-height": "252px",

            // ẢNH 3
            "--t2-img3-top": "62%",
            "--t2-img3-left": "72%",
            "--t2-img3-width": "248px",
            "--t2-img3-height": "252px",
          } as React.CSSProperties
        }
      >
        <p className="Trang2_chu1">Nơi Đây</p>
        <p className="Trang2_chu2">
          Chúng tôi cung cấp cho bạn những loại cà phê bột thơm ngon và chất
          lượng nhất, được chọn lọc kỹ lưỡng từ nhiều thương hiệu uy tín trên
          khắp mọi miền đất nước. Từng hạt cà phê được thu hoạch từ vùng đất cao
          nguyên đầy nắng gió, rang xay cẩn thận để giữ trọn hương vị đậm đà và
          tinh túy nhất. Dù bạn là người yêu sự mạnh mẽ của Robusta, hay đắm say
          vị thanh dịu của Arabica, chúng tôi đều có thể mang đến ly cà phê đúng
          “gu” của bạn. Với mong muốn lan tỏa niềm đam mê cà phê Việt, chúng tôi
          không chỉ bán sản phẩm – mà còn gửi gắm trong đó một trải nghiệm chân
          thật, gần gũi và đầy cảm xúc. Hãy để hương thơm cà phê nơi đây đánh
          thức năng lượng, khơi dậy cảm hứng và bắt đầu ngày mới trọn vẹn hơn.
        </p>

        <img src={TrangChu_Trang2_Anh1} alt="" />
        <img src={TrangChu_Trang2_Anh2} alt="" />
        <img src={TrangChu_Trang2_Anh3} alt="" />
      </div>

      {/* ==================== TRANG 3 ==================== */}
      <div
        className="Trang3"
        style={
          {
            /* ===== Khung 1 ===== */
            "--t3-a1-top": "18%",
            "--t3-a1-left": "9%",
            "--t3-a1-box-w": "350px",
            "--t3-a1-box-h": "470px",
            "--t3-a1-img-h": "73%",
            "--t3-a1-img-top": "4%", // 👈 chỉnh TOP ảnh 1
            "--t3-a1-text-w": "200px",
            "--t3-a1-text-h": "25px",

            /* ===== Khung 2 ===== */
            "--t3-a2-top": "18%",
            "--t3-a2-left": "37.5%",
            "--t3-a2-box-w": "350px",
            "--t3-a2-box-h": "470px",
            "--t3-a2-img-h": "73%",
            "--t3-a2-img-top": "4%", // 👈 TOP ảnh 2
            "--t3-a2-text-w": "200px",
            "--t3-a2-text-h": "25px",

            /* ===== Khung 3 ===== */
            "--t3-a3-top": "18%",
            "--t3-a3-left": "66%",
            "--t3-a3-box-w": "350px",
            "--t3-a3-box-h": "470px",
            "--t3-a3-img-h": "73%",
            "--t3-a3-img-top": "4%", // 👈 TOP ảnh 3
            "--t3-a3-text-w": "200px",
            "--t3-a3-text-h": "25px",
          } as React.CSSProperties
        }
      >
        <div
          className="TrangChu_Trang3_Anh1"
          onClick={() => navigate("/product")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/product")}
          aria-label="Đi tới trang Sản phẩm"
        >
          <img src={TrangChu_Trang3_Anh1} alt="Xem sản phẩm" />
          <p className="TrangChu_Trang3_Chu">Cà Phê Ngay</p>
        </div>

        <div
          className="TrangChu_Trang3_Anh2"
          onClick={() => navigate("/introduction")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/introduction")}
          aria-label="Đi tới trang Giới thiệu"
        >
          <img src={TrangChu_Trang3_Anh2} alt="Giới thiệu" />
          <p className="TrangChu_Trang3_Chu">Lịch Sử Cà Phê</p>
        </div>

        <div
          className="TrangChu_Trang3_Anh3"
          onClick={() => navigate("/login")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/login")}
          aria-label="Đi tới trang Đăng nhập"
        >
          <img src={TrangChu_Trang3_Anh3} alt="Đăng nhập" />
          <p className="TrangChu_Trang3_Chu">Trải Nghiệm Ngay</p>
        </div>
      </div>
      {/* ==================== TRANG 4 ==================== */}
      <div className="Trang4"></div>

      {/* ==================== LIGHTBOX ==================== */}
      {previewSrc && (
        <div className="lightbox" onClick={() => setPreviewSrc(null)}>
          <button
            className="lightbox__close"
            aria-label="Đóng"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewSrc(null);
            }}
          >
            ×
          </button>

          <img
            className="lightbox__img"
            src={previewSrc}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ==================== BACK-TO-TOP ==================== */}
      {showTop && (
        <button
          className="back-to-top"
          aria-label="Lên đầu trang"
          onClick={scrollToTop}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 5l7 7-1.41 1.41L13 9.83V20h-2V9.83L6.41 13.41 5 12z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default HometPageClient;

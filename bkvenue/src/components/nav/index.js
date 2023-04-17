import { Link } from "react-router-dom";
import "./base.css";

function Nav1({ active }) {
  return (
    <div className="nav_size">
      <Link to="/search/dish" state={{ active: "dish" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold fs-3 btnSize ${active === "dish" ? "active" : ""}`}
        >
          TÌM KIẾM QUÁN ĂN
        </button>
      </Link>
      <Link to="/search/beverage" state={{ active: "beverage" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold fs-3 btnSize ${active === "beverage" ? "active" : ""}`}
        >
          TÌM KIẾM QUÁN NƯỚC
        </button>
      </Link>
      <Link to="/search/whatever" state={{ active: "whatever" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold fs-3 btnSize ${active === "whatever" ? "active" : ""}`}
        >
          GÌ CŨNG ĐƯỢC
        </button>
      </Link>
      <Link to="/search/favoritePlace" state={{ active: "favoritePlace" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold fs-3 btnSize ${active === "favoritePlace" ? "active" : ""}`}
        >
          ĐỊA ĐIỂM ƯA THÍCH
        </button>
      </Link>
    </div>
  );
}

export default Nav1;

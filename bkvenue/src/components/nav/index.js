import { Link } from "react-router-dom";
import "./base.css";

function Nav1({ active }) {
  return (
    <div className="nav_size">
      <Link to="/search" state={{ active: "food" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold btnSize border-0 ${active == "food" ? "active" : ""}`}
        >
          <h2>TÌM KIẾM QUÁN ĂN</h2>
        </button>
      </Link>
      <Link to="/search" state={{ active: "beverage" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold btnSize border-0 ${active == "beverage" ? "active" : ""}`}
        >
          <h2>TÌM KIẾM QUÁN NƯỚC</h2>
        </button>
      </Link>
      <Link to="/search" state={{ active: "anything" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold btnSize border-0 ${active == "anything" ? "active" : ""}`}
        >
          <h2>GÌ CŨNG ĐƯỢC</h2>
        </button>
      </Link>
      <Link to="/search" state={{ active: "favoritePlace" }}>
        <button
          type="button"
          className={`btn btn-warning fw-bold btnSize border-0 ${active == "favoritePlace" ? "active" : ""}`}
        >
          <h2>ĐỊA ĐIỂM ƯA THÍCH</h2>
        </button>
      </Link>
    </div>
  );
}

export default Nav1;

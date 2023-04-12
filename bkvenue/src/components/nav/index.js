import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import './base.css';

function Nav1() {
    return ( 
        <div className="nav_size">
            <button type="button" class="btn btn-warning btnSize"><h2>Tìm kiếm quán ăn</h2></button>
            <button type="button" class="btn btn-warning btnSize"><h2>Tìm kiếm quán nước</h2></button>
            <button type="button" class="btn btn-warning btnSize"><h2>Gì cũng được</h2></button>
            <button type="button" class="btn btn-warning btnSize"><h2>Địa điểm ưa thích</h2></button>
        </div>

    );
}

export default Nav1;
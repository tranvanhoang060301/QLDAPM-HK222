import { useLocation } from "react-router-dom";
import { Button, Col, Card } from "react-bootstrap";
import Place from "../../assets/images/place.png";

export default function FavoriteCard({
  name,
  address,
  openingHours,
  dish,
  price,
}) {
  const location = useLocation();
  const isFavoritePage = location.pathname === "/search/favoritePlace";
  console.log(isFavoritePage);
  return (
    <Col className="d-flex justify-content-around flex-wrap fs-5" xs={4}>
      <Card
        className="p-4"
        style={{
          backgroundColor: "#FF7E00",
        }}
      >
        <Card.Header
          className="border-0 rounded fw-bold"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          THÔNG TIN ĐỊA ĐIỂM
        </Card.Header>
        <Card.Body
          className="my-3 rounded text-start"
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <Card.Text>Tên: {name}</Card.Text>
          <Card.Text>Địa chỉ: {address}</Card.Text>
          <Card.Text>Thời gian mở cửa: {openingHours}</Card.Text>
          <Card.Text>Món ăn: {dish}</Card.Text>
          <Card.Text>Giá: {price}</Card.Text>
        </Card.Body>
        <Card.Img variant="primary" src={Place} />
        {!isFavoritePage && (
          <Button
            className="w-100 mt-3 py-3 fs-5 fw-bold border-0"
            style={{
              backgroundColor: "#A02F2F",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6F2020")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#A02F2F")}
          >
            THÊM VÀO MỤC ƯA THÍCH
          </Button>
        )}
        {isFavoritePage && (
          <Button
            className="w-100 mt-3 py-3 fs-5 fw-bold border-0"
            style={{
              backgroundColor: "#A02F2F",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6F2020")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#A02F2F")}
          >
            XÓA KHỎI MỤC ƯA THÍCH
          </Button>
        )}
      </Card>
    </Col>
  );
}

import { useLocation } from "react-router-dom";
import { Button, Col, Card } from "react-bootstrap";

export default function FavoriteCard({
  info
}) {
  const location = useLocation();
  const isFavoritePage = location.pathname === "/search/favoritePlace";
  console.log(isFavoritePage);
  return (
    <Col className="d-flex justify-content-around flex-wrap fs-5 mb-4" xs={4}>
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
          <Card.Text>Tên: {info.name}</Card.Text>
          <Card.Text>Địa chỉ: {info.address.num} {info.address.street}, phường {info.address.ward}, quận {info.address.district}, HCM</Card.Text>
        </Card.Body>
        <Card.Img variant="primary" src={info.imageUrl} className="rounded-2"/>
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
            XÓA
          </Button>
        )}
      </Card>
    </Col>
  );
}

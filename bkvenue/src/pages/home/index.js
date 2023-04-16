import Header from "../../components/header";
import { Container, Button, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios"

import Homepage from "../../assets/images/homepage.png";

function Home() {
  axios.post('http://localhost:5000/user/login', {
    "email": "test1@gmail.com",
    "password": "12345621"
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  return (
    <>
      <Header />
      <Container fluid style={{ backgroundColor: "#000000", height: "100vh" }}>
        <Row className="px-5 py-5">
          <Col className="d-flex flex-column align-items-start justify-content-center px-4">
            <p
              style={{
                color: "#FF7E00",
                fontSize: "125px",
                fontWeight: "bold",
              }}
            >
              BKSuggest
            </p>
            <p className="my-5" style={{ color: "#FFFFFF", fontSize: "28px", textAlign: "start" }}>
              Bạn đang gặp khó khăn trong quá trình lựa chọn địa điểm ăn uống? Đừng lo, vì đã có BKSuggest đây rồi!
            </p>
            <Link to="/search/food" state={{ active: "food" }}>
              <Button
                className="px-5 py-3 fw-bold header-button border-0"
                style={{
                  backgroundColor: "#81BE00",
                  borderRadius: "84px",
                  fontSize: "20px",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#709523")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#81BE00")}
              >
                CHỌN ĐỊA ĐIỂM NGAY
              </Button>
            </Link>
          </Col>
          <Col className="d-flex align-items-start justify-content-center">
            <Image src={Homepage} alt="Homepage" fluid />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;

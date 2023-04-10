import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container, Button, Col, Row, Image } from "react-bootstrap";

import Homepage from "../../assets/images/homepage.png";

function Home() {
  return (
    <>
      <Header />
      <Container fluid style={{backgroundColor: "#1E1E1E", height: '81vh'}}>
        <Row className="px-5 py-5">
          <Col className="d-flex flex-column align-items-start justify-content-center px-4">
            <p style={{ color: "#FF7E00", fontSize: "125px", fontWeight: 'bold' }}>BKSuggest</p>
            <p className="my-5" style={{ color: "#FFFFFF", fontSize: "28px" }}>
              Bạn đang gặp khó khăn trong quá trình lựa chọn địa điểm ăn uống?
              Đừng lo, vì đã có BKSuggest đây rồi!
            </p>
            <Button
              className="px-5 py-3 fw-bold header-button"
              href={"/"}
              style={{ backgroundColor: "#81BE00", borderRadius: '84px', fontSize: "20px" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#709523")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#81BE00")}
            >
              CHỌN ĐỊA ĐIỂM NGAY
            </Button>
          </Col>
          <Col className="d-flex align-items-start justify-content-center">
            <Image src={Homepage} alt="Homepage" fluid/>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";

function Header() {
  return (
    <>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#D9D9D9" }}
        className="px-4"
      >
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className="cursor-pointer" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <Nav.Item className="m-2 d-flex justify-content-center">
                <Button
                  className="px-4 py-2 fw-bold border-0"
                  style={{ backgroundColor: "#A02F2F" }}
                >
                  WELCOME, USER
                </Button>
              </Nav.Item>
              <Nav.Item className="m-2 d-flex justify-content-center">
                <Button
                  className="px-4 py-2 fw-bold border-0"
                  href={"/"}
                  style={{ backgroundColor: "#A02F2F" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#6F2020")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#A02F2F")
                  }
                >
                  LOGOUT
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

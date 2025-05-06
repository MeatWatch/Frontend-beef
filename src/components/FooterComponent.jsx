import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="footer py-5 bg-danger text-white">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h3 className="fw-bold text-white">
              <img
                src="MeatWatch1(2).png"
                alt="Logo"
                width="25"
                height="25"
                className="d-inline-block align-center me-1"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              WatchMeat.
            </h3>
            <p className="desc text-white-80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="contact mb-1 mt-4">
              <Link className="text-decoration-none text-white-90">
                <i className="fa-brands fa-whatsapp me-2"></i>
                <p className="m-0 d-inline">+62 087-098-980</p>
              </Link>
            </div>
            <div className="contact">
              <Link className="text-decoration-none text-white-90">
                <i className="fa-regular fa-envelope me-2"></i>
                <p className="m-0 d-inline">freshMeat@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold text-white">Menu</h5>
            <Link to="" className="text-white-90 mb-2">
              Home
            </Link>
            <Link to="kelas" className="text-white-90 mb-2">
              Kelas
            </Link>
            <Link to="testimonial" className="text-white-90 mb-2">
              Testimonial
            </Link>
            <Link to="faq" className="text-white-90 mb-2">
              FAQ
            </Link>
            <Link to="syaratketen" className="text-white-90">
              Syarat & Ketentuan
            </Link>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold text-white mb-3">
              Subscribe untuk info Menarik
            </h5>
            <div className="subscribes">
              <input
                type="text"
                id="subscribes"
                className="form-control rounded-0 border-0"
                placeholder="Email Anda..."
              />
              <button className="btn btn-danger rounded-end text-white">
                Subscribe
              </button>
            </div>
            <div className="social mt-4">
              <i className="fab fa-facebook me-3"></i>
              <i className="fab fa-twitter me-3"></i>
              <i className="fab fa-linkedin me-3"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 pt-3">
          <Col>
            <p className="text-center text-white-80">
              &copy; Copyright {new Date().getFullYear()} by{" "}
              <span className="fw-bold text-white">FreshMeat</span>, All Right
              Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;

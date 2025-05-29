import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { semuaKelas } from "../data/index";
import FaqComponent from "../components/FaqComponent";

const KelasPage = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (id) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="kelas-page">
      <div className="kelas min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">
                All List Information{" "}
              </h1>
            </Col>
          </Row>
          <Row>
            {semuaKelas.map((kelas) => {
              return (
                <Col
                  key={kelas.id}
                  className="shadow rounded"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={kelas.delay}
                >
                  <img
                    src={kelas.image}
                    alt="unplash.com"
                    className="w-100 mb-5 rounded-top"
                  />
                  <h5 className="mb-3 px-3">{kelas.title}</h5>
                  <div className="mb-3 px-3">
                    {expandedItem === kelas.id ? kelas.fullBody : kelas.body}
                  </div>
                  <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                    <button
                      className="btn btn-danger rounded-1"
                      onClick={() => toggleExpand(kelas.id)}
                    >
                      {expandedItem === kelas.id ? "Tutup" : kelas.get}
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <FaqComponent />
    </div>
  );
};

export default KelasPage;

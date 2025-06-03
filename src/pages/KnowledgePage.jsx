// pages/KnowledgePage.jsx
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  qualityIndicators,
  storageGuidelines,
  scanGuide,
  scanDisclaimer,
} from "../data/index";
import FaqComponent from "../components/FaqComponent";
import "animate.css";

const KnowledgePage = () => {
  return (
    <div className="knowledge-page  min-vh-100 pt-5">
      {/* Knowledge Content Section */}
      <div className="knowledge-content py-5 bg-light">
        <Container>
          {/* Quality Indicators Section */}
          <Row className="mb-5 animate__animated animate__fadeIn">
            <Col>
              <h2 className="text-center fw-bold mb-4 text-danger animate__animated animate__fadeInUp">
                Indikator Kualitas Daging
              </h2>
              <Row className="g-4">
                {qualityIndicators.map((indicator, index) => (
                  <Col
                    key={index}
                    md={6}
                    className="animate__animated animate__fadeInUp animate__delay-1s"
                  >
                    <Card className="h-100 shadow-sm border-0 animate__animated animate__flipInX">
                      <Card.Header className="bg-danger text-white">
                        <h5 className="mb-0">{indicator.type}</h5>
                      </Card.Header>
                      <Card.Body>
                        <ul className="animate__animated animate__fadeIn animate__delay-1s">
                          {indicator.indicators.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* Storage Guidelines Section */}
          <Row className="animate__animated animate__fadeIn">
            <Col>
              <h2 className="text-center fw-bold mb-4 text-danger animate__animated animate__fadeInUp">
                Panduan Penyimpanan
              </h2>
              <Row className="g-4">
                {storageGuidelines.map((guide, index) => (
                  <Col
                    key={index}
                    md={6}
                    className="animate__animated animate__fadeInUp animate__delay-1s"
                  >
                    <Card className="h-100 shadow-sm border-0 animate__animated animate__flipInY">
                      <Card.Header className="bg-danger text-white">
                        <h5 className="mb-0">{guide.meatType}</h5>
                      </Card.Header>
                      <Card.Body className="animate__animated animate__fadeIn animate__delay-1s">
                        <p>
                          <strong>Kulkas:</strong> {guide.fridge}
                        </p>
                        <p>
                          <strong>Freezer:</strong> {guide.freezer}
                        </p>
                        <p>
                          <strong>Tips:</strong> {guide.tips}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

      {/* Scan Guide Section */}
<Row
  className="mb-5 animate__animated animate__fadeIn"
  style={{ marginTop: "60px" }}
>
  <Col>
    <h2 className="text-center fw-bold mb-4 text-danger animate__animated animate__fadeInUp">
      Cara Menggunakan Fitur Scan
    </h2>
    <Row className="g-4">
      {scanGuide.map((item, index) => (
        <Col
          key={index}
          md={6}
          className="animate__animated animate__fadeInUp animate__delay-1s"
        >
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-white border-0 d-flex align-items-center gap-2">
              <i className={`fas ${item.icon} text-danger`}></i>
              <h5 className="mb-0 fw-bold">{item.step}</h5>
            </Card.Header>
            <Card.Body>
              {Array.isArray(item.description) ? (
                <ul className="mb-0">
                  {item.description.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.description}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Col>
</Row>




          {/* Disclaimer */}
          <Row className="mt-4">
            <Col>
              <div className="p-4 bg-warning-subtle border-start border-5 border-warning rounded shadow-sm">
                <h5 className="fw-bold text-warning">⚠️ Disclaimer:</h5>
                <p className="mb-0">{scanDisclaimer}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* FAQ Section */}
      <FaqComponent />
    </div>
  );
};

export default KnowledgePage;

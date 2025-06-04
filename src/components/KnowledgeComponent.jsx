// components/KnowledgeComponent.js
import { Container, Row, Col, Card } from "react-bootstrap";
import { qualityIndicators, storageGuidelines } from "../data/index";
import "animate.css";

const KnowledgeComponent = () => {
  return (
    <div className="knowledge py-5 bg-light">
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
                  className="animate__animated animate__fadeInUp "
                >
                  <Card className="h-100 shadow-sm border-0 ">
                    <Card.Header className="bg-danger text-white">
                      <h5 className="mb-0">{indicator.type}</h5>
                    </Card.Header>
                    <Card.Body>
                      <ul className="animate__animated animate__fadeIn">
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
        <Row>
          <Col>
            <h2 className="text-center fw-bold mb-4 text-danger ">
              Panduan Penyimpanan
            </h2>
            <Row className="g-4">
              {storageGuidelines.map((guide, index) => (
                <Col key={index} md={6}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-danger text-white">
                      <h5 className="mb-0">{guide.meatType}</h5>
                    </Card.Header>
                    <Card.Body>
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
      </Container>
    </div>
  );
};

export default KnowledgeComponent;

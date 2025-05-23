// components/AboutUsComponent.js
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { teamMembers, meatWatchInfo } from "../data/index";
import "animate.css";

const AboutUsComponent = () => {
  return (
    <div className="about-us py-5 bg-light">
      <Container>
        {/* About Meat Watch Section */}
        <Row className="mb-5 animate__animated animate__fadeIn">
          <Col>
            <h2 className="text-center fw-bold mb-4 text-danger animate__animated animate__fadeInUp animate__delay-1s">
              Tentang Meat Watch
            </h2>
            <Card className="shadow-sm border-0 animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <p className="lead">{meatWatchInfo.about}</p>

                <h5 className="mt-4 text-danger">Fitur Unggulan:</h5>
                <ul className="animate__animated animate__fadeIn animate__delay-2s">
                  {meatWatchInfo.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <h5 className="mt-4 text-danger">Cara Menggunakan:</h5>
                <ol className="animate__animated animate__fadeIn animate__delay-2s">
                  {meatWatchInfo.howToUse.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Vision & Mission Section */}
        <Row className="mb-5 animate__animated animate__fadeIn">
          <Col>
            <h2 className="text-center fw-bold mb-4 text-danger animate__animated animate__fadeInUp">
              Visi & Misi
            </h2>
            <Row className="g-4">
              <Col
                md={6}
                className="animate__animated animate__fadeInLeft animate__delay-1s"
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Header className="bg-danger text-white">
                    <h5 className="mb-0">Visi</h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="lead">
                      "Menjadi platform terdepan dalam memastikan kualitas dan
                      keamanan daging untuk meningkatkan kesehatan masyarakat
                      dan kesadaran akan konsumsi pangan yang berkualitas."
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col
                md={6}
                className="animate__animated animate__fadeInRight animate__delay-1s"
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Header className="bg-danger text-white">
                    <h5 className="mb-0">Misi</h5>
                  </Card.Header>
                  <Card.Body>
                    <ul>
                      <li>
                        Menyediakan teknologi canggih untuk deteksi kualitas
                        daging secara akurat
                      </li>
                      <li>
                        Mengedukasi masyarakat tentang pentingnya konsumsi
                        daging berkualitas
                      </li>
                      <li>
                        Membangun ekosistem yang transparan antara produsen,
                        distributor, dan konsumen
                      </li>
                      <li>
                        Terus berinovasi dalam pengembangan fitur untuk menjawab
                        kebutuhan pasar
                      </li>
                      <li>
                        Mendukung program ketahanan pangan nasional melalui
                        teknologi
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Team Profile Section */}
        <Row className="mb-5 animate__animated animate__fadeIn">
          <Col>
            <h2 className="text-center fw-bold mb-4 text-danger animate__animated animate__fadeInUp">
              Tim Kami
            </h2>
            <Row className="g-4">
              {teamMembers.map((member, index) => (
                <Col
                  key={member.id}
                  lg={4}
                  md={6}
                  className={`animate__animated animate__fadeInUp animate__delay-${
                    (index % 3) + 1
                  }s`}
                >
                  <Card className="h-100 shadow-sm border-0">
                    <div className="text-center pt-4">
                      <Image
                        src={member.image}
                        roundedCircle
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                        alt={member.name}
                        className="border border-danger animate__animated animate__pulse animate__delay-1s"
                      />
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="fw-bold animate__animated animate__fadeIn">
                        {member.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-danger animate__animated animate__fadeIn animate__delay-1s">
                        {member.role}
                      </Card.Subtitle>
                      <Card.Text className="animate__animated animate__fadeIn animate__delay-2s">
                        {member.bio}
                      </Card.Text>

                      {/* Social Media Icons */}
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        {member.socialMedia?.map((social, i) => (
                          <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            {social.platform === "linkedin" && (
                              <i className="fab fa-linkedin fs-4 text-primary"></i>
                            )}
                            {social.platform === "instagram" && (
                              <i className="fab fa-instagram fs-4 text-danger"></i>
                            )}
                            {social.platform === "github" && (
                              <i className="fab fa-github fs-4 text-dark"></i>
                            )}
                            {social.platform === "twitter" && (
                              <i className="fab fa-twitter fs-4 text-info"></i>
                            )}
                          </a>
                        ))}
                      </div>
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

export default AboutUsComponent;

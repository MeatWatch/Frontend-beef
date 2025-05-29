import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/meat3.png";

import { kelasTerbaru, dataSwiper } from "../data/index";
import { useNavigate } from "react-router-dom";
import FaqComponent from "../components/FaqComponent";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import NotificationAlert from "../components/DisclaimerAlert";

const HomePage = () => {
  let navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="homepage">
      {/* Notification di luar container utama agar tidak mengganggu layout */}
      {showNotification && (
        <div className="fixed-top mt-3" style={{ zIndex: 1000 }}>
          <Container>
            <NotificationAlert onClose={() => setShowNotification(false)} />
          </Container>
        </div>
      )}

      <header className="w-100 min-vh-100 d-flex align-item-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Scan <br />
                <span className="text-danger fw-bold">
                  Kesegaran Daging{" "}
                </span>{" "}
                <br />
                Bersama kami!
              </h1>
              <p className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Meat Watch membantu Anda memastikan kesegaran daging melalui
                analisis cerdas berbasis AI. Dapatkan hasil instan dan
                rekomendasi penyimpanan optimal untuk konsumsi yang lebih aman.
              </p>
              <button
                className="btn btn-danger btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s"
                onClick={() => navigate("/scan")}
              >
                Scan disini
              </button>
              <button
                className="btn btn-outline-danger btn-lg rounded-1 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s"
                onClick={() => navigate("/riwayat")}
              >
                Lihat Riwayat
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="beef-img"
                className="animate__animated animate__fadeInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="kelas w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Information List</h1>
            </Col>
          </Row>
          <Row>
            {kelasTerbaru.map((kelas) => {
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
                  <h5 className=" mb-2 px-3">{kelas.title}</h5>
                  <div className="mb-5 px-3">{kelas.body}</div>
                  <div className="ket d-flex justify-content-between align-items-center px-3 pb-3">
                    <button
                      className="btn btn-danger rounded-1"
                      onClick={() => navigate("/kelas")}
                    >
                      {kelas.get}
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="text-center">
              <button
                className="btn btn-danger rounded-5 btn-lg"
                data-aos="fade-up"
                data-aos-duration="1000"
                onClick={() => navigate("/kelas")}
              >
                Lihat Semua <i className="fa-solid fa-chevron-right ms-1"></i>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonial py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold my-5">Feedback</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataSwiper.map((data) => {
                return (
                  <SwiperSlide key={data.id} className="shadow-sm ">
                    <p className="desc">{data.desc}</p>
                    <div className="people">
                      <img src={data.image} alt="" />
                      <div>
                        <h5 className="mb-1">{data.name}</h5>
                        <p className="m-0 fw-bold">{data.skill}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Row>
        </Container>
      </div>

      {/* Section Faq */}
      <FaqComponent />
      {/* Section Faq */}
    </div>
  );
};

export default HomePage;

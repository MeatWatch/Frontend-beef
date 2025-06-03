import { Container, Row, Col } from "react-bootstrap";
import FaqComponent from "../components/FaqComponent";
import AboutUsComponent from "../components/AboutUsComponent";

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section with MeatWatch Logo */}
      <div
        className="hero-section bg-danger text-white py-5"
        style={{ paddingTop: "6rem" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col
              md={6}
              className="text-center text-md-start order-md-1 order-2"
            >
              <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown">
                Tentang Kami
              </h1>
              <p className="lead animate__animated animate__fadeIn animate__delay-1s">
                Meat Watch - Solusi Cerdas untuk Memastikan Kualitas Daging Anda
              </p>
            </Col>
            <Col
              md={6}
              className="text-center animate__animated animate__fadeInRight order-md-2 order-1 mb-4 mb-md-0"
            >
              <img
                src="/MeatWatch1.svg"
                alt="Meat Watch Logo"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="content-section py-5">
        <Container>
          <AboutUsComponent />

          <Row className="mt-5">
            <Col>
              <div className="text-center mb-5">
                <img
                  src="/MeatWatch1.svg"
                  alt="Meat Watch Logo"
                  style={{ height: "80px", marginBottom: "20px" }}
                />
                <h1 className="fw-bold text-center mb-2 animate__animated animate__fadeInUp animate__delay-1s">
                  Syarat & Ketentuan
                </h1>
                <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                  Ketentuan penggunaan platform Meat Watch
                </p>
              </div>
            </Col>
          </Row>

          <Row className="pt-3">
            <Col>
              <p className="animate__animated animate__fadeIn">
                Meat Watch adalah platform inovatif yang membantu Anda memeriksa
                kualitas daging secara real-time. Dengan menggunakan layanan
                kami, Anda menyetujui ketentuan berikut:
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">1. Penggunaan Platform</h4>
              <p>
                Platform Meat Watch ditujukan untuk membantu pengguna dalam
                mengevaluasi kualitas daging berdasarkan analisis gambar. Hasil
                yang diberikan merupakan estimasi berdasarkan algoritma machine
                learning dan tidak menggantikan penilaian profesional.
              </p>
              <p>
                Pengguna bertanggung jawab penuh atas interpretasi dan
                penggunaan hasil analisis. Meat Watch tidak bertanggung jawab
                atas keputusan yang diambil berdasarkan informasi dari platform
                ini.
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">2. Akun Pengguna</h4>
              <p>
                Untuk menggunakan fitur tertentu, pengguna harus membuat akun
                dengan informasi yang valid. Pengguna bertanggung jawab untuk
                menjaga kerahasiaan informasi akun dan semua aktivitas yang
                terjadi dalam akun tersebut.
              </p>
              <p>
                Meat Watch berhak menangguhkan atau menutup akun yang melanggar
                ketentuan penggunaan atau melakukan aktivitas mencurigakan tanpa
                pemberitahuan sebelumnya.
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">3. Privasi dan Data</h4>
              <p>
                Kami menghargai privasi pengguna. Gambar yang diunggah untuk
                analisis akan diproses secara anonim dan tidak akan dibagikan
                kepada pihak ketiga tanpa izin, kecuali diperlukan oleh hukum.
              </p>
              <p>
                Data penggunaan mungkin dikumpulkan untuk tujuan peningkatan
                kualitas layanan, dengan tetap menjaga kerahasiaan informasi
                pribadi pengguna.
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">4. Hak Kekayaan Intelektual</h4>
              <p>
                Seluruh konten, fitur, dan fungsi pada platform Meat Watch
                merupakan hak milik kami dan dilindungi oleh undang-undang hak
                cipta dan kekayaan intelektual yang berlaku.
              </p>
              <p>
                Pengguna dilarang menggunakan, menyalin, atau memodifikasi
                konten kami tanpa izin tertulis.
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">5. Pembaruan Ketentuan</h4>
              <p>
                Kami dapat memperbarui syarat dan ketentuan ini dari waktu ke
                waktu. Perubahan akan diberitahukan melalui platform atau email
                yang terdaftar.
              </p>
              <p>
                Dengan terus menggunakan layanan setelah perubahan diberlakukan,
                Anda dianggap telah menerima ketentuan yang baru.
              </p>
            </Col>
          </Row>

          <Row className="py-3">
            <Col>
              <h4 className="fw-bold">6. Kontak</h4>
              <p>
                Untuk pertanyaan lebih lanjut mengenai syarat dan ketentuan ini,
                silakan hubungi kami melalui:
              </p>
              <ul>
                <li>meatwatchcc25cf130@gmail.com</li>
                <li>Telepon: +62 087-098-980</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <FaqComponent />
    </div>
  );
};

export default AboutUsPage;

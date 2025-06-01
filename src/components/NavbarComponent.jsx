import { useState, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { navLinks } from "../data/index";
import { NavLink, Link, useLocation } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const changeBackgroundColor = () => {
    setChangeColor(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackgroundColor);
    return () => window.removeEventListener("scroll", changeBackgroundColor);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`${
        changeColor ? "navbar-scrolled" : "navbar-transparent"
      } bg-danger`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-white">
          <img
            src="MeatWatch1(2).png"
            alt="Logo"
            width="25"
            height="25"
            className="d-inline-block align-center me-1"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          MeatWatch.
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-white"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
            {navLinks.map((link) => (
              <div className="nav-link" key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-white mx-3 px-3 py-2 rounded ${
                      isActive ? "active-nav-link" : ""
                    } ${
                      location.pathname === "/" && link.path === ""
                        ? "home-hover"
                        : ""
                    }`
                  }
                  end
                >
                  {link.text}
                </NavLink>
              </div>
            ))}
          </Nav>

          <div className="text-center">
            {user ? (
              <NavDropdown
                title={
                  <span className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-1">
                    <Image
                      src={
                        user?.profile_picture
                          ? `http://localhost:3000/images/users/${user.profile_picture}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.username
                            )}&background=dc3545&color=fff&size=120`
                      }
                      roundedCircle
                      width="30"
                      height="30"
                      alt="User Avatar"
                      style={{ objectFit: "cover" }}
                    />

                    <span
                      className="text-white text-truncate ms-2"
                      style={{
                        maxWidth: "120px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.username}
                    </span>
                  </span>
                }
                id="user-dropdown"
                align="end"
                className="text-white"
              >
                <NavDropdown.Item as={Link} to="/scan">
                  Scan
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/riwayat">
                  Riwayat Scan
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profil">
                  Informasi Pengguna
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} className="text-danger">
                  Log Out <IoMdExit />
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link
                to="/login"
                className="btn btn-light text-danger rounded-1 fw-bold"
              >
                Login
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

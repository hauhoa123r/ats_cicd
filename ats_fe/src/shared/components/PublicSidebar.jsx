import { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../app/providers/AuthProvider";
import { NavLink } from "react-router-dom";

const PublicSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const activeStyle = ({ isActive }) =>
    isActive
      ? "fw-semibold px-0 active text-dark border-bottom border-2"
      : "text-secondary";

  //     {
  //     console.log(isActive);

  //     if (isActive) {
  //       return "fw-semibold px-0 active text-dark border-bottom border-2";
  //     }
  //     return "text-secondary";
  //   };


  return (
    <Navbar expand="lg" bg="white" className="border-bottom py-3">
      <Container>
        <Navbar.Brand
          href="#"
          className="d-flex align-items-center fw-bold text-dark gap-2"
        >
          <span
            className="d-inline-flex align-items-center justify-content-center text-white rounded"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#4A3AFF",
            }}
          >
            T
          </span>
          TechCorp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-between">
          <Nav className="mx-auto gap-2">
            <Nav.Link as={NavLink} to="/" className={activeStyle}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/abouts" className={activeStyle}>
              About Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/careers"
              className={activeStyle}
              style={{ borderColor: "#4A3AFF" }}
            >
              Careers
            </Nav.Link>
            <Nav.Link
              href="/culture"
              as={NavLink}
              to="/culture"
              className={activeStyle}
            >
              Culture
            </Nav.Link>
            <Nav.Link
              href="/benefits"
              as={NavLink}
              to="/benefits"
              className="text-secondary"
            >
              Benefits
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user ? (
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user ? user.fullName : "Account"}
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1" as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" as={NavLink} to="/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" as={NavLink} to="/help">
                Help
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={() => logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <>
            <Nav.Link
              as={NavLink}
              to="/login"
              className="text-secondary fw-medium me-3"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/register"
              className="text-white px-3 py-2 rounded-2 fw-medium"
              style={{ backgroundColor: "#4A3AFF" }}
            >
              Sign Up
            </Nav.Link>
          </>
        )}
        {/* <div className="d-flex align-items-center gap-3">
          
          {user ? (
            <span>Welcome, {user.fullName}</span>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" className="text-secondary fw-medium">
                Login
              </Nav.Link>
              <Button
                className="text-white px-4 py-2 rounded-2 fw-medium"
                style={{ backgroundColor: "#4A3AFF" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div> */}
      </Container>
    </Navbar>
  );
};

export default PublicSidebar;

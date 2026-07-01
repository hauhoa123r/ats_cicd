import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Spinner, Form } from "react-bootstrap";
import { PersonCircle, Envelope, ShieldLock, PersonBadge, BoxArrowRight, PencilSquare } from "react-bootstrap-icons";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authService.me();
        const userData = response?.data || response;
        setUser(userData);
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } catch (e) {
        // Parse error
      }
    }

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (loading && !user) {
    return (
      <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" variant="primary" role="status" />
        <span className="ms-3 text-muted fw-medium">Đang tải hồ sơ...</span>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <div className="bg-light p-5 rounded-4 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <ShieldLock size={48} className="text-secondary mb-3" />
          <h4 className="text-dark fw-bold mb-3">Không tìm thấy thông tin</h4>
          <p className="text-muted mb-4">Vui lòng đăng nhập lại để xem hồ sơ của bạn.</p>
          <Button variant="primary" className="px-4 py-2" onClick={() => navigate("/login")}>
            Đăng nhập ngay
          </Button>
        </div>
      </Container>
    );
  }

  const getRoleBadgeColor = (role) => {
    if (role.includes("RECRUITER")) return "primary";
    if (role.includes("CANDIDATE")) return "success";
    if (role.includes("ADMIN")) return "danger";
    return "secondary";
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Hồ sơ của tôi</h2>
        <p className="text-muted">Quản lý thông tin cá nhân và tài khoản của bạn</p>
      </div>

      <Row className="g-4">
        {/* Cột trái: Ảnh đại diện & Thông tin nhanh */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 h-100 rounded-4">
            <Card.Body className="text-center p-4">
              <div className="mb-4 d-flex justify-content-center">
                <div className="bg-light rounded-circle p-4 d-inline-block text-primary shadow-sm">
                  <PersonCircle size={80} />
                </div>
              </div>
              <h4 className="fw-bold mb-1 text-dark">{user.fullName || "Người dùng"}</h4>
              <p className="text-muted mb-3">{user.email}</p>
              
              <div className="mb-4">
                {(user.roles || []).map((role, idx) => (
                  <Badge 
                    key={idx} 
                    bg={getRoleBadgeColor(role)} 
                    className="me-1 px-3 py-2 rounded-pill fw-medium"
                  >
                    {role.replace("ROLE_", "")}
                  </Badge>
                ))}
                {(!user.roles || user.roles.length === 0) && (
                  <Badge bg="secondary" className="px-3 py-2 rounded-pill fw-medium">USER</Badge>
                )}
              </div>

              <div className="d-grid gap-3 mt-4">
                <Button variant="outline-primary" className="d-flex align-items-center justify-content-center py-2 rounded-3 fw-medium">
                  <PencilSquare className="me-2" /> Chỉnh sửa hồ sơ
                </Button>
                <Button variant="light" onClick={handleLogout} className="d-flex align-items-center justify-content-center py-2 rounded-3 text-danger fw-medium border">
                  <BoxArrowRight className="me-2" /> Đăng xuất
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Cột phải: Form thông tin chi tiết */}
        <Col lg={8}>
          <Card className="shadow-sm border-0 rounded-4 h-100">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
              <h5 className="fw-bold mb-0 text-dark">Thông tin chi tiết</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Form>
                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold text-uppercase d-flex align-items-center mb-2">
                        <PersonBadge className="me-2 text-primary" />
                        Họ và tên
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        value={user.fullName || ""} 
                        readOnly 
                        className="bg-light border-0 py-2 px-3 fw-medium text-dark"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold text-uppercase d-flex align-items-center mb-2">
                        <Envelope className="me-2 text-primary" />
                        Địa chỉ Email
                      </Form.Label>
                      <Form.Control 
                        type="email" 
                        value={user.email || ""} 
                        readOnly 
                        className="bg-light border-0 py-2 px-3 fw-medium text-dark"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="text-muted small fw-bold text-uppercase d-flex align-items-center mb-2">
                        <ShieldLock className="me-2 text-primary" />
                        Vai trò hệ thống
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        value={(user.roles || []).join(', ')} 
                        readOnly 
                        className="bg-light border-0 py-2 px-3 fw-medium text-dark"
                      />
                      <Form.Text className="text-muted mt-2 d-block">
                        Vai trò quyết định quyền hạn của bạn trên hệ thống. Nếu bạn muốn thay đổi vai trò, vui lòng liên hệ quản trị viên.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;

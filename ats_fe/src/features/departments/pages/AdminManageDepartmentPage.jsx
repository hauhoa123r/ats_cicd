import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import DepartmentLogo from "../components/DepartmentLogo";
import { useForm } from "react-hook-form";
import departmentService from "../services/department.service";
import CustomPagination from "@/shared/components/CustomPagination";

const AdminManageDepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      departmentName: "",
      description: "",
    },
    mode: "onSubmit",
    criteriaMode: "all",
  });

  useEffect(() => {
    async function loadDepartments() {
      await fetchDepartments(currentPage);
    }
    loadDepartments();
  }, [currentPage]);

  async function fetchDepartments(currentPage) {
    try {
      const response = await departmentService.findDepartmentsByPage({
        page: currentPage - 1,
        size: 5,
      });
      setDepartments(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);

      console.log("Fetched departments:", response.data.totalPages);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setMessage(
        `Failed to fetch departments. Please try again later: ${error.message}`,
      );
    }

    // Fetch departments using the service and handle errors
    // departmentService.getDepartments()
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => setDepartments(data))
    //   .catch((error) => {
    //     console.error("Error fetching departments:", error);
    //     setMessage(
    //       `Failed to fetch departments. Please try again later: ${error.message}`,
    //     );
    //   });
  }

  // Filter inline theo keyword (suy ra từ state, không cần useMemo)

  const q = keyword.trim().toLowerCase();
  const visibleDepartments = q
    ? departments.filter(
        (d) =>
          d.departmentName?.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q) ||
          d.manager?.toLowerCase().includes(q),
      )
    : departments;

  const renderStatusBadge = (status) => {
    const bg = status === "ACTIVE" ? "success" : "secondary";
    return (
      <Badge bg={bg} className="rounded-pill px-3 py-2">
        {status}
      </Badge>
    );
  };

  const handleOnSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await departmentService.createDepartment(data);

      console.log("Department created successfully:", response.data.message);
      setMessage(response.data.message || "Department created successfully!");
    } catch (error) {
      console.error("Error creating department:", error);
      setMessage(`Failed to create department. Please try again later: ${error.message}`
      );
      setIsError(true);
    }
  };

  const handleShowModalToEdit = async (department) => {
    console.log("Selected department:", department);
    try {
      const response = await departmentService.findById(department.id);

      const departmentData = response.data;

      console.log("Department data to edit:", departmentData);

      // Set default values for the form fields
      reset({
        id: departmentData.id,
        departmentName: departmentData.departmentName,
        description: departmentData.description,
      });

      setSelectedDepartment(department);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching department details:", error);
      setMessage(
        `Failed to fetch department details. Please try again later: ${error.message}`,
      );
    }
  };

  const handleDelete = async () => {
    try {
      await departmentService.deleteDepartment(selectedDepartment.id);
      alert("Department deleted successfully!");
      // Refresh the department list after deletion
      setIsDeleting(true);

      setTimeout(async () => {
        setIsDeleting(false);
        await fetchDepartments(currentPage);
      }, 1000);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <Container className="py-4">
      <div className="bg-white rounded-3 shadow-sm border p-3 mb-4">
        <InputGroup>
          <InputGroup.Text className="bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            className="border-start-0 shadow-none"
            placeholder="Search department by name, manager, or description..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div className="d-flex align-items-center gap-2">
          <h3 className="m-0 fw-bold text-dark">Departments</h3>
          {message && <span className="text-danger small">{message}</span>}
          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              backgroundColor: "#eef2ff",
              color: "#4f46e5",
              border: "1px solid #c7d2fe",
              fontWeight: 600,
            }}
          >
            {visibleDepartments.length} departments
          </span>
        </div>
        <Button
          className="rounded-pill px-4 py-2 fw-semibold border-0 text-white"
          style={{ backgroundColor: "#4A3AFF" }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Department
        </Button>
      </div>

      <div className="bg-white rounded-3 shadow-sm overflow-hidden">
        <Table responsive bordered hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th className="px-4 py-3" style={{ width: "80px" }}>
                #
              </th>
              <th className="py-3" style={{ width: "90px" }}>
                Logo
              </th>
              <th className="py-3">Name</th>
              <th className="py-3">Description</th>
              <th className="py-3">Manager</th>
              <th className="py-3" style={{ width: "130px" }}>
                Status
              </th>
              <th
                className="py-3 text-center text-nowrap"
                style={{ width: "220px" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleDepartments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted py-5">
                  No departments match your search.
                </td>
              </tr>
            ) : (
              visibleDepartments.map((dept, index) => (
                <tr key={dept.id}>
                  <td className="px-4 fw-semibold text-muted">{index + 1}</td>
                  <td>
                    <DepartmentLogo
                      url={dept.logoUrl}
                      alt={dept.departmentName}
                    />
                  </td>
                  <td className="text-dark">{dept.departmentName}</td>
                  <td className="text-dark">{dept.description}</td>
                  <td>{dept.manager}</td>
                  <td>{renderStatusBadge(dept.status)}</td>
                  <td className="text-center text-nowrap">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2 rounded-pill px-3"
                      onClick={() => handleShowModalToEdit(dept)}
                    >
                      <i className="bi bi-pencil-square me-1"></i>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="rounded-pill px-3"
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="bi bi-trash3 me-1"></i>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-start mt-3">
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete: {selectedDepartment?.departmentName}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleDelete();
              setShowDeleteModal(false);
            }}
          >
            Yes
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Department Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isError && <div className="alert alert-danger">{message}</div>}
          {!isError && message && (
            <div className="alert alert-success">{message}</div>
          )}

          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form.Group className="mb-3" controlId="departmentName">
              <Form.Control type="hidden" {...register("id")} />
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                {...register("departmentName", {
                  required: "Department name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message:
                      "Department name can only contain letters, numbers, and spaces",
                  },
                })}
                placeholder="Enter Department Name"
              />
              <Form.Text className="text-muted">
                Department name should be unique and descriptive to easily
                identify the department's function and role within the
                organization.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter Department Description"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">
              Submit
            </Button>
            <Button
              variant="warning"
              type="button"
              className="me-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminManageDepartmentPage;

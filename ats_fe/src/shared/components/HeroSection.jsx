import React from "react";
import { Form } from "react-bootstrap";

const HeroSection = ({ keyword, dispatch, setKeyword, departments, locations, jobTypes }) => {
  return (
    <div
      className="position-relative text-white pt-3 py-2 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #4A3AFF 100%)",
      }}
    >
      <div className="container position-relative text-center my-4 z-index-1">
        <h1 className="display-4 fw-bold mb-3">Join Our Team</h1>
        <p className="text-white-50 fs-5 mb-4">
          Discover exciting opportunities and build your career with us
          <br/>
          Chào mừng đến với chúng tôi - Nơi bạn có thể khám phá những cơ hội thú vị và xây dựng sự nghiệp của mình cùng chúng tôi
        </p>

        <div
          className="mx-auto bg-white rounded-pill shadow p-2 d-flex align-items-center mb-4"
          style={{ width: "650px" }}
        >
          <div className="d-flex align-items-center px-3 flex-grow-1 text-muted">
            <i className="bi bi-search me-2"></i>
            <input
              type="text"
              className="form-control border-0 bg-transparent p-2 text-dark shadow-none"
              placeholder="Search by job title, skill or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button
            className="btn rounded-pill px-4 py-2 text-white fw-medium"
            style={{ backgroundColor: "#4A3AFF" }}
            onClick={() => {dispatch({type: "SET_KEYWORD", payload: keyword})}}
          >
            Search
          </button>
        </div>
        <div className=" row">
        
          <div className="col-md-4 d-flex align-items-center gap-2">
            <Form.Select aria-label="Default select example" onChange={(e) => dispatch({type: "SET_DEPARTMENT", payload: e.target.value})}>
              <option value="ALL">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.departmentName}
                </option>
              ))}
            </Form.Select>
          </div>

           <div className="col-md-4 d-flex align-items-center gap-2">
            <Form.Select aria-label="Default select example" onChange={(e) => dispatch({type: "SET_LOCATION", payload: e.target.value})}>
              <option value="ALL">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </div>

           <div className="col-md-4 d-flex align-items-center gap-2">
            <Form.Select aria-label="Default select example" onChange={(e) => dispatch({type: "SET_JOB_TYPE", payload: e.target.value})}>
              <option value="ALL">All Types</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
              <option value="3">Three</option>
            </Form.Select>
          </div>

          {/* {["All Departments", "All Locations", "All Types"].map(
            (filter, index) => (
              <button
                key={index}
                className="btn border border-white border-opacity-25 text-white rounded-3 px-4 py-2 dropdown-toggle d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(5px)",
                }}
              >
                {filter}
              </button> */}
          {/* ),
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

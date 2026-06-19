package org.ats.features.department.service;

import org.ats.features.department.dto.DepartmentDto;
import org.ats.features.department.dto.PageResponse;
import org.ats.features.entities.Department;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DepartmentService {
    Long create(DepartmentDto departmentRequest);
    Department update(DepartmentDto departmentRequest);

    Department findById(Long id);
    PageResponse<DepartmentDto> findAll(Integer size, Integer index);

    void delete(Long departmentId);

    List<DepartmentDto> findAll();
}

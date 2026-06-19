package org.ats.features.department.mapper;

import org.ats.features.department.dto.DepartmentDto;
import org.ats.features.entities.Department;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartmentMapper {
    List<DepartmentDto> toResponse(List<Department> departments);
}

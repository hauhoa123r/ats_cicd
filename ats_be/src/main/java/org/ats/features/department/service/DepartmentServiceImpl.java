package org.ats.features.department.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.ats.exception.DepartmentInvalidException;
import org.ats.features.department.dto.DepartmentDto;
import org.ats.common.dto.PageResponse;
import org.ats.features.department.mapper.DepartmentMapper;
import org.ats.features.department.repository.DepartmentRepository;
import org.ats.entities.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentMapper departmentMapper;
    private final DepartmentRepository departmentRepository;

    @Transactional
    @Override
    public Long create(DepartmentDto departmentRequest) {
        //Validate
        if (departmentRepository.existsByDepartmentName(departmentRequest.getDepartmentName())) {
            throw new DepartmentInvalidException("Department name is existing!"); // Checked - compile-time
        }

        return departmentRepository.save(fromDto(departmentRequest)).getId();
    }

    @Transactional
    @Override
    public Department update(DepartmentDto departmentRequest) {
        Department department = departmentRepository.findByDepartmentName(departmentRequest.getDepartmentName());

        if ((department != null) && (department.getId() != departmentRequest.getId())) {
            throw new DepartmentInvalidException("Department name is existing!");
        }

        return departmentRepository.save(fromDto(departmentRequest));
    }

    @Override
    public Department findById(Long id) {
        return departmentRepository.findById(id).orElseThrow(() -> {
            return new DepartmentInvalidException("Department not found!");
        });
    }

    @Override
    @Transactional
    public PageResponse<DepartmentDto> findAll(Integer size, Integer index) {
        Pageable pageable = PageRequest.of(index, size, Sort.by(Sort.Direction.ASC, "departmentName"));
        Page<Department> page = departmentRepository.findAll(pageable);

        List<DepartmentDto> departmentDtos = page.getContent().stream().map((department -> {
            return DepartmentDto.builder()
                    .id(department.getId())
                    .departmentName(department.getDepartmentName())
                    .description(department.getDescription())
                    .build();
        })).collect(Collectors.toList());

        PageResponse<DepartmentDto> pageResponse = new PageResponse<>();
        pageResponse.setCurrentPage(page.getNumber());
        pageResponse.setTotalPages(page.getTotalPages());
        pageResponse.setContent(departmentDtos);

//                PageResponse.builder()
//                .currentPage(page.getNumber())
//                .totalPage(page.getTotalPages())
//                .departments()

        return pageResponse;
    }

    @Override
    public void delete(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(() -> {
            return new EntityNotFoundException("Department not found!");
        });

        departmentRepository.delete(department);
    }

    @Override
    public List<DepartmentDto> findAll() {

        return departmentMapper.toResponse(departmentRepository.findAll());
    }

    private Department fromDto(DepartmentDto departmentRequest) {
        return Department.builder()
                .id(departmentRequest.getId())
                .departmentName(departmentRequest.getDepartmentName())
                .description(departmentRequest.getDescription())
                .build();

    }
}

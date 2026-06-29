package org.ats.features.department.controller;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.ats.features.department.dto.DepartmentDto;
import org.ats.common.dto.PageResponse;
import org.ats.features.department.service.DepartmentService;
import org.ats.utils.ApiPath;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController // Spring Bean --> Container
@RequestMapping(ApiPath.DEPARTMENTS)
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<PageResponse<DepartmentDto>> getDepartment(@RequestParam(name = "pageIndex", required = false, defaultValue = "0") Integer pageIndex,
                                                                     @RequestParam(name = "pageSize", required = false, defaultValue = "5") Integer pageSize
    ) {
        PageResponse<DepartmentDto> page = departmentService.findAll(pageSize, pageIndex);

        return ResponseEntity.ok(page);
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> create(@RequestBody @Valid DepartmentDto departmentRequest,
                                    BindingResult bindingResult
    ) {
        departmentService.create(departmentRequest);

        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getFieldError().getDefaultMessage());
        }

        return ResponseEntity.ok(Map.of("message", "Create a new department successful!"));
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        departmentService.delete(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/public/all")
    public List<DepartmentDto> getAllDepartments() {
        return departmentService.findAll();
    }

}

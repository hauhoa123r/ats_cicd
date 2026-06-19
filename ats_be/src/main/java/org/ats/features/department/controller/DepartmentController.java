package org.ats.features.department.controller;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.ats.features.department.dto.DepartmentDto;
import org.ats.features.department.dto.PageResponse;
import org.ats.features.department.service.DepartmentService;
import org.ats.utils.ApiPath;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController // Spring Bean --> Container
@RequestMapping(ApiPath.DEPARTMENTS)
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<PageResponse<DepartmentDto>> getDepartment(@RequestParam(name = "pageIndex", required = false, defaultValue = "0") Integer pageIndex,
                                                                     @RequestParam(name = "pageSize", required = false, defaultValue = "5") Integer pageSize
    ) {
        PageResponse<DepartmentDto> page = departmentService.findAll(pageSize, pageIndex);

        return ResponseEntity.ok(page);
    }

    @PostMapping
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
    public ResponseEntity<?> delete(@PathVariable Long id) {
        departmentService.delete(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public List<DepartmentDto> getAllDepartments() {
        return departmentService.findAll();
    }

}

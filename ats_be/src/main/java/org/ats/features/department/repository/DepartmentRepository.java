package org.ats.features.department.repository;

import org.ats.features.department.dto.DepartmentResponse;
import org.ats.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    boolean existsByDepartmentName(String name);

    Department findByDepartmentName(String name);
    @Query(nativeQuery = false, value = "SELECT new org.ats.features.department.dto.DepartmentResponse(d.departmentName, COUNT(u)) " +
            "FROM Department d LEFT JOIN d.users u GROUP BY d.departmentName")
    List<DepartmentResponse> amountUserByDepartment();
}

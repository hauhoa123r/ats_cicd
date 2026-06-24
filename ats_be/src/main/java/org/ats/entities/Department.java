package org.ats.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "departments")
@NoArgsConstructor@AllArgsConstructor
@Setter@Getter
@ToString(exclude = {"users", "jobs"})
@Builder
public class Department extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", unique = true,nullable = false,
            columnDefinition = "VARCHAR(255)")
    private String departmentName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Override
    public boolean equals(Object o) {
        System.out.println("Equals method!");
        if (o == null || getClass() != o.getClass()) return false;
        Department that = (Department) o;
        return Objects.equals(id, that.id) && Objects.equals(departmentName, that.departmentName) && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, departmentName, description);
    }

    // List or Set
    @OneToMany(mappedBy = "department")
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "department")
    private Set<Job> jobs = new HashSet<>();
}

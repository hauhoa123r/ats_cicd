package org.ats.features.jobs.specification;

import jakarta.persistence.criteria.Predicate;
import org.ats.entities.Job;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class JobSpecification {
    public static Specification<Job> getSpecification(String keyword, Long departmentId, String location, String jobType) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.trim().isEmpty()) {
                String likeKeyword = "%" + keyword.trim().toLowerCase() + "%";
                Predicate keywordPre = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likeKeyword);
                predicates.add(keywordPre);
            }
            if (departmentId != null) {
                Predicate departmentPre = criteriaBuilder.equal(root.get("department").get("id"), departmentId);
                predicates.add(departmentPre);
            }

            if (location != null && !location.trim().isEmpty()) {
                String likeLocation = "%" + location.trim().toLowerCase() + "%";
                Predicate locationPre = criteriaBuilder.like(criteriaBuilder.lower(root.get("location")), likeLocation);
                predicates.add(locationPre);
            }

            if (jobType != null && !jobType.trim().isEmpty()) {
                String likeJobType = "%" + jobType.trim().toLowerCase() + "%";
                Predicate jobTypePre = criteriaBuilder.like(criteriaBuilder.lower(root.get("employmentType")), likeJobType);
                predicates.add(jobTypePre);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

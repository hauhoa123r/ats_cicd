package org.ats.features.jobs.specification;

import jakarta.persistence.criteria.Predicate;
import org.ats.features.entities.Job;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class JobSpecification {
    public static Specification<Job> getSpecification(String keyword, Long departmentId, String location, String jobType) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null) {
                Predicate keywordPre = criteriaBuilder.like(root.get("title"), keyword);
                predicates.add(keywordPre);
            }
            if (departmentId != null) {
                Predicate departmentPre = criteriaBuilder.equal(root.get("department"), departmentId);
                predicates.add(departmentPre);
            }

            if (location != null) {
                Predicate locationPre = criteriaBuilder.like(root.get("location"), location);
                predicates.add(locationPre);
            }

            if (jobType != null) {
                Predicate jobTypePre = criteriaBuilder.like(root.get("jobType"), jobType);
                predicates.add(jobTypePre);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };
    }
}

package org.ats.features.jobs.service;

import lombok.RequiredArgsConstructor;
import org.ats.common.dto.PageResponse;
import org.ats.entities.Job;
import org.ats.features.jobs.dto.JobResponse;
import org.ats.features.jobs.dto.JobSearchCriteria;
import org.ats.features.jobs.repository.JobRepository;
import org.ats.features.jobs.specification.JobSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository repository;

    @Override
    public PageResponse<JobResponse> findAll(JobSearchCriteria criteria, Integer size, Integer index) {
        Pageable pageable = PageRequest.of(index, size);

        Specification<Job> spec = JobSpecification.getSpecification(
                criteria.getKeyword(),
                criteria.getDepartmentId(),
                criteria.getLocation(),
                criteria.getJobType()
        );

        Page<Job> jobPage = repository.findAll(spec, pageable);

        return PageResponse.<JobResponse>builder()
                .currentPage(jobPage.getNumber())
                .totalPages(jobPage.getTotalPages())
                .content(jobPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList()))
                .build();
    }

    private JobResponse mapToResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .category(job.getDepartment() != null ? job.getDepartment().getDepartmentName() : null)
                .departmentId(job.getDepartment() != null ? job.getDepartment().getId() : null)
                .location(job.getLocation())
                .salaryMin(job.getSalaryMin())
                .salaryMax(job.getSalaryMax())
                .salary(job.getSalaryMin() + " - " + job.getSalaryMax() + " VND")
                .skills(job.getJobSkills() != null ? 
                        job.getJobSkills().stream().map(js -> js.getSkill().getSkillName()).collect(Collectors.toList()) 
                        : null)
                .employmentType(job.getEmploymentType())
                .status(job.getStatus())
                .description(job.getDescription())
                .publishedAt(job.getPublishedAt() != null ? job.getPublishedAt().toString() : null)
                .deadline(job.getDeadline() != null ? job.getDeadline().toString() : null)
                .build();
    }
}

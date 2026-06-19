package org.ats.features.jobs.service;

import lombok.RequiredArgsConstructor;
import org.ats.features.department.dto.PageResponse;
import org.ats.features.jobs.dto.JobResponse;
import org.ats.features.jobs.dto.JobSearchCriteria;
import org.ats.features.jobs.repository.JobRepository;
import org.ats.features.jobs.specification.JobSpecification;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements  JobService {
    private  final JobRepository repository;

    @Override
    public PageResponse<JobResponse> findAll(JobSearchCriteria jobSearchCriteria, Integer size, Integer index) {
        Pageable pageable = PageRequest.of(index, size);

//        repository.findAll(JobSpecification.getSpecification())


        return null;
    }
}

package org.ats.features.jobs.service;

import org.ats.common.dto.PageResponse;
import org.ats.features.jobs.dto.JobResponse;
import org.ats.features.jobs.dto.JobSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface JobService {
    PageResponse<JobResponse> findAll(JobSearchCriteria jobSearchCriteria, Integer size, Integer index);
}

package org.ats.features.jobs.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobSearchCriteria {
    private String keyword;
    private Long departmentId;
    private String location;
    private String jobType;
}

package org.ats.features.jobs.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String category; // maps to department name
    private Long departmentId;
    private String location;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String salary;
    private List<String> skills;
    private String employmentType;
    private String status;
    private String description;
    private String publishedAt;
    private String deadline;
    private Integer numberOfApplicants;
    private Integer numberOfFavourites;
}

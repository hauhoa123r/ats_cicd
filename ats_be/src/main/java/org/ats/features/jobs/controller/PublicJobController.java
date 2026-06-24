package org.ats.features.jobs.controller;

import lombok.RequiredArgsConstructor;
import org.ats.common.dto.PageResponse;
import org.ats.features.jobs.dto.JobResponse;
import org.ats.features.jobs.dto.JobSearchCriteria;
import org.ats.features.jobs.service.JobService;
import org.ats.utils.ApiPath;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPath.PUBLIC_JOBS)
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend to call
public class PublicJobController {

    private final JobService jobService;

    @GetMapping("/search")
    public ResponseEntity<PageResponse<JobResponse>> searchJobs(
            @ModelAttribute JobSearchCriteria criteria,
            @RequestParam(defaultValue = "0") Integer index,
            @RequestParam(defaultValue = "10") Integer size) {
        
        PageResponse<JobResponse> response = jobService.findAll(criteria, size, index);
        return ResponseEntity.ok(response);
    }
}

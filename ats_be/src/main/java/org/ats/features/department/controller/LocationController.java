package org.ats.features.department.controller;

import lombok.extern.slf4j.Slf4j;
import org.ats.utils.ApiPath;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiPath.LOCATIONS)
@Slf4j
public class LocationController {
    @Value("#{'${locations}'.split(',')}") // SpEL
    private List<String> locations;

    @GetMapping("/public")
    public List<String> getLocations() {
        log.info("Getting locations {}", locations);
        return locations;
    }
}

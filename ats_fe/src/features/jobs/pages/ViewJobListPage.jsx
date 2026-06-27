import React, { useEffect, useState } from "react";
import HeroSection from "@/shared/components/HeroSection";
import ViewJobListPosting from "./ViewJobListPosting";
import jobService from "../services/job.service";
import useJobFilter from "../hooks/useJobFilter";
import departmentService from "@/features/departments/services/department.service";

const ViewJobListPage = () => {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { filters, dispatch } = useJobFilter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await jobService.findAll();
        const locationRes = await jobService.getLocations();
        const departmentRes = await departmentService.findAllDepartments();
        const jobTypesRes = await jobService.getJobTypes();

        setLocations(locationRes.data);
        setDepartments(departmentRes.data);
        setJobTypes(jobTypesRes);
        setJobs(response);
        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  console.log("filters", filters);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const response = await jobService.search(filters);
        // Depending on PageResponse structure, set data properly
        // Assume response contains .content if it's a PageResponse from backend
        setJobs(response.content || response);
      } catch (error) {
        console.error("Error searching jobs:", error);
        // Fallback to static data if backend is not ready
        setJobs([]);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filters]);

  return (
    <>
      <HeroSection
        keyword={keyword}
        dispatch={dispatch}
        setKeyword={setKeyword}
        departments={departments}
        locations={locations}
        jobTypes={jobTypes}
      />
      <ViewJobListPosting jobs={jobs} />
    </>
  );
};

export default ViewJobListPage;

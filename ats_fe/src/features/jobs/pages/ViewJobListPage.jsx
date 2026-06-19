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
    const timeoutId = setTimeout(() => {
      if (!keyword) {
        setSearchResults(jobs);
        return;
      }

      const lowerQuery = keyword.trim().toLowerCase();

      setSearchResults(
        jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(lowerQuery) ||
            j.category.toLowerCase().includes(lowerQuery) ||
            j.skills.some((s) => s.toLowerCase().includes(lowerQuery)),
        ),
      );
    }, 500);

    return () => {
      // Clear the timeout if the component unmounts or keyword changes before the timeout completes
      clearTimeout(timeoutId);
    };
  }, [keyword, jobs]);

  // Áp dụng filters vào searchResults (đã được debounce theo keyword)
  let visibleJobs = searchResults;
  if (filters.department !== "ALL") {
    visibleJobs = visibleJobs.filter((j) => j.category === filters.department);
  }
  if (filters.location !== "ALL") {
    visibleJobs = visibleJobs.filter((j) => j.location === filters.location);
  }
  if (filters.jobType !== "ALL") {
    visibleJobs = visibleJobs.filter(
      (j) => j.employmentType === filters.jobType,
    );
  }

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
      <ViewJobListPosting jobs={visibleJobs} />
    </>
  );
};

export default ViewJobListPage;

import axiosClient from "@/shared/services/axiosClient";
const jobs = [
    {
        id: 1,
        title: "Senior Java Developer",
        category: "Engineering",
        departmentId: 1,
        location: "Ho Chi Minh City, Vietnam",
        salaryMin: 30000000,
        salaryMax: 50000000,
        salary: "30,000,000 - 50,000,000 VND",
        skills: ["Java", "Spring Boot", "PostgreSQL"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Design, develop, and maintain high-quality Java applications using Spring Boot framework. Collaborate with teams to deliver scalable enterprise solutions.",
        requirements: [
            "Bachelor's degree in Computer Science or related field",
            "5+ years of Java development experience",
            "Strong knowledge of Spring Boot, REST APIs, and microservices",
            "Experience with PostgreSQL/MySQL and JPA/Hibernate"
        ],
        publishedAt: "2026-05-23",
        deadline: "2026-06-30",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 2,
        title: "UI/UX Designer",
        category: "Design",
        departmentId: 2,
        location: "Ho Chi Minh City, Vietnam",
        salaryMin: 18000000,
        salaryMax: 30000000,
        salary: "18,000,000 - 30,000,000 VND",
        skills: ["Figma", "UX Research", "Prototyping"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Create intuitive and visually stunning user interfaces. Conduct user research and usability testing to deliver delightful product experiences.",
        requirements: [
            "Bachelor's degree in Design or related field",
            "3+ years of UI/UX design experience",
            "Proficiency in Figma, Sketch, or Adobe XD",
            "Strong portfolio showcasing web and mobile design"
        ],
        publishedAt: "2026-05-20",
        deadline: "2026-06-25",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 3,
        title: "DevOps Engineer",
        category: "Engineering",
        departmentId: 1,
        location: "Ha Noi, Vietnam",
        salaryMin: 25000000,
        salaryMax: 45000000,
        salary: "25,000,000 - 45,000,000 VND",
        skills: ["Docker", "K8s", "AWS", "Terraform"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability and scalability across production environments.",
        requirements: [
            "3+ years of DevOps or SRE experience",
            "Hands-on with Docker, Kubernetes, and Terraform",
            "Strong experience with AWS or GCP",
            "Solid scripting skills (Bash, Python)"
        ],
        publishedAt: "2026-05-18",
        deadline: "2026-06-20",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 4,
        title: "Product Manager",
        category: "Product Management",
        departmentId: 3,
        location: "Ho Chi Minh City, Vietnam",
        salaryMin: 35000000,
        salaryMax: 55000000,
        salary: "35,000,000 - 55,000,000 VND",
        skills: ["Agile", "Jira", "Roadmap"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Define product vision, roadmap, and strategy. Work closely with engineering and design teams to deliver impactful features for our users.",
        requirements: [
            "5+ years of product management experience",
            "Strong understanding of Agile/Scrum methodologies",
            "Excellent communication and stakeholder management skills",
            "Data-driven mindset with analytical skills"
        ],
        publishedAt: "2026-05-22",
        deadline: "2026-06-28",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 5,
        title: "Digital Marketing Specialist",
        category: "Marketing",
        departmentId: 4,
        location: "Remote",
        salaryMin: 15000000,
        salaryMax: 25000000,
        salary: "15,000,000 - 25,000,000 VND",
        skills: ["SEO", "Google Ads", "Analytics"],
        employmentType: "Contract",
        status: "PUBLISHED",
        description: "Plan and execute digital marketing campaigns across multiple channels including SEO, SEM, social media, and email marketing.",
        requirements: [
            "2+ years of digital marketing experience",
            "Hands-on experience with Google Ads and Analytics",
            "Strong understanding of SEO best practices",
            "Excellent written communication skills"
        ],
        publishedAt: "2026-05-24",
        deadline: "2026-06-15",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 6,
        title: "Data Analyst",
        category: "Analytics",
        departmentId: 5,
        location: "Ho Chi Minh City, Vietnam",
        salaryMin: 20000000,
        salaryMax: 35000000,
        salary: "20,000,000 - 35,000,000 VND",
        skills: ["SQL", "Python", "Power BI"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Analyze business data, build dashboards, and provide actionable insights to support decision-making across the organization.",
        requirements: [
            "2+ years of data analytics experience",
            "Strong SQL and Python skills",
            "Experience with Power BI or Tableau",
            "Good business acumen and storytelling skills"
        ],
        publishedAt: "2026-05-21",
        deadline: "2026-06-22",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 7,
        title: "Frontend Developer (ReactJS)",
        category: "Engineering",
        departmentId: 1,
        location: "Da Nang, Vietnam",
        salaryMin: 20000000,
        salaryMax: 35000000,
        salary: "20,000,000 - 35,000,000 VND",
        skills: ["ReactJS", "TypeScript", "Redux"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Build modern, responsive web applications using ReactJS. Collaborate with designers and backend engineers to deliver high-quality user experiences.",
        requirements: [
            "3+ years of frontend development experience",
            "Strong ReactJS and TypeScript skills",
            "Familiar with Redux, React Query, and modern build tools",
            "Good eye for UI/UX details"
        ],
        publishedAt: "2026-05-19",
        deadline: "2026-06-26",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    },
    {
        id: 8,
        title: "Senior Data Scientist",
        category: "Data Science",
        departmentId: 5,
        location: "Ho Chi Minh City, Vietnam",
        salaryMin: 40000000,
        salaryMax: 65000000,
        salary: "40,000,000 - 65,000,000 VND",
        skills: ["Python", "Machine Learning", "TensorFlow"],
        employmentType: "Full-time",
        status: "PUBLISHED",
        description: "Develop machine learning models to solve complex business problems. Work with large datasets to extract insights and drive product innovation.",
        requirements: [
            "Master's degree in Data Science, Statistics, or related field",
            "5+ years of ML/Data Science experience",
            "Proficiency in Python, TensorFlow, or PyTorch",
            "Solid foundation in statistics and ML algorithms"
        ],
        publishedAt: "2026-05-17",
        deadline: "2026-07-05",
        numberOfApplicants: 0,
        numberOfFavourites: 0
    }
];

const locations = [
    "Ho Chi Minh City, Vietnam",
    "Ha Noi, Vietnam",
    "Da Nang, Vietnam",
    "Remote"
];

const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship"
];

const jobService = {
    findAll: async () => {
        return jobs;
    },
    findById: async (id) => {
        return jobs.find((j) => j.id === Number(id));
    },
    addToMyFavourite: async (id) => {
        const stored = JSON.parse(localStorage.getItem("favouriteJobs") || "[]");
        localStorage.setItem("favouriteJobs", JSON.stringify([...stored, id]));
    },
    viewMyFavourite: async () => {
        const ids = JSON.parse(localStorage.getItem("favouriteJobs") || "[]");
        return jobs.filter((j) => ids.includes(j.id));
    },
    getDepartments: () => {

        return fetch("http://localhost:8080/departments");
    },
    getLocations: async () => {
        return axiosClient.get("/api/v1/locations/public");
    },
    getJobTypes: async () => {
        return jobTypes;
    },
    search: async (filters) => {
        const params = {};
        if (filters.keyword) params.keyword = filters.keyword;
        if (filters.department && filters.department !== "ALL") params.departmentId = filters.department;
        if (filters.location && filters.location !== "ALL") params.location = filters.location;
        if (filters.jobType && filters.jobType !== "ALL") params.jobType = filters.jobType;
        
        // Ensure you have an instance of axios configured for your backend base URL
        // If not using axiosClient, change to fetch or another HTTP client
        const response = await axiosClient.get("/api/v1/jobs/public/search", { params });
        return response.data;
    }
};

export default jobService;

import react from "react";
import Login from "@/features/auth/pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jobRoutes from "@/features/jobs/routes";
import publicRoutes from "@/features/public/routes";
import AdminManageDepartmentPage from "@/features/departments/pages/AdminManageDepartmentPage.jsx";
function App() {
  // Logic

  // UI
  return (
    <BrowserRouter>
      <Routes>
        {/* Define your routes here */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        {jobRoutes}
      
        {publicRoutes}
        <Route path="/management/department" element={<AdminManageDepartmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

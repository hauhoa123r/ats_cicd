import Login from "@/features/auth/pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jobRoutes from "@/features/jobs/routes";
import publicRoutes from "@/features/public/routes";
import AdminManageDepartmentPage from "@/features/departments/pages/AdminManageDepartmentPage.jsx";
import PrivateRoute from "@/app/routes/PrivateRoute.jsx";
import PublicLayout from "./layout/PublicLayout";
import UserProfile from "@/features/auth/components/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        {publicRoutes}

        {/* Protected routes (RECRUITER only) */}
        <Route element={<PrivateRoute allowedRoles={["ROLE_RECRUITER"]} />}>
          {jobRoutes}
          <Route
            path="/management/department"
            element={<AdminManageDepartmentPage />}
          />
          
        </Route>

        <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_RECRUITER", "ROLE_CANDIDATE"]} />}>
          <Route
            path="/profile"
            element={<PublicLayout />}>
              <Route index element={<UserProfile />} />
          </Route>
          </Route>

      </Routes> 
    </BrowserRouter>
  );
}

export default App;

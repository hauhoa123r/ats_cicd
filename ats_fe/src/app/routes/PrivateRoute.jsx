import { useContext } from "react";
import { AuthContext} from "@/app/providers/AuthProvider.jsx";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  // Logic to check if the user has the required roles can be implemented here
  const { user } = useContext(AuthContext); // Assuming you have a useAuth hook to get the current user
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />; // Redirect to login if not authenticated
  }

  const roles = user.roles || []; // [CANDIDATE] Assuming user object has a roles property
  const hasAccess = allowedRoles.some((role) => roles.includes(role));

  console.log("PrivateRoute: user roles:", roles);
  console.log("PrivateRoute: allowedRoles:", allowedRoles);

  if (!hasAccess) {
    return <Navigate to="/login" replace />; // Redirect to unauthorized page if no access
  }

  return <Outlet />; // Render the child routes if authenticated and authorized
};

export default PrivateRoute;

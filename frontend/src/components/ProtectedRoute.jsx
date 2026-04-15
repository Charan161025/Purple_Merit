import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/" />;

  if (roles && !roles.includes(user.role)) {
    return <h2>Unauthorized</h2>;
  }

  return children;
};

export default ProtectedRoute;
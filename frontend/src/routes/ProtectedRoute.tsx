import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({
  route,
}: {
  route: React.ReactElement;
}) {
  const { user } = useAuth();
  console.log({ user });
  return user ? route : <Navigate to="/login" />;
}

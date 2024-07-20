import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <Box position="relative" h="100vh">
        <AbsoluteCenter p="4" color="white" axis="both">
          <Spinner color="green.400" size="xl" speed="0.65s" />
        </AbsoluteCenter>
      </Box>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;

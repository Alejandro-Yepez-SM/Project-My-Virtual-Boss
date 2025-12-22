// ProtectedRoutes.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { PageLoading } from "../UI/loading/pageLoading";
import { userData } from "../../store/user";
import AppLayout from "../../components/Layout/AppLayout";

const ProtectedRoutes: React.FC = () => {
  const userInfo = userData();
  const location = useLocation();

  if (userInfo?.loading) {
    return <PageLoading className="h-screen" />;
  }

  // Redirect to sign in if not authenticated
  if (!userInfo?.id) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default ProtectedRoutes;

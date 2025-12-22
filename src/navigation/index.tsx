// Navigation.tsx
import ProtectedRoutes from "@/codidge_components/Routes/protectedRoute";
import { Landing } from "@/components/Landing";
import { ConfirmResetPasswordPage } from "@/core_modules/auth/confirmResetPasswordPage";
import { ForcePasswordChangePage } from "@/core_modules/auth/forcePasswordChangePage";
import { MfaAuthenticatorPage } from "@/core_modules/auth/mfaAuthPage";
import { ResetPasswordPage } from "@/core_modules/auth/resetPasswordPage";
import { SignInPage } from "@/core_modules/auth/signInPage";
import { getTenantRoutes } from "@/store/config";
import { userData } from "@/store/user";
import { useReactiveVar } from "@apollo/client";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";

// Make sure your dynamic routes don't include "/" or catch-all routes
export const Navigation = () => {
  const userInfo = useReactiveVar(userData);
  const dynamicRoutes = getTenantRoutes(userInfo!);

  return (
    <main className="bg-neutral-50">
      <Router>
        <Routes>
          {/* Root route - highest priority */}
          <Route
            path="/"
            element={
              userInfo?.id ? <Navigate to="/dashboard" replace /> : <Landing />
            }
          />

          {/* Auth routes */}
          <Route
            path="/signin"
            element={
              !userInfo?.id ? (
                <SignInPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route path="/mfa" element={<MfaAuthenticatorPage />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/confirm-reset-password/:username"
            element={<ConfirmResetPasswordPage />}
          />
          <Route
            path="/change-password"
            element={<ForcePasswordChangePage />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>{dynamicRoutes}</Route>

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate to={userInfo?.id ? "/dashboard" : "/"} replace />
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

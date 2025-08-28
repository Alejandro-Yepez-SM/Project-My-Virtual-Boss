import ProtectedRoutes from "@/codidge_components/Routes/protectedRoute";
import Landing from "@/components/Landing";
import { ConfirmResetPasswordPage } from "@/core_modules/auth/confirmResetPasswordPage";
import { ForcePasswordChangePage } from "@/core_modules/auth/forcePasswordChangePage";
import { MfaAuthenticatorPage } from "@/core_modules/auth/mfaAuthPage";
import { ResetPasswordPage } from "@/core_modules/auth/resetPasswordPage";
import { SignInPage } from "@/core_modules/auth/signInPage";
import { getTenantRoutes } from "@/store/config";
import { userData } from "@/store/user";
import { useReactiveVar } from "@apollo/client";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";

export const Navigation = () => {
  const userInfo = useReactiveVar(userData);
  const dynamicRoutes = getTenantRoutes(userInfo!);

  return (
    <main className="bg-neutral-50">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>{dynamicRoutes}</Route>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/mfa" element={<MfaAuthenticatorPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/confirm-reset-password/:username"
            element={<ConfirmResetPasswordPage />}
          />
          <Route
            path="/change-password"
            element={<ForcePasswordChangePage />}
          />
          <Route
            path="*"
            element={
              userInfo ? (
                <Navigate to={`/`} replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

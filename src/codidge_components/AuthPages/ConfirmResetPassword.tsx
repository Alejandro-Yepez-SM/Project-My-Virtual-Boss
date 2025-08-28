import { ConfirmResetPasswordForm } from "../components/auth/confirmResetPassworForm";
import AuthLayout from "./AuthPageLayout";

export default function ConfirmResetPassword() {
  return (
    <>
      <AuthLayout>
        <ConfirmResetPasswordForm />
      </AuthLayout>
    </>
  );
}

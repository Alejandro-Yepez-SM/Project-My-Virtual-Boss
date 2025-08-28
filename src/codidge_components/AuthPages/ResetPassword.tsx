import { ResetPasswordForm } from "../components/auth/resetPasswordForm";
import AuthLayout from "./AuthPageLayout";

export default function ResetPassword() {
  return (
    <>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
}

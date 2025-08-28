import { ForcePasswordChangeForm } from "../components/auth/forcePasswordChangeForm";
import AuthLayout from "./AuthPageLayout";

export default function ForcePasswordChange() {
  return (
    <>
      <AuthLayout>
        <ForcePasswordChangeForm />
      </AuthLayout>
    </>
  );
}

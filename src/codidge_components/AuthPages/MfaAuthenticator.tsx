import AuthLayout from "./AuthPageLayout";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { updateUser } from "../../store/user";
import { MfaAuthenticatorForm } from "../components/auth/mfaAuthenticatorForm";

export const MfaAuthenticator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user.userId) {
          navigate(`/`);
        }
      } catch (error) {
        updateUser(null);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <AuthLayout>
        <MfaAuthenticatorForm />
      </AuthLayout>
    </>
  );
};

import AuthLayout from "./AuthPageLayout";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router";
import { updateUser } from "../../store/user";
import { SignInForm } from "../components/auth/SignInForm";

export default function SignIn() {
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
        <SignInForm />
      </AuthLayout>
    </>
  );
}

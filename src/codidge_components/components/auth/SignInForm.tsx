import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { fetchUserAttributes, signIn, signOut } from "aws-amplify/auth";
import { Eye, EyeOff } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { updateUser } from "../../../store/user";
import PrimaryButton from "../../UI/button/PrimaryButton";
import { InputCodidge } from "@/codidge_components/UI/form/input/InputField";
import { getUserQuery } from "@/store/api/queries";

type FormData = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [getCustomerFn] = useLazyQuery(getUserQuery);

  const getUserFromDatabase = async (userId: string) => {
    try {
      updateUser({
        id: "",
        name: "",
        email: "",
        phone: "",
        modules: [],
        metaData: {},
      });

      const { data } = await getCustomerFn({
        variables: {
          tenant: {
            tenantId: import.meta.env.VITE_APP_TENANT_ID,
          },
          userId,
        },
      });

      const userData = {
        ...data.getUser,
        metaData: data.getUser.metaData
          ? JSON.parse(data.getUser.metaData)
          : {},
      };

      updateUser({
        ...userData,
        loading: false,
      });

      navigate(`/`);
    } catch (error) {
      await signOut();
      console.error("Authentication failed:", error);
      throw new Error("Error is not created in system");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setloading(true);
      const user = await signIn({
        username: data.email,
        password: data.password,
      });

      if (user.isSignedIn) {
        const att = await fetchUserAttributes();
        const userId = att?.["sub"] || "";

        await getUserFromDatabase(userId);
      }

      if (user.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_EMAIL_CODE") {
        navigate("/mfa");
      }

      if (
        user.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        navigate("/change-password");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error(
        <div>
          <span className="p-2"> Login failed</span>
        </div>,
        { autoClose: 5000 }
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <InputCodidge
                    label="Email *"
                    type="email"
                    error={!!errors.email}
                    placeholder="info@gmail.com"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <InputCodidge
                      label="Password *"
                      error={!!errors.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-12 text-gray-400"
                    >
                      {showPassword ? (
                        <Eye className="size-5" />
                      ) : (
                        <EyeOff className="size-5" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <PrimaryButton
                    loading={loading}
                    type="submit"
                    className="w-full"
                  >
                    Sign in
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { confirmSignIn, fetchUserAttributes, signOut } from "aws-amplify/auth";
import { Eye, EyeOff } from "lucide-react";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import clsx from "clsx";
import { updateUser } from "../../../store/user";
import PrimaryButton from "../../UI/button/PrimaryButton";
import { InputCodidge } from "@/codidge_components/UI/form/input/InputField";
import { getUserQuery } from "@/store/api/queries";

type FormData = {
  password: string;
  confirmPassword: string;
};

const passwordRules = {
  minLength: 8,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export const ForcePasswordChangeForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [getUserFn] = useLazyQuery(getUserQuery);
  const password = watch("password");

  const getUserFromDatabase = async (userId: string) => {
    try {
      updateUser({
        id: "",
        name: "",
        email: "",
        phone: "",
        activeTemplateId: "",
        loading: true,
        modules: [],
        metaData: {},
      });

      const { data } = await getUserFn({
        variables: {
          _id: userId,
          firstTime: true,
        },
      });

      const userData = {
        ...data.getAdminUser,
        metaData: data.getAdminUser.metaData
          ? JSON.parse(data.getAdminUser.metaData)
          : {},
      };

      updateUser({
        ...userData,
        loading: false,
      });

      navigate(`/`);
    } catch (error) {
      await signOut();
      throw new Error("Error is not created in system");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setloading(true);
      const user = await confirmSignIn({
        challengeResponse: data.password,
      });

      if (user.isSignedIn) {
        const att = await fetchUserAttributes();
        const userId = att?.["sub"] || "";
        await getUserFromDatabase(userId);
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
          <span className="p-2">Change password failed</span>
        </div>,
        {
          autoClose: 5000,
        }
      );
    } finally {
      setloading(false);
    }
  };

  const checkRules = (pwd: string) => ({
    minLength: pwd?.length >= passwordRules.minLength,
    lowercase: passwordRules.lowercase.test(pwd),
    uppercase: passwordRules.uppercase.test(pwd),
    number: passwordRules.number.test(pwd),
    special: passwordRules.special.test(pwd),
  });

  const rules = checkRules(password);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Type New Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your new password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <div className="relative">
                  <InputCodidge
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={!!errors.password}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-400"
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

              <div>
                <div className="relative">
                  <InputCodidge
                    label="Confirm Password *"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    error={!!errors.confirmPassword}
                  />
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-400"
                  >
                    {showConfirm ? (
                      <Eye className="size-5" />
                    ) : (
                      <EyeOff className="size-5" />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li
                  className={clsx(
                    rules.minLength ? "text-green-600" : "text-red-500"
                  )}
                >
                  • Minimum 8 characters
                </li>
                <li
                  className={clsx(
                    rules.lowercase ? "text-green-600" : "text-red-500"
                  )}
                >
                  • At least one lowercase letter
                </li>
                <li
                  className={clsx(
                    rules.uppercase ? "text-green-600" : "text-red-500"
                  )}
                >
                  • At least one uppercase letter
                </li>
                <li
                  className={clsx(
                    rules.number ? "text-green-600" : "text-red-500"
                  )}
                >
                  • At least one number
                </li>
                <li
                  className={clsx(
                    rules.special ? "text-green-600" : "text-red-500"
                  )}
                >
                  • At least one special character
                </li>
              </ul>

              <div className="flex items-center justify-between">
                <Link
                  to="/signin"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Already have an account?
                </Link>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>

              <PrimaryButton loading={loading} type="submit" className="w-full">
                Sign in
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

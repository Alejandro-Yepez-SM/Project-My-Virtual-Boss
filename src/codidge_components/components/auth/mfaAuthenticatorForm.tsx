import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { confirmSignIn, fetchUserAttributes, signOut } from "aws-amplify/auth";
import VerificationInput from "react-verification-input";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { updateUser } from "../../../store/user";
import Label from "../../UI/form/Label";
import TextButton from "../../UI/button/TextButton";
import PrimaryButton from "../../UI/button/PrimaryButton";
import { getUserQuery } from "@/store/api/queries";

type FormData = {
  code: string;
};

export const MfaAuthenticatorForm = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [counter, setCounter] = useState(30);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (!resendDisabled) return;

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleResendCode = async () => {
    try {
      setResendDisabled(true);
      //await Auth.forgotPassword(email);
      // Code resent, now button stays disabled for 30s via the timer
    } catch (err: any) {
      console.error("Error resending code:", err);
      alert(err.message || "Failed to resend code");
      // If you want to re-enable immediately on error:
      setResendDisabled(false);
      setCounter(30);
    }
  };

  const [getUserFn] = useLazyQuery(getUserQuery);

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
          id: userId,
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
        activeTenant: userData.tenantConfigurations[0],
        loading: false,
      });

      navigate("/");
    } catch (error) {
      await signOut();
      console.log("::::user" + error);
      throw new Error("Error is not created in system");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setloading(true);
      const user = await confirmSignIn({
        challengeResponse: data.code,
      });

      if (user.isSignedIn) {
        const att = await fetchUserAttributes();
        const userId = att?.["sub"] || "";
        await getUserFromDatabase(userId);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error(
        <div>
          <span className="p-2"> MFA failed</span>
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
              Enter MFA Code
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter code sended to your email
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Code <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Controller
                    name="code"
                    control={control}
                    rules={{
                      required: "Code is required",
                      minLength: { value: 6, message: "Code must be 6 digits" },
                      maxLength: { value: 6, message: "Code must be 6 digits" },
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Only numbers allowed",
                      },
                    }}
                    render={({ field }) => (
                      <div>
                        <VerificationInput
                          {...field}
                          length={6}
                          placeholder=""
                          validChars="0-9"
                          inputProps={{
                            className:
                              "w-10 h-10 mx-1 text-center border border-gray-300 rounded rounded-xl focus:border-brand-500",
                          }}
                          onChange={(value: string) => field.onChange(value)}
                        />
                      </div>
                    )}
                  />
                  {errors.code && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <TextButton
                    onClick={handleResendCode}
                    disabled={resendDisabled}
                  >
                    {resendDisabled
                      ? `Resend Code (${counter}s)`
                      : "Resend Code"}
                  </TextButton>
                  <TextButton
                    onClick={() => {
                      navigate("/signin");
                    }}
                    disabled={resendDisabled}
                  >
                    Back To Login
                  </TextButton>
                </div>
                <div>
                  <PrimaryButton
                    loading={loading}
                    type="submit"
                    className="w-full"
                  >
                    Verify Code
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

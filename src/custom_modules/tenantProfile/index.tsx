import { Controller, FormProvider, useForm } from "react-hook-form";
import { BusinessHour } from "../../store/interface";
import { useTenant } from "../../hooks/useTenant";
import { useMutation } from "@apollo/client";
import { updateTenantProfile } from "../../store/api/mutations";
import { updateUser } from "../../store/user";
import ComponentCard from "@/codidge_components/components/ComponentCard";
import { SingleImage } from "@/codidge_components/components/imageGallery/widgets/inputImgWidgets/singleImage";
import TextArea from "@/codidge_components/UI/form/input/TextArea";
import { InputCodidge } from "@/codidge_components/UI/form/input/InputField";
import PrimaryButton from "@/codidge_components/UI/button/PrimaryButton";
import { BusinessHours } from "./components/businessHours";
import { IImage } from "@/codidge_components/interfaces";

export interface TenantSettingsInput {
  fullName: string;
  email: string;
  phone: string;
  logo: IImage;
  cover: IImage;
  primaryColor: string;
  businessHours: BusinessHour[];
  address: string;
  description: string;
}

export const TenantSettingsPage = () => {
  const { tenantInfo, userInfo } = useTenant();

  const methods = useForm<TenantSettingsInput>({
    defaultValues: {
      fullName: tenantInfo?.fullName || "",
      description: tenantInfo?.description || "",
      email: tenantInfo?.communications?.email || "",
      phone: tenantInfo?.communications?.phone || "",
      logo: tenantInfo?.theme?.logo,
      cover: tenantInfo?.theme?.cover,
      address: tenantInfo?.address,
      businessHours: tenantInfo?.businessHours ?? [],
      primaryColor: tenantInfo?.theme?.colorPalette?.primary || "#000000",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const [updateTenantFn, { loading }] = useMutation<{ updateTenant: ITenant }>(
    updateTenantProfile
  );

  const onSubmit = async (data: TenantSettingsInput) => {
    try {
      const updated = {
        fullName: data.fullName,
        description: data.description,
        communications: {
          email: data.email,
          phone: data.phone,
        },
        businessHours: data.businessHours,
        address: data.address,
        theme: {
          colorPalette: {
            primary: data.primaryColor,
          },
          logo: {
            alt: data.logo.alt,
            url: data.logo.url,
          },
          cover: {
            alt: data.cover.alt,
            url: data.cover.url,
          },
        },
      };

      const tenantData = await updateTenantFn({
        variables: {
          id: tenantInfo?.id,
          tenant: updated,
        },
      });

      const newTenantProps = tenantData?.data?.updateTenant;

      if (newTenantProps) {
        updateUser({
          ...userInfo!,
        });
      }
      reset({
        fullName: newTenantProps?.fullName || "",
        email: newTenantProps?.communications?.email || "",
        phone: newTenantProps?.communications?.phone || "",
        businessHours: newTenantProps?.businessHours || [],
        logo: newTenantProps?.theme?.logo,
        address: newTenantProps?.address || "",
        primaryColor: newTenantProps?.theme?.colorPalette?.primary || "#000000",
      });
    } catch (error) {
      reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3">
          <div className="bg-primary sm:top-0 col-span-2 grid gap-5">
            <ComponentCard title="Settings">
              <SingleImage fieldName={"cover"} fieldLabel={"Cover Photo"} />
              <SingleImage fieldName={"logo"} fieldLabel={"Logo"} />
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <InputCodidge label="Full Name" type="text" {...field} />
                )}
              />
              {/* Email */}
              <Controller
                name="email"
                disabled={true}
                control={control}
                render={({ field }) => (
                  <InputCodidge label="Email" type="text" {...field} />
                )}
              />
              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputCodidge label="Phone" type="text" {...field} />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div>
                    <TextArea
                      label="Description"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      rows={6}
                    />
                  </div>
                )}
              />
              {/* Primary Color */}
              <Controller
                name="primaryColor"
                control={control}
                render={({ field }) => (
                  <InputCodidge
                    className="!w-16"
                    label="Primary Color"
                    type="color"
                    {...field}
                  />
                )}
              />
            </ComponentCard>
            {tenantInfo?.businessHours && <BusinessHours />}
          </div>
          <div className="h-max rounded-md px-4 sticky top-0 col-span-1">
            <ComponentCard title="Save">
              <PrimaryButton
                loading={loading}
                disabled={!isDirty}
                className="ml-auto"
                type="submit"
              >
                Save Changes
              </PrimaryButton>
            </ComponentCard>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

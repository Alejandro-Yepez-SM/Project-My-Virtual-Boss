import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-select";
import { NetSheetFormValues, NetSheetResult } from "../interfaces";
import { Controller, useFormContext } from "react-hook-form";
import {
  calculateNetSheet,
  detectStateFromZip,
  GEOGRAPHIC_COSTS,
} from "../helpers";

export const SellerNetForm = ({
  setResult,
  setShowResults,
}: {
  setResult: (props: NetSheetResult | null) => void;
  setShowResults: (prop: boolean) => void;
}) => {
  const { register, control, setValue, watch, handleSubmit } =
    useFormContext<NetSheetFormValues>();

  const detectedState = watch("detectedState");
  const zipCode = watch("zipCode");

  const onSubmit = (fornData: NetSheetFormValues) => {
    const res = calculateNetSheet({
      salePrice: fornData.salePrice,
      mortgageBalance: fornData.mortgageBalance || "0",
      commissionRate: fornData.commissionRate,
      repairs: fornData.repairs || "0",
      homeWarranty: fornData.homeWarranty || "0",
      zipCode: fornData.zipCode,
      detectedState: fornData.detectedState,
    });

    if (res) {
      setResult({
        grossSalePrice: res.grossSalePrice,
        totalDeductions: res.totalDeductions,
        netProceeds: res.netProceeds,
        breakdownItems: res.breakdownItems.sort((a, b) => b.amount - a.amount),
      });
    }

    setShowResults(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="commissionRate"> Sale Price</Label>
            <Input
              id="salePrice"
              type="number"
              placeholder="500000"
              className="mt-1"
              {...register("salePrice", {
                required: "Sale price is required",
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Expected or agreed sale price
            </p>
          </div>

          <div>
            <Label htmlFor="commissionRate"> Property Zip Code</Label>
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: "Property Zip Code is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    placeholder="12345"
                    maxLength={5}
                    className="mt-1"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value); // update zipCode
                      if (value.length === 5) {
                        const state = detectStateFromZip(value);
                        setValue("detectedState", state);
                      } else {
                        setValue("detectedState", "");
                      }
                    }}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-muted-foreground">Zip Code</p>
              {detectedState && detectedState !== "DEFAULT" && (
                <p className="text-xs text-green-600">
                  ✓ Detected: {GEOGRAPHIC_COSTS[detectedState].stateName}
                </p>
              )}
              {detectedState === "DEFAULT" && zipCode.length >= 5 && (
                <p className="text-xs text-orange-600">
                  Using national averages for this location
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="mortgage">Current Mortgage Balance</Label>
            <Input
              id="mortgage"
              type="number"
              placeholder="250000"
              className="mt-1"
              {...register("mortgageBalance", {
                required: "Current Mortgage is required",
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Outstanding loan balance (optional)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="commissionRate">Real Estate Commission (%)</Label>
            <Input
              id="commissionRate"
              type="number"
              step="0.1"
              placeholder="6.0"
              className="mt-1"
              {...register("commissionRate", {
                required: "Real Estate Commission is required",
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Total commission for both agents (typical: 5-6%)
            </p>
          </div>

          <div>
            <Label htmlFor="repairs">Repairs/Concessions</Label>
            <Input
              id="repairs"
              type="number"
              placeholder="2000"
              className="mt-1"
              {...register("repairs", {
                required: "Repairs/Concessions is required",
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Negotiated repairs or buyer concessions (optional)
            </p>
          </div>

          <div>
            <Label htmlFor="warranty">Home Warranty</Label>
            <Input
              id="warranty"
              type="number"
              placeholder="500"
              className="mt-1"
              {...register("homeWarranty", {
                required: "Home Warranty is required",
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              One-year home warranty for buyer (optional)
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex mt-4">
        <Button type="submit" className="flex-1">
          Calculate Net Proceeds
        </Button>
      </div>
    </form>
  );
};

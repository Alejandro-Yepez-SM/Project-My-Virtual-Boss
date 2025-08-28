import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import {
  User,
  MapPin,
  Globe,
  Clock,
  Languages,
  Eye,
  Compass,
  Heart,
  Target,
  TrendingUp,
  Plus,
  Minus,
  ChevronDown,
  Check,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/useToast";
import { useReactiveVar } from "@apollo/client";
import { userData } from "@/store/user";

const profileSettingsSchema = z.object({
  // Location and preferences (optional for updates)
  region: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  zipCode: z.string().optional().or(z.literal("")),
  timeZone: z.string().optional().or(z.literal("")),
  language: z.string().min(1, "Please select your language"),
  // Vision and goals (allow empty values for clearing)
  fiveYearVision: z.string().optional().or(z.literal("")),
  oneYearVision: z.string().optional().or(z.literal("")),
  mission: z.string().optional().or(z.literal("")),
  values: z.string().optional().or(z.literal("")),
  motivation: z.string().optional().or(z.literal("")),
  desiredAnnualIncome: z.string().optional().or(z.literal("")),
  averageCommission: z.string().optional().or(z.literal("")),
  averageRentalCommission: z.string().optional().or(z.literal("")),
  swotAnalysis: z
    .object({
      strengths: z.array(z.string()).optional().default([]),
      weaknesses: z.array(z.string()).optional().default([]),
      opportunities: z.array(z.string()).optional().default([]),
      threats: z.array(z.string()).optional().default([]),
    })
    .optional(),
});

type ProfileSettingsData = z.infer<typeof profileSettingsSchema>;

export default function ProfileSettings() {
  const { toast } = useToast();
  const userInfo = useReactiveVar(userData);

  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("location");
  const [swotOpenStates, setSwotOpenStates] = useState<Record<string, boolean>>(
    {
      strengths: false,
      weaknesses: false,
      opportunities: false,
      threats: false,
    }
  );

  const form = useForm({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      region: (userInfo as any)?.region || "",
      location: (userInfo as any)?.location || "",
      city: (userInfo as any)?.city || "",
      state: (userInfo as any)?.state || "",
      zipCode: (userInfo as any)?.zipCode || "",
      timeZone: (userInfo as any)?.timeZone || "",
      language: (userInfo as any)?.language || "en",
      fiveYearVision: (userInfo as any)?.fiveYearVision || "",
      oneYearVision: (userInfo as any)?.oneYearVision || "",
      mission: (userInfo as any)?.mission || "",
      values: (userInfo as any)?.values || "",
      motivation: (userInfo as any)?.motivation || "",
      desiredAnnualIncome: "",
      averageCommission: "",
      averageRentalCommission: "",
      swotAnalysis: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
      },
    },
  });

  /* const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileSettingsData) => {
      // If we're in the vision section, use the specific vision endpoint
      if (activeSection === "vision") {
        return await apiRequest("PATCH", "/api/profile/vision", {
          fiveYearVision: data.fiveYearVision,
          oneYearVision: data.oneYearVision,
          mission: data.mission,
          values: data.values,
          motivation: data.motivation,
        });
      }
      return await apiRequest("PATCH", "/api/profile/update", data);
    },
    onSuccess: (_, variables) => {
      // Update language context if language was changed
      const newLanguage = variables.language;
      if (newLanguage !== language) {
        setLanguage(newLanguage as Language);
      }

      toast({
        title: t("profile.updated", "Profile Updated"),
        description: t(
          "profile.updatedDesc",
          "Your profile settings have been successfully updated."
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  }); */

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (!numericValue) return "";
    return parseInt(numericValue).toLocaleString();
  };

  const onSubmit = (data: ProfileSettingsData) => {
    /* updateProfileMutation.mutate(data); */
  };

  const swotOptions = {
    strengths: [
      "Strong communication skills",
      "Local market knowledge",
      "Extensive professional network",
      "Technology savvy",
      "Excellent negotiation skills",
      "Customer service focus",
      "Marketing expertise",
      "Strong social media presence",
      "Years of industry experience",
      "Professional certifications",
      "Bilingual/multilingual",
      "Strong work ethic",
      "Problem-solving abilities",
      "Attention to detail",
      "Reliable and trustworthy",
    ],
    weaknesses: [
      "Limited time management",
      "Lack of social media presence",
      "Insufficient marketing budget",
      "Limited technology skills",
      "New to the real estate industry",
      "Small professional network",
      "Inconsistent follow-up",
      "Challenges with price negotiation",
      "Limited geographic market knowledge",
      "Inadequate lead generation",
      "Difficulty with public speaking",
      "Limited financial resources",
      "Inconsistent work schedule",
      "Lack of specialization",
      "Poor organization skills",
    ],
    opportunities: [
      "Growing local housing market",
      "First-time homebuyer programs",
      "Investment property demand",
      "New construction developments",
      "Corporate relocation services",
      "Luxury market expansion",
      "Commercial real estate opportunities",
      "Property management services",
      "Real estate education and coaching",
      "Technology adoption advantages",
      "Niche market specialization",
      "Partnership opportunities",
      "Government housing initiatives",
      "Demographic shifts",
      "Seasonal market opportunities",
    ],
    threats: [
      "Intense market competition",
      "Economic downturn risks",
      "Rising interest rates",
      "Online real estate platforms",
      "Market saturation",
      "Regulatory changes",
      "Seasonal market fluctuations",
      "Economic uncertainty",
      "New competitor market entry",
      "Technology disruption",
      "Changing consumer preferences",
      "Commission compression",
      "Legal and compliance risks",
      "Market inventory shortages",
      "Natural disasters/external events",
    ],
  };

  const toggleSWOTOption = (
    category: keyof ProfileSettingsData["swotAnalysis"],
    option: string
  ) => {
    /* const currentItems = form.getValues(`swotAnalysis.${category}`) || [];

    if (currentItems.includes(option)) {
      // Remove the option
      const newItems = currentItems.filter((item) => item !== option);
      form.setValue(`swotAnalysis.${category}`, newItems);
    } else {
      // Add the option
      form.setValue(`swotAnalysis.${category}`, [...currentItems, option]);
    } */
  };

  const sections = [
    {
      id: "location",
      title: t("profile.location", "Location & Preferences"),
      icon: MapPin,
      description: t(
        "profile.locationDesc",
        "Your location and regional settings"
      ),
    },
    {
      id: "vision",
      title: t("profile.vision", "Vision & Mission"),
      icon: Eye,
      description: t("profile.visionDesc", "Your long-term vision and mission"),
    },
    {
      id: "swot",
      title: t("profile.swot", "SWOT Analysis"),
      icon: Target,
      description: t(
        "profile.swotDesc",
        "Your strengths, weaknesses, opportunities, and threats"
      ),
    },
    {
      id: "financial",
      title: t("profile.financial", "Financial Goals"),
      icon: TrendingUp,
      description: t(
        "profile.financialDesc",
        "Your income targets and commission structure"
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <User className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            {t("profile.title", "Profile Settings")}
          </h2>
          <p className="text-neutral-600">
            {t(
              "profile.subtitle",
              "Update your personal information, preferences, and goals"
            )}
          </p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Card
              key={section.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeSection === section.id
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "hover:border-primary/20"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <IconComponent
                    className={`h-5 w-5 ${
                      activeSection === section.id
                        ? "text-primary"
                        : "text-gray-500"
                    }`}
                  />
                  <h3 className="font-medium text-sm">{section.title}</h3>
                </div>
                <p className="text-xs text-gray-500">{section.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Location & Preferences */}
        {activeSection === "location" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Location & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="region">
                    {t("profile.region", "Region")}
                  </Label>
                  <Select
                    value={form.watch("region")}
                    onValueChange={(value) => form.setValue("region", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-america">
                        North America
                      </SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                      <SelectItem value="latin-america">
                        Latin America
                      </SelectItem>
                      <SelectItem value="middle-east-africa">
                        Middle East & Africa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">
                    {t("profile.language", "Language")}
                  </Label>
                  <Select
                    value={form.watch("language")}
                    onValueChange={(value) => {
                      form.setValue("language", value);
                      // Change language immediately for better UX
                      /*    setLanguage(value as Language); */
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {/*  {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.nativeName} ({lang.name})
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">
                  Location (City, State, Country)
                </Label>
                <Input
                  {...form.register("location")}
                  placeholder="e.g., New York, NY, USA"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...form.register("city")}
                    placeholder="e.g., New York"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input {...form.register("state")} placeholder="e.g., NY" />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    {...form.register("zipCode")}
                    placeholder="e.g., 10001"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select
                  value={form.watch("timeZone")}
                  onValueChange={(value) => form.setValue("timeZone", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time (CT)
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time (MT)
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time (PT)
                    </SelectItem>
                    <SelectItem value="America/Anchorage">
                      Alaska Time (AT)
                    </SelectItem>
                    <SelectItem value="Pacific/Honolulu">
                      Hawaii Time (HT)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      Greenwich Mean Time (GMT)
                    </SelectItem>
                    <SelectItem value="Europe/Paris">
                      Central European Time (CET)
                    </SelectItem>
                    <SelectItem value="Asia/Tokyo">
                      Japan Standard Time (JST)
                    </SelectItem>
                    <SelectItem value="Australia/Sydney">
                      Australian Eastern Time (AET)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vision & Mission */}
        {activeSection === "vision" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Vision & Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fiveYearVision">5-Year Vision</Label>
                <Textarea
                  {...form.register("fiveYearVision")}
                  placeholder="Describe where you see yourself in 5 years..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="oneYearVision">1-Year Vision</Label>
                <Textarea
                  {...form.register("oneYearVision")}
                  placeholder="What do you want to achieve in the next year..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  {...form.register("mission")}
                  placeholder="Your mission as a real estate professional..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="values">Core Values</Label>
                <Textarea
                  {...form.register("values")}
                  placeholder="What values guide your business..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="motivation">What Motivates You</Label>
                <Textarea
                  {...form.register("motivation")}
                  placeholder="What drives you to succeed..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* SWOT Analysis */}
        {activeSection === "swot" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                SWOT Analysis
              </CardTitle>
            </CardHeader>
            {/*     <CardContent className="space-y-6">
              {(
                ["strengths", "weaknesses", "opportunities", "threats"] as const
              ).map((category) => {
                const selectedItems = form
                  .watch(`swotAnalysis.${category}`)
                  .filter((item) => item !== "");

                return (
                  <div key={category}>
                    <Label className="capitalize font-medium text-base mb-2 block">
                      {category}
                    </Label>

                    <Collapsible
                      open={swotOpenStates[category]}
                      onOpenChange={(open) =>
                        setSwotOpenStates((prev) => ({
                          ...prev,
                          [category]: open,
                        }))
                      }
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between h-auto min-h-[2.5rem] p-3"
                        >
                          <div className="flex flex-wrap gap-1 max-w-[80%]">
                            {selectedItems.length === 0 ? (
                              <span className="text-muted-foreground">
                                Select {category}...
                              </span>
                            ) : (
                              selectedItems.slice(0, 3).map((item, index) => (
                                <span
                                  key={index}
                                  className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                                >
                                  {item}
                                </span>
                              ))
                            )}
                            {selectedItems.length > 3 && (
                              <span className="text-muted-foreground text-xs">
                                +{selectedItems.length - 3} more
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              swotOpenStates[category]
                                ? "transform rotate-180"
                                : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-2">
                        <div className="border rounded-md p-3 bg-background max-h-60 overflow-y-auto">
                          <div className="space-y-2">
                            {swotOptions[category].map((option) => {
                              const isSelected = selectedItems.includes(option);
                              return (
                                <div
                                  key={option}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`${category}-${option}`}
                                    checked={isSelected}
                                    onCheckedChange={() =>
                                      toggleSWOTOption(category, option)
                                    }
                                  />
                                  <label
                                    htmlFor={`${category}-${option}`}
                                    className="text-sm font-normal cursor-pointer flex-1"
                                  >
                                    {option}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {selectedItems.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {selectedItems.length} selected
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent> */}
          </Card>
        )}

        {/* Financial Goals */}
        {activeSection === "financial" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="desiredAnnualIncome">
                  Desired Annual Income ($)
                </Label>
                <Input
                  {...form.register("desiredAnnualIncome")}
                  type="text"
                  placeholder="e.g., 100,000"
                  value={formatCurrency(
                    form.watch("desiredAnnualIncome") || ""
                  )}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^\d]/g, "");
                    form.setValue("desiredAnnualIncome", rawValue);
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="averageCommission">
                    Average Sales Commission ($)
                  </Label>
                  <Input
                    {...form.register("averageCommission")}
                    type="text"
                    placeholder="e.g., 5,000"
                    value={formatCurrency(
                      form.watch("averageCommission") || ""
                    )}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      form.setValue("averageCommission", rawValue);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="averageRentalCommission">
                    Average Rental Commission ($)
                  </Label>
                  <Input
                    {...form.register("averageRentalCommission")}
                    type="text"
                    placeholder="e.g., 1,500"
                    value={formatCurrency(
                      form.watch("averageRentalCommission") || ""
                    )}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      form.setValue("averageRentalCommission", rawValue);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end space-x-4">
          {/*   <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="gradient-primary text-white"
          >
            {updateProfileMutation.isPending
              ? t("profile.updating", "Updating...")
              : t("profile.updateProfile", "Update Profile")}
          </Button> */}
        </div>
      </form>
    </div>
  );
}

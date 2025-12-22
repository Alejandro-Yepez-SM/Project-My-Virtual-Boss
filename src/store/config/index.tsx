import { Route } from "react-router";

import {
  Calculator,
  DollarSign,
  GraduationCap,
  Home,
  Notebook,
  Settings,
  Target,
  User,
} from "lucide-react";

import { IModule, IUser } from "../interface";
import { INavItem } from "../../components/Layout/interfaces";
import Dashboard from "../../custom_modules/dashboard/components/Dashboard";
import Tasks from "@/custom_modules/tasks";
import CRM from "@/custom_modules/crm";
import Goals from "@/custom_modules/goals";
import Income from "@/custom_modules/income";
import Tools from "@/custom_modules/tools";
import Training from "@/custom_modules/training";

export enum ModuleKeys {
  configuration = "configuration",
  /*   contentGallery = "contentGallery", */
}

export const getTenantRoutes = (_: IUser | null) => {
  return (
    <Route>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="crm" element={<CRM />} />
      <Route path="goals" element={<Goals />} />
      <Route path="income" element={<Income />} />
      <Route path="tools" element={<Tools />} />
      <Route path="training" element={<Training />} />
      {/*  <Route path="tenantSetting" element={<TenantSettingsPage />} /> */}
    </Route>
  );
};

export const commonModules = (): INavItem[] => [
  {
    icon: <Home />,
    name: "Dashboard",
    path: `/dashboard`,
  },
  {
    icon: <Notebook />,
    name: "Task",
    path: `/tasks`,
  },
  {
    icon: <User />,
    name: "CRM",
    path: `/crm`,
  },
  {
    icon: <Target />,
    name: "Goals",
    path: `/goals`,
  },
  {
    icon: <DollarSign />,
    name: "Income",
    path: `/income`,
  },
  {
    icon: <Calculator />,
    name: "Calculator",
    path: `/tools`,
  },
  {
    icon: <GraduationCap />,
    name: "Graduation",
    path: `/training`,
  },
];

export const moduleKeyToNavSubItems = (
  module: IModule
): Record<ModuleKeys, INavItem> => ({
  /* [ModuleKeys.contentGallery]: {
    icon: <GalleryHorizontalEnd />,
    name: module.label ?? "Content Gallery",
    path: `/${solutionSlug}/content-gallery`,
  }, */
  [ModuleKeys.configuration]: {
    icon: <Settings />,
    name: module.label ?? "Configuration",
    path: `/${module.path}`,
    subItems: [
      {
        name: "Integration",
        path: `/${module.path}/integrations`,
      },
    ],
  },
});

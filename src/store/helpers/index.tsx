import { INavItem } from "../../components/Layout/interfaces";
import { commonModules, moduleKeyToNavSubItems } from "../config";
import { IUser } from "../interface";

export const generateTenantNavItems = (
  user: IUser,
  currentPath: string
): INavItem[] => {
  const modules = user?.modules ?? [];

  /*   const subItems = modules
    .map((keyModule) => {
      const moduleItem = moduleKeyToNavSubItems(keyModule)[keyModule.moduleKey];
      return moduleItem;
    })
    .filter(Boolean);
 */
  const appItems = commonModules();

  return [...appItems];
};

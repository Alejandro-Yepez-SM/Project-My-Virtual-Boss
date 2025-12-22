import { INavItem } from "../../components/Layout/interfaces";
import { commonModules } from "../config";

export const generateTenantNavItems = (): INavItem[] => {
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

import { useLocation } from "react-router";
import { useReactiveVar } from "@apollo/client";
import { userData } from "../store/user";

export const useTenant = () => {
  const { pathname } = useLocation();
  const userInfo = useReactiveVar(userData);

  return {
    pathname,
    userInfo,
  };
};

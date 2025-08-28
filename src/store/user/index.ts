import { makeVar } from "@apollo/client";
import { IUser } from "../interface";

const USER_STORAGE_KEY = "signinUser";
const storedUser = localStorage.getItem(USER_STORAGE_KEY);

export const userData = makeVar<IUser | null>(
  storedUser ? JSON.parse(storedUser) : null
);

export const updateUser = (user: IUser | null) => {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
    document.documentElement.style.setProperty("--brand-color", "#7b2cff"); // default
  }
  userData(user);
};

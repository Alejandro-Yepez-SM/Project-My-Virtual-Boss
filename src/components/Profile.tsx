import { ChevronDown, HelpCircle, UserCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useReactiveVar } from "@apollo/client";
import { userData } from "../store/user";
import { useState } from "react";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import TextButton from "@/codidge_components/UI/button/TextButton";
import { LogoutButton } from "@/codidge_components/components/LogoutButton";

export const ProfileDropdown = () => {
  const userInfo = useReactiveVar(userData);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex">
        <PopoverTrigger asChild>
          <button
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className="w-full flex p-2 justi fy-between gap-2 items-center hover:bg-gray-50 cursor-pointer"
          >
            <div className="">
              <p className="text-lg">Welcome {userInfo?.name}</p>
            </div>
            <ChevronDown size={18} />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80 p-0" align="end">
        <CardContent className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg px-0 mx-0 ">Profile</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <TextButton
              className="w-full !justify-between"
              onClick={() => {
                setOpen(false);
              }}
            >
              Support
              <HelpCircle />
            </TextButton>
            <TextButton
              className="w-full !justify-between"
              onClick={() => {
                setOpen(false);
              }}
            >
              Profile
              <UserCircle />
            </TextButton>
            <LogoutButton className="w-full text-red-500 hover:text-red-600 !justify-between" />
          </CardContent>
        </CardContent>
      </PopoverContent>
    </Popover>
  );
};

import { ReactNode, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useApolloClient } from "@apollo/client";
import TextButton from "../UI/button/TextButton";

export const LogoutButton = ({
  className,
  icon = true,
}: {
  className?: string;
  icon?: ReactNode;
}) => {
  const [loadingLogout, setloadingLogout] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();
  return (
    <TextButton
      loading={loadingLogout}
      onClick={async () => {
        try {
          setloadingLogout(true);
          await signOut(); // your custom sign-out logic
          await client.clearStore(); // Clears all cached data
          navigate("/signin");
        } catch (error) {
          console.log("::::error", error);
        } finally {
          setloadingLogout(false);
        }
      }}
      className={`text-error-500 px-5  flex gap-3 text-left ${
        loadingLogout && "!bg-gray-200"
      } ${className ?? ""}`}
    >
      Cerrar Sesion
      {icon && <LogOut />}
    </TextButton>
  );
};

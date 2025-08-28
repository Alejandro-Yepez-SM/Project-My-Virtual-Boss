import { useLocation } from "react-router";
import { useReactiveVar } from "@apollo/client";
import { userData } from "../../store/user";
import { generateTenantNavItems } from "../../store/helpers";
import { BarChart3 } from "lucide-react";
import { SidePanelButton } from "@/codidge_components/UI/button/SidePanelButton";

export default function Sidebar() {
  const userInfo = useReactiveVar(userData);

  const { pathname } = useLocation();

  const navItems = generateTenantNavItems(userInfo!, pathname);

  return (
    <div className="w-64 h-screen flex flex-col">
      <div className="p-6 border-b h-24 border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
            <BarChart3 className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">My Virtual Boss</h1>
            <p className="text-sm text-gray-400">Real Estate Edition</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActiveTab = pathname.includes(item.path ?? "/");
            return (
              <li key={item.path}>
                <SidePanelButton
                  icon={Icon}
                  isActive={isActiveTab}
                  label={item.name}
                  path={item.path ?? "/"}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

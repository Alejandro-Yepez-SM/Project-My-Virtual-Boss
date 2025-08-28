import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";

interface LayoutContentProps {
  children?: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - fixed and not scrollable */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 fixed h-screen z-10">
        <Sidebar />
      </div>

      {/* Main content area - margin-left matches sidebar width */}
      <div className="flex-1 ml-64 flex flex-col">
        <AppHeader />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 mx-auto w-full max-w-screen-2xl">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC<LayoutContentProps> = ({ children }) => {
  return <LayoutContent>{children}</LayoutContent>;
};

export default AppLayout;

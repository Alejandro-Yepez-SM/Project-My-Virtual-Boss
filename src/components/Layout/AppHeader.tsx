import { NotificationPopup } from "../NotificationPopup";
import { ProfileDropdown } from "../Profile";

const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-20 lg:border-b h-24">
      <div className="flex items-center max-w-screen-2xl justify-end grow lg:flex-row px-6 lg:px-8">
        <NotificationPopup />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default AppHeader;

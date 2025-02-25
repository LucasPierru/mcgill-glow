import { Menu } from "lucide-react";
import React, { Dispatch, FC, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface ProtectedMobileMenuButtonProps {
  setSidebarOpen: Dispatcher<boolean>;
}

const ProtectedMobileMenuButton: FC<ProtectedMobileMenuButtonProps> = ({
  setSidebarOpen,
}) => {
  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Menu className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default ProtectedMobileMenuButton;

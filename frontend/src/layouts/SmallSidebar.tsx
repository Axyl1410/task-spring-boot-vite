import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import ThemeSwitch from "../components/theme/ThemeToggle";
import useToggle from "../hooks/useToggle";
import Modal from "./../components/ui/Modal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SideBarItem {
  to: string;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const SideBarItems: SideBarItem[] = [
    { to: "/", children: "Home" },
    { to: "/mytask", children: "My Task" },
    { to: "/task", children: "Task" },
    { to: "/user", children: "User" },
  ];

  const modal = useToggle();

  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            <div
              className="flex h-full w-full items-center justify-end bg-black bg-opacity-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
              }}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  damping: 15,
                  stiffness: 120,
                  mass: 0.8,
                }}
                className="relative h-full w-64 overflow-y-auto border-l border-gray-500 bg-white p-6 shadow-lg transition-colors dark:bg-dark_secondary dark:text-white"
              >
                <button
                  onClick={() => onClose()}
                  className="absolute -top-1 right-2 text-4xl"
                >
                  &times;
                </button>
                <h2 className="font-neue text-2xl font-bold tracking-wider">
                  Menu
                </h2>
                <div className="flex flex-col pt-4">
                  {SideBarItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        [
                          "text-nowrap border-b border-gray-500 p-2 transition-colors hover:text-indigo-600",
                          isActive ? "text-indigo-600" : "",
                        ].join(" ")
                      }
                    >
                      {item.children}
                    </NavLink>
                  ))}
                </div>
                <div className="absolute bottom-6 flex w-52 items-center justify-between border-t border-black bg-white pt-4 transition-colors dark:border-gray-500 dark:bg-dark_secondary">
                  <div
                    onClick={() => {
                      onClose();
                      modal.open();
                    }}
                    className="cursor-pointer"
                  >
                    Sign Out
                  </div>
                  <ThemeSwitch />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <div className="flex w-full flex-col gap-2 p-2">
          <h1 className="text-xl font-bold">
            Are you sure you want to sign out?
          </h1>
          <p>You will be redirected to the login page</p>
          <div className="flex w-full justify-end gap-2 py-2">
            <button
              className="rounded-sm border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-500 hover:text-white"
              onClick={modal.close}
            >
              Cancel
            </button>
            <a
              href="/login"
              onClick={() => {
                const theme = localStorage.getItem("theme");
                localStorage.clear();
                if (theme) localStorage.setItem("theme", theme);
                window.location.href = "/login";
              }}
            >
              <button className="rounded-sm bg-sky-600 px-2 py-1 text-white transition-colors hover:bg-sky-700 active:bg-sky-600">
                Sign out
              </button>
            </a>
          </div>
        </div>
      </Modal>
    </>,
    document.body,
  );
};

export default Sidebar;

import { motion } from "framer-motion";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdPeopleAlt, MdTask } from "react-icons/md";
import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import { cn } from "../lib/utils";

export default function Sidebar() {
  const [admin, setAdmin] = useState(false);
  const [login, setLogin] = useState(false);
  const sidebar = useToggle();

  return (
    <motion.div
      layout
      animate={{ width: sidebar.isOpen ? "240px" : "80px" }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      }}
      className="flex h-screen flex-col items-center justify-between border-r border-gray-500 px-2 py-4"
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          sidebar.isOpen ? "items-start" : "items-center",
        )}
      >
        <div className="flex items-center gap-2 border-b border-gray-500 pb-2">
          <IoMdMenu
            className="h-7 w-7 cursor-pointer"
            onClick={sidebar.toggle}
          />
          {sidebar.isOpen && (
            <Link to="/">
              <h1 className="text-nowrap text-xl font-bold">Task Manager</h1>
            </Link>
          )}
        </div>
        <SidebarItem
          icon={<IoHomeOutline className="h-6 w-6" />}
          label="Home"
          isOpen={sidebar.isOpen}
        />
        <SidebarItem
          icon={<MdTask className="h-6 w-6" />}
          label="My task"
          isOpen={sidebar.isOpen}
        />
        {admin && (
          <>
            <SidebarItem
              icon={<MdTask className="h-6 w-6" />}
              label="All task"
              isOpen={sidebar.isOpen}
            />
            <SidebarItem
              icon={<MdPeopleAlt className="h-6 w-6" />}
              label="Staff"
              isOpen={sidebar.isOpen}
            />
          </>
        )}
      </div>
      <div className="flex w-full items-center justify-center border-t border-gray-500 pt-2 font-bold">
        <SidebarItem
          icon={<FiLogIn className="h-6 w-6" />}
          label={login ? "Sign out" : "Login"}
          isOpen={sidebar.isOpen}
        />
      </div>
    </motion.div>
  );
}

function SidebarItem({
  icon,
  label,
  isOpen,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {isOpen && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="font-semibold"
        >
          {label}
        </motion.h2>
      )}
    </div>
  );
}

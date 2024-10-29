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
  let sidebar = useToggle();
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
            <Link to={"/"}>
              <h1
                className={cn(
                  "text-nowrap text-xl font-bold",
                  sidebar.isOpen ? "" : "hidden",
                )}
              >
                Task Manager
              </h1>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <IoHomeOutline className="h-6 w-6" />
          {sidebar.isOpen && (
            <h2 className={cn("font-semibold", sidebar.isOpen ? "" : "hidden")}>
              Home
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          <MdTask className="h-6 w-6" />
          {sidebar.isOpen && (
            <h2 className={cn("font-semibold", sidebar.isOpen ? "" : "hidden")}>
              My task
            </h2>
          )}
        </div>
        {admin && (
          <div className="flex items-center gap-2">
            <MdTask className="h-6 w-6" />
            {sidebar.isOpen && (
              <h2
                className={cn("font-semibold", sidebar.isOpen ? "" : "hidden")}
              >
                All task
              </h2>
            )}
          </div>
        )}
        {admin && (
          <div className="flex items-center gap-2">
            <MdPeopleAlt className="h-6 w-6" />
            {sidebar.isOpen && (
              <h2
                className={cn("font-semibold", sidebar.isOpen ? "" : "hidden")}
              >
                Staff
              </h2>
            )}
          </div>
        )}
      </div>
      <div className="flex w-full items-center border-t border-gray-500 pt-2 font-bold">
        <div className="flex items-center gap-2">
          <FiLogIn className="h-6 w-6" />
          {sidebar.isOpen && (
            <div>{login ? <div>Sign out</div> : <div>Login</div>}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

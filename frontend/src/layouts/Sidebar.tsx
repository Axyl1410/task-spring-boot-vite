import { motion } from "framer-motion";
import { FiLogIn } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdPeopleAlt, MdTask } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../components/ui/Modal";
import Tooltip from "../components/ui/Tooltip";
import useToggle from "../hooks/useToggle";
import { cn } from "../lib/utils";

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
      <Tooltip direction="right" content={label} isHidden={isOpen}>
        {icon}
      </Tooltip>
      {isOpen && <h2 className="text-nowrap font-semibold">{label}</h2>}
    </div>
  );
}

export default function Sidebar() {
  const admin = "admin" === localStorage.getItem("role");
  const sidebar = useToggle();
  const modal = useToggle();

  return (
    <>
      <motion.div
        className="flex h-screen flex-col items-center justify-between border-r border-gray-500 bg-white px-2 py-4"
        layout
        animate={{ width: sidebar.isOpen ? "240px" : "80px" }}
        transition={{
          duration: 0.3,
          type: "spring",
        }}
      >
        <div
          className={cn(
            "flex flex-col gap-4",
            sidebar.isOpen ? "items-start" : "items-center",
          )}
        >
          <div className="flex items-center gap-1 border-b border-gray-500 pb-2">
            <Tooltip direction="right" content="Menu" isHidden={sidebar.isOpen}>
              <IoMdMenu
                className="h-7 w-7 cursor-pointer"
                onClick={sidebar.toggle}
              />
            </Tooltip>
            {sidebar.isOpen && (
              <Link to="/">
                <h1 className="text-nowrap text-xl font-semibold">
                  Task Manager
                </h1>
              </Link>
            )}
          </div>
          <Link to="/">
            <SidebarItem
              icon={<IoHomeOutline className="h-6 w-6" />}
              label="Home"
              isOpen={sidebar.isOpen}
            />
          </Link>
          <SidebarItem
            icon={<MdTask className="h-6 w-6" />}
            label="My task"
            isOpen={sidebar.isOpen}
          />
          {admin && (
            <>
              <Link to={"/task"}>
                <SidebarItem
                  icon={<MdTask className="h-6 w-6" />}
                  label="All task"
                  isOpen={sidebar.isOpen}
                />
              </Link>
              <Link to={"/user"}>
                <SidebarItem
                  icon={<MdPeopleAlt className="h-6 w-6" />}
                  label="Staff"
                  isOpen={sidebar.isOpen}
                />
              </Link>
            </>
          )}
        </div>
        <div className="flex w-full items-center justify-center border-t border-gray-500 pt-2 font-bold">
          <div className="cursor-pointer" onClick={modal.toggle}>
            <SidebarItem
              icon={<FiLogIn className="h-6 w-6" />}
              label={"Sign out"}
              isOpen={sidebar.isOpen}
            />
          </div>
        </div>
      </motion.div>

      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <div className="flex flex-col gap-2 p-2">
          <h1 className="text-center text-xl font-bold">
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
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("role");
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
    </>
  );
}

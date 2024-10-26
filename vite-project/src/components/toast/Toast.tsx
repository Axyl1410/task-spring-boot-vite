import { motion } from "framer-motion";
import React from "react";
import { cn } from "../lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
      default:
        return "bg-blue-500 text-white";
    }
  };

  const variants = {
    initial: { opacity: 0, y: -50 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.3 }}
      variants={variants}
      className={cn("toast rounded p-2 sm:p-4", getTypeStyles())}
    >
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          &times;
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;

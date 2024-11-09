import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface TooltipProps {
  direction:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  content: React.ReactNode;
  children: React.ReactNode;
  classname?: string;
  isHidden?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  direction,
  content,
  children,
  classname,
  isHidden = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getDirectionStyles = () => {
    switch (direction) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2";
      case "top-left":
        return "bottom-full right-0";
      case "top-right":
        return "bottom-full left-0";
      case "bottom-left":
        return "top-full right-0";
      case "bottom-right":
        return "top-full left-0";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      aria-describedby="tooltip"
      className={cn("relative z-50 inline-block", classname)}
    >
      {children}
      {!isHidden && (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              id="tooltip"
              role="tooltip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "pointer-events-none absolute z-10 mt-1 whitespace-nowrap rounded-sm bg-black/75 p-1 text-sm text-white transition-colors",
                getDirectionStyles(),
              )}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Tooltip;

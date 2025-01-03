import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
            <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="dark:bg-dark relative mx-4 flex items-center justify-center rounded border border-gray-500 bg-white p-6 shadow-lg dark:bg-dark_secondary dark:text-white md:w-1/3"
              >
                <button
                  onClick={onClose}
                  className="absolute -top-2 right-1 text-4xl"
                >
                  &times;
                </button>
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
};

export default Modal;

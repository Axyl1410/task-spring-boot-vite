import { AnimatePresence } from "framer-motion";
import React, { useCallback, useState } from "react";
import Toast from "./Toast";

interface ToastMessage {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
}

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (message: string, type?: "success" | "error" | "info") => {
      const id = Date.now();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
      setTimeout(() => removeToast(id), 3000);
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className="fixed right-2 top-2 z-20 space-y-2 sm:right-4 sm:top-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;

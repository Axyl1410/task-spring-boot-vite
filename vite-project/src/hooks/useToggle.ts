import { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
};

export default useToggle;

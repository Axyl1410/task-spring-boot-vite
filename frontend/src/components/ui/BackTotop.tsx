import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 50 ? setVisible(true) : setVisible(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const variants = {
    initial: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              type: "spring",
              duration: 0.3,
            }}
            variants={variants}
            className="fixed bottom-3 right-3 z-10 cursor-pointer rounded-full border border-white p-1.5 mix-blend-difference transition-colors"
            onClick={visible ? handleClick : undefined}
          >
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 18V2m0 0l7 7m-7-7l-7 7"
                className="stroke-white"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

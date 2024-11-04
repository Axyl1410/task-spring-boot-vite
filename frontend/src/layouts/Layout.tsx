import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      className="flex min-h-screen bg-slate-100 transition dark:bg-dark_primaty"
    >
      <Sidebar />
      <div className="no-scrollbar container h-screen overflow-scroll py-4">
        {children}
      </div>
    </motion.div>
  );
}

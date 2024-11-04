import { motion } from "framer-motion";
import BackToTop from "../components/ui/BackTotop";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      className="flex min-h-screen bg-slate-100 transition dark:bg-dark_primaty"
    >
      <BackToTop />
      <Sidebar />
      <div className="container py-4">{children}</div>
    </motion.div>
  );
}

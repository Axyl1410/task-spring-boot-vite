import { motion } from "framer-motion";
import BackToTop from "../components/ui/BackTotop";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div layout className="flex bg-slate-100">
      <BackToTop />
      <Sidebar />
      <div className="container py-4">{children}</div>
    </motion.div>
  );
}

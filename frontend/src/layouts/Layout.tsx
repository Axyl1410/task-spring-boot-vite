import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div layout className="flex">
      <Sidebar />
      <div className="container py-4">{children}</div>
    </motion.div>
  );
}

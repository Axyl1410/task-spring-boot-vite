import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import type { Task } from "../constants/Task";

export default function Task() {
  const [task, setTask] = useState<Task[]>([]);
  const admin = "admin" === localStorage.getItem("role");
  if (!admin) {
    window.location.href = "/no-permission";
  }

  const fetchTask = async () => {
    try {
      const response = await api.get("api/v1/task/");
      setTask(response.data);
    } catch {
      setTask([]);
    }
  };

  useEffect(() => {
    fetchTask();
  });
  return (
    <Transition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!task.length && <p>Loading...</p>}
        <div className="flex flex-col">
          {task.map((t) => (
            <motion.div
              key={t.id}
              className="flex items-center gap-4"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p>{t.id}</p>
              <p>{t.name}</p>
              <p>{t.description}</p>
              <p>{t.usercreate}</p>
              <p>{t.responsibility}</p>
              <p>{t.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Transition>
  );
}

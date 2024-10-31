import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import type { User } from "../constants/User";
export default function User() {
  const [user, setUser] = useState<User[]>([]);
  const admin = "admin" === localStorage.getItem("role");
  if (!admin) {
    window.location.href = "/no-permission";
  }

  const fetchUser = async () => {
    try {
      const response = await api.get("api/v1/user/");
      setUser(response.data);
    } catch {
      setUser([]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Transition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!user.length && <p>Loading...</p>}
        <div className="flex flex-col">
          {user.map((u) => (
            <motion.div
              key={u.id}
              className="flex items-center gap-4"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p>{u.id}</p>
              <p>{u.username}</p>
              <p>{u.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Transition>
  );
}

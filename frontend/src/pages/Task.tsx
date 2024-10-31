import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import type { Task } from "../constants/Task";

export default function Task() {
  const [task, setTask] = useState<Task[]>([]);

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
      {!task.length && <p>Loading...</p>}
      <div className="flex flex-col">
        {task.map((t) => (
          <div key={t.id} className="flex items-center gap-4">
            <p>{t.id}</p>
            <p>{t.name}</p>
            <p>{t.description}</p>
            <p>{t.usercreate}</p>
            <p>{t.responsibility}</p>
            <p>{t.status}</p>
          </div>
        ))}
      </div>
    </Transition>
  );
}

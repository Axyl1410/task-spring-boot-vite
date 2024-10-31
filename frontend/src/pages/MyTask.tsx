import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import type { Task } from "../constants/Task";
export default function MyTask() {
  const [task, setTask] = useState<Task[]>([]);
  const [taskResponsibility, setTaskResponsibility] = useState<Task[]>([]);

  const fetchTasks = async (
    endpoint: string,
    setter: React.Dispatch<React.SetStateAction<Task[]>>,
  ) => {
    try {
      const response = await api.get(endpoint);
      setter(response.data);
    } catch {
      setter([]);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      fetchTasks(`api/v1/task/usercreate/${username}`, setTask);
      fetchTasks(
        `api/v1/task/responsibility/${username}`,
        setTaskResponsibility,
      );
    }
  }, []);
  return (
    <Transition>
      <div>
        {!task.length && <p>Loading...</p>}
        <h1 className="text-lg font-bold">My Task</h1>
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
      </div>
      <div>
        {!taskResponsibility.length && <p>Loading...</p>}
        <h1 className="text-lg font-bold">Task Responsibility</h1>
        <div className="flex flex-col">
          {taskResponsibility.map((t) => (
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
      </div>
    </Transition>
  );
}

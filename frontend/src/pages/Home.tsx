import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import CheckToken from "../api/CheckToken";
import Transition from "../components/common/Transition";
import CombinedCircularProgress from "../components/ui/CircularProgress";
import { Task } from "../constants/Task";
import { cn } from "../lib/utils";

interface TaskSectionProps {
  title: string;
  tasks: string[];
  gradient: string;
}

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

export default function Home() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const checkToken = async () => {
      const check = await CheckToken();
      if (check === null) return;
      if (!check) {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        if (theme) localStorage.setItem("theme", theme);
        window.location.href = "/login";
      }
    };
    checkToken();
    fetchTasks("api/v1/task/lastest", setTasks);
    fetchTasks("api/v1/task/status/pending", setPendingTasks);
    fetchTasks("api/v1/task/status/in_progress", setInProgressTasks);
    fetchTasks("api/v1/task/status/completed", setCompletedTasks);
  }, []);

  const sections = [
    {
      title: "Latest Task",
      tasks: tasks.map((task) => task.title),
      gradient: "bg-gradient-to-r from-indigo-400 to-indigo-500",
    },
    {
      title: "Pending Task",
      tasks: pendingTasks.map((task) => task.title),
      gradient: "bg-gradient-to-r from-amber-400 to-amber-500",
    },
    {
      title: "In Progress",
      tasks: inProgressTasks.map((task) => task.title),
      gradient: "bg-gradient-to-r from-sky-400 to-sky-500",
    },
    {
      title: "Completed",
      tasks: completedTasks.map((task) => task.title),
      gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    },
  ];

  return (
    <Transition>
      <div className="flex w-full flex-col gap-4">
        <div className="rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white">
          <h1 className="text-lg font-bold">Hello {username}!</h1>
          <p>Your role is {role}</p>
        </div>
        <div className="flex gap-4">
          <div className="w-2/5 rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <CombinedCircularProgress
                inProgressPercentage={inProgressTasks.length}
                completedPercentage={completedTasks.length}
              />
            </div>
          </div>
          <div className="flex h-[252px] w-3/5 items-center justify-center rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white">
            <h1>Coming Soon</h1>
          </div>
        </div>
        <div className="flex gap-4">
          {sections.map((section, index) => (
            <TaskSection key={index} {...section} />
          ))}
        </div>
      </div>
    </Transition>
  );
}

const TaskSection = ({ title, tasks, gradient }: TaskSectionProps) => (
  <div className="relative w-1/4 rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white">
    <h2 className="text-lg font-bold">{title}</h2>
    {tasks.map((task, index) => (
      <p key={index}>- {task}</p>
    ))}
    <div
      className={cn("absolute left-0 top-0 h-1 w-full rounded-t-md", gradient)}
    ></div>
  </div>
);

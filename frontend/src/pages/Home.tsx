import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoMdMenu } from "react-icons/io";
import api from "../api/axiosConfig";
import CheckToken from "../api/CheckToken";
import Transition from "../components/common/Transition";
import { Task } from "../constants/Task";
import useToggle from "../hooks/useToggle";
import Sidebar from "../layouts/SmallSidebar";
import { cn } from "../lib/utils";

interface TaskSectionProps {
  title: string;
  tasks: string[];
  gradient: string;
}

interface CombinedCircularProgressProps {
  pendingPercentage: number;
  inProgressPercentage: number;
  completedPercentage: number;
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

  const sidebar = useToggle();

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
    <>
      <Transition>
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white">
            <div>
              <h1 className="text-lg font-bold">Hello {username}!</h1>
              <p>Your role is {role}</p>
            </div>
            <div className="flex lg:hidden">
              <button
                onClick={sidebar.toggle}
                className="flex items-center gap-2 rounded-md text-sm transition-colors sm:bg-indigo-500 sm:px-4 sm:py-2 sm:text-white sm:hover:bg-indigo-600"
              >
                <IoMdMenu className="h-6 w-6 sm:h-4 sm:w-4" />
                <span className="hidden sm:block">Menu</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white sm:w-2/5">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <CombinedCircularProgress
                  pendingPercentage={pendingTasks.length}
                  inProgressPercentage={inProgressTasks.length}
                  completedPercentage={completedTasks.length}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white sm:w-3/5">
              <h1 className="text-xl font-bold">How to use?</h1>
              <div>
                <p>- Task: you can create a new task, edit or delete it.</p>
                <p>+ Pending: task is waiting for someone to start.</p>
                <p>+ In Progress: task is being done by someone.</p>
                <p>+ Completed: task is done.</p>
                <p>
                  - ps: User Create and Reponsibility can be null temporery.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            {sections.map((section, index) => (
              <TaskSection key={index} {...section} />
            ))}
          </div>
        </div>
      </Transition>
      <Sidebar isOpen={sidebar.isOpen} onClose={sidebar.toggle} />
    </>
  );
}

const TaskSection = ({ title, tasks, gradient }: TaskSectionProps) => (
  <div className="relative rounded-md bg-white p-4 shadow-md transition-colors dark:bg-dark_secondary dark:text-white sm:w-1/4">
    <h2 className="text-lg font-bold">{title}</h2>
    {tasks.map((task, index) => (
      <p key={index}>- {task}</p>
    ))}
    <div
      className={cn("absolute left-0 top-0 h-1 w-full rounded-t-md", gradient)}
    ></div>
  </div>
);

const CombinedCircularProgress: React.FC<CombinedCircularProgressProps> = ({
  pendingPercentage,
  inProgressPercentage,
  completedPercentage,
}) => {
  const totalPercentage =
    inProgressPercentage + completedPercentage + pendingPercentage;
  const inProgressRatio = (inProgressPercentage / totalPercentage) * 100;
  const completedRatio = (completedPercentage / totalPercentage) * 100;
  return (
    <div className="m-2.5 h-52 w-52">
      <CircularProgressbarWithChildren
        value={completedRatio}
        styles={buildStyles({
          pathColor: "#10b981",
          trailColor: "#eee",
          strokeLinecap: "butt",
          textSize: "10px",
        })}
        text={`${completedRatio.toFixed(0)}% compeleted`}
      >
        <CircularProgressbar
          value={inProgressRatio}
          styles={buildStyles({
            trailColor: "transparent",
            strokeLinecap: "butt",
            pathColor: "#0ea5e9",
          })}
        />
      </CircularProgressbarWithChildren>
    </div>
  );
};

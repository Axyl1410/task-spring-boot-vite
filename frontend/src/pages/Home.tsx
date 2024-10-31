import Transition from "../components/common/Transition";

interface TaskSectionProps {
  title: string;
  tasks: string[];
  gradient: string;
}

const TaskSection = ({ title, tasks, gradient }: TaskSectionProps) => (
  <div className="relative w-1/4 rounded-md bg-white p-4">
    <h2 className="text-lg font-bold">{title}</h2>
    {tasks.map((task, index) => (
      <p key={index}>{task}</p>
    ))}
    <div
      className={`absolute left-0 top-0 h-1 w-full rounded-t-md ${gradient}`}
    ></div>
  </div>
);

export default function Home() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const sections = [
    {
      title: "Latest Task",
      tasks: ["Task 1", "Task 2", "Task 3"],
      gradient: "bg-gradient-to-r from-indigo-400 to-indigo-500",
    },
    {
      title: "Pending Task",
      tasks: ["Task 1", "Task 2", "Task 3"],
      gradient: "bg-gradient-to-r from-amber-400 to-amber-500",
    },
    {
      title: "In Progress",
      tasks: ["Task 1", "Task 2", "Task 3"],
      gradient: "bg-gradient-to-r from-sky-400 to-sky-500",
    },
    {
      title: "Completed",
      tasks: ["Task 1", "Task 2", "Task 3"],
      gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    },
  ];

  return (
    <Transition>
      <div className="flex w-full flex-col gap-8">
        <div>
          <h1 className="text-lg font-bold">Hello {username}!</h1>
          <p>Your role is {role}</p>
        </div>
        <div className="flex gap-8">
          {sections.map((section, index) => (
            <TaskSection key={index} {...section} />
          ))}
        </div>
      </div>
    </Transition>
  );
}

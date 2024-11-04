import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import CheckToken from "../api/CheckToken";
import Transition from "../components/common/Transition";
import { useToast } from "../components/toast/ToastContext";
import Modal from "../components/ui/Modal";
import type { Task } from "../constants/Task";
import useToggle from "../hooks/useToggle";
export default function MyTask() {
  const [task, setTask] = useState<Task[]>([]);
  const [taskResponsibility, setTaskResponsibility] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const create = useToggle();
  const edit = useToggle();
  const del = useToggle();
  const { addToast } = useToast();

  const check = CheckToken();
  useEffect(() => {
    if (check === null) return;
    else if (!check) {
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme) localStorage.setItem("theme", theme);
      window.location.href = "/login";
    }
  }, [check]);

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

  const addTask = async () => {
    try {
      const response = await api.post("api/v1/task/create", {
        title: selectedTask?.title,
        description: selectedTask?.description,
        usercreate: selectedTask?.usercreate,
        responsibility: selectedTask?.responsibility,
        status: selectedTask?.status,
        progress: selectedTask?.progress,
      });

      if (response.data) {
        addToast("Add task success", "success");
        create.toggle();
        fetchTasks("api/v1/task/", setTask);
        fetchTasks("api/v1/task/", setTaskResponsibility);
        setSelectedTask(undefined);
      } else addToast("Add task failed", "error");
    } catch {
      addToast("Add task failed", "error");
    }
  };

  const updateTask = async () => {
    try {
      const response = await api.put(`api/v1/task/update/${selectedTask?.id}`, {
        title: selectedTask?.title,
        description: selectedTask?.description,
        usercreate: selectedTask?.usercreate,
        responsibility: selectedTask?.responsibility,
        status: selectedTask?.status,
        progress: selectedTask?.progress,
      });

      if (response.data) {
        addToast("Update task success", "success");
        edit.toggle();
        fetchTasks("api/v1/task/", setTask);
        fetchTasks("api/v1/task/", setTaskResponsibility);
        setSelectedTask(undefined);
      } else addToast("Update task failed", "error");
    } catch {
      addToast("Update task failed", "error");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await api.delete(`api/v1/task/delete/${id}`);
      if (response.data) {
        addToast("Delete task success", "success");
        del.toggle();
        fetchTasks("api/v1/task/", setTask);
        fetchTasks("api/v1/task/", setTaskResponsibility);
        setSelectedTask(undefined);
      } else addToast("Delete task failed", "error");
    } catch {
      addToast("Delete task failed", "error");
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

  const handleTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Task,
  ) => {
    setSelectedTask((prev) => ({ ...prev, [field]: e.target.value }) as Task);
  };

  return (
    <>
      <Transition>
        <div className="dark:bg-dark_secondary flex h-full w-full flex-col gap-4 rounded-md bg-white p-4 shadow-md transition-colors dark:text-white">
          <h1 className="text-2xl font-bold">My Task</h1>
          <div className="flex items-center justify-center gap-2">
            <button
              className="h-fit w-fit text-nowrap rounded bg-indigo-500 p-1.5 text-white transition-colors hover:bg-indigo-600"
              onClick={create.toggle}
            >
              Create Task
            </button>
            <input
              className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
              type="text"
              placeholder="Search task"
            />
          </div>
          {task.length === 0 ? (
            <motion.p
              className="text-center text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No task found
            </motion.p>
          ) : (
            <motion.table
              className="w-full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <thead>
                <tr>
                  <th className="border border-gray-300 py-1">ID</th>
                  <th className="border border-gray-300 py-1">title</th>
                  <th className="border border-gray-300 py-1">User Create</th>
                  <th className="border border-gray-300 py-1">
                    Responsibility
                  </th>
                  <th className="border border-gray-300 py-1">Status</th>
                  <th className="w-52 border border-gray-300 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {task.map((t) => (
                  <tr
                    key={t.id}
                    className="p-2 text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="border border-gray-300">{t.id}</td>
                    <td className="border border-gray-300">{t.title}</td>
                    <td className="border border-gray-300">{t.usercreate}</td>
                    <td className="border border-gray-300">
                      {t.responsibility}
                    </td>
                    <td className="border border-gray-300">{t.status}</td>
                    <td className="space-x-1 border border-gray-300 py-1">
                      <button
                        className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
                        onClick={() => {
                          edit.toggle();
                          setSelectedTask(t);
                        }}
                      >
                        Edit
                      </button>
                      <Link to={`/task/${t.id}`}>
                        <button className="rounded bg-indigo-500 px-2 py-1 text-white transition-colors hover:bg-indigo-600">
                          Detail
                        </button>
                      </Link>
                      <button
                        className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
                        onClick={() => {
                          del.toggle();
                          setSelectedTask(t);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          )}
          <h1 className="text-2xl font-bold">My Responsibility</h1>
          {taskResponsibility.length === 0 ? (
            <motion.p
              className="text-center text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No task found
            </motion.p>
          ) : (
            <motion.table
              className="w-full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <thead>
                <tr>
                  <th className="border border-gray-300 py-1">ID</th>
                  <th className="border border-gray-300 py-1">title</th>
                  <th className="border border-gray-300 py-1">User Create</th>
                  <th className="border border-gray-300 py-1">
                    Responsibility
                  </th>
                  <th className="border border-gray-300 py-1">Status</th>
                  <th className="w-52 border border-gray-300 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {taskResponsibility.map((t) => (
                  <tr
                    key={t.id}
                    className="p-2 text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="border border-gray-300">{t.id}</td>
                    <td className="border border-gray-300">{t.title}</td>
                    <td className="border border-gray-300">{t.usercreate}</td>
                    <td className="border border-gray-300">
                      {t.responsibility}
                    </td>
                    <td className="border border-gray-300">{t.status}</td>
                    <td className="space-x-1 border border-gray-300 py-1">
                      <button
                        className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
                        onClick={() => {
                          edit.toggle();
                          setSelectedTask(t);
                        }}
                      >
                        Edit
                      </button>
                      <Link to={`/task/${t.id}`}>
                        <button className="rounded bg-indigo-500 px-2 py-1 text-white transition-colors hover:bg-indigo-600">
                          Detail
                        </button>
                      </Link>
                      <button
                        className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
                        onClick={() => {
                          del.toggle();
                          setSelectedTask(t);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </div>
      </Transition>
      <Modal isOpen={create.isOpen} onClose={create.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Create Task</h1>
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Title"
            onChange={(e) => handleTask(e, "title")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Description"
            onChange={(e) => handleTask(e, "description")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="User Create"
            onChange={(e) => handleTask(e, "usercreate")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Responsibility"
            onChange={(e) => handleTask(e, "responsibility")}
          />
          <select
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="status"
            id="status"
            onChange={(e) => handleTask(e, "status")}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">Progress</option>
            <option value="completed">Done</option>
          </select>
          <select
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="progress"
            id="progress"
            onChange={(e) => handleTask(e, "progress")}
          >
            <option value="">Choose Progress</option>
            <option value="analyzing">Analyzing</option>
            <option value="developing">Developing</option>
            <option value="test_attempting">Test Attempting</option>
            <option value="test_failed">Test Failed</option>
            <option value="test_success">Test Success</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-500 hover:text-white"
              onClick={create.toggle}
            >
              Cancel
            </button>
            <button
              className="rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
              onClick={() => addTask()}
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={edit.isOpen} onClose={edit.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Edit Task</h1>
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Title"
            value={selectedTask?.title}
            onChange={(e) => handleTask(e, "title")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Description"
            value={selectedTask?.description}
            onChange={(e) => handleTask(e, "description")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="User Create"
            value={selectedTask?.usercreate}
            onChange={(e) => handleTask(e, "usercreate")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Responsibility"
            value={selectedTask?.responsibility}
            onChange={(e) => handleTask(e, "responsibility")}
          />
          <select
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="status"
            id="status"
            value={selectedTask?.status}
            onChange={(e) => handleTask(e, "status")}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">Progress</option>
            <option value="completed">Done</option>
          </select>
          <select
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="progress"
            id="progress"
            value={selectedTask?.progress}
            onChange={(e) => handleTask(e, "progress")}
          >
            <option value="">Choose Progress</option>
            <option value="analyzing">Analyzing</option>
            <option value="developing">Developing</option>
            <option value="test_attempting">Test Attempting</option>
            <option value="test_failed">Test Failed</option>
            <option value="test_success">Test Success</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-500 hover:text-white"
              onClick={edit.toggle}
            >
              Cancel
            </button>
            <button
              className="rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
              onClick={() => updateTask()}
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={del.isOpen} onClose={del.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold text-red-500">Delete Task</h1>
          <p>
            Are you sure you want to delete this task with id {selectedTask?.id}
            ?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-500 hover:text-white"
              onClick={del.toggle}
            >
              Cancel
            </button>
            <button
              className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
              onClick={() => {
                if (selectedTask) deleteTask(selectedTask?.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

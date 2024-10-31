import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import Modal from "../components/ui/Modal";
import type { Task } from "../constants/Task";
import useToggle from "../hooks/useToggle";
export default function MyTask() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [task, setTask] = useState<Task[]>([]);
  const [taskResponsibility, setTaskResponsibility] = useState<Task[]>([]);
  const admin = "admin" === localStorage.getItem("role");
  const create = useToggle();
  const edit = useToggle();
  const del = useToggle();

  if (!admin) {
    window.location.href = "/no-permission";
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
    <>
      <Transition>
        <div className="flex h-full w-full flex-col gap-4 rounded-md bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">My Task</h1>
          <div className="flex items-center justify-center gap-2">
            <button
              className="h-fit w-fit text-nowrap rounded bg-indigo-500 p-1.5 text-white transition-colors hover:bg-indigo-600"
              onClick={create.toggle}
            >
              Create Task
            </button>
            <input
              className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
              type="text"
              placeholder="Search task"
            />
          </div>
          {task.length === 0 ? (
            <motion.p
              className="text-center text-lg font-bold"
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
                  <th className="border border-gray-300 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {task.map((t) => (
                  <tr
                    key={t.id}
                    className="p-2 text-center transition-colors hover:bg-gray-100"
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
              className="text-center text-lg font-bold"
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
                  <th className="border border-gray-300 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {taskResponsibility.map((t) => (
                  <tr
                    key={t.id}
                    className="p-2 text-center transition-colors hover:bg-gray-100"
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
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Title"
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Description"
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="User Create"
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Responsibility"
          />
          <select
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="status"
            id="status"
          >
            <option value="todo">Pending</option>
            <option value="progress">Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            className="rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
            onClick={create.toggle}
          >
            Create
          </button>
        </div>
      </Modal>
      <Modal isOpen={edit.isOpen} onClose={edit.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Edit Task</h1>
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Title"
            value={selectedTask?.title}
            onChange={(e) => {
              if (selectedTask) {
                setSelectedTask({ ...selectedTask, title: e.target.value });
              }
            }}
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Description"
            value={selectedTask?.description}
            onChange={(e) => {
              if (selectedTask) {
                setSelectedTask({
                  ...selectedTask,
                  description: e.target.value,
                });
              }
            }}
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="User Create"
            value={selectedTask?.usercreate}
            onChange={(e) => {
              if (selectedTask) {
                setSelectedTask({
                  ...selectedTask,
                  usercreate: e.target.value,
                });
              }
            }}
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Responsibility"
            value={selectedTask?.responsibility}
            onChange={(e) => {
              if (selectedTask) {
                setSelectedTask({
                  ...selectedTask,
                  responsibility: e.target.value,
                });
              }
            }}
          />
          <select
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="status"
            id="status"
            value={selectedTask?.status}
            onChange={(e) => {
              if (selectedTask) {
                setSelectedTask({ ...selectedTask, status: e.target.value });
              }
            }}
          >
            <option value="todo">Pending</option>
            <option value="progress">Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            className="rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
            onClick={edit.toggle}
          >
            Edit
          </button>
        </div>
      </Modal>
      <Modal isOpen={del.isOpen} onClose={del.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Delete Task</h1>
          <p>
            Are you sure you want to delete this task with id {selectedTask?.id}
            ?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="rounded bg-sky-500 px-2 py-1 text-white transition-colors hover:bg-sky-600"
              onClick={del.toggle}
            >
              Cancel
            </button>
            <button className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

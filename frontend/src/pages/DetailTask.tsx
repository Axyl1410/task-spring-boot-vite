import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import CheckToken from "../api/CheckToken";
import Transition from "../components/common/Transition";
import { useToast } from "../components/toast/ToastContext";
import BackButton from "../components/ui/BackButton";
import Modal from "../components/ui/Modal";
import type { Task } from "../constants/Task";
import useToggle from "../hooks/useToggle";

export default function DetailTask() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task>();
  const [selectedTask, setSelectedTask] = useState<Task>();

  const checkToken = CheckToken();
  if (!checkToken) {
    localStorage.clear();
    window.location.href = "/login";
  }

  const edit = useToggle();
  const del = useToggle();
  const { addToast } = useToast();

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
        edit.toggle();
        window.location.reload();
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
        setSelectedTask(undefined);
        window.location.href = "/task";
      } else addToast("Delete task failed", "error");
    } catch {
      addToast("Delete task failed", "error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`api/v1/task/${id}`);
      if (response.data.error)
        addToast(response.data.error || "Get task failed", "error");
      else {
        setTask(response.data.task);
        setSelectedTask(response.data.task);
      }
    } catch {
      addToast("Get task failed", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Task,
  ) => {
    setSelectedTask((prev) => ({ ...prev, [field]: e.target.value }) as Task);
  };

  return (
    <>
      <Transition>
        <div className="flex flex-col rounded-md bg-white p-4">
          <h1 className="text-2xl font-bold">
            {task?.title ? task?.title : "Null"}
          </h1>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">
                Progress: {task?.progress ? task?.progress : "Null"}
              </p>
              <p className="text-gray-500">
                Status: {task?.status ? task?.status : "Null"}
              </p>
              <p className="text-gray-500">
                Create by: {task?.usercreate ? task?.usercreate : "Null"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">
                Reponsibility:{" "}
                {task?.responsibility ? task?.responsibility : "Null"}
              </p>
              <p className="text-gray-500">
                Task id: {task?.id ? task?.id : "Null"}
              </p>
              <div className="flex gap-2">
                <button
                  className="rounded-sm bg-sky-500 px-2 py-1 text-white transition-colors hover:bg-sky-600"
                  onClick={edit.toggle}
                >
                  Edit
                </button>
                <button
                  className="rounded-sm bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
                  onClick={del.toggle}
                >
                  Delete
                </button>
                <BackButton classValue="border border-gray-500 px-2 py-1  hover:bg-gray-500 hover:text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col rounded-md bg-white p-4">
          <h1 className="text-2xl font-bold">Description</h1>
          <p className="text-gray-500">
            {task?.description ? task?.description : "Null"}
          </p>
        </div>
      </Transition>
      <Modal isOpen={edit.isOpen} onClose={edit.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Edit Task</h1>
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Title"
            value={selectedTask?.title}
            onChange={(e) => handleTask(e, "title")}
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Description"
            value={selectedTask?.description}
            onChange={(e) => handleTask(e, "description")}
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="User Create"
            value={selectedTask?.usercreate}
            onChange={(e) => handleTask(e, "usercreate")}
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Responsibility"
            value={selectedTask?.responsibility}
            onChange={(e) => handleTask(e, "responsibility")}
          />
          <select
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="status"
            id="status"
            value={selectedTask?.status}
            onChange={(e) => handleTask(e, "status")}
          >
            <option value="">Choose Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">Progress</option>
            <option value="completed">Done</option>
          </select>
          <select
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
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
            Are you sure you want to delete this task with id {selectedTask?.id}{" "}
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

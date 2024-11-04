import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import CheckToken from "../api/CheckToken";
import Transition from "../components/common/Transition";
import { useToast } from "../components/toast/ToastContext";
import Modal from "../components/ui/Modal";
import type { User } from "../constants/User";
import useToggle from "../hooks/useToggle";

export default function User() {
  const [user, setUser] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  const create = useToggle();
  const edit = useToggle();
  const del = useToggle();
  const { addToast } = useToast();

  useEffect(() => {
    const checkToken = async () => {
      const check = await CheckToken();
      if (check === null) return;
      if (!check) {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        if (theme) localStorage.setItem("theme", theme);
        window.location.href = "/login";
      } else {
        const admin = "admin" === localStorage.getItem("role");
        !admin ? (window.location.href = "/no-permission") : fetchUser();
      }
    };
    checkToken();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("api/v1/user/");
      setUser(response.data);
    } catch {
      setUser([]);
    }
  };

  const addUser = async () => {
    try {
      const response = await api.post("api/v1/user/create", {
        username: selectedUser?.username,
        password: selectedUser?.password,
        role: selectedUser?.role,
      });

      if (response.data) {
        addToast("Add user success", "success");
        fetchUser();
        create.toggle();
        setSelectedUser(undefined);
      } else {
        addToast("Add user failed", "error");
      }
    } catch {
      addToast("Add user failed", "error");
    }
  };

  const updateUser = async () => {
    try {
      const response = await api.put(`api/v1/user/update/${selectedUser?.id}`, {
        username: selectedUser?.username,
        password: selectedUser?.password,
        role: selectedUser?.role,
      });
      if (response.data) {
        addToast("Update user success", "success");
        fetchUser();
        edit.toggle();
        setSelectedUser(undefined);
      } else {
        addToast("Update user failed", "error");
      }
    } catch {
      addToast("Update user failed", "error");
    }
  };

  const deleteUser = async (username: string) => {
    try {
      const response = await api.delete(`api/v1/user/delete/${username}`);
      if (response.data.success) {
        addToast(response.data.success || "Delete user success", "success");
        fetchUser();
        del.toggle();
        setSelectedUser(undefined);
      } else {
        addToast(response.data.error || "Delete user failed", "error");
      }
    } catch {
      addToast("Delete user failed", "error");
    }
  };

  const handleUser = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof User,
  ) => {
    setSelectedUser((prev) => ({ ...prev, [field]: e.target.value }) as User);
  };

  return (
    <>
      <Transition>
        <div className="dark:bg-dark_secondary flex h-full w-full flex-col gap-4 rounded-md bg-white p-4 shadow-md transition-colors dark:text-white">
          <h1 className="text-2xl font-bold">User Manager</h1>
          <div className="flex items-center justify-center gap-2">
            <button
              className="h-fit w-fit text-nowrap rounded bg-indigo-500 p-1.5 text-white transition-colors hover:bg-indigo-600"
              onClick={create.toggle}
            >
              Create User
            </button>
            <input
              className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
              type="text"
              placeholder="Search user"
            />
          </div>
          {user.length === 0 ? (
            <motion.p
              className="text-center text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No user found
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
                  <th className="border border-gray-300 py-1">Username</th>
                  <th className="border border-gray-300 py-1">Role</th>
                  <th className="w-52 border border-gray-300 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((u) => (
                  <tr
                    key={u.id}
                    className="p-2 text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="border border-gray-300">{u.id}</td>
                    <td className="border border-gray-300">{u.username}</td>
                    <td className="border border-gray-300">{u.role}</td>
                    <td className="space-x-1 border border-gray-300 py-1">
                      <button
                        className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
                        onClick={() => {
                          edit.toggle();
                          setSelectedUser(u);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
                        onClick={() => {
                          del.toggle();
                          setSelectedUser(u);
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
          <h1 className="text-2xl font-bold">Create User</h1>
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Username"
            onChange={(e) => handleUser(e, "username")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="password"
            placeholder="Password"
            onChange={(e) => handleUser(e, "password")}
          />
          <select
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            onChange={(e) => handleUser(e, "role")}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-500 hover:text-white"
              onClick={create.toggle}
            >
              Cancel
            </button>
            <button
              className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
              onClick={() => addUser()}
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={edit.isOpen} onClose={edit.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Edit User</h1>
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Username"
            value={selectedUser?.username || ""}
            onChange={(e) => handleUser(e, "username")}
          />
          <input
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="password"
            placeholder="Password"
            value={selectedUser?.password || ""}
            onChange={(e) => handleUser(e, "password")}
          />
          <select
            className="dark:bg-dark_secondary w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            value={selectedUser?.role || ""}
            onChange={(e) => handleUser(e, "role")}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-500 hover:text-white"
              onClick={edit.toggle}
            >
              Cancel
            </button>
            <button
              className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
              onClick={() => updateUser()}
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={del.isOpen} onClose={del.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold text-red-500">Delete User</h1>
          <p>
            Are you sure you want to delete this user with username{" "}
            <code>{selectedUser?.username}</code>? This action cannot be undone.
          </p>
          <p>
            Please note that deleting this user will also delete all tasks that
            are related to this user.
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border border-gray-500 px-2 py-1 transition-colors hover:bg-gray-600 hover:text-white"
              onClick={del.toggle}
            >
              Cancel
            </button>
            <button
              className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
              onClick={() => deleteUser(selectedUser?.username || "")}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

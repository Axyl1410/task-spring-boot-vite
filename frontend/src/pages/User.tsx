import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import Modal from "../components/ui/Modal";
import type { User } from "../constants/User";
import useToggle from "../hooks/useToggle";
export default function User() {
  const [user, setUser] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const admin = "admin" === localStorage.getItem("role");
  const create = useToggle();
  const edit = useToggle();
  const del = useToggle();
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
    <>
      <Transition>
        <div className="flex h-full w-full flex-col gap-4 rounded-md bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">User Manager</h1>
          <div className="flex items-center justify-center gap-2">
            <button
              className="h-fit w-fit text-nowrap rounded bg-indigo-500 p-1.5 text-white transition-colors hover:bg-indigo-600"
              onClick={create.toggle}
            >
              Create User
            </button>
            <input
              className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
              type="text"
              placeholder="Search user"
            />
          </div>
          {user.length === 0 ? (
            <motion.p
              className="text-center text-lg font-bold"
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
                  <th className="border border-gray-300 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((u) => (
                  <tr
                    key={u.id}
                    className="p-2 text-center transition-colors hover:bg-gray-100"
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
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Username"
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="password"
            placeholder="Password"
          />
          <select
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            name="role"
            id="role"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
              onClick={create.toggle}
            >
              Cancel
            </button>
            <button className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600">
              Create
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={edit.isOpen} onClose={edit.toggle}>
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-2xl font-bold">Edit User</h1>
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="text"
            placeholder="Username"
            value={selectedUser?.username || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                username: e.target.value,
                id: selectedUser?.id || 0,
                password: selectedUser?.password || "",
                role: selectedUser?.role || "",
              })
            }
          />
          <input
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            type="password"
            placeholder="Password"
            value={selectedUser?.password || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                password: e.target.value,
                id: selectedUser?.id || 0,
                username: selectedUser?.username || "",
                role: selectedUser?.role || "",
              })
            }
          />
          <select
            className="dark:bg-dark w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm"
            value={selectedUser?.role || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                role: e.target.value,
                id: selectedUser?.id || 0,
                username: selectedUser?.username || "",
                password: selectedUser?.password || "",
              })
            }
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
              onClick={edit.toggle}
            >
              Cancel
            </button>
            <button className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600">
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

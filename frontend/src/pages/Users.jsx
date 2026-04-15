import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "user" });

  const { user } = useSelector((state) => state.auth);

  console.log("🔥 FULL USER OBJECT:", user);

  const role =
    user?.role ||
    user?.user?.role ||
    user?.data?.role ||
    "";

  console.log("🔥 EXTRACTED ROLE:", role);

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      console.log("🔥 USERS DATA:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.log(" GET USERS ERROR:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (u) => {
    console.log(" START EDIT:", u);
    setEditingId(u._id);
    setEditData({ name: u.name, role: u.role });
  };

  const saveEdit = async (id) => {
    console.log(" SAVING:", id, editData);

    try {
      const res = await API.put(`/users/${id}`, editData);
      console.log(" UPDATE RESPONSE:", res.data);

      setEditingId(null);
      loadUsers();
    } catch (err) {
      console.log(" UPDATE ERROR:", err.response || err);
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  const deleteUser = async (id) => {
    console.log("🗑 DELETE:", id);
    await API.delete(`/users/${id}`);
    loadUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      {users.map((u) => {
        const userRole = u.role?.toLowerCase();

        return (
          <div
            key={u._id}
            style={{
              background: "#fff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            {editingId === u._id ? (
              <>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />

              
                {console.log("🧠 CHECK:", role, "TARGET:", userRole)}

                {(role === "admin" || role === "manager") &&
                  userRole !== "admin" && (
                    <select
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                    </select>
                  )}

                <button onClick={() => saveEdit(u._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <b>{u.name}</b> - {u.email} - {u.role}

                {console.log("👉 BUTTON CHECK:", role, userRole)}

                {(role === "admin" || role === "manager") &&
                  userRole !== "admin" && (
                    <button onClick={() => startEdit(u)}>Edit</button>
                  )}

                {role === "admin" && user?._id !== u._id && (
                  <button onClick={() => deleteUser(u._id)}>Delete</button>
                )}

                <div style={{ fontSize: "12px", color: "gray" }}>
                  Created:{" "}
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleString()
                    : "N/A"}
                  <br />
                  Updated:{" "}
                  {u.updatedAt
                    ? new Date(u.updatedAt).toLocaleString()
                    : "N/A"}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Users;
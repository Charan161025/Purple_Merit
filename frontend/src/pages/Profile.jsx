import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "user" });

  const auth = useSelector((state) => state.auth);
  
  const userObj = auth?.user?.user || auth?.user || {};
  const role = (userObj.role || "").toLowerCase().trim();

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (u) => {
    setEditingId(u._id);
    setEditData({ name: u.name, role: u.role });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/users/${id}`, editData);
      setEditingId(null);
      loadUsers();
    } catch (err) {
      alert("Update failed");
    }
  };

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>User Management</h2>
      
      <div style={{ background: "#eee", padding: "10px", marginBottom: "20px", borderRadius: "5px", fontSize: "12px" }}>
        <strong>Debug Info:</strong> <br />
        Logged in as: {userObj.email || "Unknown"} <br />
        Detected Role: <span style={{ color: "red", fontWeight: "bold" }}>{role || "NOT FOUND"}</span>
      </div>

      {users.map((u) => {
        const targetRole = (u.role || "").toLowerCase().trim();
        const canEdit = (role === "admin" || role === "manager") && targetRole !== "admin";

        return (
          <div
            key={u._id}
            style={{
              background: "#f4f4f4",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column", 
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {editingId === u._id ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                  <select
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    {role === "admin" && <option value="admin">Admin</option>}
                  </select>
                  <button onClick={() => saveEdit(u._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <span>
                    <strong>{u.name}</strong> - {u.email} - <span style={{ color: "#2c3e50", fontWeight: "bold" }}>{u.role}</span>
                  </span>
                  
                  {canEdit && (
                    <button 
                      onClick={() => startEdit(u)}
                      style={{ padding: "5px 15px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: "4px" }}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>

         
            <div style={{ 
              display: "flex", 
              gap: "20px", 
              fontSize: "12px", 
              color: "#666", 
              borderTop: "1px solid #ddd", 
              paddingTop: "8px" 
            }}>
              <span>
                <strong>Created At:</strong> {formatDate(u.createdAt)}
              </span>
              <span>
                <strong>Updated At:</strong> {formatDate(u.updatedAt)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
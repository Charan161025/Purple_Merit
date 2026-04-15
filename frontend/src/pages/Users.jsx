import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "user" });
  
  
  const [showCreate, setShowCreate] = useState(false);
  const [newData, setNewData] = useState({ name: "", email: "", password: "", role: "user" });

  const { user } = useSelector((state) => state.auth);

  const role = (user?.role || user?.user?.role || user?.data?.role || "").toLowerCase();

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log("GET USERS ERROR:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", newData);
      setNewData({ name: "", email: "", password: "", role: "user" });
      setShowCreate(false);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Creation failed");
    }
  };

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
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await API.delete(`/users/${id}`);
      loadUsers();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

  
      {role === "admin" && (
        <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <button onClick={() => setShowCreate(!showCreate)}>
            {showCreate ? "Cancel" : "Add New User"}
          </button>

          {showCreate && (
            <form onSubmit={handleCreateUser} style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input 
                placeholder="Name" 
                value={newData.name} 
                onChange={(e) => setNewData({...newData, name: e.target.value})} 
                required 
              />
              <input 
                placeholder="Email" 
                type="email" 
                value={newData.email} 
                onChange={(e) => setNewData({...newData, email: e.target.value})} 
                required 
              />
              <input 
                placeholder="Password" 
                type="password" 
                value={newData.password} 
                onChange={(e) => setNewData({...newData, password: e.target.value})} 
                required 
              />
              <select 
                value={newData.role} 
                onChange={(e) => setNewData({...newData, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
              <button type="submit" style={{ background: "green", color: "white" }}>Create</button>
            </form>
          )}
        </div>
      )}

      
      {users.map((u) => {
        const userRole = u.role?.toLowerCase();

        return (
          <div
            key={u._id}
            style={{
              background: "#fff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            {editingId === u._id ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />

                {(role === "admin" || role === "manager") && userRole !== "admin" && (
                  <select
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    {role === "admin" && <option value="admin">Admin</option>}
                  </select>
                )}

                <button onClick={() => saveEdit(u._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <b>{u.name}</b> - {u.email} - <span style={{ color: "blue" }}>{u.role}</span>
                </span>

                <div style={{ display: "flex", gap: "10px" }}>
                  {(role === "admin" || role === "manager") && userRole !== "admin" && (
                    <button onClick={() => startEdit(u)}>Edit</button>
                  )}

                  {role === "admin" && user?._id !== u._id && (
                    <button onClick={() => deleteUser(u._id)} style={{ color: "red" }}>Delete</button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Users;

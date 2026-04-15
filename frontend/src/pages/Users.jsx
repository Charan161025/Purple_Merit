import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const { user } = useSelector((state) => state.auth);


  const loadUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  
  const createUser = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await API.post("/users", form);

      setMessage(res.data.msg);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user"
      });

      await loadUsers();

      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      setMessage(err.response?.data?.msg || "Error creating user");
    }
  };


  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      await loadUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  
  const updateUser = async (id, role) => {
    await API.put(`/users/${id}`, { role });
    await loadUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      
      {user?.role === "admin" && (
        <div style={{
          background: "#ffffffcc",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <h3>Create User</h3>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <select
            value={form.role}
            onChange={(e)=>setForm({...form,role:e.target.value})}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>

          <button onClick={createUser}>Create User</button>

          {message && (
            <p style={{
              marginTop: "10px",
              color: message.toLowerCase().includes("success") ? "green" : "red"
            }}>
              {message}
            </p>
          )}
        </div>
      )}

      {users.map((u) => (
        <div key={u._id} style={{
          background: "#ffffffcc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <b>{u.name}</b> - {u.email} - {u.role}

          {user?.role === "admin" && user._id !== u._id && (
            <>
              <button onClick={() => deleteUser(u._id)}>
                Delete
              </button>

              <select
                value={u.role}
                onChange={(e)=>updateUser(u._id, e.target.value)}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;
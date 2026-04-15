import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { loginUser } from "../features/auth/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ name:"", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(form);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.9)",
        padding: "30px",
        borderRadius: "12px",
        width: "320px",
        textAlign: "center"
      }}>
        <h2>Login</h2>

        <input
          placeholder="Name"
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Email"
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#2a5298",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
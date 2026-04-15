import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import API from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");

  const updateProfile = async () => {
    try {
      await API.put("/users/me", { name, password });

    
      dispatch(loginSuccess({
        user: { ...user, name },
        token
      }));

      alert("Profile updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{padding:"20px"}}>
      <h2>My Profile</h2>

      <div style={{
        background:"#ffffff20",
        padding:"20px",
        borderRadius:"10px",
        maxWidth:"400px"
      }}>
        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Name"
          style={{width:"100%", marginBottom:"10px", padding:"8px"}}
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e)=>setPassword(e.target.value)}
          style={{width:"100%", marginBottom:"10px", padding:"8px"}}
        />

        <button onClick={updateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
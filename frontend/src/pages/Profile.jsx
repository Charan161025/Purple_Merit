import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  
 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const auth = useSelector((state) => state.auth);
  const userFromRedux = auth?.user?.user || auth?.user || {};

  const fetchFreshProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setProfileData(res.data);
      setFormData({ name: res.data.name, email: res.data.email, password: "" });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfileData(userFromRedux);
      setFormData({ name: userFromRedux.name, email: userFromRedux.email, password: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreshProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatePayload = { name: formData.name, email: formData.email };
      if (formData.password) updatePayload.password = formData.password;

      await API.put("/auth/profile", updatePayload);
      alert("Profile updated successfully!");
      setIsEditing(false);
      fetchFreshProfile(); // Refresh data to show new timestamps
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  const role = (profileData?.role || "").toLowerCase().trim();
  const isRegularUser = role === "user";

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h2>My Profile</h2>
      
      <div style={{ 
        background: "#f4f4f4", padding: "25px", borderRadius: "10px", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)", border: "1px solid #ddd" 
      }}>
        {!isEditing ? (
          <>
            <div style={{ marginBottom: "15px" }}>
              <strong>Name:</strong> {profileData?.name}
            </div>
            <div style={{ marginBottom: "15px" }}>
              <strong>Email:</strong> {profileData?.email}
            </div>
            <div style={{ marginBottom: "15px" }}>
              <strong>Role:</strong> 
              <span style={{ 
                marginLeft: "10px", padding: "4px 12px", background: "#2c3e50", 
                color: "white", borderRadius: "20px", fontSize: "14px" 
              }}>{profileData?.role}</span>
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              style={{ padding: "8px 20px", cursor: "pointer", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label>Name:</label>
            <input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            
            <label>Email:</label>
            <input 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />

            <label>New Password (leave blank to keep current):</label>
            <input 
              type="password"
              placeholder="******"
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button type="submit" style={{ padding: "8px 20px", background: "green", color: "white", border: "none", borderRadius: "5px" }}>Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} style={{ padding: "8px 20px", background: "gray", color: "white", border: "none", borderRadius: "5px" }}>Cancel</button>
            </div>
          </form>
        )}

        {isRegularUser && !isEditing && (
          <div style={{ 
            marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #ddd", 
            fontSize: "13px", color: "#666", display: "flex", flexDirection: "column", gap: "5px" 
          }}>
            <span><strong>Account Created:</strong> {formatDate(profileData?.createdAt)}</span>
            <span><strong>Last Updated:</strong> {formatDate(profileData?.updatedAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

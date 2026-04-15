import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  
  const auth = useSelector((state) => state.auth);
  
  
  const currentUser = auth?.user?.user || auth?.user || {};
  const role = (currentUser.role || "").toLowerCase().trim();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        
        const res = await API.get(`/users/${currentUser._id}`);
        setProfileData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      
        setProfileData(currentUser);
      }
    };

    if (currentUser._id) {
      loadProfile();
    }
  }, [currentUser._id, currentUser]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString(); 
  };

  if (!profileData) return <div style={{ padding: "20px" }}>Loading...</div>;

  
  const isRegularUser = role === "user";

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h2>My Profile</h2>
      
      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column", 
          gap: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          border: "1px solid #ddd"
        }}
      >
        <div style={{ fontSize: "18px" }}>
          <strong>Name:</strong> {profileData.name}
        </div>
        
        <div style={{ fontSize: "16px" }}>
          <strong>Email:</strong> {profileData.email}
        </div>

        <div style={{ fontSize: "16px" }}>
          <strong>Role:</strong> 
          <span style={{ 
            marginLeft: "10px", 
            padding: "4px 12px", 
            background: "#2c3e50", 
            color: "white", 
            borderRadius: "20px",
            fontSize: "14px",
            textTransform: "capitalize"
          }}>
            {profileData.role}
          </span>
        </div>

        
        {isRegularUser && (
          <div style={{ 
            marginTop: "10px",
            paddingTop: "15px", 
            borderTop: "1px solid #ccc",
            fontSize: "13px", 
            color: "#444",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            <div style={{ background: "#fff", padding: "10px", borderRadius: "4px", border: "1px solid #eee" }}>
              <strong>Created At:</strong> {formatDate(profileData.createdAt)}
            </div>
            <div style={{ background: "#fff", padding: "10px", borderRadius: "4px", border: "1px solid #eee" }}>
              <strong>Updated At:</strong> {formatDate(profileData.updatedAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  
  const auth = useSelector((state) => state.auth);
  const currentUser = auth?.user?.user || auth?.user || {};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const res = await API.get(`/users/${currentUser._id}`);
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        
        setProfileData(currentUser);
      }
    };

    if (currentUser._id) {
      fetchProfile();
    }
  }, [currentUser._id, currentUser]);

  if (!profileData) return <div style={{ padding: "20px" }}>Loading...</div>;

 
  const role = (profileData.role || "").toLowerCase().trim();
  const isRegularUser = role === "user";

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>
      
      <div style={{ 
        background: "#fff", 
        padding: "20px", 
        borderRadius: "10px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #eee"
      }}>
        <p><strong>Name:</strong> {profileData.name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Role:</strong> {profileData.role}</p>

        
        {isRegularUser && (
          <div style={{ 
            marginTop: "20px", 
            paddingTop: "15px", 
            borderTop: "1px solid #ddd", 
            fontSize: "14px", 
            color: "#555" 
          }}>
            <p>
              <strong>Created:</strong> {profileData.createdAt ? new Date(profileData.createdAt).toLocaleString() : "N/A"}
            </p>
            <p>
              <strong>Updated:</strong> {profileData.updatedAt ? new Date(profileData.updatedAt).toLocaleString() : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
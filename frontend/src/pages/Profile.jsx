import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const userFromRedux = auth?.user?.user || auth?.user || {};

  useEffect(() => {
    const fetchFreshProfile = async () => {
      try {
        const res = await API.get("/auth/profile"); 
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching fresh profile:", err);
        setProfileData(userFromRedux);
      } finally {
        setLoading(false);
      }
    };

    fetchFreshProfile();
  }, [userFromRedux]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
   
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString(); 
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading profile...</div>;

  
  const role = (profileData?.role || "").toLowerCase().trim();
  const isRegularUser = role === "user";

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>
      
      <div style={{ 
        background: "#f4f4f4", 
        padding: "20px", 
        borderRadius: "8px", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <div style={{ fontSize: "18px" }}>
          <strong>Name:</strong> {profileData?.name}
        </div>
        
        <div style={{ fontSize: "16px" }}>
          <strong>Email:</strong> {profileData?.email}
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
            {profileData?.role}
          </span>
        </div>

        
        {isRegularUser && (
          <div style={{ 
            marginTop: "10px", 
            paddingTop: "15px", 
            borderTop: "1px solid #ddd", 
            fontSize: "13px", 
            color: "#666",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
          }}>
            <span>
              <strong>Account Created:</strong> {formatDate(profileData?.createdAt)}
            </span>
            <span>
              <strong>Last Updated:</strong> {formatDate(profileData?.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
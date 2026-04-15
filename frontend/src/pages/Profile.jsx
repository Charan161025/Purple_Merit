
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const role = (user?.role || "").toLowerCase().trim();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>My Profile</h2>
      <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", maxWidth: "400px" }}>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

      
        {role === "user" && (
          <div style={{ marginTop: "15px", paddingTop: "10px", borderTop: "1px solid #ddd", fontSize: "13px", color: "#555" }}>
            <p><strong>Created At:</strong> {formatDate(user?.createdAt)}</p>
            <p><strong>Updated At:</strong> {formatDate(user?.updatedAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
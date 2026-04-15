import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "30px" }}>
      <div style={{
        background: "rgba(255,255,255,0.9)",
        padding: "20px",
        borderRadius: "10px"
      }}>
        <h1>Welcome, {user?.name}</h1>
        <h3>{user?.role.toUpperCase()} PANEL</h3>
      </div>
    </div>
  );
};

export default Dashboard;
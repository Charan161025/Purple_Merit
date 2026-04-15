import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "rgba(0,0,0,0.7)",
        color: "white"
      }}
    >
      <div>
        <Link to="/dashboard" style={{ marginRight: "15px", color: "white" }}>
          Dashboard
        </Link>
        <Link to="/users" style={{ marginRight: "15px", color: "white" }}>
          Users
        </Link>
        <Link to="/profile" style={{ color: "white" }}>
          Profile
        </Link>
      </div>

      <div>
        👤 {user?.name}
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          style={{
            marginLeft: "15px",
            padding: "6px 10px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
import API from "../../api/axios";

export const fetchUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};
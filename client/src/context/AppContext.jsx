import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-users"
      );
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const getSkills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/skills/get-skills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSkills(data.skills);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((token)) {
      getSkills();
    }
  }, [token]);

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setUser(data.user);
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  const value = {
    token,
    setToken,
    skills,
    setSkills,
    getUserProfile,
    user,
    users,
    getSkills,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

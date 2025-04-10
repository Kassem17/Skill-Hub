import axios from "axios";
import { createContext, use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState([]);
  const [usersData, setUsersData] = useState({});



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
    if (token) {
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

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-users"
      );
      if (data.success) {
        setUsersData(data.users);
        console.log(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const value = {
    token,
    setToken,
    skills,
    setSkills,
    getUserProfile,
    user,
    usersData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

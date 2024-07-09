import React, { useEffect, useState } from "react";
import GenralContext from "./GenralContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GenralState = (props) => {
  const backendHost = "https://habbitofy-backend.onrender.com";

  const handleOnChange = (e, state, setState) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const authMiddlware = async () => {
    try {
      await axios.post(
        `${backendHost}/api/auth/get-user`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error?.response?.status === 404) {
        navigate("/auth/login");
      } else {
        console.error(error);
        navigate("/auth/login");
      }
    }
  };

  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.post(
          `${backendHost}/api/auth/get-user`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response?.status === 200) {
          console.log(response?.data);
          setUserData(response?.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [backendHost]);

  return (
    <GenralContext.Provider
      value={{ backendHost, handleOnChange, authMiddlware, userData }}
    >
      {props.children}
    </GenralContext.Provider>
  );
};

export default GenralState;

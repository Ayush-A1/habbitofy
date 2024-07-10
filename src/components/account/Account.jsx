import React, { useContext, useEffect, useState } from "react";
import GenralContext from "../../context/GenralContext";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [formType, setFormType] = useState("LOGIN");

  const { backendHost, handleOnChange } = useContext(GenralContext);
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
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
          navigate("/");
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          navigate("/auth/login");
        } else {
          console.error(error);
          navigate("/auth/login");
        }
      }
    })();
    // eslint-disable-next-line
  }, [backendHost]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      if (formType === "LOGIN" || formType === "REGISTER") {
        const response = await axios.post(
          `${backendHost}/api/auth/manual/${formType.toLowerCase()}`,
          { ...formData },
          {
            withCredentials: true,
          }
        );

        if (response?.status === 200) {
          toast.success("Login Success");
          navigate("/");
        } else if (response?.status === 201) {
          toast.success("Register Success");
        }
      } else {
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 ">
      <div className="p-6 rounded shadow-md w-full max-w-sm backdrop-blur-md bg-[#ffffff40]">
        <form className="w-full" onSubmit={(e) => handleFormSubmit(e)}>
          {formType === "REGISTER" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-75"
                type="text"
                name="name"
                onChange={(e) => {
                  handleOnChange(e, formData, setFormData);
                }}
                disabled={isProcessing}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-75"
              type="email"
              required
              name="email"
              onChange={(e) => {
                handleOnChange(e, formData, setFormData);
              }}
              disabled={isProcessing}
              title="Please enter a valid email address"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-75"
              type="password"
              disabled={isProcessing}
              name="password"
              required
              onChange={(e) => {
                handleOnChange(e, formData, setFormData);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="relative bottom-0 flex justify-center items-center space-x-2 bg-gradient-to-br from-primary-main to-primary-brighter rounded-md shadow-md shadow-neutral-3 duration-200 hover:shadow-lg hover:shadow-neutral-4 hover:opacity-80 active:bottom-1.5 p-2 self-center text-neutral-1 mx-auto disabled:opacity-75"
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing === true && (
                <CgSpinner className="me-1 animate-spin" />
              )}
              {formType === "REGISTER" ? "Register" : "Login"}
            </button>
          </div>

          <div className="mt-4">
            <span className="text-sm block text-center cursor-pointer">
              {formType === "LOGIN"
                ? "Not registered yet? "
                : "Already have account? "}
              <span
                className="text-primary-main underline"
                onClick={() => {
                  setFormType(formType === "LOGIN" ? "REGISTER" : "LOGIN");
                }}
              >
                {formType === "LOGIN" ? "register" : "login"}
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;

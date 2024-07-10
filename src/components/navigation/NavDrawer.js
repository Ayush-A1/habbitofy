import { useContext, useState } from "react";
import classNames from "classnames";

import { IoReorderThreeOutline } from "react-icons/io5";
import { MdHome, MdCheckCircle, MdBarChart } from "react-icons/md";
import { FiTarget } from "react-icons/fi";
import { RiAccountCircleFill } from "react-icons/ri";

import Icon from "../other/Icon";
import NavDrawerLink from "./NavDrawerLink";
import GenralContext from "../../context/GenralContext";
import { FaUserSecret } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NavDrawer() {
  const [isOpen, setIsOpen] = useState(null);

  const navDrawerClass = classNames(
    "relative",
    "z-20",
    "inline-flex",
    "flex-col",
    "space-y-2",
    "h-screen",
    "pt-[4.5rem]",
    "pb-[4.5rem]",
    "pl-4",
    "pr-6",
    "bg-gradient-to-b",
    "from-secondary",
    "to-accent",
    "shadow-[3px_0_12px_black]",
    {
      "animate-open-nav-drawer": isOpen,
      "max-lg:animate-close-nav-drawer lg:inline-flex": isOpen === false,
      "hidden lg:inline-flex": isOpen === null,
    }
  );

  const darkeningAreaClass = classNames(
    "absolute",
    "z-10",
    "top-0",
    "left-0",
    "h-screen",
    "w-screen",
    "bg-[rgba(0,_0,_0,_0.6)]",
    {
      "animate-show-darkening-area lg:hidden": isOpen,
      "animate-hide-darkening-area lg:hidden": isOpen === false,
      hidden: isOpen === null,
    }
  );

  const { userData, backendHost } = useContext(GenralContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let response = await axios.post(
        `${backendHost}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response?.status === 200) {
        localStorage.removeItem("persist:root");
        toast.success("Logout Success");
        window?.location?.reload();
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Icon
        icon={
          <IoReorderThreeOutline
            className="fixed z-30 top-4 left-4 w-10 h-10 duration-200 hover:opacity-80 sm:top-6 sm:left-6 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
        }
        color={isOpen ? "white" : "#3A4874"}
      />
      {console.log(userData)}
      <button
        onClick={handleLogout}
        className={`${
          !userData?.email && "hidden"
        } hover:bg-[#4d703e] font-semibold px-2 py-1 z-[15] rounded-md transition-all hover:transition-all border-2 border-[#4d703e] cursor-pointer text-[#4d703e] hover:text-[#fff] uppercase absolute right-0 top-0 m-8 text-sm tracking-wide`}
      >
        Signout
      </button>

      <div className="fixed top-0 left-0 z-20 lg:relative">
        <div className={navDrawerClass}>
          <NavDrawerLink
            to="/"
            icon={<MdHome className="w-8 h-8" />}
            text="Today's habits"
            onClick={() => setIsOpen(false)}
          />
          <NavDrawerLink
            to="/habits"
            icon={<MdCheckCircle className="w-8 h-8" />}
            text="Your habits"
            onClick={() => setIsOpen(false)}
          />
          <NavDrawerLink
            to="/progress"
            icon={<MdBarChart className="w-8 h-8" />}
            text="Progress"
            onClick={() => setIsOpen(false)}
          />
          <NavDrawerLink
            to="/goals"
            icon={<FiTarget className="w-8 h-8" />}
            text="Goals"
            onClick={() => setIsOpen(false)}
          />
          <div style={{ marginTop: "auto" }}>
            <NavDrawerLink
              to="/auth/login"
              icon={
                userData ? (
                  <FaUserSecret className="w-8 h-8" />
                ) : (
                  <RiAccountCircleFill className="w-8 h-8" />
                )
              }
              text={userData?.name ?? "Account"}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div
          className={darkeningAreaClass}
          onClick={() => setIsOpen(false)}
        ></div>
      </div>
    </>
  );
}

export default NavDrawer;

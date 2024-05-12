import { Navbar } from "@material-tailwind/react";
import Logo from "../../../assets/logos/logo.png";
import Name from "../../../assets/logos/name.png";
import userBlueLogo from "../../../assets/logos/user-blue-logo.png";
import { User, CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function NavAfter() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5173/api/getProfile");
        console.log("Data recevied for Navbar");
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, []);

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex justify-center items-center space-x-3">
          <img src={Logo} alt="Logo" className="w-14 h-14 " />
          <img src={Name} alt="Name" className="h-11 " />
        </div>
        <div className="flex items-center gap-4 relative">
          <CircleUserRound
            size={28}
            strokeWidth={1.25}
            onClick={handleMenu}
            className="text-gray-400 cursor-pointer"
          />

          {menuVisible && (
            <div className="w-[300px] absolute right-4 top-8 bg-white border border-gray-300 rounded-lg shadow-md p-2 z-[100] space-y-6 px-3 py-4">
              <div className="flex justify-start items-center space-x-4">
                <img
                  src={userBlueLogo}
                  alt="user logo"
                  className="w-11 h-11 md:w-9 md:h-9 rounded-full"
                />
                <div>
                  <p className="text-xl font-semibold text-black md:text-base">
                    Name
                  </p>
                  <p className="text-sm font-medium text-slate-600 md:text-xs">
                    Email@gmail.com
                  </p>
                </div>
              </div>
              <ul className="text-gray-500 space-y-3">
                <li
                  onClick={() => navigate("/profile")}
                  className="hover:scale-110 hover:cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-700 px-2 py-1 flex justify-start items-center space-x-4"
                >
                  <span>
                    <User size={20} />
                  </span>
                  <span>Profile</span>
                </li>
                <li
                  className="hover:scale-110 hover:cursor-pointer text-red-500 hover:bg-gray-100 hover:text-red-500 px-2 py-1 flex justify-start items-center space-x-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fillRule="currentColor"
                    className="bi bi-box-arrow-in-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                    />
                  </svg>
                  <span>Log Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}

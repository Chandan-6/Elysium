import GRINT1 from "../../assets/images/gradient-1.jpg";
import GRINT2 from "../../assets/images/gradient-2.jpg";
import GRINT3 from "../../assets/images/gradient-3.jpg";
import GRINT4 from "../../assets/images/gradient-4.jpg";
import NavAfter from "../components/Navbar/NavAfter.jsx";
import { Startup } from "../components/Cards/Startup/Startup.jsx";
import Popup from "../components/PopupModal/Popup.jsx";
import Modal from "../components/PopupModal/Investor/Modal.jsx";
import StartupModal from "../components/PopupModal/Startup/StartupModal.jsx";
import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Bot from "../components/Bot/Bot.jsx";
import Logo from "../../assets/logos/logo.png";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const [botVisible, setBotVisible] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [selectedOption, setSelectedOption] = useState("investor");

  const handleTabChange = (option) => {
    setSelectedOption(option);
  };

  const recommededData = [
    {
      imgLink: GRINT1,
      company: "startup - 1",
      founder: "lorem empum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit porro quam quis, eius labore ad animi molestias alias distinctio nisi deleniti minima quas quia ipsum omnis officiis sequi, voluptatem ipsa.",
      money: "1299999/-",
      hookLine: "The ultimate solution to any problem.",
    },
    {
      imgLink: GRINT2,
      company: "startup - 1",
      founder: "lorem empum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit porro quam quis, eius labore ad animi molestias alias distinctio nisi deleniti minima quas quia ipsum omnis officiis sequi, voluptatem ipsa.",
      money: "1299999/-",
      hookLine: "The ultimate solution to any problem.",
    },
    {
      imgLink: GRINT3,
      company: "startup - 1",
      founder: "lorem empum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit porro quam quis, eius labore ad animi molestias alias distinctio nisi deleniti minima quas quia ipsum omnis officiis sequi, voluptatem ipsa.",
      money: "1299999/-",
      hookLine: "The ultimate solution to any problem.",
    },
    {
      imgLink: GRINT4,
      company: "startup - 1",
      founder: "lorem empum",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit porro quam quis, eius labore ad animi molestias alias distinctio nisi deleniti minima quas quia ipsum omnis officiis sequi, voluptatem ipsa.",
      money: "1299999/-",
      hookLine: "The ultimate solution to any problem.",
    },
  ];


  return (
    <div className="bg-gray-300 min-h-screen">
      <NavAfter />
      <div className="w-full p-6 bg-gray-500/20 shadow-md h-max text-black text-center">
        <p className="text-2xl drop-shadow-lg">🚀 Welcome back [ Name ]</p>
      </div>

      <div className="mt-20 flex flex-col justify-center items-center w-[70%] bg-gray-200 mx-auto rounded-lg shadow-lg antialiased p-10 space-y-6">
        <h1 className="text-3xl tracking-wide font-sans font-semibold ">
          Recommended according to preferences
        </h1>

        <div className="gap-4 grid grid-cols-2 ">
          {recommededData.map((item, index) => (
            <Startup
              key={index}
              imgLink={item.imgLink}
              company={item.company}
              founder={item.founder}
              description={item.description}
              money={item.money}
              hookLine={item.hookLine}
            />
          ))}
        </div>
        {showModal && (
          <Popup onClose={() => setShowModal(false)} xButton={false}>
            {" "}
            <Tabs value={selectedOption}>
              <TabsHeader>
                <Tab
                  value="investor"
                  onClick={() => handleTabChange("investor")}
                >
                  Investor
                </Tab>
                <Tab value="startup" onClick={() => handleTabChange("startup")}>
                  Startup
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="investor">
                  <div className="max-h-[80vh] overflow-y-auto rounded-xl">
                    <Modal onClose={() => setShowModal(false)} selectedOption={selectedOption}/>
                  </div>
                </TabPanel>
                <TabPanel value="startup">
                  <div className="max-h-[80vh] overflow-y-auto rounded-xl">
                    <StartupModal onClose={() => setShowModal(false)} selectedOption={selectedOption} />
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </Popup>
        )}

        <button onClick={() => setBotVisible(!botVisible)} className="flex justify-center items-center space-x-2 fixed bottom-5 right-4 "><img src={Logo} alt="botButton" className="w-16 h-16 drop-shadow-xl" /> <span className="rounded-lg bg-black/10 px-3 py-1 animate-bounce text-xl">Chat with Bot 🤖</span></button>
        {
          botVisible && <Bot />
        }
      </div>
    </div>
  );
}

import ChatBot from "react-simple-chatbot";
import Logo from "../../../assets/logos/logo.png";
import Name from "../../../assets/logos/name.png";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

export default function Bot() {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");


  useEffect(() => {
    if (userInput) {
      botChat().then(responseText => {
        setBotResponse(responseText);
      });
    }
  }, [userInput]);

  const botChat = async () => {
    try {
      const apiKey = "1Fcy0r6d.uYWAKH41Jp2SiLy5Of7vyw4Hqmp1rkKD";
      const response = await axios.post(
        `https://payload.vextapp.com/hook/UHKA60JN57/catch/tyrryvvv`,
        {
          payload: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Apikey: `Api-Key ${apiKey}`,
          },
        }
      );
      return response.data.text;
    } catch (error) {
      console.log(error);
      toast.error("Server issue please try again!");
      return Promise.reject(error);
    }
  };


  const steps = [
    {
      id: "0",
      message: "Hey User!",
      trigger: "1",
    },
    {
      id: "1",
      message: "How can  help you?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      validator: (value) => {
        setUserInput(value);
        return true;
      },
      trigger: "3",
    },
    {
      id: "3",
      message : () => `${botResponse}`,
      trigger : '2',
    },
  ];

  return (
    <div className="fixed bottom-24 right-3">
      <div className="flex justify-center items-center space-x-3">
        <img src={Logo} alt="logo" className="w-10 h-10" />
        <img src={Name} alt="name" className="h-10" />
      </div>
      <ChatBot steps={steps} />
      <button onClick={()=> console.log(botResponse, typeof(botResponse))}> check</button>
      <Toaster />
    </div>
  );
}


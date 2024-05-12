import React from "react";
import { useState } from "react";
import { Preferences } from "../../../../utils/Preferences/Investor/Preferences.js";
import Countries from "../../../../utils/Country/Country.js";
import Checkboxinput from "../../Checkbox/Checkboxinput.jsx";
import { Textarea, Button, Input } from "@material-tailwind/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TypeofInvestmenst } from "../../../../utils/Category/Category.js";

export default function Modal(props) {
  const [formData, setFormData] = useState({
    pref: [],
    subPref: [],
    country: "Select an option",
    investmentType: "",
    description: "",
    pastInvestments: [],
    validation: "",
    category : props.selectedOption,
  });

  const handleCheckboxChange = (e, indexNO) => {
    const selection = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      pref: selection
        ? [...prev.pref, Preferences[indexNO].label]
        : prev.pref.filter((item) => item !== Preferences[indexNO].label),
    }));
  };

  const handleSubCheckboxChange = (e, indexNO, subIndex) => {
    const selection = e.target.checked;

    setFormData((prev) => ({
      ...prev, 
      subPref : selection 
        ? [...prev.subPref, Preferences[indexNO].sub[subIndex]]
        : prev.subPref.filter((item) => item !== Preferences[indexNO].sub[subIndex])
    }))
  }  

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024; // 1 MB
    if (file && file.size > maxSizeInBytes) {
      toast.error(
        "File size exceeds the limit (1MB). Please select a smaller file."
      );
      e.target.value = "";
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, proofOfValidation: reader.result }));
    };
    reader.onerror = (error) => {
      console.log("Error :", error);
    };
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://127.0.0.1:5173/api/updateInvestor`,
        formData
      );
      console.log("Investor data updated...✅");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Server issue, Please try again later!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pastInvestments") {
      let investmentsList = value.split("\\");
      setFormData({
        ...formData,
        [name]: value,
        pastInvestments: investmentsList,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="max-w-[500px] py-6 px-4 bg-white/80 rounded-xl space-y-5 shadow-lg shadow-gray-800 text-center scroll-my-10">
      <div className="space-y-1 flex flex-col items-center">
        <h1 className="text-2xl md2:text-lg mobile:text-sm font-extrabold text-center font-mono text-black tracking-wide ">
          Hey! Enthusiastic Investor 👋
        </h1>
        <h1 className="text-xl md2:text-lg mobile:text-sm font-extrabold text-center font-mono text-black tracking-wide ">
          Additional Information Required
        </h1>
        <p className="text-gray-600 font-thin ">
          Please provide the following information required to give you the
          best.⭐
        </p>
      </div>

      <div className="h-px bg-gray-500 w-full"></div>

      <form className="space-y-5">
        <div>
          <p className="font-normal text-lg text-left text-black px-3">
            Preferences
          </p>
          <div className="flex flex-col justify-center items-start">
            {Preferences.map((item, index) => (
              <React.Fragment key={index}>
                <Checkboxinput
                  id={index}
                  label={item.label}
                  onSelect={(e) => handleCheckboxChange(e, index)}
                />
                {formData.pref.includes(item.label) &&
                  item.sub.map((subItem, subIndex) => (
                    <Checkboxinput
                      key={subIndex}
                      id={subIndex}
                      label={subItem}
                      MARGINLeft={true}
                      onSelect={(e) => handleSubCheckboxChange(e, index, subIndex)}
                    />
                  ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <select
          id="investmentType"
          value={formData.investmentType}
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentType: e.target.value,
            }))
          }
          className="bg-transparent py-3 px-4 border border-gray-800 rounded-lg focus:outline-none w-full text-black text-left"
        >
          <option className="text-black font-semibold" value="">
            Select Type of Investments
          </option>
          {TypeofInvestmenst.map((item, index) => (
            <option key={index} className="text-black" value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          id="country"
          value={formData.country}
          required
          name="country"
          onChange={(e) => handleChange(e)}
          className="bg-transparent py-3 px-4 border border-gray-800 rounded-lg focus:outline-none w-full text-black text-left"
        >
          <option className="text-black font-semibold" value="">
            Select Country
          </option>
          {Countries.map((item, index) => (
            <option key={index} className="text-black" value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="w-full space-y-4">
          <Textarea
            name="description"
            required
            onChange={(e) => handleChange(e)}
            label="description"
          />
          <Textarea
            name="pastInvestments"
            required
            onChange={(e) => handleChange(e)}
            label="Describe your past investments ( Seperate your each entry with '\')"
          />
        </div>

        <div className="text-left ">
          <p className="font-normal text-base text-left text-black px-3">
            NOC :{" "}
          </p>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="brandLogo"
            onChange={(e) => convertToBase64(e)}
            className=" text-black ml-3 mt-1"
          />
        </div>

        <Button
          onClick={(e) => {
            submit(e);
            props.onclose();
          }}
          type="submit"
          variant="outlined"
          className="hover:scale-105 transition-all duration-300 active:bg-black ease-in-out transform active:scale-105 active:duration-500"
        >
          Submit
        </Button>
      </form>
      <div className="z-[1000] shadow-2xl">
        <Toaster />
      </div>
    </div>
  );
}

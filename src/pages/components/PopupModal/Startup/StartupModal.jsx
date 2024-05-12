import { useState } from "react";
import Countries from "../../../../utils/Country/Country.js";
import { Textarea, Button, Input } from "@material-tailwind/react";
import {
  StartupCategories,
  StartupSubcategories,
} from "../../../../utils/Category/Category.js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function StartupModal() {
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    intro: "",
    teamSize: "",
    category: "",
    subCategory: "",
    description: "",
    bestAchievements: "",
    links: "",
    pitch: "",
    expectedFunding : 0,
    expectedROI: 0,
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:5173/api/updateProject`,
        formData
      );
      console.log("Startup data updated...✅");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Server issue, Please try again later!!");
    }
  };

  return (
    <div className="max-w-[500px] py-6 px-4 bg-white/80 rounded-xl space-y-5 shadow-lg shadow-gray-800 text-center scroll-my-10">
      <div className="space-y-1 flex flex-col items-center">
        <h1 className="text-2xl md2:text-lg mobile:text-sm font-extrabold text-center font-mono text-black tracking-wide ">
          Hey! Startup Founder 👋
        </h1>
        <h1 className="text-xl md2:text-lg mobile:text-sm font-extrabold text-center font-mono text-black tracking-wide ">
          Additional Information Required
        </h1>
        <p className="text-gray-600 font-thin">
          Please provide the following information required to give you the
          best.⭐
        </p>
      </div>
      <div className="h-px bg-gray-500 w-full"></div>
      <form className="space-y-5">
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Project Name"
          placeholder="Project Name"
          name="project"
        />
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Intro Statement"
          placeholder="Intro Statement"
          name="intro"
        />
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Current Team Size"
          placeholder="Enter your Current Team Size"
          name="teamSize"
          type="number"
        />
        <select
          id="category"
          value={formData.category}
          required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="bg-transparent py-3 px-4 border border-gray-800 rounded-lg focus:outline-none w-full text-black text-left"
        >
          <option className="text-black font-semibold" value="">
            Select Category
          </option>
          {StartupCategories.map((item, index) => (
            <option key={index} className="text-black" value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          id="category"
          value={formData.subCategory}
          required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subCategory: e.target.value }))
          }
          className="bg-transparent py-3 px-4 border border-gray-800 rounded-lg focus:outline-none w-full text-black text-left"
        >
          <option className="text-black font-semibold" value="">
            Select Sub-Category
          </option>
          {StartupSubcategories[formData.category]?.map((item, index) => (
            <option key={index} className="text-black" value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="w-full space-y-4">
          <Textarea
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            label="Description"
          />
          <Textarea
            required
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bestAchievements: e.target.value,
              }))
            }
            label="Past Acheivements"
          />
        </div>
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Proof of Links"
          placeholder="🔗"
          name="links"
        />
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Pitch"
          placeholder="Enter your pitch link (eg: YT video)"
          name="pitch"
        />
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="Expected Funding"
          placeholder="Expected Funding"
          name="expectedFunding"
          type="number"
        />
        <Input
          required
          onChange={(e) => handleChange(e)}
          variant="outlined"
          label="ROI - Return Of Investments"
          placeholder="Return of Investment"
          name="expectedROI"
          type="number"
        />

        <select
          id="country"
          value={formData.country}
          required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, country: e.target.value }))
          }
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

        <Button
          onClick={(e) => submit(e)}
          type="submit"
          variant="outlined"
          className="hover:scale-105 transition-all duration-300 active:bg-black ease-in-out transform active:scale-105 active:duration-500"
        >
          Submit
        </Button>
      </form>
      <div className="z-[1000] shadow-2xl">
        <Toaster />
      </div>{" "}
    </div>
  );
}

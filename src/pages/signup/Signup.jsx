import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if(name === "password"){
      setFormData({ ...formData, [name]: value });
    }
    else{
      let lowerValue = value.toLowerCase();
      setFormData({ ...formData, [name]: lowerValue, }); 
    }
  };

  
  const submit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            `http://127.0.0.1:5173/api/singup`,
            formData
        );
        console.log("Signup successfull..✅");
        toast.success(res.data.message);
    } catch (error) {
        console.log(error);
        toast.error("Server issue, Please try again later!!");
    }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Card color="" className="p-6 shadow-lg" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleFormChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />


            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={formData.email}
              onChange={(e) => handleFormChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />


            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Select User Type
            </Typography>
            <select
              id="typeOfInvestments"
              value={formData.category}
              required
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="bg-transparent py-3 px-4 border border-gray-800 rounded-lg focus:outline-none w-full text-black text-left"
            >
              <option className="text-black font-semibold" value="">
                Select Type of category
              </option>
                <option className="text-black" value="investor">
                  Investor
                </option>
                <option className="text-black" value="startup">
                startup
                </option>
            </select>


            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={(e) => handleFormChange(e)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button onClick={(e) => submit(e)} type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography
            onClick={() => navigate("/login")}
            color="gray"
            className="mt-4 text-center font-normal cursor-pointer"
          >
            Already have an account?{" "}
            <a className="font-medium text-gray-900">Log In</a>
          </Typography>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}

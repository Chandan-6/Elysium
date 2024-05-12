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

export default function Login() {
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        email : "",
        password : ""
    }) 

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name] : value});
        console.log(`${name} = ${value}`);
    }


    const submit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(
              `http://127.0.0.1:5173/api/login`,
              formData
          );
          console.log("Login successfull..✅");
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
          Log in
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! enter your credentials below
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
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
          <Button onClick={(e) => submit(e)} type="sumit" className="mt-6" fullWidth>
            Log in
          </Button>
          <Typography onClick={() => navigate("/signup")} color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign up
            </a>
          </Typography>
        </form>
      </Card>
      <Toaster/>
    </div>
  );
}

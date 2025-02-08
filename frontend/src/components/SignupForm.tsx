import { useState } from "react";
import { SignupInput } from "@yogeshwar9/medium_common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

function SignupForm() {
  const [formData, setFormData] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,formData)
      console.log(response.data.token);
      
      const token = response.data.token;
      localStorage.setItem("token",token)
      navigate("/blogs")
    }
    catch(e){
      console.log(e);
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-8 shadow-lg rounded-lg"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <h2 className="text-gray-500 text-lg font-medium mt-2">
            Already have an account ? <Link to={"/signin"} className="underline">Login</Link>
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="font-medium text-black">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.name}
              placeholder="Enter your username"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoComplete="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              placeholder="example@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

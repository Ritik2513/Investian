import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import { serverUrl } from "../../App";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const response = await fetch(`${serverUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      navigate("/signin");
    } else {
      toast.error(data.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      if (!user?.email) {
        toast.error("Google account does not provide an email");
        return;
      }

      const response = await fetch(`${serverUrl}/api/auth/google-auth`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Google authentication failed");
        return;
      }

      toast.success("Logged in successfully with Google");

      navigate("/");
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error(error.message || "Google authentication failed");
    }
  };

  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 sm:px-10 font-poppins">
        <div className="w-full max-w-md py-10">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Sign up to get access to exclusive real estate opportunities.
            </p>
          </div>

          <div className="flex gap-6 border-b pb-2 mb-6 ">
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-500 cursor-pointer"
            >
              Sign In
            </button>
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 cursor-pointer">
              Create Account
            </button>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md border-gray-300 outline-none"
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md border-gray-300 outline-none"
              onChange={handleChange}
            />

            <input
              name="mobile"
              type="text"
              placeholder="Enter mobile number"
              className="w-full p-2 border rounded-md border-gray-300 outline-none"
              onChange={handleChange}
            />

            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full p-2 pr-10 border rounded-md border-gray-300 outline-none"
                onChange={handleChange}
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button
              onClick={handleSignup}
              className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
            >
              Create Account
            </button>

            <div className="relative flex items-center">
              <div className="grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm bg-white px-2">
                or
              </span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white text-black py-2 rounded-md flex items-center justify-center gap-2 border border-gray-300 cursor-pointer font-medium hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              <span>Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 h-screen">
        <img src="/Auth/building.jpg" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default Signup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { serverUrl } from "../../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const SignIn = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const res = await fetch(`${serverUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      toast.info(`OTP sent to email ${email}`);
      setStep(2);
    } else {
      toast.error(data.message);
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch(`${serverUrl}/api/auth/verify-login-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Login successful");
      navigate("/");
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
      {/* LEFT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 sm:px-10 font-poppins">
        <div className="w-full max-w-md py-10">
          <div className="flex flex-col items-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">
              Sign in to browse projects and view inventory.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b pb-2 mb-6">
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 cursor-pointer">
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-gray-500 cursor-pointer"
            >
              Create Account
            </button>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <input
                placeholder="Enter email"
                className="w-full p-2 border rounded-md border-gray-300 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full p-2 border rounded-md border-gray-300 outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <div
                onClick={() => navigate("/forgot-password")}
                className="text-right text-xs text-blue-500 cursor-pointer"
              >
                Forgot Password?
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
              >
                Sign In
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
                <span>Sign in with Google</span>
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <input
                placeholder="Enter OTP"
                className="w-full p-2 border rounded-md"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className="hidden lg:block w-1/2 h-screen">
        <img
          src="/Auth/building.jpg"
          className="w-full h-full object-cover"
          alt="Auth Illustration"
        />
      </div>
    </section>
  );
};

export default SignIn;

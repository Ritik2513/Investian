import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosMailOpen, IoIosArrowRoundBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSentOtp = async () => {
    if (!email) return toast.error("Email is required");
    try {
      const response = await fetch(
        `${serverUrl}/api/auth/forgot-password/sent-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send Otp");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) return toast.error("Enter valid 4 digit OTP");

    try {
      const response = await fetch(
        `${serverUrl}/api/auth/forgot-password/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("OTP Verified");
        setStep(3);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Otp Verification:", error);
      toast.error(error.message || "OTP Verification Failed");
    }
  };

  const handleResetPassword = async () => {
    const { newPassword, confirmPassword } = passwords;

    if (!newPassword || !confirmPassword)
      return toast.error("All fields are required");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const response = await fetch(
        `${serverUrl}/api/auth/forgot-password/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword, confirmPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successfully");
        navigate("/signin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Password Reset:", error);
      toast.error(error.message || "Password Reset Failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-poppins">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Back Button */}
        {step === 1 && (
          <span
            className="cursor-pointer text-gray-600"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack size={30} />
          </span>
        )}

        {step > 1 && (
          <span
            className="cursor-pointer text-gray-600"
            onClick={() => setStep(step - 1)}
          >
            <IoIosArrowRoundBack size={30} />
          </span>
        )}

        <div className="flex justify-center my-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full custom-bg text-white text-2xl">
            {step === 1 && <RiLockPasswordFill />}
            {step === 2 && <IoIosMailOpen />}
            {step === 3 && <MdPassword />}
          </div>
        </div>

        {/* STEP CONTENT */}
        {/* Step 1 */}
        {step === 1 && (
          <div>
            {/* Heading */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Forgot Password
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your email to receive a verification code.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full p-2 border rounded-md border-gray-300 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={handleSentOtp}
                className="w-full custom-bg text-white py-2 rounded-md font-medium hover:bg-sky-700 transition cursor-pointer"
              >
                Send Verification Code
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            {/* Heading */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Verify Email
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter the 4-digit code sent to {email}
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP
                </label>
                <input
                  maxLength={4}
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  className="w-full p-2 border rounded-md border-gray-300 outline-none"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full custom-bg text-white py-2 rounded-md font-medium hover:bg-sky-700 transition cursor-pointer"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step == 3 && (
          <div>
            {/* Heading */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Create New Password
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 text-center mb-6">
              Your new password must be different from the previous one.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div>
                {/* New Password */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full p-2 border rounded-md border-gray-300 outline-none"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded-md border-gray-300 outline-none"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full custom-bg text-white py-2 rounded-md font-medium hover:bg-sky-700 transition cursor-pointer"
              >
                Save Password
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;

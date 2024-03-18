import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(""); // State to store OTP

  const handleChange = (index, e) => {
    const input = e.target;
    let value = input.value.replace(/\D/, ""); // Remove non-numeric characters

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    if (otp.length == 5) {
      inputRefs[index].current.focus();
    }

    // Upd
    input.value = value;

    // Update OTP state
    const newOtp = inputRefs.map((ref) => ref.current.value).join("");
    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      // Move to previous input field when backspace is pressed and current field is empty
      inputRefs[index - 1].current.focus();
    }
  };

  const [loading, setLoading] = useState(false); // State to manage loading state

  const sendEmail = async () => {
    try {
      await axios.post("http://localhost:3000/send-email", {
        to: location.state.email,
      });
      // window.location.href = `/Enterotp?email=${location.state.pemail}`; // Change the URL to the desired destination
      // navigate("/Enterotp", {
      //   state: {
      //     email: location.state.pemail,
      //     username: location.state.pfname,
      //     password: location.state.ppassword,
      //   },
      // });
    } catch (error) {
      console.error("Error sending OTP email:", error);
      alert("Failed to send OTP. Please try again later.");
    }
  };

  const check = async () => {
    setLoading(true); // Set loading state to true when sending email
    try {
      await axios.post("http://localhost:3000/check", {
        email: location.state.email,
        username: location.state.username,
        password: location.state.password,
        otp: otp,
      });

      // navigate("/Enterotp", {
      //   state: {
      //     pemail: location.state.pemail,
      //     fullname: location.state.pfname,
      //     password: location.state.ppassword,
      //   },
      // });
    } catch (error) {
      console.error("Error : ", error);
      alert("somthing wrong.");
    } finally {
      setLoading(false); // Reset loading state when  process completes
    }
  };

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y border border-zinc-950 p-12 rounded-lg relative">
          <NavLink to="/Home">
            <button className="absolute top-0 right-0 mt-5 -mr-2 rounded-full p-1 focus:outline-none">
              <img
                src="cross.png"
                alt="Cross Button"
                className="h-6 w-6 mr-8 "
              />
            </button>
          </NavLink>
          <div>
            <h2 className="mt-8 text-4xl font-bold ">Verification</h2>
          </div>
          <div className="mt-4 text-center">
            <p>We have sent OTP to your Email Id</p>
          </div>
          <form className="mt-5 space-y-6" onSubmit={check}>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-14 h-14 ">
                    <input
                      ref={inputRefs[index]}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-orange-500 font-bold "
                      type="text"
                      maxLength={1}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 text-center">
              {loading ? (
                <div className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none">
                  <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none"
                >
                  Verify
                </button>
              )}
            </div>
          </form>
          <div className="mt-7 text-center">
            <p className="text-gray-800">
              Haven&apos;t received the OTP?{" "}
              <button
                onClick={sendEmail}
                className="font-medium text-lg text-orange-500"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;

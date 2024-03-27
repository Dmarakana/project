import { useRef, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Forgetotp = () => {
  const [message, setMessage] = useState("");
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

  const [countdown, setCountdown] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (index, e) => {
    const input = e.target;
    let value = input.value.replace(/\D/g, "");
    input.value = value;

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    // Update OTP state
    const newOtp = inputRefs.map((ref) => ref.current.value).join("");
    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs[index - 1].current.focus();
    }
  };

  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    // Clear input fields
    setCountdown(15);
    setIsButtonDisabled(true);
    inputRefs.forEach((ref) => {
      ref.current.value = "";
    });

    try {
      await axios.post("http://localhost:3000/send-email", {
        to: location.state.email,
      });
    } catch (error) {
      console.error("Error sending OTP email:", error);
      alert("Failed to send OTP. Please try again later.");
    }
  };

  const check = async () => {
    if (!otp || otp.length !== 5 || !/^\d+$/.test(otp)) {
      setMessage("Please enter a OTP.");
      return false;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/checkforgototp",
        {
          email: location.state.email,
          otp: otp,
        }
      );
      if (response.data == true) {
        setTimeout(() => {
          navigate("/Newpassword", {
            state: {
              email: location.state.email,
            },
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
          setMessage("Invalid OTP. Please enter a valid OTP.");
        }, 1000);
      }
    } catch (error) {
      console.error("Error : ", error);
      alert("Something went wrong.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setIsButtonDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y border border-zinc-950 p-12 rounded-lg relative">
          <div>
            <h2 className="mt-8 text-4xl font-bold ">Verification</h2>
          </div>
          <div className="mt-4 text-center">
            <p>We have sent OTP to your Email Id</p>
          </div>
          <form className="mt-5 space-y-6">
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

            <span className="text-center text-red-600 font-medium">
              <p className="mt-2">{message}</p>
            </span>

            <div className="mt-9 text-center">
              {loading ? (
                <div className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none">
                  <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <button
                  type="button" // Change type to button to prevent form submission
                  onClick={check}
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
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? `Resend (${countdown})` : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgetotp;

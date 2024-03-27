import { useState } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sendotp() {
  let location = useLocation();
  const [loading, setLoading] = useState(false); // State to manage loading state

  const navigate = useNavigate();

  const sendEmail = async () => {
    setLoading(true); // Set loading state to true when sending email
    try {
      await axios.post("http://localhost:3000/send-email", {
        to: location.state.pemail,
      });
      // window.location.href = `/Enterotp?email=${location.state.pemail}`; // Change the URL to the desired destination
      navigate("/Enterotp", {
        state: {
          email: location.state.pemail,
          username: location.state.pfname,
          password: location.state.ppassword,
        },
      });
    } catch (error) {
      console.error("Error sending OTP email:", error);
      alert("Failed to send OTP. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state when email sending process completes
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y border border-zinc-950 p-12 rounded-lg relative">
        <div>
          <h2 className="mt-8 text-4xl font-bold text">SEND OTP</h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 -left-2 pl-3 flex items-center">
                <img
                  src="email.png"
                  alt="Email Icon"
                  className="mb-4 h-9 w-8"
                />
              </span>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={location.state.pemail}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Email"
                disabled={true}
              />
            </div>
          </div>
        </form>
        <div className="">
          <p className="text-gray-800">
            A 5-digit OTP will be send via E-mail to verify your Email Id .
          </p>
        </div>
        <div className="mt-9 text-center">
          {loading ? (
            <div className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none">
              <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <button
              onClick={sendEmail}
              type="submit"
              className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none"
            >
              Send OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sendotp;

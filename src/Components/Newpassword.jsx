import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Newpassword() {
  const [error, seterror] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password == cpassword) {
      console.log(" ");
    } else {
      seterror("password must be same");
    }
  };

  const update = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/updatepassword",
        {
          email: location.state.email,
          password: password,
        }
      );

      if (response.data == true) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        seterror("Password update error");
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

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y border border-zinc-950 p-12 rounded-lg relative">
        <div>
          <h2 className="mt-2 text-3xl font-bold text">Reset Password</h2>
        </div>
        <div className="text-center mt-5">
          <div className="inline-block font-medium  rounded-full px-3 py-1 border-solid  bg-gray-200 ">
            {location.state.email}
          </div>
        </div>

        <form className="mt-4 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />

          <div>
            <div className="relative">
              <span className="absolute inset-y-0 -left-3 pl-3 flex items-center">
                <img
                  src="lock.png"
                  alt="Password Icon"
                  className="mb-5 h-8 w-10"
                />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="New Password"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 -left-3 pl-3 flex items-center">
                <img
                  src="lock2.png"
                  alt="Password Icon"
                  className="mb-5 h-8 w-10"
                />
              </span>
              <input
                id="cpassword"
                name="cpassword"
                type={showPassword ? "text" : "password"}
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Conform Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 mt-1 mb-4 mr-2 rounded-full p-1 focus:outline-none opacity-35"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img
                    src="view.png"
                    alt="Show Password Icon"
                    className="h-6 w-6"
                  />
                ) : (
                  <img
                    src="hide.png"
                    alt="Hide Password Icon"
                    className="h-6 w-6"
                  />
                )}
              </button>
            </div>
          </div>

          <div className="mt-9 text-center">
            {loading ? (
              <div className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none">
                <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <button
                onClick={update}
                type="submit"
                className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newpassword;

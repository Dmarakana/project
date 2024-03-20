import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      alert("Please enter your email address.");
    }
    if (!password || !password.trim()) {
      alert("Please enter your password.");
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const login = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      console.log(response.data);
      if (response.data == true) {
        setTimeout(() => {
          navigate("/Home", {
            state: {
              email: email,
              password: password,
            },
          });
        }, 1000);
      } else {
        setmessage("Invalid Email Id And Password");
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

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y border border-zinc-950 p-12 rounded-lg relative">
        <NavLink to="/Home">
          <button className="absolute top-0 right-0 mt-5 -mr-2 rounded-full p-1 focus:outline-none">
            <img src="cross.png" alt="Cross Button" className="h-6 w-6 mr-8 " />
          </button>
        </NavLink>
        <div>
          <h2 className="mt-8 text-4xl font-bold text">LOGIN</h2>
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
                value={email}
                onChange={(e) => setEmail(e.target.value).trim()}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Email"
              />
            </div>
          </div>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value).trim()}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Password"
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

          <div className="flex items-center justify-end ">
            <div className="text-sm -mt-7">
              <a href="#" className="font-medium text-orange-500 text-lg ">
                Forgot Password ?
              </a>
            </div>
          </div>
          <span className="text-center text-red-600">
            <p>{message}</p>
          </span>

          <div className="mt-9 text-center">
            {loading ? (
              <div className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none">
                <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <button
                onClick={login}
                type="submit"
                className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none"
              >
                Login
              </button>
            )}
          </div>
        </form>
        <div className="mt-9 text-center">
          <p className="text-gray-800">
            Don&apos;t have an account?{" "}
            <a href="Register" className="font-medium text-lg text-orange-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

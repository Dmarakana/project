import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sign() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailerror, setemailerror] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const navigate = useNavigate();

  const check = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/emailcheck", {
        email: email,
      });
      if (response.data == true) {
        setemailerror("This email is already registered");
      } else {
        navigate("/Sendotp", {
          state: { pemail: email, pfname: username, ppassword: password },
        });
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
        {/* <NavLink to="/">
          <button className="absolute top-0 right-0 mt-5 -mr-2 rounded-full p-1 focus:outline-none">
            <img src="cross.png" alt="Cross Button" className="h-6 w-6 mr-8 " />
          </button>
        </NavLink> */}

        <div>
          <h2 className="mt-5 text-4xl font-bold text">SIGN UP</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />

          <div>
            <div className="relative">
              <span className="absolute inset-y-0 -left-3 pl-3 flex items-center">
                <img src="user.png" alt="User Icon" className="mb-5 h-8 w-10" />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Full Name"
              />
            </div>
          </div>

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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setemailerror("");
                }}
                onKeyPress={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Email"
              />
            </div>
            <span className="text-red-600">{emailerror}</span>
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 mb-4 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 w-full px-10 py-2 sm:text-1.5xl focus:outline-none"
                placeholder="Password"
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
                onClick={check}
                type="submit"
                className="mt-2 group relative w-full inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 focus:outline-none"
              >
                Sign up
              </button>
            )}
          </div>
        </form>
        <div className="mt-7 text-left">
          <p className="text-gray-800">
            Bycreating an account, you agree to our <br />
            <a href="/" className="font-medium text-1xl text-orange-500">
              Term & Condition
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sign;

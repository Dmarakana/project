import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaSearch,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <nav className="p-4  top-0 left-0 right-0  bg-white shadow-md sticky z-10 ">
        <div className="md:flex ld:flex justify-between items-center ">
          <div className="flex items-center ">
            <div className="flex items-center -mt-2 md:mt-0 ld:mt-0">
              <a href="facebook">
                <FaFacebook className="text-black mr-4 md:ml-10 ld:ml-10 w-5 h-5 " />
              </a>
              <a href="twitter">
                <FaTwitter className="text-black mr-4 w-5 h-5" />
              </a>
              <a href="instagram">
                <FaInstagram className="text-black mr-4 w-5 h-5" />
              </a>
              <a href="youtube">
                <FaYoutube className="text-black mr- w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 w-96 mt-3 md:mt-0 ld:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 text-white rounded-full py-1 pr-8 pl-4  md:w-96 ld:w-96 focus:outline-none focus:bg-gray-900"
              />

              <span className="absolute right-2  mt-2 mr-3 w-2 h-2">
                <FaSearch className="text-white" />
              </span>
            </div>
          </div>
          <div className="flex justify-end ">
            <button>
              <NavLink to="/Profile">
                <img src="/account.png" className="h-8 w-8 ml-4" />
              </NavLink>
            </button>
            <NavLink to="/">
              <button className="bg-orange-500 text-white md:px-4 ld:px-4 md:py-1 ld:py-1 rounded md:ml-4  ld:ml-4  md:mt-0 ld:mt-0 md:mr-0 ld:mr-0 -mt-28">
                Logout
              </button>
            </NavLink>
            {/* <NavLink to="/Register">
              <button className="bg-orange-500 text-white md:px-4 ld:px-4 md:py-1 ld:py-1 rounded md:ml-4 ld:ml-4 md:mt-0 ld:mt-0 -mt-28">
                Register
              </button>
            </NavLink> */}
          </div>
        </div>
      </nav>

      <div className="flex justify-center ld:mt-4 md:mt-4 -mt-5">
        <img
          src="/logo.png"
          alt="Logo"
          className="md:mt-5 ld:mt-5 w-36 h-24 md:w-auto md:h-auto ld:w-auto ld:h-auto mt-12"
        />
      </div>

      <div className="flex justify-center text-lg font-bold md:mt-2 mt-2">
        <NavLink to="/Home">
          <p className="md:px-16 md:pb-4 ld:px-16 ld:pb-4 pb-2 px-6 ">
            Homepage
          </p>
        </NavLink>
        <NavLink to="/Recipe">
          <p className="md:px-16 md:pb-4 ld:px-16 ld:pb-4 pb-2 px-6">Recipe</p>
        </NavLink>
        <NavLink to="/Categories">
          <p className="md:px-16 md:pb-4 ld:px-16 ld:pb-4 pb-2 px-6">
            Categories
          </p>
        </NavLink>
        <NavLink to="/Favorites">
          <p
            href="Catrgories"
            className="md:px-16 md:pb-4 ld:px-16 ld:pb-4 pb-2 px-6"
          >
            Favorites
          </p>
        </NavLink>
      </div>
    </>
  );
}

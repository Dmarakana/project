import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <div className="text-center" style={{ backgroundColor: "#ffc7b3" }}>
        <div className="font-bold md:text-6xl ld:text-6xl text-3xl normal-case font-serif md:pt-16 ld:pt-16 pt-5 ">
          <p>Deliciousness</p>
          <p>to your inbox</p>
        </div>
        <div className="font-semibold my-6">
          <p>Enjoy weekly hand picked recipes and recommendations</p>
          <p>recommendations</p>
        </div>
        <div className="flex items-center justify-center flex-1">
          <form>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="bg-white text-black md:py-4 md:pr-8 md:pl-2 md:w-96 ld:py-4 ld:pr-8 ld:pl-2 ld:w-96  py-1 px-2 focus:outline-none"
              />
              <span className="absolute md:right-9  ld:right-9 right-6  w-2 h-2 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-orange-500 text-white md:px-6 md:py-3.5  ml:px-6 ml:py-3.5  px-3 py-1 md:text-base ld:text-base text-sm"
                >
                  JOIN
                </button>
              </span>
            </div>
          </form>
        </div>

        <p className="text-gray-800 text-xs py-7 ">
          By joining our newsletter you agree to our{" "}
          <a
            href="#"
            className="font-medium text-x underline underline-offset-4"
          >
            Terms and Conditions
          </a>
        </p>
      </div>

      <footer className=" py-4 text-gray-500 bottom-0">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 ">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:mr-4 md:ml-28 flex flex-col justify-center ml-5">
            <div className="flex  md:justify-start">
              <img src="/logo.png" alt="Logo" className="mt-5 h-40" />
            </div>
            <div className="mt-5 pr-28">
              <p>
                &quot;On the other hand, we denounce with righteous indignation
                and dislike men who are so beguiled and demoralized by the
                charms of pleasure of the moment&quot;
              </p>
            </div>
          </div>

          <div className="md:flex ml:flex md:mt-11 ml:mt-11 md:flex-row md:justify-end md:me-24 lg:gap-12 ml-5 ">
            <div className="md:ml-6">
              <h3 className="flex mt-5 md:mt-0 text-lg font-semibold ">
                About
              </h3>
              <a href="">About Us</a>
              <br />
              <a href="">Careers</a>
              <br />
              <a href="">Contact </a>
              <br />
              <a href="">Feedback</a>
              <br />
            </div>
            <div className="md:ml-8 ">
              <h3 className="mt-5 md:mt-0 text-lg font-semibold">Legal</h3>
              <a href="">Terms</a>
              <br />
              <a href="">Conditions</a>
              <br />
              <a href="">Cookies</a>
              <br />
              <a href="">Copyright</a>
              <br />
            </div>

            <div className="md:ml-8">
              <h3 className="mt-5 md:mt-0 text-lg font-semibold">Follow</h3>
              <br />
              <div className="flex space-x-4 mt-2">
                <a href="facebook">
                  <FaFacebook className="text-gray-800 w-6 h-6" />
                  Facebook
                </a>
                <a href="twitter">
                  <FaTwitter className="text-gray-800 w-6 h-6" />
                  Twitter
                </a>
                <a href="instagram">
                  <FaInstagram className="text-gray-800 w-6 h-6" />
                  Instagram
                </a>
                <a href="youtube">
                  <FaYoutube className="text-gray-800 w-6 h-6" />
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

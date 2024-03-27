import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";

export default function Categories() {
  const [search, setsearch] = useState("");
  const handleInputChange = (value) => {
    setsearch(value);
  };

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetch("http://localhost:3000/api/pcategories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  //increse card on click load button 1
  const [sl, setsl] = useState(12);
  const incrementCount = () => {
    setsl((sl) => sl + 6);
    console.log(sl);
  };

  return (
    <>
      <Navbar handleInputChange={handleInputChange} />

      {search === "" || search === null ? (
        <>
          <div className="md:mt-12 ld:mt-12 mt-5">
            <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold md:ml-52 ld:ml-52 ml-4">
              Categories
            </label>
          </div>

          <div className=" md:my-10 lg:my-10 my-4 md:mx-48 lg:mx-40 ">
            {Categories.slice(0, sl).map((data, index) => (
              <Link to={`/Recipes/${data.catagories}`} key={index}>
                <div className="inline-block  md:mx-4 lg:mx-7 mx-3 mb-10">
                  <div className="rounded-full overflow-hidden">
                    <img
                      className="md:w-44 lg:w-44 md:h-44 lg:h-44 w-24 h-24 object-cover"
                      src={data.src}
                      alt={`${index + 1}`}
                    />
                  </div>
                  <p className="text-center font-bold md:text-2xl ld:text-2xl md:mt-3 ld:mt-3 mt-1">
                    {data.catagories}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center my-16">
            <button
              className="border-solid border-2 border-gray-950 text-sb  px-6 py-2"
              type="button"
              onClick={incrementCount}
            >
              Load More
            </button>
          </div>
        </>
      ) : (
        <SearchResults data={search} />
      )}

      <Footer />
    </>
  );
}

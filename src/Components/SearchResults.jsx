import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchResults(props) {
  const { data } = props;

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="text-orange-400 text-xl">
          &#9733;
        </span>
      );
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(
        <span key={i} className="text-orange-400 text-xl">
          &#9734;
        </span>
      );
    }
    return stars;
  };

  const [Recipe, setRecipe] = useState([]);
  useEffect(() => {
    // Fetch recipes from the API when the component mounts
    fetch("http://localhost:3000/api/recipe")
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter recipes based on search input
  useEffect(() => {
    const filtered = Recipe.filter((recipe) =>
      recipe.Name.toLowerCase().includes(data.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [data, Recipe]);

  return (
    <>
      <div className="md:mt-12 ld:mt-12 mt-5">
        <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold md:ml-52 ld:ml-52 ml-4">
          Search Results
        </label>
      </div>

      <div className="justify-center  md:mx-52 lg:ml-52 lg:mr-52 grid grid-cols-2 lg:grid-cols-4  mx-4 ld:gap-x-96  gap-x-4 mb-16 ">
        {filteredRecipes
          .sort(() => Math.random() - 0.5)
          .map((item, index) => (
            <Link to={`/Recipe/${item.Id}`} key={index}>
              <div className="max-w-xs mx-auto overflow-hidden shadow-lg rounded-lg md:mt-10 ld:mt-10 mt-4 ">
                <img
                  className="w-full"
                  src={item.Src}
                  alt={item.Id}
                  style={{ width: "300px", height: "250px" }}
                />
                <div className="p-4">
                  <div className=" flex items-center">
                    {/* Render star icons */}
                    {renderStars(item.Star)}
                  </div>
                  <h2 className="text-gray-800 text-lg font-semibold px-1">
                    {item.Name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

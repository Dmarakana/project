import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

export default function Favorites() {
  const [isChecked, setIsChecked] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();

  const [search, setsearch] = useState("");
  const handleInputChange = (value) => {
    setsearch(value);
  };

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
    setSelect(isChecked === false ? 1 : 0);
    if (isChecked === false) {
      setSelectedCards(recipe.map((image) => image.Id));
    } else {
      setSelectedCards([]);
    }
  };

  //get sror data
  const [stor, setStor] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/savedata");
        setStor(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please try again later.");
      }
    };

    getData();
  }, []);

  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/recipe")
      .then((response) => response.json())
      .then((data) =>
        setRecipe(data.filter((recipe) => stor.includes(recipe.Id)))
      )
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [stor]);

  const handleSelect = () => {
    setSelect(select === 0 ? 1 : 0);
    setSelectedCards([]);
    if (select === 1) {
      setIsChecked(false);
    }
  };

  const [selectedCards, setSelectedCards] = useState([]);

  const handleClick = (id) => {
    if (select != 1 && isChecked == false) {
      navigate(`/Recipe/${id}`);
    }

    if (select === 1) {
      const index = selectedCards.indexOf(id);
      if (index === -1) {
        setSelectedCards([...selectedCards, id]);
      } else {
        const updatedSelection = selectedCards.filter(
          (cardId) => cardId !== id
        );
        setSelectedCards(updatedSelection);
      }
    }
  };

  const Remove = async () => {
    if (selectedCards.length != 0) {
      try {
        axios.post("http://localhost:3000/remove", {
          stor: selectedCards,
        });
        console.log("delete");
        window.location.reload();
      } catch (error) {
        console.error("Error : ", error);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <>
      <Navbar handleInputChange={handleInputChange} />

      {search === "" || search === null ? (
        <>
          <div className="md:mx-52 ld:mx-52 mx-2 mt-10">
            <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold mx-5">
              Favorites
            </label>
          </div>
          <div className="flex mx-52 px-5 gap-8 mt-5">
            <div className="">
              <label>({recipe.length} Recipes)</label>
            </div>
            <div className="">
              <button
                className={`flex w-14 ${
                  select === 1 ? "font-bold text-cyan-600" : ""
                }`}
                onClick={handleSelect}
              >
                <img
                  className="mt-1 w-4 h-4"
                  src="selection.png"
                  alt="select"
                />
                <label className="ml-1">Select</label>
              </button>
            </div>
            <div className="">
              <input
                className=""
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckChange}
              />
              <label className="ml-1">All</label>
            </div>
            <div className="">
              <button className="flex" onClick={Remove}>
                <img className="mt-1 w-4 h-4" src="delete.png" alt="delete" />
                <label className="ml-1">Delete</label>
              </button>
            </div>
          </div>
          {stor.length != 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 ld:grid-cols-4 gap-1 justify-center md:mx-52 ld:mx-48 mb-20">
              {recipe.map((item, index) => (
                <div
                  key={index}
                  className="max-w-xs mx-auto overflow-hidden rounded-lg md:mt-10 ld:mt-10 mt-4"
                  style={{
                    padding: "10px",
                    backgroundColor: selectedCards.includes(item.Id)
                      ? "lightblue"
                      : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(item.Id)}
                >
                  <img
                    className="w-full"
                    src={item.Src}
                    alt={item.Id}
                    style={{ width: "300px", height: "200px" }}
                  />
                  <div className="p-1">
                    <h2 className="text-gray-800 text-lg font-semibold">
                      {item.Name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex mx-52 justify-center items-center">
              <div className=" text-xl   py-40 mb-7">
                <p>No Favorite Recipe available</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <SearchResults data={search} />
      )}

      <Footer />
    </>
  );
}

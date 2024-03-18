import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Favorites() {
  const [isChecked, setIsChecked] = useState(false);
  const [select, setselect] = useState(0);

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
    setselect(isChecked == true ? 0 : 1);
    if (isChecked == false) {
      setSelectedCards(img.map((image) => image.id));
    } else {
      setSelectedCards([]);
    }
  };

  const img = [
    { id: 1, src: "wallpaperflare.com_wallpaper (8).jpg", text: "Pasta" },
    { id: 2, src: "wallpaperflare.com_wallpaper (1).jpg", text: "Pizza" },
    { id: 3, src: "wallpaperflare.com_wallpaper (3).jpg", text: "Vegan" },
    { id: 4, src: "delicious-indian-food-tray.jpg", text: "Breakfast" },
    { id: 5, src: "wallpaperflare.com_wallpaper (5).jpg", text: "Pasta" },
    {
      id: 6,
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Breakfast",
    },
    { id: 7, src: "swapnil-dwivedi-Nl8Oa6ZuNcA-unsplash.jpg", text: "Vegan" },
    {
      id: 8,
      src: "top-view-fried-potatoes-with-seasonings-bread-loafs-different-vegetables-dark-desk.jpg",
      text: "Pasta",
    },
    { id: 9, src: "wallpaperflare.com_wallpaper (6).jpg", text: "Pizza" },
    { id: 10, src: "delicious-indian-food-tray.jpg", text: "Breakfast" },
  ];

  const handleselect = () => {
    setselect(select === 0 ? 1 : 0);
    setSelectedCards([]);
    if (select == 1) {
      setIsChecked(false);
    }
  };

  const [selectedCards, setSelectedCards] = useState([]);

  const handleClick = (id) => {
    if (select == 1) {
      const index = selectedCards.indexOf(id);
      if (index === -1) {
        // If the id is not already in selectedCards, add it
        setSelectedCards([...selectedCards, id]);
      } else {
        // If the id is already in selectedCards, remove it
        const updatedSelection = selectedCards.filter(
          (cardId) => cardId !== id
        );
        setSelectedCards(updatedSelection);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="  md:mx-52 ld:mx-52 mx-2 mt-10">
        <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold mx-5">
          Favorites
        </label>
      </div>
      <div className="flex mx-52 px-5 gap-8 mt-5">
        <div className="">
          <label>({img.length} Recipes)</label>
        </div>

        <div className="">
          <button
            className={`flex w-14 ${
              select == 1 ? " font-bold text-cyan-600" : ""
            }`}
            onClick={handleselect}
          >
            <img className="mt-1 w-4 h-4" src="selection.png" />
            <label className="ml-1">Select</label>
          </button>
        </div>
        <div className="">
          <input
            className=""
            type="radio"
            name="radio"
            checked={isChecked}
            onClick={handleCheckChange}
          ></input>
          <label className="ml-1">All</label>
        </div>
        <div className="">
          <button className="flex">
            <img className="mt-1 w-4 h-4" src="delete.png" />
            <label className="ml-1">Delete</label>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center md:mx-52 ld:mx-48 gap-2 mb-20">
        {img.map((item, index) => (
          <div
            key={index}
            className="max-w-xs mx-auto overflow-hidden  rounded-lg md:mt-10 ld:mt-10 mt-4"
            style={{
              padding: "10px",
              margin: "5px",
              backgroundColor: selectedCards.includes(item.id)
                ? "lightblue"
                : "white",
              cursor: "pointer",
            }}
            onClick={() => handleClick(item.id)}
          >
            <img
              className="w-full"
              src={item.src}
              alt={item.text}
              style={{ width: "300px", height: "200px" }}
            />
            <div className="p-1">
              <h2 className="text-gray-800 text-lg font-semibold">
                {item.text}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <label>{selectedCards}</label>

      <Footer />
    </>
  );
}

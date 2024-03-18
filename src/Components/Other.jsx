import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Recipe from "./Recipe";
export default function Other() {
  const [width, setWidth] = useState(950); // Initial width
  const [height, setHeight] = useState("auto"); // Initial height set to auto

  // Function to handle image load event
  const handleImageLoad = (event) => {
    // Change the image's width and height here
    setWidth(event.target.width / 2); // for example, halving the width
    setHeight(event.target.height / 2); // for example, halving the height
  };

  const img = [
    {
      src: "wallpaperflare.com_wallpaper (6).jpg",
      text: "Pasta",
    },
    {
      src: "swapnil-dwivedi-Nl8Oa6ZuNcA-unsplash.jpg",
      text: "Pizza",
    },
    {
      src: "wallpaperflare.com_wallpaper (3).jpg",
      text: "Vegan",
    },
    {
      src: "delicious-indian-food-tray.jpg",
      text: "Breakfast",
    },
    {
      src: "wallpaperflare.com_wallpaper (6).jpg",
      text: "Pasta",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Breakfast",
    },
    {
      src: "swapnil-dwivedi-Nl8Oa6ZuNcA-unsplash.jpg",
      text: "Vegan",
    },
    {
      src: "top-view-fried-potatoes-with-seasonings-bread-loafs-different-vegetables-dark-desk.jpg",
      text: "Pasta",
    },
    {
      src: "wallpaperflare.com_wallpaper (6).jpg",
      text: "Pizza",
    },
    {
      src: "delicious-indian-food-tray.jpg",
      text: "Breakfast",
    },
  ];

  const data = [
    {
      imageUrl: "wallpaperflare.com_wallpaper (3).jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl:
        "top-view-fried-potatoes-with-seasonings-bread-loafs-different-vegetables-dark-desk.jpg",
      title: "Product 2",
      rating: 5,
    },
    {
      imageUrl: "delicious-indian-food-tray.jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl: "wallpaperflare.com_wallpaper (8).jpg",
      title: "Product 2",
      rating: 5,
    },
    {
      imageUrl: "swapnil-dwivedi-Nl8Oa6ZuNcA-unsplash.jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl:
        "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      title: "Product 2",
      rating: 5,
    },
    {
      imageUrl: "delicious-indian-food-tray.jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl: "wallpaperflare.com_wallpaper (3).jpg",
      title: "Product 2",
      rating: 5,
    },
    {
      imageUrl: "wallpaperflare.com_wallpaper.jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl: "pexels-ash-376464.jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl: "sam-moghadam-khamseh-yxZSAjyToP4-unsplash.jpg",
      title: "Product 1",
      rating: 4,
    },
    {
      imageUrl: "delicious-indian-food-tray.jpg",
      title: "Product 1",
      rating: 4,
    },
    // Add more card data as needed
  ];

  // Function to render star icons based on rating
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

  //increse card on click load button 1
  const [sl, setsl] = useState(12);
  const incrementCount = () => {
    setsl((sl) => sl + 4);
    console.log(sl);
  };

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetch("http://localhost:3000/api/pcategories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const [Recipe, setRecipe] = useState([]);
  useEffect(() => {
    // Fetch recipes from the API when the component mounts
    fetch("http://localhost:3000/api/recipe")
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <div className="md:mt-12 ld:mt-12 mt-5">
        <label className="ld:text-3xl md:text-3xl sm:text-2xl text-lg font-bold md:ml-52 ld:ml-52 ml-4">
          Popular Categories
        </label>
      </div>

      <div className="overflow-x-auto whitespace-nowrap justify-center md:my-10 lg:my-10 my-4 md:mx-48 lg:mx-48 scrollbar-hidden">
        {Categories.map((data, index) => (
          <div key={index} className="inline-block  md:mx-4 lg:mx-4 mx-3">
            <div className="rounded-full overflow-hidden">
              <img
                className="md:w-44 lg:w-44 md:h-44 lg:h-44 w-24 h-24 object-cover"
                src={data.src}
                alt={`Image ${index + 1}`}
                onLoad={handleImageLoad}
              />
            </div>
            <p className="text-center font-bold md:text-2xl ld:text-2xl md:mt-3 ld:mt-3 mt-1">
              {data.catagories}
            </p>
          </div>
        ))}
      </div>

      <div className="md:mt-12 ld:mt-12 mt-5">
        <label className="ld:text-3xl md:text-3xl sm:text-2xl text-lg font-bold md:ml-52 ld:ml-52 ml-4">
          Super Delicious
        </label>
      </div>

      <div className="justify-center  md:mx-52 lg:ml-52 lg:mr-52 grid grid-cols-2 lg:grid-cols-4  mx-4 ld:gap-x-96  gap-x-4 ">
        {Recipe.filter((item) => item.Star === 5)
          .slice(0, sl)
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
      <div className="flex justify-center my-16">
        <button
          className="border-solid border-2 border-gray-950 text-sb  px-6 py-2"
          type="button"
          onClick={incrementCount}
        >
          Load More
        </button>
      </div>

      <div className="md:mt-12 ld:mt-12 mt-5">
        <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold md:ml-52 ld:ml-52 ml-4">
          Chef Rated Collection
        </label>
      </div>

      <div className="justify-center  md:mx-52 lg:ml-52 lg:mr-52 grid grid-cols-2 lg:grid-cols-3  mx-4 ld:gap-x-96 md:gap-x-24 gap-x-4 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full  md:max-w-xs overflow-hidden shadow-lg rounded-lg md:mt-10 lg:mt-10 mt-4"
          >
            <img
              className="w-full h-full"
              src={item.imageUrl}
              alt={item.title}
              onLoad={handleImageLoad}
              style={{ width: "900px", height: "270px" }}
            />
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold">
                {item.title}
              </h2>
              <div className="flex justify-end">
                <button
                  className="border-solid border-2 border-gray-950 text-sm ld:px-2 px-1"
                  type="button"
                >
                  156 Recipes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:mt-12 ld:mt-12 mt-5">
        <label className="ld:text-3xl md:text-3xl sm:text-2xl text-lg font-bold md:ml-52 ld:ml-52 ml-4">
          Latest Recipes
        </label>
      </div>
      <div className="flex flex-wrap justify-center md:mx-52 ld:mx-48 gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="max-w-xs mx-auto overflow-hidden  rounded-lg md:mt-10 ld:mt-10 mt-4 "
          >
            <img
              className="w-full"
              src={item.imageUrl}
              alt={item.title}
              style={{ width: "200px", height: "200px" }}
            />
            <div className="p-1">
              <h2 className="text-gray-800 text-lg font-semibold">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-16">
        <button
          className="border-solid border-2 border-gray-950 text-sb  px-6 py-2"
          type="button"
        >
          Load More
        </button>
      </div>
    </>
  );
}

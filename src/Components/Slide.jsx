import { useState, useEffect } from "react";

const images = [
  "wallpaperflare.com_wallpaper (6).jpg",
  "wallpaperflare.com_wallpaper (3).jpg",
  "swapnil-dwivedi-Nl8Oa6ZuNcA-unsplash.jpg",
  "fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai.jpg",
  "delicious-indian-food-tray.jpg",
];

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(950);
  const [height, setHeight] = useState("auto");

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleImageLoad = (event) => {
    setWidth(event.target.width / 2);
    setHeight(event.target.height / 2);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
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
      <div className=" container mx-auto md:mt-5 ld:mt-5 mt-3  ">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center ">
            <button>
              <div
                className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2 py-1 bg-gray-600 text-white rounded shadow"
                onClick={prevSlide}
              >
                <span>&#10094;</span>
              </div>
            </button>
            <button>
              <div
                className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1 bg-gray-600 text-white rounded shadow"
                onClick={nextSlide}
              >
                <span>&#10095;</span>
              </div>
            </button>
          </div>
          <div className="w-full overflow-hidden md:h-auto  ld:h-auto h-96">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`w-full ${
                  index === currentSlide ? "block" : "hidden"
                }`}
                style={{ width: width, height: 650 }}
                onLoad={handleImageLoad}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideShow;

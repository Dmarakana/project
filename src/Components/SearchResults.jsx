import { useState } from "react";

export default function SearchResults() {
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
      src: "https://hips.hearstapps.com/hmg-prod/images/packed-lunch-ideas-646e6dbed0303.jpeg?crop=1xw:0.75xh;center,top&resize=1200:*",
      text: "Pasta",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Pizza",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/packed-lunch-ideas-646e6dbed0303.jpeg?crop=1xw:0.75xh;center,top&resize=1200:*",
      text: "Vegan",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Breakfast",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/packed-lunch-ideas-646e6dbed0303.jpeg?crop=1xw:0.75xh;center,top&resize=1200:*",
      text: "Pasta",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Breakfast",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/packed-lunch-ideas-646e6dbed0303.jpeg?crop=1xw:0.75xh;center,top&resize=1200:*",
      text: "Vegan",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Vegan",
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/packed-lunch-ideas-646e6dbed0303.jpeg?crop=1xw:0.75xh;center,top&resize=1200:*",
      text: "Pizza",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Breakfast",
    },
    // Add more image URLs as needed
  ];

  return (
    <>
      <div className="md:mt-12 ld:mt-12 mt-5">
        <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold md:ml-52 ld:ml-52 ml-4">
          Search Results
        </label>
      </div>

      <div className=" justify-center md:my-10 lg:my-10 my-4 md:ml-48 lg:ml-40 ">
        {img.map((imgSrc, index) => (
          <div key={index} className="inline-block  md:mx-4 lg:mx-7 mx-3 mt-8 ">
            <div className="">
              <img
                className="md:w-56 lg:w-64 md:h-44 lg:h-44 w-24 h-24 object-cover"
                src={imgSrc.src}
                alt={`Image ${index + 1}`}
                onLoad={handleImageLoad}
              />
            </div>
            <p className="text-center font-bold md:text-2xl ld:text-2xl md:mt-3 ld:mt-3 mt-1">
              {imgSrc.text}
            </p>
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

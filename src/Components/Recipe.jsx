import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Recipe() {
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  const params = useParams();

  const data = [
    {
      data1: "Calories",
      data2: "219.9",
    },
    {
      data1: "Total Fat",
      data2: "10.7 g",
    },
    {
      data1: "Saturated Fat",
      data2: "2.2 g",
    },
    {
      data1: " Cholesterol",
      data2: "37.4 mg",
    },
    {
      data1: "Sodium",
      data2: "120.3 mg",
    },
    {
      data1: "Potassium",
      data2: "32.8 mg",
    },
    {
      data1: "Total Carbohydrate",
      data2: "22.3 mg",
    },
    {
      data1: "Sugars",
      data2: "8.4 g",
    },
    {
      data1: "Protein",
      data2: "7.9 g",
    },
  ];

  const Instructions = [
    "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
    "Pour mixture into a 20cm tart tin Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
    "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
    "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
    "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
    "Add the warm cream and melted gelatin mixture and mix until well combined.",
    "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
    "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
    "Slice with a knife to serve",
  ];

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
    },
    {
      src: "https://hips.hearstapps.com/hmg-prod/images/packed-lunch-ideas-646e6dbed0303.jpeg?crop=1xw:0.75xh;center,top&resize=1200:*",
      text: "Pizza",
    },
    {
      src: "https://assets.epicurious.com/photos/5df7bb4bb6b82900083f1e4a/16:9/w_4346,h_2445,c_limit/COOK90_SaladPowerSprinkle_HERO_120519_13790.jpg",
      text: "Breakfast",
    },
  ];

  const [Recipe, setRecipe] = useState([]);

  useEffect(() => {
    // Fetch users from the API when the component mounts
    fetch("http://localhost:3000/api/recipe")
      .then((response) => response.json())
      .then((data) => {
        const New = data;
        setRecipe(New);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [ld, setld] = useState(12);
  const ldincrement = () => {
    setld((ld) => ld + 6);
  };

  return (
    <>
      <Navbar />
      <div className="  md:mx-52 ld:mx-52 mx-2 mt-10">
        {Recipe.filter((recipe) => recipe.Id == params.id).map((Item) => (
          <div key={Item.Id}>
            <div className="flex items-center justify-between">
              <label className="ld:text-4xl md:text-4xl sm:text-2xl text-xl font-bold mx-5">
                {Item.Name}
              </label>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`md:h-10 md:w-9 ld:h-10 ld:md:w-9 h-7 w-6 cursor-pointer mr-10 ${
                    isSaved ? "text-orange-500 fill-orange-500" : ""
                  }`}
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={handleClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M5 3a2 2 0 012-2h10a2 2 0 012 2v18l-7-3-7 3V3z"
                  />
                </svg>
              </div>
            </div>

            <p className="md:mt-12 ld:mt-12 mx-5 mt-5">{Item.Text}</p>

            <img
              src={Item.Src}
              alt=" "
              className="md:h-[550px] ld:h-[500px] w-full mt-3"
            />

            <div className="flex gap-5 md:mt-7 ld:mt-7 md:mx-10 ld:mx-10 mx-4 mt-3">
              <div className="text-slate-400 border-r-2 md:px-4 ld:px-4 px-2 md:text-sm ld:text-sm text-xs">
                <label>PREP Time</label>
                <br />
                <label className="text-black">{Item.Preptime}</label>
              </div>
              <div className="text-slate-400 border-r-2 md:px-4 ld:px-4 px-2 md:text-sm ld:text-sm text-xs">
                <label>COOK Time</label>
                <br />
                <label className="text-black">{Item.Cooktime}</label>
              </div>
              <div className="text-slate-400 border-r-2 md:px-4 ld:px-4 px-2 md:text-sm ld:text-sm text-xs">
                <label>SERVING</label>
                <br />
                <label className="text-black ">{Item.Serving}</label>
              </div>
            </div>

            <div className="grid md:grid-cols-2  ld:grid-cols-2 ">
              <div className="md:py-4 ld:py-4">
                <div className="ld:text-4xl md:text-3xl sm:text-2xl text-lg  font-bold md:mx-10 ld:mx-10  mx-2">
                  <label>Ingredients</label>
                </div>

                <div className="text-lg md:mt-2 ld:mt-2 md:mx-20 mx-7">
                  {Item.Ingredients.map((ing, index) => (
                    <div key={index} className="py-2">
                      {ing}
                    </div>
                  ))}
                </div>

                <div className="ld:text-4xl md:text-xxl sm:text-2xl text-sm  font-bold md:mx-10 ld:mx-10 mx-4 mt-4 mb-5">
                  <label>Nutrition Facts</label>
                </div>

                <div className="text-lg md:mt-2 lg:mt-2 md:mx-16 bg-slate-200 rounded-xl mx-7">
                  <div className="md:mx-4 ld:mx-4 mx-5">
                    {Item.NutritionFacts.map((tdata, index) => (
                      <div key={index}>
                        {tdata.Data1.map((item, index2) => (
                          <div
                            key={index2}
                            className={`flex justify-between  py-1 border-black  ${
                              index2 + 1 == tdata.Data1.length
                                ? "pb-5"
                                : "border-b-[1px]"
                            }`}
                          >
                            <p>{item}</p>
                            <p className="text-black">{tdata.Data2[index2]}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="ld:text-4xl md:text-3xl sm:text-2xl text-lg  font-bold  mx-2 mb-5">
                  <label>Instructions</label>
                </div>
                {Item.Instructions.map((Instructions, index) => (
                  <div key={index} className="flex px-2.5 mb-5">
                    <div
                      className={`flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 mt-1`}
                    >
                      <span className=" text-white px-2">{index + 1}</span>
                    </div>
                    <div className="items-center px-2 md:text-xl ld:text-xl text-lg">
                      <p>{Instructions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="md:mt-12 ld:mt-12 mt-5">
          <label className="ld:text-3xl md:text-3xl sm:text-2xl text-xl font-bold mx-5">
            Latest Recipes
          </label>
        </div>

        <div className="flex flex-wrap justify-center mx-5 gap-2">
          {Recipe.slice(0, ld).map((item, index) => (
            <Link
              to={`/Recipe/${item.Id}`}
              key={index}
              onClick={window.scrollTo(0, 0)}
            >
              <div className="max-w-xs mx-auto overflow-hidden  rounded-lg md:mt-10 ld:mt-10 mt-4 ">
                <img
                  className="w-full"
                  src={item.Src}
                  alt={item.Id}
                  style={{ width: "200px", height: "200px" }}
                />
                <div className="p-1">
                  <h2 className="text-gray-800 text-lg font-semibold">
                    {item.Name.length > 20
                      ? item.Name.substring(0, 20) + "...."
                      : item.Name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center my-16">
          <button
            className="border-solid border-2 border-gray-950 text-sb  px-6 py-2"
            onClick={ldincrement}
            type="button"
          >
            Load More
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

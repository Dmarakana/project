// server.js

//npm start
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());
const port = 3000; // Port on which the server will run

//mongodb database connection
mongoose
  .connect("mongodb://localhost:27017/Khanakhajana")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// for otp send
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dmarakana564@rku.ac.in",
    pass: "D0579838",
  },
});

const OtpVerification = new mongoose.model("otp_verification", {
  email: String,
  otp: String,
});

app.post("/send-email", (req, res) => {
  const { to } = req.body;
  const email = to;
  const otp = Math.floor(10000 + Math.random() * 90000);
  const mailOptions = {
    from: "dmarakana564@rku.ac.in",
    to: to,
    subject: "Your OTP",
    text: `Your OTP is: ${otp}`,
  };

  async function run() {
    try {
      const existingUser = await OtpVerification.findOne({ email });
      if (existingUser) {
        console.log("user exist");
        await OtpVerification.deleteMany({ email });
      } else {
        console.log("user not exist");
      }
      // Delete all documents with the provided email
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }

  run();

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send OTP email");
    } else {
      console.log("Email sent:", info.response);

      // creat collection otp_verification
      try {
        const data = OtpVerification({ email, otp });
        data.save();
        res.status(201).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }

      res.status(200).send("OTP email sent successfully");
    }
  });
});

// Define a User schema
const User = mongoose.model("users", {
  username: String,
  email: String,
  password: String,
});

app.post("/check", async (req, res) => {
  try {
    const { email, username, password, otp } = req.body;
    let exist = false;
    const existingUser = await OtpVerification.findOne({ email, otp });
    console.log(email);
    console.log(otp);
    if (existingUser) {
      console.log("user exist");
      try {
        //register user detailse
        const user = User({ username, email, password });
        await user.save();
      } catch (error) {
        console.error(error);
      }

      //user data insert here

      exist = true;

      //insert code hear
    } else {
      console.log("user not exist");
    }
    res.json(exist);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// recipes  data
const pcatagories = [
  {
    id: 1,
    catagories: "Pizza",
    src: "https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg",
  },
  {
    id: 2,
    catagories: "Pasta",
    src: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    catagories: "Vegan Dishes",
    src: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVnYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    catagories: "Ice cream",
    src: "https://static.vecteezy.com/system/resources/previews/030/677/292/large_2x/product-shots-of-ice-cream-high-quality-4k-ultra-free-photo.jpg",
  },
  {
    id: 5,
    catagories: "Salad",
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FsYWR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 6,
    catagories: "Soup",
    src: "https://c4.wallpaperflare.com/wallpaper/611/939/665/hot-pot-soup-food-wallpaper-preview.jpg",
  },
  {
    id: 7,
    catagories: "Sandwiches",
    src: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FuZHdpY2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    catagories: "Desserts",
    src: "https://images3.alphacoders.com/133/1338868.png",
  },
  {
    id: 9,
    catagories: "Dal Dishes",
    src: "https://img.freepik.com/free-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18712.jpg",
  },
  {
    id: 10,
    catagories: "Stir-fries",
    src: "https://media.istockphoto.com/id/622068426/photo/stir-fry-with-chicken-mushrooms-broccoli-and-peppers.jpg?s=612x612&w=0&k=20&c=u5nlDN-OFrrrOiDxr4EYp5b1L4oUGdEcJdyla1HunAs=",
  },
  {
    id: 11,
    catagories: "Aloo Dishes",
    src: "https://media.istockphoto.com/id/1042898008/photo/potato-cumin-curry.jpg?s=612x612&w=0&k=20&c=zvaP2M5OosOArWpNpoXCuNcBZwxTZi4v65ZoP-aptrg=",
  },
  {
    id: 12,
    catagories: "Roti",
    src: "https://t4.ftcdn.net/jpg/01/01/71/05/360_F_101710585_mjWXkNav1nX4Ph33MqYd79FdVUWBbKyD.jpg",
  },
  {
    id: 13,
    catagories: "Lauki Dishes",
    src: "https://img.freepik.com/premium-photo/lauki-doodhi-ka-halwa-is-indian-popular-sweet-dish-made-up-bottle-gourd-garnished-with-dry-fruits-consumed-hot_466689-62441.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1701302400&semt=sph",
  },
  {
    id: 14,
    catagories: "Baingan Dishes",
    src: "https://www.shutterstock.com/image-photo/dahi-baingan-eggplant-yogurt-curry-600nw-1298813026.jpg",
  },
  {
    id: 15,
    catagories: "Bharta  Dishes",
    src: "https://www.shutterstock.com/image-photo/baiganbaingan-bharta-mashed-roasted-eggplant-600nw-522071107.jpg",
  },
  {
    id: 16,
    catagories: "Rice Dishes",
    src: "https://media.istockphoto.com/id/507155407/photo/healthy-homemade-fried-rice.jpg?s=612x612&w=0&k=20&c=WvNGk-7iwrBmsXH1QrrT7vaCTuB2Nij57mQey0VMohU=",
  },
  {
    id: 17,
    catagories: "Burgers",
    src: "https://img.freepik.com/free-photo/close-up-vegetarian-burger-cutting-board_23-2148784533.jpg",
  },
  {
    id: 18,
    catagories: "Sushi",
    src: "https://c4.wallpaperflare.com/wallpaper/39/1005/99/sushi-rolls-sushi-food-wallpaper-preview.jpg",
  },
  {
    id: 19,
    catagories: "Curries",
    src: "https://img.freepik.com/premium-photo/mix-vegetable-curry-indian-main-course-recipe-contains-carrots-cauliflower-green-peas-beans-baby-corn-capsicum-paneer-cottage-cheese-with-traditional-masala-curry_466689-35413.jpg",
  },
  {
    id: 20,
    catagories: "Fondue",
    src: "https://media-cdn2.greatbritishchefs.com/media/mfsbfn11/img85294.jpg",
  },
  {
    id: 21,
    catagories: "Bao Buns",
    src: "https://breadtopia.com/wp-content/uploads/2022/09/20220831_132211-1600x900.jpg",
  },
  {
    id: 22,
    catagories: "Pastries",
    src: "https://wallpaperbat.com/img/78574-pastry-wallpaper-top-free-pastry-background.jpg",
  },
  {
    id: 23,
    catagories: "Noodle Dishes",
    src: "https://w0.peakpx.com/wallpaper/232/79/HD-wallpaper-asian-food-food-noodles-plate-asian-meat.jpg",
  },
  {
    id: 24,
    catagories: "Wraps",
    src: "https://static.toiimg.com/photo/62194857.cms",
  },
  {
    id: 25,
    catagories: "Casseroles",
    src: "https://www.southernliving.com/thmb/UxxeurwZ4B0aoc3xZb1gkybLkRQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Hashbrown_Casserole_008-8d51878d6a4e451aaea813a282497650.jpg",
  },
  {
    id: 26,
    catagories: "Galettes",
    src: "https://www.eatingwell.com/thmb/MMmcNnXMqGL-hmzVYiOurMl7r1A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5678223-f0e0b828396c43a1836088427691f651.jpg",
  },
  {
    id: 27,
    catagories: "Tacos",
    src: "https://www.twopeasandtheirpod.com/wp-content/uploads/2021/06/Veggie-Tacos4577.jpg",
  },
  {
    id: 28,
    catagories: "Burritos",
    src: "https://iheartvegetables.com/wp-content/uploads/2022/12/Vegetarian-Burritos-23-of-25.jpg",
  },
  {
    id: 29,
    catagories: "Baked Goods",
    src: "https://www.partstown.com/about-us/wp-content/uploads/2022/10/Most-Profitable-Baked-Goods-for-Bakeries-Donuts.jpg",
  },
  {
    id: 30,
    catagories: "Curries",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Indiandishes.jpg",
  },
];

const recipe = [
  {
    Id: 1,
    Name: "Strawberry Cream Cheesecake",
    Src: "https://img.delicious.com.au/8sG9kcQV/del/2015/10/strawberries-cream-cheesecake-12011-1.jpg",
    Categorie: "Desserts",
    Star: 5,
    Text: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
    Preptime: "15 MIN",
    Cooktime: "",
    Serving: "4 PEOPLE",
    Ingredients: ["nmsn.ngns.n.dn.gn.s,ndg.s,"],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Potassium",
          "Total Carbohydrate",
          "Sugars",
          "Protein",
        ],
        Data2: [
          "219.9",
          "10.7 g",
          "2.2 g",
          "37.4 mg",
          "120.3 mg",
          "32.8 mg",
          "22.3 mg",
          "8.4 g",
          "7.9 g",
        ],
      },
    ],

    Instructions: [
      "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
      "Pour mixture into a 20cm tart tin Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
      "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
      "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
      "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
      "Add the warm cream and melted gelatin mixture and mix until well combined.",
      "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
      "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
      "Slice with a knife to serve",
    ],
  },

  {
    Id: 2,
    Name: "Chocolate Lava Cake",
    Src: "Personal Recipe",
    Categorie: "Dessert",
    Star: 5,
    Text: "Indulge in this decadent dessert with a warm, gooey center of melted chocolate.",
    Preptime: "20 minutes",
    Cooktime: "",
    Serving: "4",
    Ingredients: [
      "1/2 cup (1 stick) unsalted butter",
      "4 ounces semi-sweet chocolate, chopped",
      "1 cup powdered sugar",
      "2 large eggs",
      "2 egg yolks",
      "1 teaspoon vanilla extract",
      "1/4 cup all-purpose flour",
      "Pinch of salt",
    ],
    NutritioFacts: [
      {
        Data1: ["Calories", "Fat", "Carbohydrates", "Protein"],
        Data2: ["350", "20g", "38g", "5g"],
      },
    ],
    Instructions: [
      "Preheat your oven to 425°F (220°C). Grease four 6-ounce ramekins with butter and lightly dust with cocoa powder.",
      "In a microwave-safe bowl, melt the butter and chopped chocolate in 30-second intervals until smooth. Stir until well combined.",
      "In a separate bowl, whisk together powdered sugar, eggs, egg yolks, and vanilla extract until light and fluffy.",
      "Gradually pour the melted chocolate mixture into the egg mixture, whisking constantly.",
      "Sift in flour and salt, then gently fold until just combined.",
      "Divide the batter evenly among the prepared ramekins. Place ramekins on a baking sheet and bake in the preheated oven for 12-14 minutes, or until the edges are set but the center is still soft.",
      "Remove from the oven and let the cakes cool for 1-2 minutes. Run a knife around the edges to loosen, then carefully invert onto serving plates.",
      "Serve immediately, optionally with a scoop of vanilla ice cream or a dusting of powdered sugar.",
    ],
  },
  {
    Id: 3,
    Name: "Raspberry Cheesecake Bars",
    Src: "https://www.example.com/raspberry-cheesecake-bars",
    Categorie: "Dessert",
    Star: 4,
    Text: "Indulge in these creamy cheesecake bars swirled with tangy raspberry preserves for a delightful dessert.",
    Preptime: "20 minutes",
    Cooktime: "35 minutes",
    Serving: "16 bars",
    Ingredients: [
      "1 1/2 cups graham cracker crumbs",
      "1/4 cup granulated sugar",
      "6 tablespoons unsalted butter, melted",
      "16 ounces cream cheese, softened",
      "1/2 cup granulated sugar",
      "2 large eggs",
      "1 teaspoon vanilla extract",
      "1/3 cup raspberry preserves",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 150mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["220", "14g", "8g", "60mg", "20g", "0g", "14g", "3g"],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C). Line an 8x8-inch baking pan with parchment paper, leaving an overhang on the sides for easy removal.",
      "In a mixing bowl, combine the graham cracker crumbs, granulated sugar, and melted butter until evenly moistened.",
      "Press the mixture into the bottom of the prepared baking pan, forming an even layer.",
      "In another mixing bowl, beat the cream cheese and granulated sugar until smooth and creamy.",
      "Beat in the eggs, one at a time, until fully incorporated.",
      "Stir in the vanilla extract.",
      "Pour the cheesecake mixture over the crust in the baking pan and spread evenly.",
      "Drop spoonfuls of raspberry preserves over the cheesecake mixture.",
      "Use a knife to gently swirl the raspberry preserves into the cheesecake mixture, creating a marbled effect.",
      "Bake in the preheated oven for 30-35 minutes, or until the edges are set and the center is slightly jiggly.",
      "Remove from the oven and let cool completely in the pan on a wire rack.",
      "Refrigerate for at least 2 hours, or until chilled and set.",
      "Once chilled, lift the cheesecake bars out of the pan using the parchment paper overhang.",
      "Slice into bars and serve chilled.",
    ],
  },
  {
    Id: 4,
    Name: "Key Lime Pie",
    Src: "https://www.example.com/key-lime-pie",
    Categorie: "Dessert",
    Star: 5,
    Text: "Transport yourself to the tropics with this tangy and refreshing Key Lime Pie, perfect for a summer treat.",
    Preptime: "20 minutes",
    Cooktime: "15 minutes",
    Serving: "8",
    Ingredients: [
      "1 1/2 cups graham cracker crumbs",
      "1/3 cup granulated sugar",
      "6 tablespoons unsalted butter, melted",
      "3 large egg yolks",
      "1 can (14 ounces) sweetened condensed milk",
      "1/2 cup key lime juice",
      "1 tablespoon key lime zest",
      "Whipped cream, for topping",
      "Thin lime slices, for garnish",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 190mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["350", "18g", "9g", "110mg", "42g", "1g", "32g", "6g"],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C).",
      "In a medium bowl, combine the graham cracker crumbs, granulated sugar, and melted butter until evenly moistened.",
      "Press the mixture into the bottom and up the sides of a 9-inch pie dish.",
      "Bake the crust in the preheated oven for 10 minutes, then remove and let cool slightly.",
      "In a large bowl, whisk together the egg yolks, sweetened condensed milk, key lime juice, and key lime zest until well combined.",
      "Pour the filling into the prepared crust and spread evenly.",
      "Bake the pie for 12-15 minutes, or until the center is set but still slightly jiggly.",
      "Remove from the oven and let cool to room temperature, then refrigerate for at least 2 hours, or until chilled and set.",
      "Before serving, top with whipped cream and garnish with thin lime slices.",
      "Slice and serve chilled.",
    ],
  },
  {
    Id: 5,
    Name: "Red Velvet Cupcakes",
    Src: "https://www.example.com/red-velvet-cupcakes",
    Categorie: "Dessert",
    Star: 4,
    Text: "Enjoy the rich cocoa flavor and vibrant red color of these classic cupcakes topped with cream cheese frosting.",
    Preptime: "20 minutes",
    Cooktime: "20 minutes",
    Serving: "12 cupcakes",
    Ingredients: [
      "1 1/4 cups all-purpose flour",
      "1/4 cup unsweetened cocoa powder",
      "1/2 teaspoon baking soda",
      "1/4 teaspoon salt",
      "1/2 cup unsalted butter, softened",
      "1 cup granulated sugar",
      "2 large eggs",
      "1/2 cup buttermilk",
      "1 tablespoon red food coloring",
      "1 teaspoon vanilla extract",
      "1 teaspoon white vinegar",
      "Cream cheese frosting, for topping (store-bought or homemade)",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 150mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["250", "12g", "7g", "60mg", "32g", "1g", "22g", "3g"],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C) and line a muffin tin with paper liners.",
      "In a medium bowl, sift together the flour, cocoa powder, baking soda, and salt.",
      "In a large bowl, cream together the butter and granulated sugar until light and fluffy.",
      "Beat in the eggs one at a time, then stir in the buttermilk, red food coloring, vanilla extract, and white vinegar.",
      "Gradually mix in the dry ingredients until smooth and well combined.",
      "Divide the batter evenly among the prepared muffin cups, filling each about 2/3 full.",
      "Bake in the preheated oven for 18-20 minutes, or until a toothpick inserted into the center comes out clean.",
      "Allow cupcakes to cool in the tin for 5 minutes before transferring to a wire rack to cool completely.",
      "Once cooled, frost with cream cheese frosting.",
    ],
  },
  {
    Id: 6,
    Name: "Raspberry Cheesecake Bars",
    Src: "https://www.example.com/raspberry-cheesecake-bars",
    Categorie: "Dessert",
    Star: 5,
    Text: "Creamy cheesecake swirled with tangy raspberry preserves, these bars are a delightful treat for any occasion.",
    Preptime: "20 minutes",
    Cooktime: "45 minutes",
    Serving: "16 bars",
    Ingredients: [
      "1 1/2 cups graham cracker crumbs",
      "1/4 cup granulated sugar",
      "6 tablespoons unsalted butter, melted",
      "16 ounces cream cheese, softened",
      "1/2 cup granulated sugar",
      "2 large eggs",
      "1 teaspoon vanilla extract",
      "1/2 cup raspberry preserves",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["250", "16g", "9g", "70mg", "170mg", "23g", "0g", "16g", "3g"],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C). Line an 8x8-inch baking pan with parchment paper, leaving an overhang on the sides for easy removal.",
      "In a mixing bowl, combine the graham cracker crumbs, sugar, and melted butter. Press the mixture into the bottom of the prepared pan.",
      "In a separate bowl, beat the cream cheese and sugar until smooth.",
      "Beat in the eggs, one at a time, followed by the vanilla extract.",
      "Pour the cream cheese mixture over the graham cracker crust, spreading it into an even layer.",
      "Drop spoonfuls of raspberry preserves over the cream cheese layer. Use a knife to gently swirl the preserves into the cheesecake mixture.",
      "Bake for 40-45 minutes, or until the edges are set and the center is slightly jiggly.",
      "Let cool completely in the pan on a wire rack, then refrigerate for at least 2 hours before cutting into bars.",
    ],
  },
  {
    Id: 7,
    Name: "Chocolate Mousse",
    Src: "https://www.example.com/chocolate-mousse",
    Categorie: "Dessert",
    Star: 5,
    Text: "Silky smooth and decadently rich, chocolate mousse is a delightful dessert that will satisfy any chocolate lover.",
    Preptime: "20 minutes",
    Cooktime: "10 minutes",
    Serving: "6",
    Ingredients: [
      "7 ounces semisweet chocolate, chopped",
      "3 tablespoons unsalted butter",
      "3 large eggs, separated",
      "1/4 cup granulated sugar",
      "1 teaspoon vanilla extract",
      "1 cup heavy cream",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["380", "29g", "17g", "170mg", "45mg", "28g", "2g", "24g", "5g"],
      },
    ],
    Instructions: [
      "In a heatproof bowl set over a pot of simmering water, melt the chocolate and butter, stirring until smooth. Remove from heat and let cool slightly.",
      "In a separate bowl, beat the egg yolks with granulated sugar until pale and thick. Stir in the vanilla extract.",
      "Gradually whisk the melted chocolate mixture into the egg yolk mixture until smooth.",
      "In another bowl, beat the egg whites until stiff peaks form.",
      "In yet another bowl, whip the heavy cream until soft peaks form.",
      "Gently fold the whipped cream into the chocolate mixture, followed by the beaten egg whites, until no streaks remain.",
      "Divide the mousse among serving dishes and chill for at least 2 hours before serving.",
    ],
  },
  {
    Id: 8,
    Name: "Peach Cobbler",
    Src: "https://www.example.com/peach-cobbler",
    Categorie: "Dessert",
    Star: 4,
    Text: "Savor the flavors of ripe peaches topped with a buttery biscuit crust in this comforting Southern dessert.",
    Preptime: "20 minutes",
    Cooktime: "45 minutes",
    Serving: "8",
    Ingredients: [
      "6 cups sliced fresh peaches",
      "1/2 cup granulated sugar",
      "1 tablespoon lemon juice",
      "1 teaspoon vanilla extract",
      "1/2 teaspoon ground cinnamon",
      "1/4 teaspoon ground nutmeg",
      "1 cup all-purpose flour",
      "1/2 cup granulated sugar",
      "1/2 teaspoon baking powder",
      "1/4 teaspoon salt",
      "1/2 cup unsalted butter, melted",
      "Vanilla ice cream, for serving",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 50mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["320", "12g", "7g", "30mg", "52g", "3g", "35g", "3g"],
      },
    ],
    Instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a large bowl, toss the sliced peaches with granulated sugar, lemon juice, vanilla extract, cinnamon, and nutmeg.",
      "Transfer the peach mixture to a greased 9x13-inch baking dish.",
      "In a separate bowl, combine the flour, granulated sugar, baking powder, and salt.",
      "Stir in the melted butter until a crumbly dough forms.",
      "Drop spoonfuls of the dough evenly over the peaches.",
      "Bake in the preheated oven for 40-45 minutes, or until the topping is golden brown and the filling is bubbling.",
      "Serve warm, optionally with vanilla ice cream.",
    ],
  },
  {
    Id: 9,
    Name: "Tiramisu",
    Src: "https://www.example.com/tiramisu",
    Categorie: "Dessert",
    Star: 5,
    Text: "Experience the rich layers of espresso-soaked ladyfingers and creamy mascarpone cheese.",
    Preptime: "30 minutes",
    Cooktime: "0 minutes",
    Serving: "12",
    Ingredients: [
      "6 large egg yolks",
      "3/4 cup granulated sugar",
      "1 cup mascarpone cheese, softened",
      "1 1/2 cups heavy cream",
      "1 cup strong brewed coffee, cooled",
      "1/4 cup coffee liqueur (optional)",
      "24 ladyfingers",
      "Unsweetened cocoa powder, for dusting",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["320", "21g", "12g", "200mg", "30mg", "28g", "1g", "18g", "4g"],
      },
    ],
    Instructions: [
      "In a heatproof bowl, whisk together egg yolks and sugar until well combined.",
      "Place the bowl over a pot of simmering water, making sure the bottom of the bowl doesn't touch the water. Cook, whisking constantly, until the mixture thickens and doubles in volume.",
      "Remove from heat and let cool slightly.",
      "Add mascarpone cheese to the egg mixture and stir until smooth.",
      "In a separate bowl, whip the heavy cream until stiff peaks form.",
      "Gently fold the whipped cream into the mascarpone mixture until well combined.",
      "In a shallow dish, combine brewed coffee and coffee liqueur, if using.",
      "Quickly dip each ladyfinger into the coffee mixture, ensuring they are soaked but not soggy, and arrange a layer of soaked ladyfingers in the bottom of a 9x13-inch dish.",
      "Spread half of the mascarpone mixture over the ladyfingers.",
      "Repeat with another layer of soaked ladyfingers and the remaining mascarpone mixture.",
      "Cover and refrigerate for at least 4 hours, or overnight, to set.",
      "Before serving, dust the top with cocoa powder.",
      "Slice and serve chilled.",
    ],
  },
  {
    Id: 10,
    Name: "Apple Crisp",
    Src: "https://www.example.com/apple-crisp",
    Categorie: "Dessert",
    Star: 4,
    Text: "Enjoy the warm, comforting flavors of baked apples with a crispy oat topping.",
    Preptime: "15 minutes",
    Cooktime: "45 minutes",
    Serving: "8",
    Ingredients: [
      "6 cups peeled and sliced apples",
      "1 tablespoon lemon juice",
      "1/2 cup granulated sugar",
      "1 teaspoon ground cinnamon",
      "1/2 teaspoon ground nutmeg",
      "1 cup old-fashioned oats",
      "1/2 cup all-purpose flour",
      "1/2 cup packed brown sugar",
      "1/4 teaspoon salt",
      "1/2 cup unsalted butter, cold and cubed",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 60mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["280", "12g", "7g", "30mg", "42g", "4g", "28g", "2g"],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C) and grease a 9x13-inch baking dish.",
      "In a large bowl, toss the sliced apples with lemon juice, granulated sugar, cinnamon, and nutmeg. Transfer to the prepared baking dish.",
      "In another bowl, combine oats, flour, brown sugar, and salt. Cut in cold butter until the mixture resembles coarse crumbs.",
      "Sprinkle the oat mixture evenly over the apples in the baking dish.",
      "Bake for 40-45 minutes, or until the topping is golden brown and the apples are tender.",
      "Serve warm with vanilla ice cream or whipped cream, if desired.",
    ],
  },
  {
    Id: 11,
    Name: "Lemon Bars",
    Src: "https://www.example.com/lemon-bars",
    Categorie: "Dessert",
    Star: 5,
    Text: "Tangy and sweet, these lemon bars are a delightful treat for citrus lovers.",
    Preptime: "20 minutes",
    Cooktime: "45 minutes",
    Serving: "16 bars",
    Ingredients: [
      "1 cup unsalted butter, softened",
      "1/2 cup powdered sugar",
      "2 cups all-purpose flour",
      "4 large eggs",
      "2 cups granulated sugar",
      "1/3 cup fresh lemon juice",
      "1/4 cup all-purpose flour",
      "1/2 teaspoon baking powder",
      "Powdered sugar, for dusting",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["220", "9g", "5g", "65mg", "40mg", "33g", "0g", "23g", "2g"],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C).",
      "In a mixing bowl, cream together the butter and powdered sugar until light and fluffy.",
      "Gradually add in the 2 cups of flour, mixing until well combined.",
      "Press the mixture into the bottom of an ungreased 9x13-inch baking pan.",
      "Bake for 20 minutes in the preheated oven, until firm and golden.",
      "While the crust is baking, beat together the eggs, granulated sugar, lemon juice, 1/4 cup of flour, and baking powder until light and frothy.",
      "Pour the lemon mixture over the hot crust.",
      "Return the pan to the oven and bake for an additional 25 minutes, or until the top is lightly golden.",
      "Allow to cool completely in the pan on a wire rack.",
      "Once cooled, dust with powdered sugar and cut into bars.",
    ],
  },
  {
    Id: 12,
    Name: "Strawberry Shortcake",
    Src: "https://www.example.com/strawberry-shortcake",
    Categorie: "Dessert",
    Star: 4,
    Text: "Celebrate the sweetness of summer with this classic strawberry shortcake recipe.",
    Preptime: "20 minutes",
    Cooktime: "15 minutes",
    Serving: "6",
    Ingredients: [
      "2 cups all-purpose flour",
      "1/4 cup granulated sugar",
      "1 tablespoon baking powder",
      "1/2 teaspoon salt",
      "1/2 cup cold unsalted butter, cubed",
      "3/4 cup heavy cream",
      "2 cups sliced strawberries",
      "2 tablespoons granulated sugar",
      "Whipped cream, for serving",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 410mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["340", "19g", "12g", "65mg", "39g", "2g", "12g", "5g"],
      },
    ],
    Instructions: [
      "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper.",
      "In a large bowl, combine the flour, sugar, baking powder, and salt.",
      "Cut in the cold butter until the mixture resembles coarse crumbs.",
      "Stir in the heavy cream just until combined.",
      "Turn the dough out onto a lightly floured surface and knead gently 6-8 times.",
      "Roll out the dough to 1/2-inch thickness and cut into rounds using a biscuit cutter.",
      "Place the rounds onto the prepared baking sheet and bake for 12-15 minutes, or until golden brown.",
      "While the shortcakes are baking, toss the sliced strawberries with 2 tablespoons of sugar and let macerate for 15-20 minutes.",
      "To serve, split the shortcakes in half horizontally. Top each bottom half with a spoonful of strawberries and whipped cream, then replace the top half of the shortcake. Serve immediately.",
    ],
  },
  {
    Id: 13,
    Name: "Banoffee Pie",
    Src: "https://www.example.com/banoffee-pie",
    Categorie: "Dessert",
    Star: 5,
    Text: "Indulge in the irresistible combination of bananas, toffee, and whipped cream in this classic British dessert.",
    Preptime: "20 minutes",
    Cooktime: "10 minutes",
    Serving: "8",
    Ingredients: [
      "1 1/2 cups graham cracker crumbs",
      "1/3 cup unsalted butter, melted",
      "1/4 cup granulated sugar",
      "1 can (14 ounces) sweetened condensed milk",
      "2 large bananas, sliced",
      "1 1/2 cups heavy cream",
      "1 teaspoon vanilla extract",
      "Chocolate shavings or cocoa powder, for garnish",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: [
          "480",
          "30g",
          "18g",
          "100mg",
          "240mg",
          "50g",
          "1g",
          "34g",
          "5g",
        ],
      },
    ],
    Instructions: [
      "Preheat oven to 350°F (175°C).",
      "In a mixing bowl, combine the graham cracker crumbs, melted butter, and granulated sugar. Press the mixture into the bottom and up the sides of a 9-inch pie dish.",
      "Bake for 10 minutes, then remove from oven and let cool completely.",
      "In a saucepan, place the unopened can of sweetened condensed milk and cover with water. Bring to a boil, then reduce heat and simmer for 2-3 hours. Allow the can to cool completely before opening.",
      "Spread the caramelized condensed milk (dulce de leche) evenly over the cooled crust.",
      "Arrange the sliced bananas over the caramel layer.",
      "In a mixing bowl, whip the heavy cream with vanilla extract until stiff peaks form. Spread the whipped cream over the bananas.",
      "Garnish with chocolate shavings or cocoa powder.",
      "Chill the pie in the refrigerator for at least 4 hours before serving.",
    ],
  },
  {
    Id: 14,
    Name: "Vanilla Bean Panna Cotta",
    Src: "https://www.example.com/vanilla-bean-panna-cotta",
    Categorie: "Dessert",
    Star: 4,
    Text: "Enjoy the smooth and creamy goodness of this Italian classic dessert.",
    Preptime: "10 minutes",
    Cooktime: "10 minutes",
    Serving: "4",
    Ingredients: [
      "1 cup whole milk",
      "1 tablespoon unflavored gelatin",
      "3 cups heavy cream",
      "1/2 cup granulated sugar",
      "1 vanilla bean, split and seeds scraped out",
      "Fresh berries, for garnish (optional)",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["480", "42g", "26g", "150mg", "45mg", "20g", "0g", "19g", "5g"],
      },
    ],
    Instructions: [
      "In a small bowl, sprinkle the gelatin over the milk and let stand for 5 minutes to soften.",
      "In a saucepan, combine the heavy cream, sugar, and vanilla bean seeds.",
      "Heat over medium heat until the sugar has dissolved and the mixture is hot but not boiling.",
      "Remove from heat and stir in the gelatin mixture until completely dissolved.",
      "Strain the mixture through a fine-mesh sieve into a pouring jug.",
      "Divide the mixture among 4 ramekins or glasses.",
      "Refrigerate for at least 4 hours, or until set.",
      "To serve, run a knife around the edge of each panna cotta and invert onto serving plates.",
      "Garnish with fresh berries if desired.",
    ],
  },
  {
    Id: 15,
    Name: "Classic Chocolate Chip Cookies",
    Src: "https://www.example.com/classic-chocolate-chip-cookies",
    Categorie: "Dessert",
    Star: 5,
    Text: "Delight in the timeless taste of homemade chocolate chip cookies.",
    Preptime: "10 minutes",
    Cooktime: "10 minutes",
    Serving: "24 cookies",
    Ingredients: [
      "1 cup unsalted butter, softened",
      "1 cup granulated sugar",
      "1 cup packed brown sugar",
      "2 large eggs",
      "1 teaspoon vanilla extract",
      "3 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 cups semisweet chocolate chips",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories: 180",
          "Total Fat: 9g",
          "Saturated Fat: 5g",
          "Cholesterol: 25mg",
          "Sodium: 80mg",
          "Total Carbohydrates: 25g",
          "Dietary Fiber: 1g",
          "Sugars: 16g",
          "Protein: 2g",
        ],
        Data2: [],
      },
    ],
    Instructions: [
      "Preheat oven to 375°F (190°C) and line baking sheets with parchment paper.",
      "In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth.",
      "Beat in the eggs one at a time, then stir in the vanilla extract.",
      "Combine the flour, baking soda, and salt; gradually stir into the creamed mixture.",
      "Fold in the chocolate chips.",
      "Drop by rounded spoonfuls onto the prepared baking sheets.",
      "Bake for 8 to 10 minutes, or until golden brown.",
      "Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack to cool completely.",
    ],
  },
  {
    Id: 16,
    Name: "Chocolate Lava Cake",
    Src: "www.example.com",
    Categorie: "Dessert",
    Star: 4,
    Text: "Indulge in this rich and decadent chocolate dessert with a gooey lava center.",
    Preptime: "15 minutes",
    Cooktime: "12 minutes",
    Serving: "4",
    Ingredients: [
      "1/2 cup unsalted butter",
      "4 ounces semi-sweet chocolate",
      "1 cup powdered sugar",
      "2 large eggs",
      "2 egg yolks",
      "1 teaspoon vanilla extract",
      "6 tablespoons all-purpose flour",
      "1/4 teaspoon salt",
    ],
    NutritioFacts: [
      {
        Data1: ["Calories", "Fat", "Carbs", "Protein"],
        Data2: ["420", "27g", "40g", "6g"],
      },
    ],
    Instructions: [
      "Preheat oven to 425°F (220°C). Grease and flour four 6-ounce ramekins.",
      "In a microwave-safe bowl, melt the butter and chocolate together, stirring until smooth.",
      "In a separate bowl, whisk together powdered sugar, eggs, egg yolks, and vanilla extract until well combined.",
      "Slowly pour the melted chocolate mixture into the egg mixture, stirring continuously.",
      "Fold in flour and salt until just combined. Do not overmix.",
      "Divide the batter evenly among the prepared ramekins.",
      "Place ramekins on a baking sheet and bake for 12 minutes, or until the edges are set but the center is still soft.",
      "Remove from oven and let cool for 1 minute. Carefully invert each ramekin onto a plate, and serve immediately.",
    ],
  },
  {
    Id: 17,
    Name: "Chocolate Chip Cookies",
    Src: "MyFavoriteRecipes.com",
    Categorie: "Dessert",
    Star: 4,
    Text: "Delicious homemade chocolate chip cookies that are perfect for any occasion!",
    Preptime: "15 minutes",
    Cooktime: "10 minutes",
    Serving: "Makes about 24 cookies",
    Ingredients: [
      "1 cup (2 sticks) unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "1 teaspoon vanilla extract",
      "2 large eggs",
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 cups semisweet chocolate chips",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 100mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["150", "8g", "5g", "25mg", "20g", "1g", "14g", "2g"],
      },
    ],
    Instructions: [
      "Preheat oven to 375°F (190°C) and line baking sheets with parchment paper.",
      "In a large mixing bowl, cream together the butter, granulated sugar, brown sugar, and vanilla extract until light and fluffy.",
      "Add eggs, one at a time, beating well after each addition.",
      "In a separate bowl, combine flour, baking soda, and salt. Gradually add to the creamed mixture, beating until well blended.",
      "Stir in chocolate chips.",
      "Drop dough by rounded tablespoons onto prepared baking sheets, leaving some space between each cookie.",
      "Bake for 8-10 minutes or until edges are lightly golden brown.",
      "Allow cookies to cool on the baking sheets for a few minutes before transferring to wire racks to cool completely.",
      "Enjoy your delicious homemade chocolate chip cookies!",
    ],
  },
  {
    Id: 18,
    Name: "Classic Chocolate Chip Cookies",
    Src: "Family Cookbook",
    Categorie: "Dessert",
    Star: 4,
    Text: "These classic chocolate chip cookies are chewy, gooey, and packed with rich chocolate flavor. They're perfect for satisfying your sweet tooth!",
    Preptime: "15 minutes",
    Cooktime: "10 minutes",
    Serving: "Makes about 24 cookies",
    Ingredients: [
      "1 cup (2 sticks) unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "1 teaspoon vanilla extract",
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon salt",
      "2 cups semisweet chocolate chips",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 90mg",
          "Carbohydrates",
          "Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["160", "8g", "5g", "25mg", "22g", "1g", "14g", "2g"],
      },
    ],
    Instructions: [
      "Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper or silicone baking mats.",
      "In a large mixing bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy.",
      "Beat in the eggs one at a time, then stir in the vanilla extract.",
      "In a separate bowl, whisk together the flour, baking soda, and salt. Gradually add the dry ingredients to the wet ingredients, mixing until well combined.",
      "Fold in the chocolate chips until evenly distributed throughout the dough.",
      "Drop rounded tablespoons of dough onto the prepared baking sheets, spacing them about 2 inches apart.",
      "Bake in the preheated oven for 9 to 11 minutes, or until the edges are golden brown. Remove from the oven and let the cookies cool on the baking sheets for a few minutes before transferring them to wire racks to cool completely.",
      "Enjoy these delicious cookies with a glass of milk or your favorite hot beverage!",
    ],
  },
  {
    Id: 19,
    Name: "Chocolate Brownie",
    Src: "MyBakingBlog.com",
    Categorie: "Dessert",
    Star: 4,
    Text: "Indulge in the rich, fudgy goodness of these homemade chocolate brownies. Perfect for satisfying your sweet tooth cravings!",
    Preptime: "15 minutes",
    Cooktime: "25 minutes",
    Serving: "12 brownies",
    Ingredients: [
      "1 cup (225g) unsalted butter",
      "2 cups (400g) granulated sugar",
      "4 large eggs",
      "1 teaspoon vanilla extract",
      "3/4 cup (90g) unsweetened cocoa powder",
      "1 cup (125g) all-purpose flour",
      "1/2 teaspoon salt",
      "1/2 teaspoon baking powder",
    ],
    NutritioFacts: [
      {
        Data1: [
          "Calories",
          "Total Fat",
          "Saturated Fat",
          "Cholesterol",
          "Sodium: 110mg",
          "Total Carbohydrates",
          "Dietary Fiber",
          "Sugars",
          "Protein",
        ],
        Data2: ["280", "15g", "9g", "80mg", "35g", "2g", "25g", "4g"],
      },
    ],
    Instructions: [
      "Preheat the oven to 350°F (175°C). Grease a 9x13 inch baking pan.",
      "In a medium saucepan, melt the butter over medium heat. Remove from heat, and stir in sugar, eggs, and vanilla. Beat in cocoa, flour, salt, and baking powder. Spread batter into prepared pan.",
      "Bake in preheated oven for 25 to 30 minutes. Do not overcook. Let cool in pan before cutting into squares.",
    ],
  },
  {
    Id: 20,
    Name: "Classic Vanilla Cheesecake",
    Src: "Family Recipe Book",
    Categorie: "Dessert",
    Star: 5,
    Text: "Enjoy the rich and creamy taste of this classic vanilla cheesecake, perfect for any occasion.",
    Preptime: "30 minutes",
    Cooktime: "",
    Serving: "8",
    Ingredients: [
      "1 1/2 cups graham cracker crumbs",
      "1/4 cup granulated sugar",
      "1/2 cup (1 stick) unsalted butter, melted",
      "3 (8-ounce) packages cream cheese, softened",
      "1 cup granulated sugar",
      "3 large eggs",
      "1 teaspoon vanilla extract",
      "1 cup sour cream",
    ],
    NutritioFacts: [
      {
        Data1: ["Calories", "Fat", "Carbohydrates", "Protein"],
        Data2: ["450", "32g", "35g", "7g"],
      },
    ],
    Instructions: [
      "Preheat your oven to 325°F (160°C). Grease a 9-inch springform pan.",
      "In a mixing bowl, combine graham cracker crumbs, 1/4 cup granulated sugar, and melted butter. Press the mixture firmly into the bottom of the prepared pan to form the crust.",
      "In a large bowl, beat cream cheese and 1 cup granulated sugar until smooth and creamy.",
      "Add eggs one at a time, beating well after each addition. Stir in vanilla extract.",
      "Fold in sour cream until well combined.",
      "Pour the filling over the crust in the pan and smooth the top with a spatula.",
      "Bake in the preheated oven for 50-60 minutes, or until the center is set and the edges are lightly golden.",
      "Turn off the oven and leave the cheesecake inside with the door slightly ajar for about 1 hour to cool gradually.",
      "Remove the cheesecake from the oven and refrigerate for at least 4 hours, preferably overnight, to chill and set completely.",
      "Before serving, run a knife around the edges of the pan to loosen the cheesecake. Remove the sides of the springform pan.",
      "Slice and serve chilled. Optionally, garnish with fresh berries or whipped cream.",
    ],
  },
  {
    Id: 21,
    Name: "",
    Src: "",
    Categorie: "",
    Star: 4,
    Text: "",
    Preptime: "",
    Cooktime: "",
    Serving: "",
    Ingredients: "",
    NutritioFacts: [
      {
        Data1: [],
        Data2: [],
      },
    ],

    Instructions: [],
  },
];

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.get("/api/pcategories", (req, res) => {
  res.json(pcatagories);
});

app.get("/api/recipe", (req, res) => {
  res.json(recipe);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

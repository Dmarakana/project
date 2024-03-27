// server.js

//npm start
const express = require("express");
const cors = require("cors");
const { pcatagories, recipe } = require("./data.js");

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
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
  fullname: String,
  username: String,
  email: String,
  password: String,
  image: String,
  stor: Array,
});

const image =
  "data:image/png;base64,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";

app.post("/check", async (req, res) => {
  try {
    const stor = [];

    const { email, username, password, otp } = req.body;

    let exist = false;
    const existingUser = await OtpVerification.findOne({ email, otp });
    console.log(email);
    console.log(otp);
    if (existingUser) {
      console.log("user exist");
      try {
        //register user detailse
        const user = User({ username, email, password, image, stor });
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

app.post("/checkforgototp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    let exist = false;
    const existingUser = await OtpVerification.findOne({ email, otp });
    if (existingUser) {
      exist = true;
    }

    res.json(exist);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/updatepassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    let updated = false;
    const update = await User.findOneAndUpdate(
      { email },
      { password: password },
      { new: true }
    );
    if (update) {
      updated = true;
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/emailcheck", async (req, res) => {
  try {
    const { email } = req.body;

    let exist = false;
    const existingUser = await User.findOne({ email });
    console.log(email);
    if (existingUser) {
      exist = true;
    } else {
      console.log("user not exist");
    }
    res.json(exist);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

let userid = null;

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email, password });

    if (existingUser) {
      const data = await User.findOne(
        { email: email, password: password },
        "_id"
      );
      userid = data._id;
      console.log(" user exist");
    } else {
      console.log(" user not exist");
    }
    res.json(userid);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/save", async (req, res) => {
  const { id, stor } = req.body;

  try {
    await User.findByIdAndUpdate(id, { $push: { stor: stor } }, { new: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/savedata", async (req, res) => {
  try {
    const storedata = await User.findById(userid);
    res.json(storedata.stor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/userid", async (req, res) => {
  res.json(userid);
});

app.post("/remove", async (req, res) => {
  const { stor } = req.body;

  try {
    await User.findByIdAndUpdate(
      userid,
      { $pull: { stor: { $in: stor } } },
      { new: true }
    );
  } catch (error) {
    console.error(error);
  }
});

app.post("/saveimage", async (req, res) => {
  const { image, fullname, username } = req.body;

  try {
    await User.findByIdAndUpdate(
      userid,
      { image: image, fullname: fullname, username: username },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/profiledata", async (req, res) => {
  try {
    // Find the user document by ID
    const user = await User.findById(userid);
    const responseData = {
      image: user.image,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
    };
    res.json(responseData);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Internal Server Error");
  }
});

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

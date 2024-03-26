import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import heic2any from "heic2any";

export default function Profile() {
  const [id, setid] = useState("");
  const [img, setimg] = useState(null);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [fullname, setfullname] = useState("");

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetch("http://localhost:3000/userid")
      .then((response) => response.json())
      .then((data) => setid(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetch("http://localhost:3000/profiledata")
      .then((response) => response.json())
      .then((data) => {
        setimg(data.image);
        setemail(data.email);
        setusername(data.username);
        setfullname(data.fullname);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  const [image, setImage] = useState("");

  const handleImageChange = async (e) => {
    var reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const saveimage = () => {
    //save code
    const save = async () => {
      try {
        await axios.post("http://localhost:3000/saveimage", {
          image: image,
          fullname: fullname,
          username: username,
        });
      } catch (error) {
        console.error("Error in save image:", error);
        alert("Failed to save image. Please try again later.");
      }
    };
    save();

    console.log("save");
    window.location.reload();
  };

  const remove = () => {
    setImage();
  };

  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handlefullnameChange = (e) => {
    setfullname(e.target.value);
  };

  return (
    <>
      <div className="flex  justify-between md:ml-52 ld:ml-52 ml-4 ">
        <div className=" py-10 ">
          <label className="ld:text-3xl md:text-3xl sm:text-2xl text-lg font-bold ml-16">
            Profile
          </label>
        </div>
        <div className="py-10 mr-96">
          <button
            className="bg-orange-500 text-white md:px-4 ld:px-4 md:py-1 ld:py-1 rounded md:ml-4 ld:ml-4 md:mt-0 ld:mt-0 -mt-28"
            onClick={saveimage}
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-52 w-56 h-56 rounded-full overflow-hidden">
          {image ? (
            <img src={image} className=" object-cover" alt="Selected" />
          ) : (
            <img src={img} className="" alt="Default" />
          )}
        </div>

        <div className="flex flex-col pl-20 pr-10">
          <label className="bg-orange-500 text-white md:px-4 ld:px-4 md:py-1 ld:py-1 rounded md:ml-4 ld:ml-4">
            Change Photo
            <input
              type="file"
              accept="image/jpeg, image/png "
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="flex flex-col">
          <button
            className="text-black md:px-4 ld:px-4 md:py-1 ld:py-1 rounded  border-solid border-2 border-stone-400"
            onClick={remove}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="ml-64 flex mt-7">
        <div className="">
          <label className="">FULL NAME</label>
          <div className="relative w-96 mt-4">
            <input
              name="fullname"
              type="text"
              className="pl-6 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 focus:outline-none focus:border-b-black w-full"
              value={fullname}
              onChange={handlefullnameChange}
            />
            <img src="user.png " className="h-5 w-6 mb-5 -mt-6" />
          </div>
        </div>

        <div className="ml-28">
          <div className="">
            <label className="">USER NAME</label>
            <div className="relative w-96 mt-4">
              <input
                name="username"
                type="text"
                className="pl-6 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 focus:outline-none focus:border-b-black w-full"
                value={username}
                onChange={handleusernameChange}
              />
              <img src="arroba.png " className="h-5 w-5 mb-5 -mt-6 " />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-64 flex mt-10">
        <div className="">
          <label className="">EMAIL</label>
          <div className="relative w-96 mt-4">
            <input
              name="email"
              type="email"
              className="pl-6 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 focus:outline-none focus:border-b-black w-full"
              value={email}
              disabled={true}
            />
            <img src="email.png " className="h-5 w-5 mb-5 -mt-6" />
          </div>
        </div>

        <div className="ml-28">
          <div className="">
            <label className="">PASSWORD</label>
            <div className=" relative w-96 mt-4">
              <input
                name="password"
                type="password"
                className="pl-6 border-solid border-t-0 border-l-0 border-r-0 border-b-stone-400 border-b-2 focus:outline-none focus:border-b-black w-full"
                value={"*********"}
                disabled={true}
              />
              <img src="lock.png " className="h-5 w-6 mb-5 -mt-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

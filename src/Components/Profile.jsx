import React from "react";

export default function Profile() {
  return (
    <>
      <div className="flex  justify-between md:ml-52 ld:ml-52 ml-4 ">
        <div className=" py-10 ">
          <label className="ld:text-3xl md:text-3xl sm:text-2xl text-lg font-bold ml-16">
            Profile
          </label>
        </div>
        <div className="py-10 mr-96">
          <button className="bg-orange-500 text-white md:px-4 ld:px-4 md:py-1 ld:py-1 rounded md:ml-4 ld:ml-4 md:mt-0 ld:mt-0 -mt-28">
            Save
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="ml-52 w-56 h-56">
          <img src="account.png" />
        </div>
        <div className="flex flex-col pl-20 pr-10">
          <button className="bg-orange-500 text-white md:px-4 ld:px-4 md:py-1 ld:py-1 rounded md:ml-4 ld:ml-4">
            Change Photo
          </button>
        </div>
        <div className="flex flex-col">
          <button className="text-black md:px-4 ld:px-4 md:py-1 ld:py-1 rounded  border-solid border-2 border-stone-400">
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
              />
              <img src="lock.png " className="h-5 w-6 mb-5 -mt-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

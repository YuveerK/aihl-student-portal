import React from "react";
import { BsBell, BsGear } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
const Navbar = () => {
  return (
    <div className="h-[80px] text-white bg-blue-950 flex items-center px-8 justify-between">
      <div>
        <h1 className="hidden md:block font-bold text-xl">
          African Institute for Health Leadership
        </h1>
      </div>

      <div className="flex items-center">
        <div className="relative mx-8">
          <BsBell size={20} />
          <div className="absolute top-[-12px] right-[-10px] bg-red-600 rounded-full w-[20px] flex items-center justify-center h-[20px]">
            <p className="text-white text-sm pb-[2px]">4</p>
          </div>
        </div>

        <div className="flex items-center">
          <RxAvatar size={25} />
          <p className="ml-2">Yuveer</p>
        </div>
        <div className="flex items-center ml-8">
          <BsGear size={25} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

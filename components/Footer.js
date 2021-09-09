import React from "react";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="text-center p-1 z-10">
      <p className="flex justify-center items-center">
        Made with&nbsp;
        <AiFillHeart className="text-red-600" />
        &nbsp;by
        <a
          href="https://linkedin.com/in/bgeorges35"
          className="text-gray-500 cursor-pointer"
        >
          &nbsp;Benoit Georges
        </a>
      </p>
    </div>
  );
};

export default Footer;

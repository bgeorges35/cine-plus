import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const Header = () => {
  const [categories, setcategories] = useState([
    "tv",
    "movie",
    "family",
    "kids",
  ]);

  return (
    <div className="flex flex-row py-5 px-3 justify-between z-10  items-center">
      <div className="text-red-500 font-bold font-mono">
        <Link href="/">
          <a>CinePlus</a>
        </Link>
      </div>
      <ul className="flex ">
        {categories.map((item, i) => (
          <li key={i} className="mx-3 cursor-pointer hover:text-red-600">
            <Link href={`/${item}`}>
              <a>{item.toUpperCase()}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <AiOutlineSearch className="hover:text-red-600 cursor-pointer" />
      </div>
      <div>Benoit</div>
    </div>
  );
};

export default Header;

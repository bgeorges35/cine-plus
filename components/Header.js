import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { Paper } from "@material-ui/core";
import Link from "next/link";

const Header = ({ themeHandler, isDark }) => {
  const categories = ["tv", "movie"];

  return (
    <Paper className="flex flex-row py-5 px-3 justify-between z-10  items-center w-full">
      <div className="text-red-500 font-bold font-mono">
        <Link href="/">
          <a>CinePlus</a>
        </Link>
      </div>
      <ul className="flex">
        {categories.map((item, i) => (
          <li key={i} className="mx-3 cursor-pointer hover:text-red-600">
            <Link href={`/${item}`}>
              <a>{item.toUpperCase()}</a>
            </Link>
          </li>
        ))}
      </ul>
      <CgDarkMode
        className="cursor-pointer"
        onClick={() => themeHandler(!isDark)}
      />
      <div>
        <AiOutlineSearch className="hover:text-red-600 cursor-pointer" />
      </div>
    </Paper>
  );
};

export default Header;

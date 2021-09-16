import Link from "next/link";
import React from "react";

export default function CardGrid({ item }) {
  return (
    <Link
      href={{
        pathname: "/[id]",
        query: {
          id: item.node.id,
        },
      }}
      as={`/${item.node.id}`}
      passHref
    >
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.node.backdrop})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "250px",
        }}
        className={`w-1/6 m-2 cursor-pointer transition duration-75 ease-in-out transform hover:scale-105 rounded-xl`}
      >
        <p className="text-white flex justify-center items-center h-full m-1 text-center hover:text-red-600 font-title">
          {item.node.title || item.node.name}
        </p>
      </div>
    </Link>
  );
}

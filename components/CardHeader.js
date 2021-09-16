import React from "react";

import { Card } from "@material-ui/core";
import Link from "next/link";

export default function CardHeader({ item }) {
  return (
    <Link
      href={{
        pathname: "/[id]",
        query: {
          id: item.id,
        },
      }}
      as={`${item.id}`}
      passHref
    >
      <Card
        className="cursor-pointer"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.backdrop})`,
          width: "100%",
          height: "500px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-white flex mx-4 h-3/4 flex-col justify-between items-center">
          <p> {""}</p>
          <h1 className="text-2xl font-title">{item.title || item.name}</h1>
          <p className="text-center w-1/2">{item.overview || ""}</p>
        </div>
      </Card>
    </Link>
  );
}

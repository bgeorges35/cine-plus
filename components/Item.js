import React from "react";

import { Card } from "@material-ui/core";

export default function Item({ item }) {
  return (
    <Card
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.backdrop})`,
        height: "500px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex mx-4 h-3/4 flex-col justify-between items-center">
        <p> {""}</p>
        <h1 className="text-2xl">{item.title || item.name}</h1>
        <p className="text-center w-1/2">{item.overview || ""}</p>
      </div>
    </Card>
  );
}

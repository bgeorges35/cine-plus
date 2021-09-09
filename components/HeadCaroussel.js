import React from "react";
import Carousel from "react-material-ui-carousel";

import Link from "next/link";

import { Card } from "@material-ui/core";

export default function HeadCaroussel({ movies }) {
  return (
    <Carousel
      style={{ borderRadius: 0 }}
      stopAutoPlayOnHover={false}
      indicators={false}
      animation="slide"
      interval={10000}
    >
      {movies.map((item, i) => (
        <Item key={i} item={item.node} />
      ))}
    </Carousel>
  );
}

function Item({ item }) {
  return (
    <Link
      href={{
        pathname: "movie/[id]",
        query: {
          id: item.id,
        },
      }}
      as={`movie/${item.id}`}
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
          <h1 className="text-2xl">{item.title || item.name}</h1>
          <p className="text-center w-1/2">{item.overview || ""}</p>
        </div>
      </Card>
    </Link>
  );
}

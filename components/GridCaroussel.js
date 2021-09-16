import React from "react";

import Carousel from "react-material-ui-carousel";

import useVideoGrid from "../hooks/useVideoGrid";

import { Card, Grid, Box } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import CardGrid from "./CardGrid";

export default function GridCaroussel({ genres, type = ["movies", "tv"] }) {
  return genres.map((item, i) => {
    return (
      <div key={i} className="my-5">
        <Link
          href={{
            pathname: "/genre/[id]",
            query: {
              id: item.node.id,
            },
          }}
          as={`genre/${item.node.id}`}
          passHref
        >
          <a className="cursor-pointer text-2xl pl-2 mb-2 hover:text-red-700 ">
            {item.node.name}
          </a>
        </Link>
        <GridItem id={item.node.id} backdropSize="W300" type={type} />
      </div>
    );
  });
}

function GridItem({ id, backdropSize, type }) {
  const { loading, error, data } = useVideoGrid(type, {
    variables: { genreId: id, backdropSize: backdropSize, popularAfter: null },
  });

  if (loading)
    return (
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error! {error.message}</p>;

  let movies =
    "movies" in data.genres.genre
      ? data.genres.genre.movies.popular.edges
      : data.genres.genre.tv.popular.edges;

  const sliderItems = movies.length > 5 ? 5 : movies.length;
  const items = [];

  for (let i = 0; i < movies.length; i += sliderItems) {
    items.push(
      <Card key={i.toString()}>
        <Grid container justifyContent={"space-between"} spacing={1}>
          {movies.slice(i, i + sliderItems).map((da, index) => {
            return <CardGrid key={index.toString()} item={da} />;
          })}
        </Grid>
      </Card>
    );
  }
  return (
    <Carousel
      animation="slide"
      cycleNavigation
      indicators={false}
      autoPlay={false}
    >
      {items}
    </Carousel>
  );
}

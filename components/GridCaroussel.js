import React from "react";

import { gql, useQuery } from "@apollo/client";
import Carousel from "react-material-ui-carousel";

import { Card, Grid } from "@material-ui/core";
import Link from "next/link";

export default function GridCaroussel({ genres, type }) {
  return genres.map((item, i) => (
    <div key={i} className="my-5">
      <a className="cursor-pointer text-2xl pl-2 mb-2 hover:text-red-700 ">
        {item.node.name}
      </a>
      <GridItem id={item.node.id} backdropSize="W300" type={type} />
    </div>
  ));
}

function GridItem({ id, backdropSize, type }) {
  const TRENDING_TYPE = type.map(
    (t, i) => `
          ${t} {
            popular {
              edges {
                node {
                  backdrop(size: $backdropSize)
                  ${t === "movies" ? "title" : "name"}
                  id
                }
              }
            }
          }`
  );

  const GET_TRENDINGS = gql`
    query Query($genreId: ID!, $backdropSize: BackdropSize!) {
      genres {
        genre(id: $genreId) {
          ${TRENDING_TYPE}
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TRENDINGS, {
    variables: { genreId: id, backdropSize: backdropSize },
  });

  if (loading) return <p>Loading...</p>;
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
        <Grid
          container
          justifyContent={"space-between"}
          spacing={1}
          className="bg-black"
        >
          {movies.slice(i, i + sliderItems).map((da, index) => {
            return <Item key={index.toString()} item={da} />;
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

function Item({ item }) {
  return (
    <Link
      href={{
        pathname: "movie/[id]",
        query: {
          id: item.node.id,
        },
      }}
      as={`movie/${item.node.id}`}
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
        className={`w-1/6 m-2 cursor-pointer transition duration-75 ease-in-out transform hover:scale-105`}
      >
        <p className="text-white flex justify-center items-center h-full m-1 text-center hover:text-red-600">
          {item.node.title || item.node.name}
        </p>
      </div>
    </Link>
  );
}

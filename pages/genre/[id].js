import React, { useState } from "react";

import { NativeSelect, Grid, Button } from "@material-ui/core";
import { Box, CircularProgress } from "@mui/material";

import useVideoGrid from "../../hooks/useVideoGrid";
import CardGrid from "../../components/CardGrid";

export default function Genres({ genreId }) {
  const [genre, setGenre] = useState("movies");
  const [popularFirst, setPopularFirst] = useState(20);

  const genreChange = (event) => {
    setGenre(event.target.value);
  };

  const { loading, error, data } = useVideoGrid([genre], {
    variables: {
      genreId: genreId,
      backdropSize: "W300",
      popularFirst: popularFirst,
    },
  });

  if (loading)
    return (
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error! {error.message}</p>;

  const movies =
    "movies" in data.genres.genre
      ? data.genres.genre.movies.popular.edges
      : data.genres.genre.tv.popular.edges;

  return (
    <>
      <div className="m-4">
        <NativeSelect
          value={genre}
          onChange={genreChange}
          inputProps={{ "aria-label": "Genres" }}
        >
          <option value={"movies"}>Movies</option>
          <option value={"tv"}>TVs</option>
        </NativeSelect>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {movies.map((item, i) => (
          <CardGrid item={item} key={i} />
        ))}
      </Grid>
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            setPopularFirst(popularFirst + 20);
          }}
        >
          Load more...
        </Button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      genreId: context.query.id,
    },
  };
}

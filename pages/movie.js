import React from "react";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import HeadCaroussel from "../components/HeadCaroussel";
import GridCaroussel from "../components/GridCaroussel";

export default function HomeMovie({ trending, genres }) {
  return (
    <>
      <Head>
        <title>MOVIES</title>
        <link rel="icon" href="/play.png" />
      </Head>
      <HeadCaroussel movies={trending} />
      <GridCaroussel
        genres={genres.filter(
          (item) => item.node.movies.popular.totalCount > 5
        )}
        type={["movies"]}
      />
    </>
  );
}

export async function getStaticProps() {
  const GET_TRENDINGS = gql`
    query GetTrendings($trendingFirst: Int, $backdropSize: BackdropSize!) {
      movies {
        trending(first: $trendingFirst) {
          edges {
            node {
              id
              title
              overview
              backdrop(size: $backdropSize)
            }
          }
        }
      }
    }
  `;

  const GET_GENRES = gql`
    query Query($allFirst: Int) {
      genres {
        all(first: $allFirst) {
          edges {
            node {
              name
              id
              movies {
                popular {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  `;

  const trendings = await client.query({
    query: GET_TRENDINGS,
    variables: {
      trendingFirst: 10,
      backdropSize: "W1280",
    },
  });

  const genres = await client.query({
    query: GET_GENRES,
    variables: {
      allFirst: 10,
    },
  });

  return {
    props: {
      trending: trendings.data.movies.trending.edges,
      genres: genres.data.genres.all.edges,
    },
  };
}

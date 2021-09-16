import React from "react";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";

import HeadCaroussel from "../components/HeadCaroussel";
import GridCaroussel from "../components/GridCaroussel";

export default function HomeTV({ trending, genres }) {
  return (
    <>
      <Head>
        <title>TV</title>
        <link rel="icon" href="/play.png" />
      </Head>
      <HeadCaroussel movies={trending} />
      <GridCaroussel
        genres={genres.filter((item) => item.node.tv.popular.totalCount > 5)}
        type={["tv"]}
      />
    </>
  );
}

export async function getStaticProps() {
  const GET_TRENDINGS = gql`
    query Query($trendingFirst: Int, $backdropSize: BackdropSize!) {
      tv {
        trending(first: $trendingFirst) {
          edges {
            node {
              backdrop(size: $backdropSize)
              name
              overview
              id
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
              tv {
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
      trending: trendings.data.tv.trending.edges,
      genres: genres.data.genres.all.edges,
    },
  };
}

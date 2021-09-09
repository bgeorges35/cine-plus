import React from "react";

import { gql } from "@apollo/client";

import client from "../../apollo-client";
import Credits from "../../components/Credits";

import Youtube from "react-youtube";

export default function HomeTV({ Movieid, description }) {
  const videoId = description.videos.filter(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  const opts = {
    playerVars: {
      autoplay: 1,
      mute: 1,
    },
  };
  return (
    <>
      <div
        className="fixed h-screen bg-gradient-to-t"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${description.backdrop})`,
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="z-10 flex ">
        <div className="w-1/2 font-bold text-3xl uppercase h-screen flex items-center justify-center">
          {description.title}
        </div>
        <div className="w-1/2 backdrop-filter backdrop-blur-xl rounded-l-3xl px-5 flex justify-evenly items-center flex-col py-3">
          {videoId.length && <Youtube videoId={videoId[0].key} opts={opts} />}
          <p className="my-3">{description.overview}</p>
          <div className="flex flex-wrap justify-center">
            {description.credits.cast.slice(0, 8).map((item, i) => {
              if (item.value.profilePicture !== null)
                return (
                  <Credits
                    key={i}
                    character={item.character}
                    profilePicture={item.value.profilePicture}
                    name={item.value.name}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const GET_DESCRIPTION = gql`
    query Query(
      $movieId: ID!
      $backdropSize: BackdropSize!
      $profilePictureSize: ProfileSize!
    ) {
      movies {
        movie(id: $movieId) {
          budget
          backdrop(size: $backdropSize)
          numberOfRatings
          overview
          rating
          title
          videos {
            site
            links {
              web
            }
            type
            key
          }
          genres {
            name
          }
          credits {
            cast {
              character
              value {
                profilePicture(size: $profilePictureSize)
                name
              }
            }
          }
        }
      }
    }
  `;

  const description = await client.query({
    query: GET_DESCRIPTION,
    variables: {
      movieId: context.query.id,
      backdropSize: "W1280",
      profilePictureSize: "W185",
    },
  });

  return {
    props: {
      Movieid: context.query.id, //pass it to the page props
      description: description.data.movies.movie,
    },
  };
}

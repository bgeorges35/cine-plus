import React from "react";

import Credits from "../components/Credits";

import useVideoInformation from "../hooks/useVideoInformations";

import Youtube from "react-youtube";
import { Rating } from "@material-ui/lab";
import { Grid, Box, CircularProgress } from "@mui/material";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function HomeMovie({ Movieid }) {
  const { loading, error, data } = useVideoInformation({
    variables: {
      nodeId: Movieid,
      backdropSize: "W1280",
      profilePictureSize: "W185",
    },
  });
  if (loading)
    return (
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    );
  if (error) return `Error! ${error.message}`;

  const description = data.node;

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${description.backdrop})`,
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="z-10 flex ">
        <div className="w-1/2 font-bold text-3xl uppercase h-screen flex items-center justify-around flex-col">
          {description.title}
          <Rating
            name="size-large"
            value={description.rating / 2}
            defaultValue={2}
            size="large"
            readOnly
            icon={<AiFillHeart className="text-red-600" fontSize="inherit" />}
            emptyIcon={
              <AiOutlineHeart className="text-red-600" fontSize="inherit" />
            }
          />
        </div>
        <div className="w-1/2 backdrop-filter backdrop-blur-xl rounded-l-3xl flex justify-center items-center flex-col flex-wrap py-3 px-5 z-20">
          <p className="my-3 text-center">{description.overview}</p>
          {!!videoId.length && (
            <Youtube className="z-50" videoId={videoId[0].key} opts={opts} />
          )}
          <Grid
            container={true}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
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
          </Grid>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      Movieid: context.query.id,
    },
  };
}

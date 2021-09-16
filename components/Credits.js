import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";

const Credits = ({ character, profilePicture, name }) => {
  return (
    <div className="block w-min text-center m-3">
      <Avatar
        alt={character}
        src={profilePicture}
        sx={{ width: 70, height: 70 }}
      />
      <p className="py-2">{name}</p>
    </div>
  );
};

export default Credits;

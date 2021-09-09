import React from "react";
import Image from "next/image";

const Credits = ({ character, profilePicture, name }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-start mx-5 my-3">
        <Image
          src={profilePicture}
          alt={character}
          width={70}
          height={75}
          className="rounded-full"
        />
        <div className="w-min text-center py-2">{name}</div>
      </div>
    </>
  );
};

export default Credits;

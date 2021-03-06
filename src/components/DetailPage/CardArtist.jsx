import React from "react";
import numeral from "numeral";

export const CardArtist = ({ name, thumbnail, totalFollow }) => {
  return (
    <div className="shrink-0 text-center">
      <img src={thumbnail} alt={name} className="w-40 h-40 rounded-full" />
      <h3 className="font-semibold">{name}</h3>
      <span className="text-sm text-secondary">
        {numeral(totalFollow).format("0a")} quan tâm
      </span>
    </div>
  );
}

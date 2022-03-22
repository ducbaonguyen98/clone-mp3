import React from "react";
import CardSong from "./CardSong";
export default function SectionListSong({ data }) { 
  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {data.map((item, index) => (
          <CardSong
            key={index.toString()}
            title={item.title}
            thumbnail={item.thumbnail}
            encodeId={item.encodeId}
            artistsNames={item.artistsNames}
          />
        ))}
      </div>
    </div>
  );
}

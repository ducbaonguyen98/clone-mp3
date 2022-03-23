import React from "react";
import CardArtist from "./CardArtist"; 
export default function SectionArtist({ data }) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Nghệ sĩ đóng góp</h2>
      <div className="flex gap-5 overflow-x-scroll scrollbar-hide">
        {data.map((item, index) => (
          <CardArtist
            key={index.toString()}
            name={item.name}
            thumbnail={item.thumbnail}
            totalFollow={item.totalFollow}
          />
        ))}
      </div>
    </div>
  );
}

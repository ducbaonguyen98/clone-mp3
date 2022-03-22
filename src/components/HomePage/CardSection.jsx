import React from "react";
import Card from "./Card";

export default function CardSection({ title, data }) {
  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex gap-5 overflow-x-auto py-3">
        {data.map((item, index) => (
          <Card
            key={index.toString()}
            encodeId={item.encodeId}
            title={item.title}
            thumbnail={item.thumbnailM || item.thumbnail}
            artists={item.artists}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
}

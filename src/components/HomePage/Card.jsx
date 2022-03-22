import React from "react";
import { Link } from "react-router-dom";
import { remove_unicode } from "../../helpers/index";


export default function Card({ encodeId, title, link, artists, thumbnail }) {
  return (
    <div className="rounded-2xl shadow w-36 shrink-0">
      <Link to={`/song/${remove_unicode(title)}-${encodeId}`}>
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-32 rounded-tl-2xl rounded-tr-2xl"
          />
          <span className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-300 absolute left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2">
            <i className="fas fa-play text-xs"></i>
          </span>
        </div>
        <div className="p-3 space-y-2">
          <h3 className="text-base font-semibold line-clamp-1">{title}</h3>
          <span className="text-neutral-400 text-xs line-clamp-2">
            {artists.map((item, index) => item.name).join(", ")}
          </span>
        </div>
      </Link>
    </div>
  );
}

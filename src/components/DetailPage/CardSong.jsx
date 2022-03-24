import React from 'react'
import { Link } from "react-router-dom";
import { remove_unicode } from "../../helpers"; 

export const CardSong = ({ encodeId, title, thumbnail, artistsNames }) => {
  return (
    <Link to={`/play-song/${remove_unicode(title)}-${encodeId}`} className="flex items-center gap-2">
        <img
            src={thumbnail}
            alt={title}
            className="w-12 h-12 rounded-md"
        />
        <div>
            <h2 className="font-semibold line-clamp-1">{title}</h2>
            <h3 className="text-secondary text-sm line-clamp-1">
            {artistsNames}
            </h3>
        </div> 
    </Link>
  )
}

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ListSongContext } from "../../contexts/ListSongContext";
import { remove_unicode } from "../../helpers";

export const Header = ({ thumbnail, title, description, badge }) => {
  const navigate = useNavigate();
  const { listSong } = useContext(ListSongContext); 

  const handlePlayRandomSong = () => {
    const random = Math.floor(Math.random() * 100);
    const { encodeId, title } = listSong[random];
    navigate(`/play-song/${remove_unicode(title)}-${encodeId}`)
  }

  return (
    <header className="">
      <div className="rounded-xl">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[350px] m-auto rounded-xl"
          />
          <span className="absolute top-2.5 right-2 px-3 py-1 rounded-full bg-info text-xs text-white font-semibold">
            {badge}
          </span>
        </div>

        <div className="space-y-5 text-center pt-5 px-5">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-xs text-secondary line-clamp-3">{description}</p>
          </div>

          <button
            onClick={handlePlayRandomSong}
            type="button"
            className="bg-info py-2.5 px-10 text-white font-medium rounded-full"
          >
            Phát ngẫu nhiên
          </button>
        </div>
      </div>
    </header>
  );
}

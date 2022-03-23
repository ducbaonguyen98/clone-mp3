import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentSongContext } from "../../contexts/CurrentSongContext";
import { PlaySongContext } from "../../contexts/PlaySongContext";

export default function FooterPlaySong() { 
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentSong } = useContext(CurrentSongContext);
  const { handlePlaySong } = useContext(PlaySongContext);
  if (!currentSong || pathname.includes("/play-song/")) return <></>;

  const { thumbnail, thumbnail_medium, title, artists_names } = currentSong;

  return (
    <div className="px-5 py-2 border border-neutral-200 sticky bottom-0 left-0 right-0 z-10 bg-white">
      <div className="flex items-center">
        <div onClick={() => navigate(1)} className="flex items-center gap-2">
          <img
            src={thumbnail_medium || thumbnail}
            alt={title}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-medium">{title}</h2>
            <h3 className="text-xs text-neutral-500">{artists_names}</h3>
          </div>
        </div>
        <div className="text-xl ml-auto space-x-5">
          {/* <i onClick={handleClick} className="fas fa-pause"></i> */}
          <i className="fal fa-heart"></i>
          <i onClick={handlePlaySong} className="fas fa-play"></i>
          <i className="fas fa-step-forward"></i>
        </div>
      </div>
    </div>
  );
}

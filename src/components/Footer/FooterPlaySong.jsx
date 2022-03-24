import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentSongContext } from "../../contexts/CurrentSongContext";
import { PlaySongContext } from "../../contexts/PlaySongContext";
import { ListSongContext } from "../../contexts/ListSongContext";

import { remove_unicode } from "../../helpers";
import { URL_API } from "../../config";

export default function FooterPlaySong() { 
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
  const { handlePlayAndPauseSong, dataPlaySong, handleEnded } = useContext(PlaySongContext);
  const { listSong } = useContext(ListSongContext);

  useEffect(() => { 
    if(!dataPlaySong.isEndSong) return;

    if(dataPlaySong.isEndSong) {
      handleEnded("next", (title, encodeId) => navigate(`/play-song/${remove_unicode(title)}-${encodeId}`));
    }

  },[dataPlaySong.isEndSong, handleEnded, navigate])

  if (!currentSong || pathname.includes("/play-song/")) return <></>;

  const { thumbnail, thumbnail_medium, title, artists_names, id } = currentSong;
  
  const handleNextSong = async () => {  
    const indexSong = listSong.findIndex((item) => item.encodeId === id);
    const result = await fetch(`${URL_API}song/${listSong[indexSong + 1].encodeId}`);
    const data = await result.json();
    if(data && data.status === "success")
      setCurrentSong(data.data);
  }

  return (
    <div className="px-5 py-2 border-t-2 border-neutral-200 sticky bottom-0 left-0 right-0 z-10 bg-white dark:bg-dark dark:border-dark-200">
      <div className="flex items-center">
        <div onClick={() => navigate(`/play-song/${remove_unicode(title)}-${id}`)} className="flex items-center gap-2">
          <div className={`w-10 h-10 ${dataPlaySong.isPlay ? "animate-[spin_30s_linear_infinite]" : ""}`}>
            <img
              src={thumbnail_medium || thumbnail}
              alt={title}
              className="w-full h-full rounded-full"/>
          </div> 
          <div className="w-48">
            <h2 className="font-medium line-clamp-1">{title}</h2>
            <h3 className="text-xs text-secondary line-clamp-1">{artists_names}</h3>
          </div>
        </div>
        <div className="text-xl ml-auto space-x-5"> 
          <i className="fal fa-heart"></i>
          {
            dataPlaySong.isPlay ? <i onClick={() => handlePlayAndPauseSong()} className="fas fa-pause"></i> : <i onClick={() => handlePlayAndPauseSong()} className="fas fa-play"></i>
          }
          <i onClick={handleNextSong} className="fas fa-step-forward"></i>
        </div>
      </div>
    </div>
  );
}

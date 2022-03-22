import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSong } from "../hooks/api";
import Header from "../components/PlaySongPage/Header";
import { remove_unicode } from "../helpers";

import { ListSongContext } from "../contexts/ListSongContext";

const formatTimer = (number) => {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes}:${seconds}`;
};

export default function PlaySong() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const encodeId = slug.split("-").pop();
  const { data } = useSong(encodeId);

  const [valueRange, setValueRange] = useState(0);
  const [active, setActive] = useState(true);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const timeInterval = useRef(null);

  const { list } = useContext(ListSongContext);

  useEffect(() => { 
    setActive(true);
    setValueRange(0);
    setDuration(0); 
  },[encodeId])

  useEffect(() => {
    if (!active) return;

    if(!audioRef) return;

    if(!audioRef.current) return;

    timeInterval.current = setInterval(() => {
      setValueRange((value) => {
        if (value >= Math.floor(audioRef.current.duration)) {
          clearInterval(timeInterval.current);
          setActive(false);
          return value;
        }
        return ++value;
      });
    }, 1000);

    return () => clearInterval(timeInterval.current);
  }, [active]);

  const indexSong = useMemo(() => {
    if(!list) return 0;
    return list.findIndex(item => item.encodeId === encodeId);
  },[encodeId, list]); 

  if (!data) return <>Loading...</>;

  const { title, artists_names, streaming } = data.data;

  const handleClick = () => {
    setActive((pre) => {
      if (pre) {
        audioRef.current.pause();
        clearInterval(timeInterval.current);
      } else {
        audioRef.current.play();
      }

      return !pre;
    });
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setValueRange(Number(value));
  };

  const handleNextSong = () => {
    const { title, encodeId } = list[indexSong + 1];
    navigate(`/play-song/${remove_unicode(title)}-${encodeId}`, { replace: true });
  }

  const handlepPeviousSong = () => {
    const { title, encodeId } = list[indexSong - 1];
    navigate(`/play-song/${remove_unicode(title)}-${encodeId}`, { replace: true });
  }

  return (
    <div className="max-w-md m-auto p-10 space-y-10">
      <Header title={title} />
      <div className="space-y-10">
        <img
          src="https://picsum.photos/200/300"
          alt="music"
          className="w-full h-80 rounded-3xl"
        />
        <div className="text-center">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <span className="text-neutral-500 text-sm">{artists_names}</span>
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#3D58FF]">{formatTimer(duration)}</span>
            <span className="text-neutral-500">{formatTimer(valueRange)}</span>
          </div>
          <input
            onChange={handleOnChange}
            className="range bg-[#E4E6F1] rounded-full"
            type="range"
            defaultValue={null}
            value={valueRange}
            max={duration}
          />
          <audio autoPlay
            ref={audioRef}
            onLoadedData={() => setDuration(audioRef.current.duration)}
            src={streaming.default["128"]}
          />
        </div>
        <div className="flex justify-between items-center">
          <div onClick={handlepPeviousSong} className="cursor-pointer bg-[#E4E6F1] text-[#3D58FF] h-10 w-10 rounded-full flex justify-center items-center text-xl">
            <i className="fas fa-caret-left"></i>
            <i className="fas fa-caret-left"></i>
          </div>
          <div className="bg-[#3D58FF] h-14 w-14 rounded-full text-2xl text-white flex justify-center items-center cursor-pointer">
            {active ? (
              <i onClick={handleClick} className="fas fa-pause"></i>
            ) : (
              <i onClick={handleClick} className="fas fa-play"></i>
            )}
          </div>
          <div onClick={handleNextSong} className="cursor-pointer bg-[#E4E6F1] text-[#3D58FF] h-10 w-10 rounded-full flex justify-center items-center text-xl">
            <i className="fas fa-caret-right"></i>
            <i className="fas fa-caret-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CurrentSongContext } from "../../contexts/CurrentSongContext";
import { PlaySongContext } from "../../contexts/PlaySongContext";

import { remove_unicode } from "../../helpers";

const formatTimer = (number) => {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes}:${seconds}`;
};

const InputSlider = ({ duration, valueRange, handleOnChange }) => {
  return (
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
    </div>
  );
}; 

export default function SectionPlaySong({ encodeId, data, streaming }) {
  const navigate = useNavigate(); 

  const [active, setActive] = useState(true); 

  const { audioRef, dataPlaySong, setDataPlaySong, handleNextAndPreviousSong, handleEnded} = useContext(PlaySongContext); 
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);

  useEffect(() => { 
    if(!dataPlaySong.isEndSong) return;

    if(dataPlaySong.isEndSong) {
      handleEnded("next", (title, encodeId) => navigate(`/play-song/${remove_unicode(title)}-${encodeId}`));
    }

  },[dataPlaySong.isEndSong, handleEnded, navigate])
  
  useEffect(() => { 
    if(!currentSong)  {
      setCurrentSong(data);
      return;
    }

    if(encodeId !== currentSong.id)
      setCurrentSong(data);
  },[encodeId, data, currentSong, setCurrentSong]) 

  const handleClick = () => {
    setActive((pre) => {
      if (pre) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }

      return !pre;
    });
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value; 
  };

  const handleClickRepeat = () => {

    setDataPlaySong((pre) => {
      const temp = { ...pre };
      if (temp.repeat === 2) {
        temp.repeat = 0; 
      } else {
        temp.repeat += 1;
      }

      return temp;
    }); 
  };

  const handleClickRandom = () => {
    setDataPlaySong((pre) => ({ ...pre, isRandom: pre.isRandom }));
  };

  return (
    <div className="space-y-5">
      <InputSlider
        duration={dataPlaySong.duration}
        valueRange={dataPlaySong.valueRange}
        handleOnChange={handleOnChange}
      />
      <div className="flex justify-between items-center">
        <div onClick={handleClickRandom} className="cursor-pointer">
          <i
            className={`fas fa-random text-xl ${
              dataPlaySong.isRandom ? "text-[#3D58FF]" : "text-neutral-500"
            }`}
          ></i>
        </div>
        <div
          onClick={() => handleNextAndPreviousSong("previous", (title, encodeId) => navigate(`/play-song/${remove_unicode(title)}-${encodeId}`))}
          className="cursor-pointer bg-[#E4E6F1] text-[#3D58FF] h-10 w-10 rounded-full flex justify-center items-center text-xl"
        >
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
        <div
          onClick={() => handleNextAndPreviousSong("next", (title, encodeId) => navigate(`/play-song/${remove_unicode(title)}-${encodeId}`))}
          className="cursor-pointer bg-[#E4E6F1] text-[#3D58FF] h-10 w-10 rounded-full flex justify-center items-center text-xl"
        >
          <i className="fas fa-caret-right"></i>
          <i className="fas fa-caret-right"></i>
        </div>
        <div className="cursor-pointer">
          <i
            onClick={handleClickRepeat}
            className={`fas ${
              dataPlaySong.repeat === 1 ? "fa-repeat-1" : "fa-repeat"
            } text-xl ${
              dataPlaySong.repeat === 1 || dataPlaySong.repeat === 2
                ? "text-[#3D58FF]"
                : "text-neutral-500"
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
}

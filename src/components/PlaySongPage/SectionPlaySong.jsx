import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { CurrentSongContext } from "../../contexts/CurrentSongContext";
import { PlaySongContext } from "../../contexts/PlaySongContext";

import { remove_unicode, formatTimer } from "../../helpers";

const InputSlider = ({ duration, valueRange, handleOnChange }) => {
  const inputRef = useRef(null); 
  
  return ( 
    <div className="relative mt-3">
      <div className="absolute bottom-1.5 space-y-1 w-full">
        <div className="w-full flex justify-between text-sm">
          <span className="text-info dark:text-white">{formatTimer(duration)}</span>
          <span className="text-secondary">{formatTimer(valueRange)}</span>
        </div>
        <div
          className="h-1 bg-info rounded-full"
          style={{ width: `${valueRange * (inputRef?.current?.clientWidth / duration)}px` }}
        ></div>
      </div>
      <input
        ref={inputRef}
        onChange={handleOnChange}
        className="range bg-[#E4E6F1] rounded-full z-20"
        type="range"
        defaultValue={null}
        value={valueRange}
        max={duration}
      />
    </div> 
  );
};

export const SectionPlaySong = ({ encodeId, data }) => {
  const navigate = useNavigate();

  const {
    audioRef,
    dataPlaySong,
    setDataPlaySong,
    handlePlayAndPauseSong,
    handleNextAndPreviousSong,
    handleEnded,
  } = useContext(PlaySongContext);
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);

  useEffect(() => {
    if (!dataPlaySong.isEndSong) return;

    if (dataPlaySong.isEndSong) {
      handleEnded("next", (title, encodeId) =>
        navigate(`/play-song/${remove_unicode(title)}-${encodeId}`)
      );
    }
  }, [dataPlaySong.isEndSong, handleEnded, navigate]);

  useEffect(() => {
    if (!currentSong) {
      setCurrentSong(data);
      return;
    }

    if (encodeId !== currentSong.id) setCurrentSong(data);
  }, [encodeId, data, currentSong, setCurrentSong]);

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
    setDataPlaySong((pre) => ({ ...pre, isRandom: !pre.isRandom }));
  };

  return (
    <div className="space-y-2 px-5 py-3 border-t-2 border-neutral-200 sticky bottom-0 left-0 right-0 bg-white dark:bg-dark dark:border-dark-200 z-10">
      <InputSlider
        duration={dataPlaySong.duration}
        valueRange={dataPlaySong.valueRange}
        handleOnChange={handleOnChange}
      />
      <div className="flex justify-between items-center">
        <div onClick={handleClickRandom} className="cursor-pointer">
          <i
            className={`fas fa-random text-xl ${
              dataPlaySong.isRandom ? "text-info dark:text-white" : "text-secondary"
            }`}
          ></i>
        </div>
        <div
          onClick={() =>
            handleNextAndPreviousSong("previous", (title, encodeId) =>
              navigate(`/play-song/${remove_unicode(title)}-${encodeId}`)
            )
          }
          className="cursor-pointer bg-[#E4E6F1] dark:bg-dark-200 text-info  dark:text-white h-10 w-10 rounded-full flex justify-center items-center text-xl"
        >
          <i className="fas fa-caret-left"></i>
          <i className="fas fa-caret-left"></i>
        </div>
        <div className="bg-info dark:bg-dark-200 h-14 w-14 rounded-full text-2xl text-white flex justify-center items-center cursor-pointer">
          {dataPlaySong.isPlay ? (
            <i
              onClick={() => handlePlayAndPauseSong()}
              className="fas fa-pause"
            ></i>
          ) : (
            <i
              onClick={() => handlePlayAndPauseSong()}
              className="fas fa-play"
            ></i>
          )}
        </div>
        <div
          onClick={() =>
            handleNextAndPreviousSong("next", (title, encodeId) =>
              navigate(`/play-song/${remove_unicode(title)}-${encodeId}`)
            )
          }
          className="cursor-pointer bg-[#E4E6F1] dark:bg-dark-200 text-info dark:text-white h-10 w-10 rounded-full flex justify-center items-center text-xl"
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
                ? "text-info dark:text-white"
                : "text-secondary"
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
}

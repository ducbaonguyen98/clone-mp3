import React, { useState, useRef, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { remove_unicode } from "../../helpers";

import { ListSongContext } from "../../contexts/ListSongContext";

const formatTimer = (number) => {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes}:${seconds}`;
};

const InputSlider = ({ duration, valueRange, handleOnChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-info">{formatTimer(duration)}</span>
        <span className="text-secondary">{formatTimer(valueRange)}</span>
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

const Audio = ({
  audioRef,
  handleLoadedData,
  handleTimeUpdate,
  handleEnded,
  src,
}) => (
  <audio
    autoPlay
    ref={audioRef}
    onLoadedData={handleLoadedData}
    onTimeUpdate={handleTimeUpdate}
    onEnded={handleEnded}
    src={src}
  />
);

export default function SectionPlaySong({ encodeId, streaming }) {
  console.log("SectionPlaySong");

  const navigate = useNavigate();

  const [valueRange, setValueRange] = useState(0);
  const [active, setActive] = useState(true);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(0);
  const [countRepeat, setCountRepeat] = useState(0);
  const [isRandom, setIsRandom] = useState(false);

  const audioRef = useRef(null);

  const { list } = useContext(ListSongContext);

  const indexSong = useMemo(() => {
    if (!list) return 0;
    return list.findIndex((item) => item.encodeId === encodeId);
  }, [encodeId, list]);

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
    setValueRange(Number(value));
  };

  const handlepPeviousSong = () => {
    const { title, encodeId } = list[indexSong - 1];
    navigate(`/play-song/${remove_unicode(title)}-${encodeId}`, {
      replace: true,
    });
  };

  const handleNextSong = () => {
    const index = isRandom ? Math.floor(Math.random() * 100) : indexSong + 1;
    const { title, encodeId } = list[index];
    navigate(`/play-song/${remove_unicode(title)}-${encodeId}`, {
      replace: true,
    });
  };

  const handleLoadedData = () => {
    setActive(true);
    setValueRange(0);
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setValueRange(Number(audioRef.current.currentTime));
  };

  const handleEnded = () => {
    if (repeat === 0 || (repeat === 1 && countRepeat === 1)) {
      setCountRepeat(0);
      handleNextSong();
      return;
    }

    audioRef.current.load();
    setCountRepeat(1);
  };

  const handleClickRepeat = () => {
    setRepeat((pre) => {
      if (pre === 2) {
        return 0;
      }

      return ++pre;
    });
  };

  const handleClickRandom = () => {
    setIsRandom(!isRandom);
  };

  return (
    <div className="space-y-5">
      <InputSlider
        duration={duration}
        valueRange={valueRange}
        handleOnChange={handleOnChange}
      />
      <Audio
        src={streaming.default["128"]}
        audioRef={audioRef}
        handleLoadedData={handleLoadedData}
        handleTimeUpdate={handleTimeUpdate}
        handleEnded={handleEnded}
      />
      <div className="flex justify-between items-center">
        <div onClick={handleClickRandom} className="cursor-pointer">
          <i
            className={`fas fa-random text-xl ${
              isRandom ? "text-info" : "text-secondary"
            }`}
          ></i>
        </div>
        <div
          onClick={handlepPeviousSong}
          className="cursor-pointer bg-[#E4E6F1] text-info h-10 w-10 rounded-full flex justify-center items-center text-xl"
        >
          <i className="fas fa-caret-left"></i>
          <i className="fas fa-caret-left"></i>
        </div>
        <div className="bg-info h-14 w-14 rounded-full text-2xl text-white flex justify-center items-center cursor-pointer">
          {active ? (
            <i onClick={handleClick} className="fas fa-pause"></i>
          ) : (
            <i onClick={handleClick} className="fas fa-play"></i>
          )}
        </div>
        <div
          onClick={handleNextSong}
          className="cursor-pointer bg-[#E4E6F1] text-info h-10 w-10 rounded-full flex justify-center items-center text-xl"
        >
          <i className="fas fa-caret-right"></i>
          <i className="fas fa-caret-right"></i>
        </div>
        <div className="cursor-pointer">
          <i
            onClick={handleClickRepeat}
            className={`fas ${
              repeat === 1 ? "fa-repeat-1" : "fa-repeat"
            } text-xl ${
              repeat === 1 || repeat === 2
                ? "text-info"
                : "text-secondary"
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
}

import React, { createContext, useState, useContext, useRef, useMemo } from "react";

import { CurrentSongContext } from "./CurrentSongContext";
import { ListSongContext } from "./ListSongContext";
export const PlaySongContext = createContext();

const obj = {
  isPlay: false,
  valueRange: 0,
  duration: 0, 
  repeat: 0,
  countRepeat: 0,
  isRandom: false,
  isEndSong: false
}

const PlaySongContextProvider = ({ children }) => {
  const [ dataPlaySong, setDataPlaySong ] = useState(obj);
  
  const audioRef = useRef(null);
  const { currentSong } = useContext(CurrentSongContext); 
  const { listSong } = useContext(ListSongContext);

  const indexSong = useMemo(() => {
    if (!listSong || !currentSong) return 0;
    return listSong.findIndex((item) => item.encodeId === currentSong.id);
  }, [listSong, currentSong]); 

  const handleNextAndPreviousSong = (type, callback) => {
    const index = dataPlaySong.isRandom ? Math.floor(Math.random() * 100) : type === "next" ? indexSong + 1 : indexSong - 1;
    const { title, encodeId } = listSong[index];
    callback(title, encodeId);
  }; 

  const handleLoadedData = () => {   
    setDataPlaySong((pre) => ({ ...pre, valueRange: 0, duration: Number(audioRef.current.duration), isPlay: true }))
  };

  const handlePlayAndPauseSong = () => {
    setDataPlaySong((pre) => {
      const temp = { ...pre };

      if(temp.isPlay) {
        audioRef.current.pause();
        temp.isPlay = false;
      } else {
        audioRef.current.play();
        temp.isPlay = true;
      } 

      return temp;
    }) 
  }; 

  const handleTimeUpdate = () => { 
    setDataPlaySong((pre) => ({ ...pre, valueRange: Number(audioRef.current.currentTime) }))
  };

  const handleEnded = (type, callback) => {
    if (dataPlaySong.repeat === 0 || (dataPlaySong.repeat === 1 && dataPlaySong.countRepeat === 1)) {
      setDataPlaySong((pre) => ({ ...pre, countRepeat: 0, isEndSong: false }));
      handleNextAndPreviousSong(type, callback);
      return;
    }

    audioRef.current.load();
    setDataPlaySong((pre) => ({ ...pre, countRepeat: 1, isEndSong: false }))
  };

  return ( 
    <PlaySongContext.Provider value={{ audioRef, dataPlaySong, setDataPlaySong, handlePlayAndPauseSong, handleNextAndPreviousSong, handleEnded }}>
      {children}
      {
        currentSong && currentSong.streaming.msg === "Success" && <audio
        autoPlay
        ref={audioRef}
        src={currentSong.streaming["default"]["128"]}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setDataPlaySong((pre) => ({ ...pre, isEndSong: true }))}
      /> 
      }
      
    </PlaySongContext.Provider>
  );
};

export default PlaySongContextProvider;

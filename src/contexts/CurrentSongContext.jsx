import React, { useState, createContext } from "react";  
export const CurrentSongContext = createContext();

const CurrentSongContextProvider = ({ children }) => { 
  const [ currentSong, setCurrentSong ] = useState(null);   
  return (
    <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </CurrentSongContext.Provider>
  );
};

export default CurrentSongContextProvider;

import React, { useState, createContext, useEffect } from "react";
import { useListSong } from "../hooks/api";

export const ListSongContext = createContext();

const ListSongContextProvider = ({ children }) => {
  const [listSong, setListSong] = useState(null);
  const [pathListSong, setPathListSong] = useState("/song/top-100-bai-hat-nhac-tre-hay-nhat-ZWZB969E");
  const { data } = useListSong("ZWZB969E");

  useEffect(() => {
    if (data) setListSong(data.data.song.items);
  }, [data]);

  return (
    <ListSongContext.Provider value={{ listSong, setListSong, pathListSong, setPathListSong }}>
      {children}
    </ListSongContext.Provider>
  );
};

export default ListSongContextProvider;

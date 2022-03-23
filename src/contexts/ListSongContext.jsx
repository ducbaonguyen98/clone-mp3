import React, { useState, createContext, useEffect } from "react";
import { useListSong } from "../hooks/api";

export const ListSongContext = createContext();

const ListSongContextProvider = ({ children }) => {
  const [listSong, setListSong] = useState(null);
  const { data } = useListSong("ZWZB969E");

  useEffect(() => {
    if (data) setListSong(data.data.song.items);
  }, [data]);

  return (
    <ListSongContext.Provider value={{ listSong, setListSong }}>
      {children}
    </ListSongContext.Provider>
  );
};

export default ListSongContextProvider;

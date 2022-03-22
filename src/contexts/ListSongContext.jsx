import React, { useState, createContext, useEffect } from "react";
import { useListSong } from "../hooks/api";

export const ListSongContext = createContext();

const ListSongContextProvider = ({ children }) => {
  const [list, setList] = useState(null);
  const { data } = useListSong("ZWZB969E");

  useEffect(() => {
    if (data) setList(data.data.song.items);
  }, [data]);

  return (
    <ListSongContext.Provider value={{ list, setList }}>
      {children}
    </ListSongContext.Provider>
  );
};

export default ListSongContextProvider;

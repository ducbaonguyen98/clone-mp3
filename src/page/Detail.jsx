import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListSong } from "../hooks/api";
import Header from "../components/DetailPage/Header";
import SectionListSong from "../components/DetailPage/SectionListSong";
import SectionArtist from "../components/DetailPage/SectionArtist";
import { ListSongContext } from "../contexts/ListSongContext";

export default function Detail() {
  console.log("Detail render")

  const { slug } = useParams();
  const { data } = useListSong(slug.split("-").pop());

  const [ limit, setLimit ] = useState(10); 
  const { setListSong } = useContext(ListSongContext); 
    

  useEffect(() => {
    if(data)  
      setListSong(data.data.song.items);
  },[data, setListSong]);

  if (!data) return <>Loading...</>; 

 
  const {
    thumbnail_medium,
    thumbnailM,
    thumbnail,
    title,
    sortDescription,
    song,
    genres,
    artists,
  } = data.data; 


  return (
    <div className="space-y-5 brightness-125">
      <Header thumbnail={thumbnailM || thumbnail_medium || thumbnail} title={title} badge={genres[0].title} description={sortDescription} />
      <SectionListSong data={song.items.slice(0, limit)}/>
      <div className="text-center">
        {limit !== 100 && (
          <button
            onClick={() => setLimit((pre) => (pre += 10))}
            type="button"
            className="bg-white py-2.5 px-10 border border-neutral-400 font-medium rounded-full"
          >
            Xem thêm
          </button>
        )}
      </div>
      <SectionArtist data={artists} />
    </div>
  );
}

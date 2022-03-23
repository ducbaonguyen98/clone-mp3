import React from "react";
import { useParams } from "react-router-dom";
import { useSong } from "../hooks/api";
import Header from "../components/PlaySongPage/Header"; 
import SectionSongInfo from "../components/PlaySongPage/SectionSongInfo";
import SectionPlaySong from "../components/PlaySongPage/SectionPlaySong";


export default function PlaySong() {
  const { slug } = useParams();
  const encodeId = slug.split("-").pop();
  const { data } = useSong(encodeId);

  if (!data) return <>Loading...</>;

  const {
    title,
    artists_names,
    streaming,
    thumbnail_medium,
    thumbnail,
    lyrics,
    like,
    listen,
    total_comment
  } = data.data;

  return (
    <div className="max-w-md m-auto p-5 space-y-5 h-screen scrollbar-hide">
      <Header title={title} />
      <SectionSongInfo thumbnail={thumbnail_medium || thumbnail} title={title} artists_names={artists_names} like={like} listen={listen} comment={total_comment} lyrics={lyrics[0].content}  />
      <SectionPlaySong encodeId={encodeId} streaming={streaming}/>
    </div>
  );
}

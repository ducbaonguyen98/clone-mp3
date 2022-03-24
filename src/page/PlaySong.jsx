import React from "react";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";

import { useSong } from "../hooks/api";
import SectionSongInfo from "../components/PlaySongPage/SectionSongInfo";
import SectionPlaySong from "../components/PlaySongPage/SectionPlaySong";
import Loading from "../components/Loading";

export default function PlaySong() {
  const { slug } = useParams();
  const encodeId = slug.split("-").pop();
  const { data } = useSong(encodeId);

  if (!data) return <Loading />;

  const {
    title,
    artists_names,
    thumbnail_medium,
    thumbnail,
    lyrics,
    like,
    listen,
    total_comment,
    streaming,
  } = data.data;

  if (streaming.msg !== "Success")
    return (
      <div className="h-screen m-5"> 
        <div className="p-5 h-20 bg-red-400 shadow-md rounded-2xl">
          <h3 className="text-white">{streaming.msg}</h3>
        </div>
      </div>
    );

  return (
    <>
      <MetaTags>
        <title>
          {title} - {artists_names}
        </title>
        <meta name="description" content={`${title} - ${artists_names}`} />
        <meta property="og:title" content={`${title} - ${artists_names}`} />
        <meta property="og:image" content={thumbnail_medium || thumbnail} /> 
      </MetaTags>
      <div className="">
        <SectionSongInfo
          thumbnail={thumbnail_medium || thumbnail}
          title={title}
          artists_names={artists_names}
          like={like}
          listen={listen}
          comment={total_comment}
          lyrics={lyrics?.length ? lyrics[0].content : ""}
        />
        <SectionPlaySong
          encodeId={encodeId}
          data={data.data} 
        />
      </div>
    </>
  );
}

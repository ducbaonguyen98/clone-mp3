import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MetaTags from "react-meta-tags";

import { useListSong } from "../hooks/api";
import { Header, SectionListSong, SectionArtist } from "../components/DetailPage"; 
import { ListSongContext } from "../contexts/ListSongContext";
import Loading from "../components/Loading";

export default function Detail() {
  const { slug } = useParams();
  const { data } = useListSong(slug.split("-").pop());

  const [limit, setLimit] = useState(10);
  const { setListSong, setPathListSong } = useContext(ListSongContext);

  useEffect(() => {
    if (data) {
      setListSong(data.data.song.items);
      setPathListSong(`/song/${slug}`);
    }
  }, [data, setListSong, slug, setPathListSong]);

  if (!data) return <Loading />;

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
    <>
      <MetaTags>
        <title>
          {title}
        </title>
        <meta name="description" content={sortDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={thumbnail_medium || thumbnail} /> 
      </MetaTags>
      <div className="p-5 space-y-5">
        <Header
          thumbnail={thumbnailM || thumbnail_medium || thumbnail}
          title={title}
          badge={genres[0].title}
          description={sortDescription}
        />
        <SectionListSong data={song.items.slice(0, limit)} />
        <div className="text-center">
          {limit !== 100 && (
            <button
              onClick={() => setLimit((pre) => (pre += 10))}
              type="button"
              className="bg-white dark:bg-dark py-2.5 px-10 border border-secondary font-medium rounded-full"
            >
              Xem thêm
            </button>
          )}
        </div>
        <SectionArtist data={artists} />
      </div>
    </>
  );
}

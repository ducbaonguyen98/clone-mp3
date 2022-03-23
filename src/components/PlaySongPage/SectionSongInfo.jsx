import React from "react";
import numeral from "numeral";

const SectionSongInfo = ({ thumbnail, title, artists_names, like, listen, comment, lyrics }) => {

  return (
    <div className="space-y-3">
      <div className="w-64 h-64 m-auto animate-[spin_30s_linear_infinite]">
          <img
            src={thumbnail}
            alt="music"
            className="z-10 w-full h-full rounded-full"
          />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <h4 className="text-neutral-500 text-sm">{artists_names}</h4>
        <div className="space-x-2 text-sm text-neutral-500">
          <span>{numeral(like).format("0a")} lượt thích</span>
          <span>-</span>
          <span>{numeral(listen).format("0a")} lượt nghe</span>
          <span>-</span>
          <span>{numeral(comment).format("0a")} bình luận</span>
        </div>
        <div
          className="h-48 overflow-y-scroll text-left text-neutral-600 text-base scrollbar-hide"
          dangerouslySetInnerHTML={{ __html: lyrics }}
        ></div>
      </div>
    </div>
  );
}
export default React.memo(SectionSongInfo);
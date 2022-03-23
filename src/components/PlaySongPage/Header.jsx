import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ListSongContext } from "../../contexts/ListSongContext";

export default function Header({ title }) {
  const navigate = useNavigate();
  const { pathListSong } = useContext(ListSongContext);
  return (
    <header className="flex items-center gap-5">
      <i onClick={() => navigate(pathListSong)} className="fal fa-angle-left text-2xl"></i>
      <div className="flex-1 text-center">
        {/* <h3 className="font-medium">{title}</h3> */}
        {/* <span className="text-sm text-neutral-400">Quân AP</span> */}
      </div>
    </header>
  );
}

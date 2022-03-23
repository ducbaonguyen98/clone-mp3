import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-5">
      <i onClick={() => navigate(-1)} className="fal fa-angle-left text-2xl"></i>
      <div className="flex-1 text-center">
        <h3 className="font-medium">{title}</h3>
        {/* <span className="text-sm text-neutral-400">Quân AP</span> */}
      </div>
    </header>
  );
}

import React from "react";

export default function Header({ title }) {
  return (
    <header className="flex items-center gap-5">
      <i className="fal fa-angle-left text-2xl"></i>
      <div className="flex-1 text-center">
        <h3 className="font-medium">{title}</h3>
        {/* <span className="text-sm text-neutral-400">Quân AP</span> */}
      </div>
    </header>
  );
}

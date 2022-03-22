import React from 'react';


export default function Header() {
  return (
    <div className="flex gap-3 items-center justify-between">
        <img src="https://picsum.photos/200/300" alt="avatar" className="rounded-full w-8 h-8" /> 
        <div className="relative flex-1">
            <div className="absolute pointer-events-none left-3 top-0.5">
                <i className="fal fa-search text-neutral-400 text-sm"></i>
            </div>
            <input type="search" name="" id="" className="pl-8 pr-3 py-0.5 h-8 w-full rounded-full bg-neutral-200 placeholder:text-neutral-400 text-[13px] focus:outline-none" placeholder="Tìm kiếm bài hát, MV..." />
        </div>
        <i className="fal fa-cog text-xl"></i>
    </div>
  )
}

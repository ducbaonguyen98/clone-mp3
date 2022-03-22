import React from 'react'

export default function Card() {
  return (
    <div className="rounded-2xl shadow w-fit shrink-0">
        <div className="relative">
            <img src="https://picsum.photos/200/300" alt="music" className="w-36 h-24 rounded-tl-2xl rounded-tr-2xl" /> 
            <span className="w-8 h-8 flex justify-center items-center rounded-full bg-neutral-300 absolute left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2">
                <i className="fas fa-play text-xs"></i>
            </span>
        </div>
        <div className="px-3 py-1">
            <h3 className="text-base">Always happy</h3>
            <span className="text-neutral-400 text-sm">5 min</span>
        </div>
    </div>
  )
}

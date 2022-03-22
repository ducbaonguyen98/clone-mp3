import React from 'react'

export default function Header({ thumbnail, title, description, badge }) {
  return (
    <header className="">
        <div className="rounded-xl">
          <div className="relative">
            {/* <div className="absolute top-2 left-2 h-7 w-7 bg-[#3D58FF] text-white rounded flex justify-center items-center">
                <i
                onClick={() => navigate("/")}
                className="fal fa-angle-left text-2xl p-2 cursor-pointer"
                ></i>
            </div> */}
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-[350px] m-auto rounded-xl"
            />
            <span className="absolute top-2.5 right-2 px-3 py-1 rounded-full bg-[#3D58FF] text-xs text-white font-semibold">
              {badge}
            </span>
          </div>

          <div className="space-y-5 text-center pt-5 px-5">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-xs text-neutral-500 line-clamp-3">
                {description}
              </p>
            </div>

            <button
              type="button"
              className="bg-[#3D58FF] py-2.5 px-10 text-white font-medium rounded-full"
            >
              Phát ngẫu nhiên
            </button>
          </div>
        </div>
      </header>
  )
}

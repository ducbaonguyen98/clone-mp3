import React from "react";

export default function Loading() {
  return (
    <div className="absolute z-20 h-screen top-0 right-0 left-0 bottom-0 bg-white md:border md:border-neutral-200 md:shadow-lg">
      <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
        <h3 className="animate-ping text-2xl font-semibold">Hello, guys !</h3> 
      </div>
    </div>
  );
}

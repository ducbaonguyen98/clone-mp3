import React from "react";

export default function ButtonCircle({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-8 h-8 cursor-pointer rounded-full bg-neutral-200 dark:bg-dark-200"
    >
      {children}
    </button>
  );
}

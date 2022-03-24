import React, { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useSWR from "swr";

import { ListSongContext } from "../../contexts/ListSongContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useDebounce } from "../../hooks/helpers";
import { CardSong } from "../DetailPage";
import { ButtonCircle } from "../Button";

const InputSearch = ({ value, handleOnChange }) => (
  <div className="relative">
    <div className="absolute pointer-events-none left-3 top-0.5">
      <i className="fal fa-search text-neutral-400 text-sm"></i>
    </div>
    <input
      type="search"
      value={value}
      onChange={handleOnChange}
      className="pl-8 pr-3 py-0.5 h-8 w-full rounded-full bg-neutral-200 dark:bg-dark-200 placeholder:text-neutral-400 text-[13px] focus:outline-none"
      placeholder="Tìm kiếm bài hát, MV..."
    />
  </div>
);

const SectionResultSearch = ({ children }) => (
  <div className="absolute top-10 w-full h-60 z-10">{children}</div>
);

const LoadingResultSearch = () => (
  <SectionResultSearch>
    <div className="rounded-2xl bg-neutral-200 shadow-md z-10 p-3 text-center">
      <div className="text-sm font-medium text-secondary animate-bounce">
        Đang tải <i className="fal fa-arrow-circle-down"></i>
      </div>
    </div>
  </SectionResultSearch>
);

const NotFoundResultSearch = () => (
  <SectionResultSearch>
    <div className="rounded-2xl bg-neutral-200 text-secondary shadow-md z-10 p-3 text-sm font-medium text-center">
      Không tìm thấy
    </div>
  </SectionResultSearch>
);

const ResultSearch = ({ value, data }) => {
  if (!value) return <></>;

  if (!data) return <LoadingResultSearch />;

  if (data.status === "error") return <NotFoundResultSearch />;

  const { counter, songs } = data.data;
  const { song } = counter;
  if (song === 0) return <NotFoundResultSearch />;

  return (
    <SectionResultSearch>
      <div className="rounded-2xl bg-neutral-200 dark:bg-dark-200 shadow-md z-10 p-3 space-y-3 overflow-y-scroll scrollbar-hide">
        {songs.map((item, index) => (
          <CardSong
            key={index.toString()}
            encodeId={item.encodeId}
            title={item.title}
            thumbnail={item.thumbnail}
            artistsNames={item.artistsNames}
          />
        ))}
      </div>
    </SectionResultSearch>
  );
};

const SectionSearch = () => {
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value, 500);

  const { data } = useSWR(() =>
    debouncedSearch ? `/search/${debouncedSearch}` : null
  );
  const handleOnChange = (e) => setValue(e.target.value);

  return (
    <div className="relative flex-1">
      <InputSearch value={value} handleOnChange={handleOnChange} />
      <ResultSearch value={debouncedSearch} data={data} />
    </div>
  );
};

export default function Header() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { pathListSong } = useContext(ListSongContext);
  const { theme, setIsChangeTheme } = useContext(ThemeContext);
  return (
    <div className="px-5 py-3 flex gap-3 items-center justify-between shadow-sm bg-white dark:bg-dark dark:shadow-dark-200">
      {pathname !== "/" ? (
        <ButtonCircle
          onClick={() =>
            navigate(pathname.includes("/song/") ? "/" : pathListSong)
          }
        >
          <i className="fal fa-angle-left text-2xl"></i>
        </ButtonCircle>
      ) : (
        <img
          src="https://picsum.photos/200/300"
          alt="avatar"
          className="rounded-full w-8 h-8"
        />
      )}
      {pathname === "/" ? (
        <SectionSearch />
      ) : (
        <Link to="/" className="font-semibold text-lg">
          Hello - guys !
        </Link>
      )} 
      <ButtonCircle
        onClick={() => {
          setIsChangeTheme((pre => !pre));
          localStorage.theme = theme === "dark" ? "light" : "dark"
        }}
      >
        {
          theme === "dark" ? <i className="fal fa-moon"></i> : <i className="fas fa-sun"></i>
        }
        
      </ButtonCircle>
    </div>
  );
}

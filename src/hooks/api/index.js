import useSWR from "swr"; 

export const useTop100 = () =>  useSWR("/top-100");
export const useSong = (id) =>  useSWR(`/song/${id}`);
export const useListSong = (id) =>  useSWR(`/list-song/${id}`);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SWRConfig } from 'swr';
import axiosClient from './api-client/axiosClient';
import ListSongContextProvider from "./contexts/ListSongContext";
import CurrentSongContextProvider from "./contexts/CurrentSongContext";
import PlaySongContextProvider from "./contexts/PlaySongContext";
import ThemeContextProvider from "./contexts/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false, revalidateOnFocus: false }}>
      <ListSongContextProvider>
        <CurrentSongContextProvider>
          <PlaySongContextProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </PlaySongContextProvider>
        </CurrentSongContextProvider>
      </ListSongContextProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

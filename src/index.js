import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SWRConfig } from 'swr';
import axiosClient from './api-client/axiosClient';
import ListSongContextProvider from "./contexts/ListSongContext";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false, revalidateOnFocus: false }}>
      <ListSongContextProvider> 
        <App />
      </ListSongContextProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

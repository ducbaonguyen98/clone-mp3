import Home from "./page/Home";
import Detail from "./page/Detail";  
import PlaySong from "./page/PlaySong";

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export default function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="/song/:slug" element={<Detail />}/> 
        <Route path="/play-song/:slug" element={<PlaySong />}/> 
      </Routes> 
    </BrowserRouter>
  )
}

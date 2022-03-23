import Home from "./page/Home";
import Detail from "./page/Detail";  
import PlaySong from "./page/PlaySong";
import FooterPlaySong from "./components/Footer/FooterPlaySong";

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export default function App() {
  return ( 
    <BrowserRouter>
      <div className="max-w-md m-auto space-y-10">
        <div className="p-5">
          <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/song/:slug" element={<Detail />}/> 
            <Route path="/play-song/:slug" element={<PlaySong />}/> 
          </Routes> 
        </div>
        <FooterPlaySong/>
      </div>
    </BrowserRouter>
  )
}

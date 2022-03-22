import React, { useState, useEffect, useRef } from 'react';

const formatTimer = (number) => {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes}:${seconds}`
}

export default function Detail() {

    const [ valueRange, setValueRange ] = useState(0);
    const [ active, setActive ] = useState(false);
    const [ duration, setDuration ] = useState(0);

    const audioRef = useRef(null);
    const timeInterval = useRef(null); 
    
    useEffect(() => {

        if(!active) return;

        timeInterval.current = setInterval(() => { 
            setValueRange((value) => { 
                if(value >= Math.floor(audioRef.current.duration)) {
                    clearInterval(timeInterval.current);
                    setActive(false);
                    return value;
                } 
                return ++value;
            }); 
        },1000)

        return () => clearInterval(timeInterval.current);

    },[active]); 

    const handleClick = () => {
        setActive((pre) => {
            if(pre) {
                audioRef.current.pause();
                clearInterval(timeInterval.current);
            } else { 
                audioRef.current.play(); 
            }

            return !pre;
        });
    }

    const handleOnChange = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value; 
        setValueRange(Number(value))   
    }

 

    return (
        <div className="max-w-md m-auto p-10 space-y-10"> 
            <header className="flex items-center gap-5">
                <i class="fal fa-angle-left text-2xl"></i>
                <div className="flex-1 text-center">
                    <h3 className="font-medium">Bông hoa đẹp nhất</h3>
                    {/* <span className="text-sm text-neutral-400">Quân AP</span> */}
                </div>
            </header>
            <div className="space-y-10">
                <img src="https://picsum.photos/200/300" alt="music" className="w-full h-80 rounded-3xl" /> 
                <div className="text-center">
                    <h3 className="text-2xl font-semibold">Calm your mind</h3>
                    <span className="text-neutral-400 text-sm">Late night music</span>
                </div>
            </div>
            <div className="space-y-5">
                <div className="space-y-2"> 
                    <div className="flex justify-between text-sm">   
                        <span className="text-[#3D58FF]">{formatTimer(duration)}</span>
                        <span className="text-neutral-500">{formatTimer(valueRange)}</span>
                    </div>
                    <input onChange={handleOnChange} className="range bg-[#E4E6F1] rounded-full" type="range" defaultValue={null} value={valueRange} max={duration} />
                    <audio ref={audioRef} onLoadedData={() => setDuration(audioRef.current.duration)} src="https://vnso-zn-23-tf-mp3-s1-zmp3.zadn.vn/e5e2b567ee20077e5e31/9110927111613495727?authen=exp=1648021715~acl=/e5e2b567ee20077e5e31/*~hmac=ccb0658c15cca1cd20d355c35b567e88&fs=MTY0Nzg0ODkxNTkwM3x3ZWJWNnwwfDQyLjExNi4xNjAdUngMTAy" />
                </div>
                <div className="flex justify-between items-center">
                    <div className=" bg-[#E4E6F1] text-[#3D58FF] h-10 w-10 rounded-full flex justify-center items-center text-xl">
                        <i class="fas fa-caret-left"></i>
                        <i class="fas fa-caret-left"></i>
                    </div>
                    <div className="bg-[#3D58FF] h-14 w-14 rounded-full text-2xl text-white flex justify-center items-center cursor-pointer">
                        {
                            active ? <i onClick={handleClick} className="fas fa-pause"></i> : <i onClick={handleClick} className="fas fa-play"></i>
                        }  
                    </div> 
                    <div className=" bg-[#E4E6F1] text-[#3D58FF] h-10 w-10 rounded-full flex justify-center items-center text-xl">
                        <i class="fas fa-caret-right"></i>
                        <i class="fas fa-caret-right"></i>
                    </div> 
                </div>
            </div>
        </div>
    )
}

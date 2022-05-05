import React, { useEffect, useState, useCallback, useRef } from 'react';


const Player = ({ songValue }) => {
  const [ currentTimes, setCurrentTimes ] = useState(0);
  const [ durationTimes, setDurationTimes ] = useState(0);
  const audioPlayer = useRef(null);
  const audioSource = useRef(null);
  const audioPlayerButton = useRef(null);
  const { id, artist, name, version, thumb, audio } = songValue;


  const getCurrentTime = async (event) => {
      const songCurrentTime = await event.target.currentTime;
      const songDurationTime = await event.target.duration;

      const format = (time) => {   
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = ~~time % 60;
          var ret = "";
          if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          return ret;
      }

      setDurationTimes(format(songDurationTime));
      setCurrentTimes(format(songCurrentTime));
  } 

  const fetchSongs = async () => {
    const response = await fetch(audio);
    const audioRef = audioPlayer.current;
    const source = audioSource.current;
    source.src = response.url;
    audioRef.load();
  }  

  useEffect(() => {
      setTimeout(() => {
        fetchSongs();
      }, 100);
      return () => {}        
  }, [ audio ]);

  return (
    <article className='audio-player grid items-center min-h-[50vh] lg:h-[calc(100vh-4rem)] lg:order-2 lg:overflow-y-hidden'>
      {songValue && (
        <div className='w-[420px] mx-auto pr-4 pl-4 pt-8 pb-8 lg:order-2'>
          <figure className={`figure w-[300px] h-[300px] mx-auto mb-8`} style={{ backgroundImage: `url(${thumb})`}}></figure>
          <h1 className={'title text-center mb-3'}>{artist || 'Artist'} - <span>{name || 'Song'}</span> <span>{version}</span></h1>
          <audio className='mx-auto' controls autoPlay ref={audioPlayer} onTimeUpdate={(event) => getCurrentTime(event)}>
            <source type="audio/mpeg" ref={audioSource}/>
          </audio>
        </div>
      )}
    </article>
  )
}

const Sidebar = ({ handleClick, songValue, songData }) => {
  return (
    <aside className='sidebar-player grid lg:order-1 lg:w-[500px] lg:h-[calc(100vh-4rem)] lg:overflow-y-auto'>
      {songData && (
        <ul className='grid gap-2 pt-8 pb-8 pr-4 pl-4'>
          {songData.map((song, key) => {
            return (
              <li className={`grid gap-4 grid-flow-col auto-cols-max items-center cursor-pointer bg-gray-200 dark:bg-gray-700 ease-out duration-300 ${songValue.id === song.id ? 'is-active' : ''}`} key={key} onClick={() => handleClick({...song})}>
                <span className={'item-thumb w-[100px]'}>
                    <img className={'img thumb-img'} alt={song.artist} src={song.thumb} />
                </span>
                <span className={'item-desc grid w-full'}>
                    <span className={'desc-title block'}>
                        <span className='font-medium'>{song.name}</span>
                        <span> - </span>
                        <span>
                            <small>{song.version}</small>
                        </span>
                    </span>
                    <span className={'desc-subtitle block text-gray-400'}>
                        <span>by </span>
                        <span>{song.artist}</span>
                    </span>       
                </span>                         
            </li>
            )
          })}
        </ul>
      )}
    </aside>
  );  
}


const AudioPlayer = () => {
  const [ songData, setSongData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ activeSong, setActiveSong ] = useState(false);
  const [ songValue, setSongValue ] = useState([])
  const [ songStart, setSongStart ] = useState(false)

  const handleClick = useCallback((data) => {
      setSongValue(data)
      setSongStart(true)
      setActiveSong(true)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8001/songs')
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            setTimeout(() => {
              setIsLoading(false);
            }, 400);
            throw Error('Nema ucitanih pesama! Proverite database songs.json');
          }
          return res.json();
        })
        .then((data) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 400);
          setSongData(data);
        })
        .catch((err) => {
          console.log('Error message: ', err);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }, 500);
  }, []);

  return (
    <section className='section-audio-player grid relative lg:h-[calc(100vh-4rem)]'>
      {isLoading && <div className='pl-4 pr-4 text-center absolute h-[calc(100vh-4rem)] inset-0 z-50 bg-gray-200 dark:bg-gray-800 ease-out duration-300 pt-16'>Loading...</div>}
      {!songData && !isLoading && <div>Nema ucitanih pesama</div>}
      {songData && (
        <div className='grid lg:grid-cols-[minmax(auto,_auto)_1fr] lg:h-[calc(100vh-4rem)]'>
          <Player songValue={songValue} />
          <Sidebar songData={songData} handleClick={handleClick} songValue={songValue} />
        </div>
      )}
    </section>       
  )
}

export default AudioPlayer;
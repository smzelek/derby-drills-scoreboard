import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [timeClock, setTimeClock] = useState(30);
  const [timeRender, setTimeRender] = useState('');

  useEffect(() => {
    const id = window.setInterval(() => {
      // Stop at zero so we don't show negative values
      setTimeClock((t) => {
        if (t <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [])

  useEffect(() => {
    const minutes = Math.floor(timeClock / 60);
    const seconds = timeClock % 60;
    setTimeRender(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  }, [timeClock])

  return (
    <>
      <div className='flex flex-col h-full bg-black text-white font-bold gap-10 justify-around'>
        <div className='flex w-full gap-1'>
            <TeamScore name="Black" score={32} jamScore={8} reverse={false} />
            <TeamScore name="White" score={64} jamScore={4} reverse={true} />
        </div>
        <div className='flex justify-between items-end gap-15 px-5'>
          <div className='flex flex-col rounded-[8px] overflow-hidden w-full'>
            <p className='bg-[#595959] text-[75px] leading-[75px] py-2 text-center'>Period 1</p>
            <p className='bg-white text-black text-center  text-[105px]'>30:00</p>
          </div>
         <div className='flex flex-col rounded-[8px] overflow-hidden w-full'>
            <p className='bg-[#595959] text-[75px] leading-[75px] py-2 text-center'>Jam 1</p>
            <p className='bg-white text-black text-center  text-[105px]'>{timeRender}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const TeamScore = (props: { name: string, score: number, jamScore: number, reverse: boolean }) => {
  return (
    <div className={`flex flex-col w-full ${props.reverse ? 'items-end' : 'items-start'}`}>
      <h2 className='text-[150px] px-3'>{props.name}</h2>
      <div className={`flex align-bottom items-end w-full gap-1 pr-2 ${props.reverse ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className='flex flex-col gap-1 bg-black items-center h-full max-h-full'>
          <div className='bg-white flex flex-col p-2 gap-1 justify-around h-full grow rounded-[8px] overflow-hidden'>
            <div className='bg-black rounded-full w-5 h-5'>
            </div>
            <div className='bg-black rounded-full w-5 h-5'>
            </div>
            <div className='bg-black rounded-full w-5 h-5'>
            </div>
          </div>
          <div className='bg-white flex flex-col items-center justify-center shrink-0 py-2 w-full rounded-[8px] overflow-hidden'>
            <div className='bg-black rounded-full w-5 h-5'>
            </div>
          </div>
        </div>
        <p className='game-score text-center text-[190px] leading-[155px] w-full rounded-[8px] overflow-hidden bg-white text-black m-0 p-0 '>
          {props.score}
        </p>
        <p className='jam-score text-center text-[75px] leading-[75px] bg-white rounded-[8px] shrink-0 px-5 py-2 overflow-hidden text-black'>
          {props.jamScore}
        </p>
      </div>
    </div>
  );
}

export default App

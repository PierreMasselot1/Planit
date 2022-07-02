
import './App.css'
import { Pomodoro } from './components/pomodoro/Pomodoro';

function App() {
  return (
    <div className="flex flex-row">
      
      <div className='bg-slate-700 w-25 h-screen'>
        NAVIGATION BAR

        PomodoroNavIcon
      </div>
      
      <div className="bg-slate-400 w-full h-screen">
        APPLICATION 
        <Pomodoro/>

      </div>
      
    </div>
  );
}

export default App;

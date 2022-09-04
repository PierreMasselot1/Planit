
import { Pomodoro } from './components/pomodoro/Pomodoro';

function App() {
  return (
    <div className="flex flex-row">
      
      <div className=' w-25 h-screen'>
        NAVIGATION BAR

        PomodoroNavIcon
      </div>
      
      <div className="w-full h-screen">
        APPLICATION 
        <Pomodoro/>

      </div>
      
    </div>
  );
}

export default App;

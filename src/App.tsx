import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekDays } from './components/WeekDays'
import { WeekGoals } from './components/WeekGoals'

function App () {
  return (
    <>
    <div className='w-5/6'>
      <ThemeChanger/>
      <WeekGoals />
      <WeekDays />
      </div>
      <div className='w-px'>
        </div>
    </>
  )
}

export default App

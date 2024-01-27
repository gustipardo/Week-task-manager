import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekDays } from './components/WeekDays'
import { WeekTableTasks } from './components/WeekTable'

function App () {
  return (
    <>
      <ThemeChanger/>
      <WeekTableTasks />

      <WeekDays />

    </>
  )
}

export default App

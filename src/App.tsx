import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekDays } from './components/WeekDays'
import { WeekGoals } from './components/WeekGoals'

function App () {
  return (
    <>

      <ThemeChanger/>
      <WeekGoals />
      <WeekDays />

    </>
  )
}

export default App

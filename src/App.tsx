import { Icon } from '@tremor/react'
import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekDays } from './components/WeekDays'
import { WeekGoals } from './components/WeekGoals'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useDateStore } from './store/Dates'

function App () {
  const goNextWeek = useDateStore(state => state.goNextWeek)

  const handleClick = () => {
    console.log('click')
    goNextWeek()
  }
  return (
    <>
      <Icon size="lg" icon={ArrowRightCircleIcon} onClick={handleClick}/>
      <ThemeChanger/>
      <WeekGoals />
      <WeekDays />
    </>
  )
}

export default App

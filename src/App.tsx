import { Icon } from '@tremor/react'
import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekGoals } from './components/WeekGoals'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useWeekInfoStore } from './store/WeekInfo'
import { WeekDays } from './components/WeekDays'

function App () {
  const goNextWeek = useWeekInfoStore(state => state.goNextWeek)

  const handleClick = (isNext?: boolean) => {
    goNextWeek(isNext)
  }
  return (
    <>
      <Icon size="lg" icon={ArrowLeftCircleIcon} onClick={() => { handleClick(false) }}/>
      <Icon size="lg" icon={ArrowRightCircleIcon} onClick={() => { handleClick(true) }}/>
      <ThemeChanger/>
      <WeekGoals />
        <WeekDays />
    </>
  )
}

export default App

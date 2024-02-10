import { Icon } from '@tremor/react'
import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekGoals } from './components/WeekGoals'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useWeekInfoStore } from './store/WeekInfo'
import { WeekDays } from './components/WeekDays'
import { useEffect } from 'react'
import { Hola } from './components/Hola'

function App () {
  const goNextWeek = useWeekInfoStore(state => state.goNextWeek)
  const addNewWeek = useWeekInfoStore(state => state.addNewWeek)

  const handleClick = (isNext?: boolean) => {
    goNextWeek(isNext)
  }

  useEffect(() => {
    addNewWeek()
  }, [])
  return (
    <>
      <Icon size="lg" icon={ArrowLeftCircleIcon} onClick={() => { handleClick(false) }}/>
      <Icon size="lg" icon={ArrowRightCircleIcon} onClick={() => { handleClick(true) }}/>
      <ThemeChanger/>
      <WeekGoals />
        <WeekDays />
        <Hola></Hola>
    </>
  )
}

export default App

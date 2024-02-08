import { Icon } from '@tremor/react'
import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekDays } from './components/WeekDays'
import { WeekGoals } from './components/WeekGoals'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useUserTaskStore } from './store/tasks'
import { useGoalsStore } from './store/Goals'
import { useWeekInfoStore } from './store/WeekInfo'
import { Hola } from './components/Hola'

function App () {
  const goNextWeek = useWeekInfoStore(state => state.goNextWeek)
  const fetchUserTasks = useUserTaskStore(state => state.fetchUserTasks)
  const fetchGoals = useGoalsStore(state => state.fetchGoals)
  const handleClick = (isNext?: boolean) => {
    goNextWeek(isNext)
    fetchUserTasks()
    fetchGoals()
  }
  return (
    <>
      <Icon size="lg" icon={ArrowLeftCircleIcon} onClick={() => { handleClick(false) }}/>
      <Icon size="lg" icon={ArrowRightCircleIcon} onClick={() => { handleClick(true) }}/>
      <ThemeChanger/>
      {/* <Hola></Hola> */}
      <WeekGoals />
      {/* <WeekDays /> */}
    </>
  )
}

export default App

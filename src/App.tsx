import { Icon } from '@tremor/react'
import './App.css'
import { ThemeChanger } from './components/ThemeChanger'
import { WeekDays } from './components/WeekDays'
import { WeekGoals } from './components/WeekGoals'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useDateStore } from './store/Dates'
import { useUserTaskStore } from './store/tasks'
import { useGoalsStore } from './store/Goals'

function App () {
  const goNextWeek = useDateStore(state => state.goNextWeek)
  const fetchUserTasks = useUserTaskStore(state => state.fetchUserTasks)
  const fetchGoals = useGoalsStore(state => state.fetchGoals)
  const handleClick = () => {
    goNextWeek()
    fetchUserTasks()
    fetchGoals()
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

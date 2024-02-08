import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title
} from '@tremor/react'
import { useGoalsStore } from '../store/Goals'
import { useEffect, useState } from 'react'
import { type Goal, type task_letter } from '../types'
import { useDateStore } from '../store/Dates'
import { useWeekInfoStore } from '../store/WeekInfo'
import { getCurrentWeekInfo } from '../services/CurrentWeekInfo'

export const WeekGoals = () => {
  const monday = useDateStore(state => state.CurrentMondayString)
  const sunday = useDateStore(state => state.CurrentSundayString)
  const WeekGoals = useGoalsStore(state => state.WeekGoals)
  const fetchGoals = useGoalsStore(state => state.fetchGoals)
  const addUserGoal = useGoalsStore(state => state.addUserGoal)
  const updateGoalsLetters = useGoalsStore(state => state.updateGoalsLetters)
  const GoalsLetters = useGoalsStore(state => state.GoalsLetters)
  const removeGoal = useGoalsStore(state => state.removeGoal)
  const [disabled, setDisabled] = useState(false)

  const WeeksInfo = useWeekInfoStore(state => state.WeeksInfo)
  const CurrentInitialDate = useWeekInfoStore(state => state.CurrentInitialDate)
  const fetchWeeksInfo = useWeekInfoStore(state => state.fetchWeeksInfo)

  useEffect(() => {
    fetchGoals()
    fetchWeeksInfo()
    console.log('1', WeeksInfo[0].WeekGoal)
    console.log('1.1', CurrentInitialDate)
    const { CurrentWeekInfo } = getCurrentWeekInfo(WeeksInfo, CurrentInitialDate)
    console.log('2', CurrentWeekInfo)
    console.log(WeekGoals)
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    setDisabled(true)
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const description = formData.get('description') as Goal
    const letter = formData.get('letter') as task_letter
    if (letter.length === 1 && !GoalsLetters.includes(letter) && description.length > 0) {
      addUserGoal(description, letter)
      updateGoalsLetters()
    } else {
      setDisabled(false)
      throw new Error('You can only use a single Letter and it cant be repited')
    }
    form.reset()
    setDisabled(false)
  }

  return (
  <Card>
    <Title>Week {monday} - {sunday}</Title>
        <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell className='text-center'>Letter</TableHeaderCell>
          <TableHeaderCell >Task</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {WeekGoals.map((item, index) => (
          <TableRow key={index} className='tableRow'>
            <TableCell className='w-1/6 text-center'>{item.letter}</TableCell>
            <TableCell>
              <Text className='w-5/6'>{item.goal}</Text>
            </TableCell>
            <TableCell>
            {/* <button type='button'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
            </button> */}

            <button className='opacity-0 deleteButton' type='button' onClick={() => { removeGoal(item.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
            </button>

            </TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
    <form
          onSubmit={handleSubmit}
          className='flex'
    >
        <TextInput className='w-24' name="letter" placeholder='Letter...'/>
        <TextInput name="description" placeholder='Goal description...'/>
        <Button size="xs" variant="primary" type="submit" disabled={disabled} >Add goal</Button>
    </form>
  </Card>
  )
}

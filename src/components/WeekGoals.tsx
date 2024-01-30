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
import { getMondayAndSundayString } from '../services/CurrentWeek'
import { useGoalsStore } from '../store/Goals'
import { useEffect } from 'react'
import { type Goal, type task_letter } from '../types'

export const WeekGoals = () => {
  const { monday, sunday } = getMondayAndSundayString()
  const WeekGoals = useGoalsStore(state => state.WeekGoals)
  const fetchGoals = useGoalsStore(state => state.fetchGoals)
  const addUserGoal = useGoalsStore(state => state.addUserGoal)

  useEffect(() => {
    fetchGoals()
    console.log(WeekGoals)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const description = e.target.description.value
    const letter = e.target.letter.value

    addUserGoal(description as Goal, letter as task_letter)
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
          <TableRow key={index}>
            <TableCell className='w-1/6 text-center'>{item.letter}</TableCell>
            <TableCell>
              <Text className='w-5/6'>{item.goal}</Text>
            </TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
    <form
          onSubmit={(e) => { handleSubmit(e) }}
          className='flex'
    >
        <TextInput className='w-24' id="letter" placeholder='Letter...'/>
        <TextInput id="description" placeholder='Goal description...'/>
        <Button size="xs" variant="primary" type="submit" >Add goal</Button>
    </form>
  </Card>
  )
}

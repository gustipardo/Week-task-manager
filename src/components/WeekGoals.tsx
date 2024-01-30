import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react'
import { getMondayAndSundayString } from '../services/CurrentWeek'
import { useGoalsStore } from '../store/Goals'
import { useEffect } from 'react'

export const WeekGoals = () => {
  const { monday, sunday } = getMondayAndSundayString()
  const WeekGoals = useGoalsStore(state => state.WeekGoals)
  const fetchGoals = useGoalsStore(state => state.fetchGoals)

  useEffect(() => {
    fetchGoals()
    console.log(WeekGoals)
  }, [])
  return (
  <Card>
    <Title>Week {monday} - {sunday}</Title>
        <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Letter</TableHeaderCell>
          <TableHeaderCell>Task</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {WeekGoals.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='w-1/6'>{item.letter}</TableCell>
            <TableCell>
              <Text className='w-5/6'>{item.goal}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
  )
}

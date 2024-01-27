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

const WeekTask = [
  {
    task: 'Complete React Midu course',
    task_letter: 'r'
  },
  {
    task: 'Train for 5 days',
    task_letter: 'e'
  },
  {
    task: 'Define a project',
    task_letter: 'p'
  },
  {
    task: 'Finish wall structure',
    task_letter: 'H'
  },
  {
    task: 'Finish wall structure',
    task_letter: 't'
  }
]

export const WeekTableTasks = () => {
  const { monday, sunday } = getMondayAndSundayString()
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
        {WeekTask.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.task_letter}</TableCell>
            <TableCell>
              <Text>{item.task}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
  )
}

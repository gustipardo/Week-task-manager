import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text
} from '@tremor/react'

const UserWeekTasksSelected = [
  {
    day: 'Monday',
    UserTasksSelected: ['r', 'e', 'p', 'H', 't']
  },
  {
    day: 'Tuesday',
    UserTasksSelected: ['t', 'p', 'r', 'e', 'H']
  },
  {
    day: 'Wednesday',
    UserTasksSelected: ['e', 'H', 'p']
  },
  {
    day: 'Thursday',
    UserTasksSelected: ['H', 'p', 'e', 't', 'r']
  },
  {
    day: 'Friday',
    UserTasksSelected: ['r']
  },
  {
    day: 'Saturday',
    UserTasksSelected: ['e', 't', 'H']
  },
  {
    day: 'Sunday',
    UserTasksSelected: ['H', 't', 'e', 'r']
  }
]

export const WeekDays = () => {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            {
            UserWeekTasksSelected.map((item, index) => (
                <TableHeaderCell key={index}>{item.day.slice(0, 3)}</TableHeaderCell>
            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
        {UserWeekTasksSelected.map((item, index) => (
          <TableCell key={index}>
            {
            item.UserTasksSelected.map(element => (
            <Text key={element}>{element}</Text>
            ))
            }
            </TableCell>
        ))}
        </TableBody>
      </Table>
    </Card>
  )
}

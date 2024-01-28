import {
  Card,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text
} from '@tremor/react'
import { useUserTaskStore } from '../store/Tasks'
import { useEffect } from 'react'

export const WeekDays = () => {
  const WeekUserTasksSelected = useUserTaskStore(state => state.WeekUserTasksSelected)
  const fetchUserTasks = useUserTaskStore(state => state.fetchUserTasks)

  useEffect(() => {
    fetchUserTasks()
    console.log(WeekUserTasksSelected)
  }, [])

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            {
            WeekUserTasksSelected.map((item, index) => (
                <TableHeaderCell key={index}>{item.day.slice(0, 3)}</TableHeaderCell>
            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
        {WeekUserTasksSelected.map((item, index) => (
          <TableCell key={index}>
            {
            item.UserTasksSelected.map(element => (
            <Text key={element}>{element}</Text>
            ))
            }
            </TableCell>
        ))}
        </TableRow>
        <TableRow>
          <Select>
            <SelectItem value='1'>H</SelectItem>
            <SelectItem value='2'>G</SelectItem>
            <SelectItem value='3'>J</SelectItem>
          </Select>
        </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

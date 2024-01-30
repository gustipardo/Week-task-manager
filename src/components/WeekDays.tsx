import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react'
import { useUserTaskStore } from '../store/Tasks'
import { useEffect } from 'react'
import { useGoalsStore } from '../store/Goals'
import { Select } from 'antd'

export const WeekDays = () => {
  const WeekUserTasksSelected = useUserTaskStore(state => state.WeekUserTasksSelected)
  const fetchUserTasks = useUserTaskStore(state => state.fetchUserTasks)
  const getAllLetters = useGoalsStore(state => state.getAllLetters)
  const GoalsLetters = useGoalsStore(state => state.GoalsLetters)
  const Options = GoalsLetters.map(letter => ({
    value: letter,
    label: letter
  }))

  useEffect(() => {
    fetchUserTasks()
    getAllLetters()
    // console.log(GoalsLetters)
  }, [])
  console.log(Options)
  return (
    <Card>
      <Table>
        <TableHead className='border-b-2'>
          <TableRow>
            {
            WeekUserTasksSelected.map((item, index) => (
                <TableHeaderCell key={index} className="text-center">
                  {item.day.slice(0, 3)}
                </TableHeaderCell>

            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
        {
            WeekUserTasksSelected.map((item, index) => (
              <TableCell key={index} className='p-2'>
                        <Select key={index}
                          defaultValue="A"
                          style={{ width: 56 }}
                          onChange={() => {}}
                          options={Options}
                        />
                        </TableCell>
            ))
            }
            </TableRow>
          <TableRow>
        { WeekUserTasksSelected.map((item, index) => (
          <TableCell key={index} className="">
            {
            item.UserTasksSelected.map(element => (
            <Badge key={element} className='flex flex-col place-content-center ' color='amber'>{element}</Badge>
            ))
            }
            </TableCell>
        )) }
        </TableRow>

        </TableBody>
      </Table>
    </Card>
  )
}

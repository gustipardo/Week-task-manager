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
import { type Day } from '../types'

export const WeekDays = () => {
  const WeekUserTasksSelected = useUserTaskStore(state => state.WeekUserTasksSelected)
  const fetchUserTasks = useUserTaskStore(state => state.fetchUserTasks)
  const GoalsLetters = useGoalsStore(state => state.GoalsLetters)
  const addUserTask = useUserTaskStore(state => state.addUserTask)
  const Options = GoalsLetters.map(letter => ({
    value: letter,
    label: letter
  }))

  useEffect(() => {
    fetchUserTasks()

    // console.log(GoalsLetters)
  }, [])
  console.log('Options', Options)

  const handleChangeSelect = (value: string, day: Day) => {
    addUserTask(day, value)
    console.log(value, day)
  }

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
            WeekUserTasksSelected.map((_item, index) => (
              <TableCell key={index} className='p-2'>
                        <Select
                          defaultValue="A"
                          style={{ width: 56 }}
                          onChange={(e) => { handleChangeSelect(e, _item.day) }}
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
            item.UserTasksSelected.map((element, index) => (
            <Badge key={index} className='flex flex-col place-content-center ' color='amber'>{element}</Badge>
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

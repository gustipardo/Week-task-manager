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
import { useState } from 'react'
import { Select } from 'antd'
import { type Day } from '../types'
import { useWeekInfoStore } from '../store/WeekInfo'
import { getCurrentWeekInfo } from '../services/CurrentWeekInfo'

export const WeekDays = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('')

  const monday = useWeekInfoStore(state => state.CurrentMondayString)
  const WeeksInfo = useWeekInfoStore(state => state.WeeksInfo)
  const { CurrentWeekInfo } = getCurrentWeekInfo(WeeksInfo, monday)
  const WeekUserTasksSelected = CurrentWeekInfo?.WeekTasks

  const GoalsLetters = useWeekInfoStore(state => state.GoalsLetters)
  console.log('Goals Letters in WeekDays', GoalsLetters)

  const addUserTask = useWeekInfoStore(state => state.addNewTask)

  const Options = GoalsLetters.map(letter => ({
    value: letter,
    label: letter
  }))

  const handleChangeSelect = (value: string, day: Day) => {
    addUserTask(day, value)
    console.log(value, day, selectedValue)
    setSelectedValue('')
  }

  return (
    <Card>
      <Table>
        <TableHead className='border-b-2'>
          <TableRow>
            {
            WeekUserTasksSelected?.map((item, index) => (
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
            WeekUserTasksSelected?.map((_item, index) => (
              <TableCell key={index} className='p-2'>
                        <Select
                          value=""
                          style={{ width: 56 }}
                          onChange={(e) => { handleChangeSelect(e, _item.day) }}
                          options={Options}
                        />
                        </TableCell>
            ))
            }
            </TableRow>
          <TableRow>
        { WeekUserTasksSelected?.map((item, index) => (
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

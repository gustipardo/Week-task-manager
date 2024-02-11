import { Badge, TableCell } from '@tremor/react'
import { type WeekTasks } from '../types'
import { useEffect, useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  SensorResponse,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { SortableLetter } from './SortableLetter'

interface Props {
  item: WeekTasks
  index: number
}

export const ListOfTasks: React.FC<Props> = ({ item }) => {
  const [items, setItems] = useState(item.UserTasksSelected.map((_, index) => index + 1))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd (event: { active: any, over: any }) {
    const { active, over } = event
    // console.log('items', items)
    // console.log('active ', active, 'over ', over)
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as number)
        const newIndex = items.indexOf(over.id as number)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  useEffect(() => {
    setItems(item.UserTasksSelected.map((_, index) => index + 1))
  }, [JSON.stringify(item.UserTasksSelected)])

  return (

    <TableCell>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableLetter key={id} id={id} content={item.UserTasksSelected[id - 1]} />
          ))}
        </SortableContext>
      </DndContext>
    </TableCell>

  )
}

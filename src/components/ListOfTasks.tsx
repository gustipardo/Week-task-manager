import { Badge, TableCell } from '@tremor/react'
import { type WeekTasks } from '../types'
import { useState } from 'react'
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

export const ListOfTasks: React.FC<Props> = ({ item, index }) => {
  const [items, setItems] = useState(item.UserTasksSelected)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd (event) {
    const { active, over } = event
    console.log(active, over)
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
  <TableCell key={index}>
    {item.UserTasksSelected.map((element, index) => (
      <Badge
        key={index}
        className="flex flex-col place-content-center "
        color="amber"
      >
        {element}
      </Badge>
    ))}
    </TableCell>

  //   <TableCell>
  //     <DndContext
  //       sensors={sensors}
  //       collisionDetection={closestCenter}
  //       onDragEnd={handleDragEnd}
  //     >
  //       <SortableContext items={items} strategy={verticalListSortingStrategy}>
  //         {items.map((id) => (
  //           <SortableLetter key={id} id={id} />
  //         ))}
  //       </SortableContext>
  //     </DndContext>
  //   </TableCell>

  //   <TableCell>
  //     <DndContext
  //       sensors={sensors}
  //       collisionDetection={closestCenter}
  //       onDragEnd={handleDragEnd}
  //     >
  //       <SortableContext items={items} strategy={verticalListSortingStrategy}>
  //         {item.UserTasksSelected.map((element, index) => (
  //           <SortableLetter key={index} id={element} />
  //         ))}
  //       </SortableContext>
  //     </DndContext>
  //   </TableCell>
  )
}

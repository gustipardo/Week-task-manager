import { DndContext } from '@dnd-kit/core'
import { Droppable } from './Droppable'
import { Draggable } from './Draggable'
import { useEffect, useState } from 'react'

export const Hola = () => {
  const data = [
    { letter: 'A', parentId: 'Mon' },
    { letter: 'B', parentId: 'Mon' },
    { letter: 'T', parentId: 'Mon' },
    { letter: 'B', parentId: 'Thu' },
    { letter: 'C', parentId: 'Wen' },
    { letter: 'D', parentId: 'Tue' },
    { letter: 'E', parentId: 'Fri' },
    { letter: 'F', parentId: 'Sat' },
    { letter: 'G', parentId: 'Sun' }

  ]

  const containers = ['Mon', 'Thu', 'Wen', 'Tue', 'Fri', 'Sat', 'Sun']
  const [parent, setParent] = useState(data)

  useEffect(() => {
    console.log('renderizado y parent', parent)
  }, [parent])

  return (
    <DndContext onDragEnd={handleDragEnd}>

      <div className='flex flex-row'>
        {containers.map((id) => (

          <Droppable key={id} id={id}>

            <ul className="felx flex-row">
              {data.map((item, index) => (
                // Solo renderizar el elemento si cumple la condición
                item.parentId === id
                  ? (
                    <Draggable key={index} id={item.letter}>{item.letter}</Draggable>
                    )
                  : null
              ))}
            </ul>

          </Droppable>
        ))}
      </div>
    </DndContext>
  )

  function handleDragEnd (event) {
    const { over, active } = event

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    console.log('over: ', over.id, 'Active: ', active.id)
    if (over && active) {
      console.log('a')
      const updatedParent = parent.map(item =>
        item.letter === active.id ? { ...item, parentId: over.id } : item
      )

      setParent(updatedParent)
    }
  }
}

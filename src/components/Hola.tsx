import { DndContext, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { Droppable } from './Droppable'
import { Draggable } from './Draggable'
import { useEffect, useState } from 'react'

export const Hola = () => {
  const data = [
    { id: '2c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'A', parentId: 'Mon' },
    { id: '3c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'J', parentId: 'Mon' },
    { id: '4c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'B', parentId: 'Mon' },
    { id: '5c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'B', parentId: 'Thu' },
    { id: '6c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'C', parentId: 'Wen' },
    { id: '7c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'Ñ', parentId: 'Tue' },
    { id: '8c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'E', parentId: 'Fri' },
    { id: '9c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'F', parentId: 'Sat' },
    { id: '10c7141cb-a43c-4d62-9afe-e99d2c174b9c', letter: 'G', parentId: 'Sun' }
  ]

  const containers = ['Mon', 'Thu', 'Wen', 'Tue', 'Fri', 'Sat', 'Sun']
  const [parent, setParent] = useState(data)
  const [letterActive, setLetterActive] = useState('')

  useEffect(() => {
    console.log('renderizado y parent', parent)
    console.log('letter', letterActive)
  }, [parent, letterActive])

  const goals = [
    { goal: 'limpiar', letter: 'L' },
    { goal: 'Patinar', letter: 'P' },
    { goal: 'Masacrar', letter: 'M' }
  ]

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    console.log('Start', active)
    setLetterActive(active.id as string)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="bg-white p-4 rounded-md shadow-md my-2 text-slate-950 h-auto block">
        <ul>
          {goals.map((item, index) => (
            <li key={index} className="flex flex-row items-center space-x-4">
              <Draggable id={item.letter} className="text-xl">
                {item.letter}
              </Draggable>
              <div>{item.goal}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row">
        {containers.map((id) => (
          <Droppable key={id} id={id}>
            <ul className="felx flex-row">
              {parent.map((item, index) =>
                // Solo renderizar el elemento si cumple la condición
                item.parentId === id
                  ? (
                  <Draggable key={index} id={item.id}>
                    {item.letter}
                  </Draggable>
                    )
                  : null
              )}
            </ul>
          </Droppable>
        ))}
      </div>
    </DndContext>
  )

  function handleDragEnd (event: DragEndEvent) {
    const { over, active } = event

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    console.log('over: ', over?.id, 'Active: ', active)
    if ((over != null) && (active.id as number) !== 0) {
      const updatedParent = parent.map((item) => {
        if (item.id === active.id) {
          return { ...item, parentId: over.id }
        } else {
          return item
        }
      })

      if (!updatedParent.some((item) => item.id === active.id)) {
        console.log('aca', active.id)
        updatedParent.push({ id: crypto.randomUUID(), letter: letterActive, parentId: over.id })
      }

      setParent(updatedParent)
    }
  }
}

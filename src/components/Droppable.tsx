import React from 'react'
import { useDroppable } from '@dnd-kit/core'

export const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  })
  const style = {
    color: isOver ? 'green' : undefined
  }

  return (

    <div className='bg-white p-4 rounded-md shadow-md my-2 text-slate-950 h-32 w-32' ref={setNodeRef} style={style}>
        <h1>{props.id}</h1>
      {props.children}
    </div>
  )
}

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Badge } from '@tremor/react'

interface Props {
  id: number
  content: string
}

export const SortableLetter: React.FC<Props> = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Badge className='flex flex-col place-content-center ' color='amber'>{content}</Badge>
    </div>
  )
}

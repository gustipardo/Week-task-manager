type Goal = string
export type task_letter = string
type GoalId = string

export interface WeekGoal {
  id: GoalId
  goal: Goal
  letter: task_letter
}

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export interface WeekTasks {
  day: Day
  UserTasksSelected: task_letter[]
}

export type InitialDate = Date

export interface WeekInfo {
  Date: InitialDate
  WeekTasks: WeekTasks
  WeekGoal: WeekGoal
}

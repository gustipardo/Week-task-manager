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

export type InitialDate = string

export type cryptoUUID = `${string}-${string}-${string}-${string}-${string}`

export interface WeekInfo {
  Date: InitialDate
  id: cryptoUUID
  WeekTasks: WeekTasks[]
  WeekGoal: WeekGoal[]
}

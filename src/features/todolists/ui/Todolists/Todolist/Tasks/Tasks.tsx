import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import {TasksSkeleton} from "../../../skeletons/TasksSkeleton/TasksSkeleton";
import {useAppDispatch} from "common/hooks";
import {useEffect} from "react";
import {setAppError} from "../../../../../../app/appSlice";

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading, error } = useGetTasksQuery(todolist.id)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error)
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        dispatch(setAppError({ error: errMsg }))
      } else {
        dispatch(setAppError({ error: error.message ? error.message : 'Some error occurred.' }))
      }
  }, [error])

  if (isLoading) {
    return <TasksSkeleton />
  }

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}

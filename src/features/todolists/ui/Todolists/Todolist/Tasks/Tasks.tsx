import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { Task } from "./Task/Task"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { DomainTodolist } from "../../../../lib/types/types"

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const {data, isLoading} = useGetTasksQuery(todolist.id)

    if (isLoading) {
        return <TasksSkeleton/>
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
                        return <Task key={task.id} task={task} todolist={todolist}/>
                    })}
                </List>
            )}
        </>
    )
}

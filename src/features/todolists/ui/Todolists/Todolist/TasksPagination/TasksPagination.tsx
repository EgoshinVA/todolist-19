import React, { ChangeEvent } from "react"
import { Pagination } from "@mui/material"
import s from "./TasksPagination.module.css"
import { PAGE_SIZE } from "../../../../api/tasksApi"

type Props = {
  page: number
  count: number
  setPage: (page: number) => void
}

export const TasksPagination: React.FC<Props> = ({ page, setPage, count }) => {
  const setPageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <div className={s.pagination}>
      <Pagination page={page} count={Math.ceil(count / PAGE_SIZE)} hidePrevButton hideNextButton size="small" onChange={setPageHandler} />
    </div>
  )
}

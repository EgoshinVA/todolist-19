import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "todolistsApi",
    baseQuery: async (args, api, extraOptions) => {
        //искуственно замедлить загрузку
        //await new Promise(resolve => setTimeout(resolve, 2000))
        return fetchBaseQuery({
            baseUrl: process.env.REACT_APP_BASE_URL,
            prepareHeaders: (headers) => {
                headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
                headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
            },
        })(args, api, extraOptions)
    },
    endpoints: () => ({}),
    tagTypes: ["Todolist", "Task"],
})

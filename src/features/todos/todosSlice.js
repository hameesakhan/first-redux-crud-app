import { createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      transformResponse: (res) => {
        return todosAdapter.setAll(initialState, res)
      },
    }),
    getTodo: builder.query({
      query: (todoId) => `/todos/${todoId}`,
      providesTags: (result, error, arg) => [{ type: 'Todo', id: arg }],
    }),
    addNewTodo: builder.mutation({
      query: (initialTodo) => ({
        url: '/todos',
        method: 'POST',
        body: initialTodo,
      }),
      transformResponse: (res) => {
        return todosAdapter.addOne(initialState, res)
      }
    }),
    editTodo: builder.mutation({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `todos/${todoId}`,
        method: 'DELETE',
        body: undefined,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg }],
    }),
  }),
})

export const { useGetTodosQuery, useGetTodoQuery, useAddNewTodoMutation, useEditTodoMutation, useDeleteTodoMutation } = extendedApiSlice

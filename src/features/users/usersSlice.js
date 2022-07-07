import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (res) => {
        return usersAdapter.setAll(initialState, res)
      },
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
    addNewUser: builder.mutation({
      query: (initialUser) => ({
        url: '/users',
        method: 'POST',
        body: initialUser,
      }),
      transformResponse: (res) => {
        return usersAdapter.addOne(initialState, res)
      }
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
        body: undefined,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery, useAddNewUserMutation, useEditUserMutation, useDeleteUserMutation } = extendedApiSlice

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)

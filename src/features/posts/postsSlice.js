import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: (result = [], error, arg) => [
                'Post',
                ...result.map(({ id }) => ({ type: 'Post', id })),
            ],
        }),
        getPost: builder.query({
            query: (postId) => `/posts/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
        }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: '/posts',
                method: 'POST',
                body: initialPost,
            }),
            invalidatesTags: ['Post'],
        }),
        editPost: builder.mutation({
            query: (post) => ({
                url: `posts/${post.id}`,
                method: 'PATCH',
                body: post,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
        }),
    }),
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation
} = extendedApiSlice

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the posts query has no params, so we don't pass anything to select()
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

const selectPostsData = createSelector(
    selectPostsResult,
    (postsResult) => postsResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
} = postsAdapter.getSelectors((state) => selectPostsData(state) ?? initialState)

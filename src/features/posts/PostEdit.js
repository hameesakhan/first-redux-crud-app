import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery, useEditPostMutation } from '../posts/postsSlice'
import { useGetUsersQuery } from '../users/usersSlice'

const UserSelector = (props) => {
  const {
    data: users = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery()

  let content
  if (isLoading) {
    content = <option value="">Loading...</option>
  } else if (isSuccess) {
    const renderedUsers = users.ids.map((userId) => {
      const user = users.entities[userId];

      return <option key={user.id} value={user.id} >
        {user.name}
      </option >
    })

    content = [<option value=""></option>, ...renderedUsers]
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <select {...props}>
      {content}
    </select>
  )
}


export const PostEdit = ({ match }) => {
  const { postId } = useParams()

  const { data: post = { title: 'Loading...', body: 'Loading...' }, isFetching, isSuccess } = useGetPostQuery(postId)

  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [userId, setUserId] = useState(post.userId)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBodyChanged = (e) => setBody(e.target.value)
  const onUserChanged = (e) => setUserId(e.target.value)

  const [updatePost, { isLoading }] = useEditPostMutation()

  const navigate = useNavigate()

  const canSave = [title, body, userId].every(Boolean)
  const onSavePostClicked = async () => {
    if (canSave) {
      await updatePost({ id: postId, title, body, userId })
      navigate(`/posts/${postId}`)
    }
  }

  const spinner = isLoading ? <Spinner text="Saving..." /> : null

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
          disabled={isLoading || isFetching}
        />
        <label htmlFor="postUser">User:</label>
        <UserSelector id="postUser" value={userId} onChange={onUserChanged} />
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={onBodyChanged}
          disabled={isLoading || isFetching}
        />
      </form>
      <button type="button" onClick={onSavePostClicked} disabled={isLoading || isFetching || !canSave}>
        Save Post
      </button>
      {spinner}
    </section>
  )
}

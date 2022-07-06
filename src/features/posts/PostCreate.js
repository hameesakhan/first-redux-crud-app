import React, { useState } from 'react'

import { Spinner } from '../../components/Spinner'
import { useAddNewPostMutation } from '../posts/postsSlice'
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

export const PostCreate = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

  const [addNewPost, { isLoading }] = useAddNewPostMutation()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBodyChanged = (e) => setBody(e.target.value)
  const onUserChanged = (e) => setUserId(e.target.value)

  const canSave = [title, body, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body, user: userId }).unwrap()
        setTitle('')
        setBody('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  const spinner = isLoading ? <Spinner size="30px" /> : null

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postUser">User:</label>
        <UserSelector id="postUser" value={userId} onChange={onUserChanged} />
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={onBodyChanged}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
          {spinner}
        </div>
      </form>
    </section>
  )
}

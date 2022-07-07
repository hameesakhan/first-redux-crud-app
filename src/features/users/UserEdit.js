import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetUserQuery, useEditUserMutation } from '../users/usersSlice'

export const UserEdit = () => {
  const { userId } = useParams()

  const { data: user = { name: 'Loading...', username: 'Loading...', email: 'Loading...' }, isFetching, isSuccess } = useGetUserQuery(userId)

  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)

  const onNameChanged = (e) => setName(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)

  const [updateUser, { isLoading }] = useEditUserMutation()

  const navigate = useNavigate()

  const canSave = [name, username, email].every(Boolean)
  const onSaveUserClicked = async () => {
    if (canSave) {
      await updateUser({ id: userId, name, username, email })
      navigate(`/users/${userId}`)
    }
  }

  const spinner = isLoading ? <Spinner text="Saving..." /> : null

  return (
    <section>
      <h2>Edit User</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={onUsernameChanged}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChanged}
        />
      </form>
      <button type="button" onClick={onSaveUserClicked} disabled={isLoading || isFetching || !canSave}>
        Save User
      </button>
      {spinner}
    </section>
  )
}

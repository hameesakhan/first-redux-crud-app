import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useDeleteUserMutation, useGetUserQuery } from '../users/usersSlice'

export const UserPage = ({ match }) => {
  const { userId } = useParams()

  const { data: user, isFetching, isSuccess } = useGetUserQuery(userId)

  const [deleteUser, { isLoading }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const onDeleteUserClicked = async () => {
    if (!isLoading) {
      try {
        await deleteUser(userId).unwrap()
        navigate('/users')
      } catch (err) {
        console.error('Failed to delete the user: ', err)
      }
    }
  }

  let body
  if (isFetching) {
    body = <Spinner text="Loading..." />
  } else if (isSuccess) {
    body = (
      <article className="user">
        <h2>{user.name}</h2>
        <p className="user-content">{user.username}</p>
        <p className="user-content">{user.email}</p>
        <Link to={`/users/${user.id}/edit`} className="button">
          Edit User
        </Link>
        <button className="button" onClick={onDeleteUserClicked}>Delete</button>
      </article>
    )
  }

  return <section>{body}</section>
}

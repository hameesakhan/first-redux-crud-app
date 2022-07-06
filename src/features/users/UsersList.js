import React from 'react'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from './usersSlice'
import { Spinner } from '../../components/Spinner'

export const UsersList = () => {
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
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedUsers = users.ids.map((userId) => {
      const user = users.entities[userId];

      return <li key={user.id} >
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </li >
    })

    content = <ul>{renderedUsers}</ul>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section>
      <h2>Users</h2>

      {content}
    </section>
  )
}

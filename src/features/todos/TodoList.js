import React from 'react'
import { Link } from 'react-router-dom'
import { useGetTodosQuery } from './todosSlice'
import { Spinner } from '../../components/Spinner'

export const TodosList = () => {
  const {
    data: todos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery()


  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedTodos = todos.ids.map((todoId) => {
      const todo = todos.entities[todoId];

      return <li key={todo.id} >
        <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
      </li >
    })

    content = <ul>{renderedTodos}</ul>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section>
      <h2>Todos</h2>

      {content}
    </section>
  )
}

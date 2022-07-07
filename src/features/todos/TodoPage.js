import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useDeleteTodoMutation, useGetTodoQuery } from '../todos/todosSlice'

export const TodoPage = ({ match }) => {
  const { todoId } = useParams()

  const { data: todo, isFetching, isSuccess } = useGetTodoQuery(todoId)

  const [deleteTodo, { isLoading }] = useDeleteTodoMutation()

  const navigate = useNavigate()

  const onDeleteTodoClicked = async () => {
    if (!isLoading) {
      try {
        await deleteTodo(todoId).unwrap()
        navigate('/todos')
      } catch (err) {
        console.error('Failed to delete the todo: ', err)
      }
    }
  }

  let body
  if (isFetching) {
    body = <Spinner text="Loading..." />
  } else if (isSuccess) {
    body = (
      <article className="todo">
        <h2>{todo.title}</h2>
        <Link to={`/todos/${todo.id}/edit`} className="button">
          Edit Todo
        </Link>
        <button className="button" onClick={onDeleteTodoClicked}>Delete</button>
      </article>
    )
  }

  return <section>{body}</section>
}

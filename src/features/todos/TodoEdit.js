import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetTodoQuery, useEditTodoMutation } from '../todos/todosSlice'

export const TodoEdit = () => {
  const { todoId } = useParams()

  const { data: todo = { title: 'Loading...' }, isFetching } = useGetTodoQuery(todoId)

  const [title, setTitle] = useState(todo.title)

  const onTitleChanged = (e) => setTitle(e.target.value)

  const [updateTodo, { isLoading }] = useEditTodoMutation()

  const navigate = useNavigate()

  const canSave = [title].every(Boolean)
  const onSaveTodoClicked = async () => {
    if (canSave) {
      await updateTodo({ id: todoId, title })
      navigate(`/todos/${todoId}`)
    }
  }

  const spinner = isLoading ? <Spinner text="Saving..." /> : null

  return (
    <section>
      <h2>Edit Todo</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={onTitleChanged}
        />
      </form>
      <button type="button" onClick={onSaveTodoClicked} disabled={isLoading || isFetching || !canSave}>
        Save Todo
      </button>
      {spinner}
    </section>
  )
}

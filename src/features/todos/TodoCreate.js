import React, { useState } from 'react'

import { Spinner } from '../../components/Spinner'
import { useAddNewTodoMutation } from '../todos/todosSlice'

export const TodoCreate = () => {
    const [name, setName] = useState('')
    const [completed, setCompleted] = useState(false)

    const [addNewTodo, { isLoading }] = useAddNewTodoMutation()

    const onNameChanged = (e) => setName(e.target.value)
    const onCompletedChanged = (e) => setCompleted(e.target.value)

    const canSave = [name, completed].every(Boolean) && !isLoading

    const onSaveTodoClicked = async () => {
        if (canSave) {
            try {
                await addNewTodo({ name, completed }).unwrap()
                setName('')
                setCompleted('')
            } catch (err) {
                console.error('Failed to save the post: ', err)
            }
        }
    }

    const spinner = isLoading ? <Spinner size="30px" /> : null

    return (
        <section>
            <h2>Add a New Todo</h2>
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
                <label htmlFor="completed">Completed:</label>
                <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    placeholder="Completed"
                    value={completed}
                    onChange={onCompletedChanged}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <button type="button" onClick={onSaveTodoClicked} disabled={!canSave}>
                        Save Todo
                    </button>
                    {spinner}
                </div>
            </form>
        </section>
    )
}

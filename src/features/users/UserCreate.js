import React, { useState } from 'react'

import { Spinner } from '../../components/Spinner'
import { useAddNewUserMutation } from '../users/usersSlice'

export const UserCreate = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [addNewUser, { isLoading }] = useAddNewUserMutation()

    const onNameChanged = (e) => setName(e.target.value)
    const onUsernameChanged = (e) => setUsername(e.target.value)
    const onEmailChanged = (e) => setEmail(e.target.value)

    const canSave = [name, username, email].every(Boolean) && !isLoading

    const onSaveUserClicked = async () => {
        if (canSave) {
            try {
                await addNewUser({ name, username, email }).unwrap()
                setName('')
                setUsername('')
                setEmail('')
            } catch (err) {
                console.error('Failed to save the post: ', err)
            }
        }
    }

    const spinner = isLoading ? <Spinner size="30px" /> : null

    return (
        <section>
            <h2>Add a New User</h2>
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
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <button type="button" onClick={onSaveUserClicked} disabled={!canSave}>
                        Save User
                    </button>
                    {spinner}
                </div>
            </form>
        </section>
    )
}

import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { UserCreate } from './features/users/UserCreate';
import { UserEdit } from './features/users/UserEdit';

import { PostsList } from './features/posts/PostsList';
import { PostCreate } from './features/posts/PostCreate';
import { PostEdit } from './features/posts/PostEdit';
import { PostPage } from './features/posts/PostPage';

import { TodosList } from './features/todos/TodoList';
import { TodoCreate } from './features/todos/TodoCreate';
import { TodoPage } from './features/todos/TodoPage';
import { TodoEdit } from './features/todos/TodoEdit';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/users" element={<UsersList />} />
              <Route exact path="/users/create" element={<UserCreate />} />
              <Route exact path="/users/:userId" element={<UserPage />} />
              <Route exact path="/users/:userId/edit" element={<UserEdit />} />

              <Route exact path="/posts" element={<PostsList />} />
              <Route exact path="/posts/create" element={<PostCreate />} />
              <Route exact path="/posts/:postId" element={<PostPage />} />
              <Route exact path="/posts/:postId/edit" element={<PostEdit />} />

              <Route exact path="/todos" element={<TodosList />} />
              <Route exact path="/todos/create" element={<TodoCreate />} />
              <Route exact path="/todos/:todoId" element={<TodoPage />} />
              <Route exact path="/todos/:todoId/edit" element={<TodoEdit />} />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;

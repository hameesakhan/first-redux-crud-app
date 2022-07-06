import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useDeletePostMutation, useGetPostQuery } from '../posts/postsSlice'

export const PostPage = ({ match }) => {
  const { postId } = useParams()

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  const [deletePost, { isLoading }] = useDeletePostMutation()

  const navigate = useNavigate()

  const onDeletePostClicked = async () => {
    if (!isLoading) {
      try {
        await deletePost(postId).unwrap()
        navigate('/posts')
      } catch (err) {
        console.error('Failed to delete the post: ', err)
      }
    }
  }

  let body
  if (isFetching) {
    body = <Spinner text="Loading..." />
  } else if (isSuccess) {
    body = (
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.body}</p>
        <Link to={`/posts/${post.id}/edit`} className="button">
          Edit Post
        </Link>
        <button className="button" onClick={onDeletePostClicked}>Delete</button>
      </article>
    )
  }

  return <section>{body}</section>
}

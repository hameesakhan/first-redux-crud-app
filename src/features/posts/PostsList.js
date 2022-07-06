import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'

import { useGetPostsQuery } from './postsSlice'

let PostExcerpt = ({ post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.body.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}

export const PostsList = () => {
    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery()

    let content

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        const renderedPosts = posts.ids.map((postId) => {
            const post = posts.entities[postId];
            return <PostExcerpt key={post.id} post={post} />
        })

        content = <div>{renderedPosts}</div>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

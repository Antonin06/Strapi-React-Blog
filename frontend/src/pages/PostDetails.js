import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const POST = gql`
	query GetPosts($id: ID!) {
		post(id: $id) {
			title,
			postContent,
			id,
			categories {
				name,
				id
			}
		}
	}
`

function PostDetails() {
	const { id } = useParams()
	const { loading, error, data } = useQuery(POST, {
		variables : { id : id }
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	console.log(data)

	return (
		<div className="review-card">
			<h2>{data.post.title}</h2>
			{data.post.categories.map(c => (
				<small key={c.id}>{c.name}</small>
			))}
			<p>{data.post.postContent}</p>
		</div>
	);
}

export default PostDetails;

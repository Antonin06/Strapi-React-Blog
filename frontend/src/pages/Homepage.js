import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const POSTS = gql`
	query GetPosts {
		posts {
			title,
			postContent,
			id
		}
	}
`

function Homepage() {
	const { loading, error, data } = useQuery(POSTS)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	// console.log(data)

	return (
		<div>
			{data.posts.map(post => (
				<div key={post.id} className="post-card">
					<div className="title">{post.title}</div>
					<div className="content"></div>
					<Link to={`/blog/${post.id}`}>Lire plus</Link>
				</div>
			))}
		</div>
	);
}

export default Homepage;

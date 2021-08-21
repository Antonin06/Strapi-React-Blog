import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
	query Getcategories($id: ID!) {
		category(id: $id) {
			name,
			id,
			posts {
				title,
				postContent,
				id,
				categories {
					name,
					id
				}
			}
		}
	}
`

function Category() {
	const { id } = useParams()
	const { loading, error, data } = useQuery(CATEGORIES, {
		variables : { id : id }
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	// console.log(data)

	return (
		<div>
			<h2>{data.category.name}</h2>
			{data.category.posts.map(post => (
				<div className="review-card">
					<h2>{post.title}</h2>
					{post.categories.map(c => (
						<small key={c.id}>{c.name}</small>
					))}
					<p>{post.postContent}</p>
				</div>
			))}
		</div>
	);
}

export default Category;

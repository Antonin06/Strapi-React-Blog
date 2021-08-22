import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const BLOGPAGE = gql`
	query BLOGPAGE {
		blogPage {
		  color_label,
		  label,
		  title
		},
		posts (sort: "created_at:desc") {
			title,
			postContent,
			id,
			thumbnail {
				url
			}
		}
	}
`

function Blog() {
	const { loading, error, data } = useQuery(BLOGPAGE);

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	console.log(data, "BLOGPAGE")
	return (
		<section id="blog-page">
			<div className="container">
				<div className="block-header">
					<span className={`${data.blogPage.color_label}`}>{data.blogPage.label}</span>
					<h1>{data.blogPage.title}</h1>
				</div>
				<div className="block-articles">

				</div>
			</div>
		</section>
	);
}

export default Blog;

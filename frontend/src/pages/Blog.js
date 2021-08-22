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
			},
			categories {
				id,
        		name
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
				<div id="block-header">
					<span className={`label ${data.blogPage.color_label}`}>{data.blogPage.label}</span>
					<h1>{data.blogPage.title}</h1>
				</div>
				<div className="block-articles">
					<div className="row">
						{data.posts.map(post => (
							<div key={post.id} className="col-6">
								<div className="card">
									<div className="card-body">
										{post.categories.map(c => (
											<Link className="category" key={c.id} to={`/categories/${c.id}`}>{c.name}</Link>
										))}
										<img src={`http://localhost:1337${post.thumbnail.url}`} className="card-img-top" alt="..."/>
										<h5 className="card-title">{post.title}</h5>
										<p className="card-text">{post.postContent}</p>
										<Link to={`/blog/${post.id}`}>Lire plus</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Blog;

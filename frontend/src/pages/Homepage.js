import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const POSTS = gql`
	query GetPosts {
		posts (sort: "created_at:desc") {
			title,
			postContent,
			id,
			thumbnail {
				url
			}
		},
		pages {
      		id,
    		title,
      		blocks {
        		... on ComponentBlockHero {
          			texte,
      				buttons {
						id,
						href,
						label,
						target
					},
					images {
						id,
						url
					}
        		}
      		}
    	}
	}
`

function Homepage() {
	const { loading, error, data } = useQuery(POSTS)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	console.log(data)

	return (
		<>
		<section>
			<div className="container">
				<div className="row">
					<div className="col-4">
						<div className="wrapper">
							<div className="first">
								{data.pages[0].blocks[0].images.map(image => (
									<img key={image.id} src={`http://localhost:1337${image.url}`} className="img-fluid"/>
								))}
							</div>
							<div className="second">

							</div>
						</div>
					</div>
					<div className="col-8">
						<h1>{data.pages[0].blocks[0].texte}</h1>
						{data.pages[0].blocks[0].buttons.map(button => (
							<Link key={button.id} to={`${button.href}`} target={`${button.target}`}>{button.label}</Link>
						))}
					</div>
				</div>
			</div>
		</section>
		<section className="">
			<div className="container">
				<div className="row">
					<h2>Nos Derniers Articles</h2>
					{data.posts.map(post => (
						<div key={post.id} className="col">
							<div className="card">
								<div className="card-body">
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
		</section>
		</>
	);
}

export default Homepage;

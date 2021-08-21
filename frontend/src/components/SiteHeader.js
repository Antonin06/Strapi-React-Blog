import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
	query GetQuery {
		categories {
			name,
			id
    },
  	global {
		id,
			navigation {
			links {
				id,
					href,
					label,
					target
			},
			leftButton {
				id,
					href,
					label,
					target
			},
			rightButton {
				id,
					href,
					label,
					target
			}
		}
	}}
`


function SiteHeader() {
	const { loading, error, data } = useQuery(QUERY);

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	console.log(data)

	return (
		<div className="header">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<Link to={`${data.global.navigation.leftButton.href}`} target={`${data.global.navigation.leftButton.target}`} className="navbar-brand" >
						{data.global.navigation.leftButton.label}
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
							aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav m-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to={`${data.global.navigation.links[0].href}`} target={`${data.global.navigation.links[0].target}`} className="nav-link active">{data.global.navigation.links[0].label}</Link>
							</li>
						</ul>
						<div className="d-flex">
								<Link to={`${data.global.navigation.rightButton.href}`} target={`${data.global.navigation.rightButton.target}`}>
									{data.global.navigation.rightButton.label}
								</Link>
						</div>
					</div>
				</div>
			</nav>
			{/*<nav>*/}
			{/*	<Link to={`${data.global.navigation.links[0].label}`} target={`${data.global.navigation.links[0].target}`}>{data.global.navigation.links[0].label}</Link>*/}
			{/*</nav>*/}
			{/*<Link to="/"><h1>Strapi React</h1></Link>*/}
			{/*<nav className="categories">*/}
			{/*	<span>Filtrer par catégorie:</span>*/}
			{/*	{data.categories.map(category => (*/}
			{/*		<Link key={category.id} to={`/categories/${category.id}`}>{category.name}</Link>*/}
			{/*	))}*/}
			{/*</nav>*/}
		</div>
	);
}

export default SiteHeader;

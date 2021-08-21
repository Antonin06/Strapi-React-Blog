import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
	query Getcategories {
		categories {
			name,
			id
		}
	}
`

const GLOBAL = gql`
query GetGlobal {
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
	}
}
`

function SiteHeader() {
	const { loading, error, data } = useQuery(CATEGORIES);
	const { loading: loadingGlobal, error: errorGlobal, data: dataGlobal } = useQuery(GLOBAL);


	if (loading && loadingGlobal) return <p>Loading...</p>
	if (error && dataGlobal) return <p>Error :(</p>
	console.log(data)
	console.log(dataGlobal)

	return (
		<div className="site-header">
			<nav>
				<Link to={`${dataGlobal.global.navigation.links[0].href}`}>{dataGlobal.global.navigation.links[0].label}</Link>
			</nav>
			<Link to="/"><h1>Strapi React</h1></Link>
			<nav className="categories">
				<span>Filtrer par catégorie:</span>
				{data.categories.map(category => (
					<Link key={category.id} to={`/categories/${category.id}`}>{category.name}</Link>
				))}
			</nav>
		</div>
	);
}

export default SiteHeader;

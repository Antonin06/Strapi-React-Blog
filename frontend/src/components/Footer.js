import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const FOOTER = gql`
	query FOOTER {
		global {
      		id,
			footer {
			logo {
			 	url
			},
        	address,
			links_1 {
			  id,
			  href,
			  label,
			  target
			},
			links_2 {
			  id,
			  href,
			  label,
			  target
			}
      	}
    }
}
`

function Footer() {

	const { loading, error, data } = useQuery(FOOTER);

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>

	console.log(data, "FOOTER")

	return (
		<section id="footer" className="bg-light">
			<div className="container" id="footer">
				<div className="row">
					<div className="col-3">
						<img src={`http://localhost:1337${data.global.footer.logo.url}`} alt="" className="img-fluid" />
					</div>
					<div className="col-3">
						<p>{data.global.footer.address}</p>
					</div>
					<div className="col-3">
						<ul>
							{data.global.footer.links_1.map(link => (
								<li>
									<Link to={`${link.href}`}>{link.label}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="col-3">
						<ul>
							{data.global.footer.links_2.map(link => (
								<li>
									<Link to={`${link.href}`}>{link.label}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;

import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'
import { config, library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

library.add(faGithub, faInstagram, faLinkedin)
config.familyPrefix = "fa"

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap.bundle");
	}, []);

	const [isAppEnabled, setAppEnabled] = useState(false);

	useEffect(() => {
		const isAppEnabled = process.env.NEXT_PUBLIC_APP_ENABLED === 'true';
		setAppEnabled(isAppEnabled);
	}, []);

	if (!isAppEnabled) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
				<h1>Under Maintenance</h1><br />
				<p>Check back later</p>
			</div>
		);
	}

	return <>
		<Head>
			<title>KMIT Astra - Attendance Tracker </title>
			<meta name='description' content='An application to track your attendance for KMITians without Netra or Sanjaya' />
			<meta property="og:image" content="/logo.png" />
		</Head>
		<Script src="sweetalert2/sweetalert2.min.js"></Script>
		<Link href="/" >
			<a style={{textDecoration: 'none'}}>
				<div className="mb-2 py-2 d-flex justify-content-center header">
					<img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
					<h2 className='mt-2 ms-1'>KMIT Astra</h2>
				</div>
			</a>
		</Link>
		<Component {...pageProps} />
		{/* <footer className="footer-distributed mt-4">
			<div className="footer-right">
				<a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sai-krishna-karnati/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
				<a target="_blank" rel="noreferrer" href="https://github.com/saikrishna7004/"><FontAwesomeIcon icon={faGithub} /></a>
				<a target="_blank" rel="noreferrer" href="https://www.instagram.com/saikrishna7004/"><FontAwesomeIcon icon={faInstagram} /></a>
			</div>
			<div className="footer-left">
				<p className="footer-links">
					<a className="link-1" target="_blank" rel="noreferrer" href="https://saikrishna.epizy.com/mysites/">My Sites</a>
				</p>
				<p>Karnati Sai Krishna &copy; 2022</p>
			</div>
		</footer> */}
	</>
}

export default MyApp

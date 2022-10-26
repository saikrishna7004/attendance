import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'
import { config, library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faInstagram, faLinkedin)
config.familyPrefix = "fa"

function MyApp({ Component, pageProps }) {
	return <>
		<Head>
			<title>KMIT Astra - Attendance Tracker </title>
			<meta name='description' content='An application to track your attendance for KMITians without Netra or Sanjaya' />
			<meta property="og:image" content="/logo.png" />
		</Head>
		<Script src="sweetalert2/sweetalert2.min.js"></Script>
		<div style={{ background: 'rgb(230, 230, 230)' }} className="mb-2 py-2 d-flex justify-content-center">
			<img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
			<h2 className='mt-2 ms-1'>KMIT Astra</h2>
		</div>
		<Component {...pageProps} />
		<footer className="footer-distributed mt-4">
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
		</footer>
	</>
}

export default MyApp

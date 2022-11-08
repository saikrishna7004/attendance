import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'

export default function Offline(props) {

	return (
		<>	
			<Head>
				<title>Offline - KMIT Astra</title>
			</Head>
			<div className='container mx-auto'>
				You are offline. Please connect to internet to resume services.
			</div>
		</>
	)
	
}

import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { config, library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import cookie from 'js-cookie'
import ContentLoader, { Facebook } from 'react-content-loader'
import Link from 'next/link'
import axios from 'axios'

library.add(faCircle, faCircleCheck, faCircleXmark)
config.familyPrefix = "far"

function Circle({ num }) {
	if (num == '2') return <FontAwesomeIcon icon={faCircle} />
	else if (num == '1') return <FontAwesomeIcon icon={faCircleCheck} color={'green'} />
	else if (num == '0') return <FontAwesomeIcon icon={faCircleXmark} color={'red'} />
}

function DayAtt({ day }) {
	return <>
		<Circle num={day.session1} key={1} /><Circle num={day.session2} key={2} /><Circle num={day.session3} key={3} /><Circle num={day.session4} key={4} /><Circle num={day.session5} key={5} /><Circle num={day.session6} key={6} /><Circle num={day.session7} key={7} />
	</>
}

const Details = (d) => {
	// console.log(d)
	if (d.data.error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		})
		return <></>
	}
	return <div className="d-flex flex-md-row flex-column-reverse my-2">
		<div className="col-md-2">
			<img style={{ height: '100px' }} src={!(d.data.picture == 'http://teleuniv.in/sanjaya/student-images/') ? 'https://images.weserv.nl/?url=' + d.data.picture : 'https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3-800x800.png'} />
		</div>
		<div className="col-md-9">
			<h2>{d.data.firstname}</h2>
			<p style={{ marginBottom: '5px' }}>{d.data.hallticketno}</p>
			<p>Year {d.data.currentyear} {d.data.dept} {d.data.section}</p>
		</div>
	</div>
}

const Attendance = (d) => {
	// console.log(d)
	if (d.data.error || !d.data.overallattperformance) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		})
		return <></>
	}
	return <div className="my-2">
		<div className="my-2"><meter low="60" optimum="90" high="75" min="0" max="100" value={d.data.overallattperformance.totalpercentage} style={{ width: '100%', color: d.data.overallattperformance.colorcode }}></meter></div>
		<div className="my-2">Overall Attendance: <span style={{ color: d.data.overallattperformance.colorcode }}>{(d.data.overallattperformance.totalpercentage == null) ? 0 : d.data.overallattperformance.totalpercentage}%</span></div>
		<h3>Today</h3>
		<div className="d-flex justify-content-md-start justify-content-between">
			<span className="col-4 col-md-2">Today</span>
			<span className="col-7"><DayAtt day={d.data.attandance.dayobjects[0].sessions} /></span>
		</div>
		<h3 className="my-3">Last 2 Weeks</h3>
		<table className="my-3" style={{width: '100%'}}>
			<tbody>
				<tr>
					<td style={{textAlign: 'right'}}><Circle num='1' /></td>
					<td>{d.data.attandance.twoweeksessions.present}</td>
					<td style={{textAlign: 'right'}}><Circle num='0' /></td>
					<td>{d.data.attandance.twoweeksessions.absent}</td>
					<td style={{textAlign: 'right'}}><Circle num='2' /></td>
					<td>{d.data.attandance.twoweeksessions.nosessions}</td>
				</tr>
			</tbody>
		</table>
		{

		}
		{
			d.data.attandance.dayobjects.map((e, i) => {
				if (i == 0) return <div key={i}></div>
				return <div className="d-flex justify-content-md-start justify-content-between" key={i}><span className="col-4 col-md-2">{e.date}</span><span className="col-7"><DayAtt day={e.sessions} /></span></div>
			})
		}
		{(d.data.attandance.dayobjects.length <= 1) && "No records"}
		<h3 className="my-3">Subject Wise</h3>
		{d.data.overallattperformance.overall.length > 0 ? <table className="table table-hover container my-3">
			<thead>
				<tr>
					<th scope="col">Subject</th>
					<th scope="col">Percentage</th>
				</tr>
			</thead>
			<tbody id="subject_wise_att">
				{
					d.data.overallattperformance.overall.map((e, i) => {
						return <tr key={i}>
							<td>{e.subjectname}</td>
							<td style={{ color: (e.colorcode1 ? e.colorcode1 : e.colorcode2) }}>{(e.percentage != '--') ? e.percentage : e.practical}</td>
						</tr>
					})
				}
				<tr key={100}>
					<td><b>Overall</b></td>
					<td style={{ color: d.data.overallattperformance.colorcode }}>{d.data.overallattperformance.totalpercentage}</td>
				</tr>
			</tbody>
		</table> : 'No records found'}
	</div>
}

const Card = (p) => {
	return p.loading ? <div className="info my-4 p-3 rounded-4 border border-secondary border-opacity-75" style={{ boxShadow: '1px 2px 3px 4px rgb(12 12 12 / 20%)', maxWidth: '700px' }}>
		<ContentLoader />
	</div> : (p.data && p.attData && <div className="info my-4 p-3 rounded-4 border border-secondary border-opacity-75" style={{ boxShadow: '1px 2px 3px 4px rgb(12 12 12 / 20%)', maxWidth: '700px' }}>
		{p.data && p.data.hallticketno && <Details data={p.data} />}
		{p.attData && <Attendance data={p.attData} />}
	</div>)
}

const Loading = () => {
	return <div className="card-image">
		<div className="load-wraper">
			<div className="activity"></div>
		</div>
	</div>

}

export default function Home(props) {
	const [roll, setRoll] = useState(props.attendanceRollno ? props.attendanceRollno : 0)
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [attData, setAttData] = useState(null)
	useEffect(() => {
		new Swal('I am Back', '<b>KMIT ASTRA 1.0</b> is back with a bang. But don\'t bang this site with requests. Give a delay before your next request.', 'info').then(res=>{
			console.log(res)
			function getCookie(cname) {
				let name = cname + "=";
				let decodedCookie = decodeURIComponent(document.cookie);
				let ca = decodedCookie.split(';');
				for (let i = 0; i < ca.length; i++) {
					let c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			}
			let c = getCookie('attendance-rollno')
			if (c) {
				setRoll(c.toUpperCase())
				getAttendance()
			}
		})
	}, [])

	const handleInputChange = (e) => {
		setRoll(e.target.value.toUpperCase().trim())
	}

	async function getAttendance() {
		if (!roll) return Swal.fire({
			icon: 'error',
			title: 'Roll No. Empty',
			text: 'Roll No. cannot be empty',
		})

		setLoading(true)
		let myRoll = null

		if(roll.toString().length!==7 && roll.toString().includes("BD")){
			try {
				let rollData = await fetch("/api/rollno", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					body: JSON.stringify({
						"rollno": roll
					})
				})
				let data = await rollData.json()
				if (data.error) return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				})
				else {
					// console.log(data)
					myRoll = data.rollno
				}
			} catch (error) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				})
			}
		}

        try {
            var result = await fetch("/teleapi/netra/api.php", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"method": "32",
					"rollno": myRoll?myRoll:roll
				})
			})
            var data = await result.json()
            // console.log(data)
            setLoading(false)
			if (data.error) return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			})
			else if (!data.hallticketno) {
				setData(null)
				setAttData(null)
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Incorrect Roll No.',
				})
			}
			else {
				// console.log(data)
				setData(data)
			}
        } catch (error) {
            // console.log(error);
			setLoading(false)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			})
        }

        try {
            var result = await fetch("/teleapi/netra/api.php", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"method": "314",
					"rollno": myRoll?myRoll:roll
				})
			})
			console.log(result)
            var data = await result.json()
            console.log(data)
            setLoading(false)
			if (data.error) return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			})
			else {
				// console.log(data)
				setAttData(data)
			}
        } catch (error) {
            // console.log(error);
			setLoading(false)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			})
        }
	}

	return (
		<>
			<div className="container">
				<div className="mb-3 mt-1 d-flex" style={{ flexFlow: 'wrap' }}>
					<label htmlFor="rollno" className="form-label col-auto mt-3 me-2">Roll No.</label>
					<input type="text" onChange={handleInputChange} style={{ textTransform: 'capitalize' }} className="form-control w-auto col-auto me-2 mt-2" id="rollno" name="rollno" placeholder="Roll No." value={roll} onKeyUp={(event) => { if (event.keyCode == 13) { getAttendance() } }} />
					<button className="btn btn-primary me-2 mt-2" style={{ marginBottom: '1px' }} onClick={getAttendance}>Fetch</button>
					<button className="btn btn-primary me-2 mt-2" style={{ marginBottom: '1px' }} onClick={() => { cookie.set('attendance-rollno', roll, { expires: 300 }); new Swal('Successfully Saved', 'Your Roll No. has been saved successfully in your browser. You need not enter your Roll No. next time.', 'success') }}>Remember Me</button>
					<Link href='/feedback'><a className="btn btn-primary me-2 mt-2">Feedback</a></Link>
				</div>
				<Card data={data} attData={attData} loading={loading} />
				Add your Roll No. <Link href='/netra'><a>Here</a></Link> if your Roll No. is not there
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	console.log(context.req.cookies['attendance-rollno'])
	let a = context.req.cookies['attendance-rollno'] ? context.req.cookies['attendance-rollno'] : null
	return {
		props: { attendanceRollno: a }, // will be passed to the page component as props
	}
}
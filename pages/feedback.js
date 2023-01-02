import Head from 'next/head'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

const Feedback = () => {
	const [info, setInfo] = useState({
        rollno: "",
        feedback: "",
        name: "",
        phone: ""
    })
	const handleInputChange = (e) => {
        if(e.target.name=='rollno') e.target.value=e.target.value.toUpperCase().trim()
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        })
	}

    const handleSubmit = () => {
        console.log(info)
        if(!info.rollno || !info.feedback || !info.name || !info.phone){
            return Swal.fire({
                icon: 'error',
                title: 'Empty Field',
                text: 'Check whether any Field is empty or not',
            })
        }
        // console.log(info)
		fetch("/api/feedback", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
                ...info
			})
		}).then((res) => res.json()).then((data) => {
            // console.log(data)
			if(data.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
			else {
				console.log(data)
                return Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your Feeback was recieved. Thank you!',
                })
			}
		}).catch((e)=>{
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			})
		})
    }
    
    return (
        <>
            <Script src="sweetalert2/sweetalert2.min.js"></Script>
            <div className="container">
				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="rollno" className="form-label col-auto col-sm-2 mt-3 me-2">Roll No.</label>
					<input type="text" onChange={handleInputChange} style={{textTransform: 'capitalize'}} className="form-control w-auto col-sm-6 me-2 mt-2" id="rollno" name="rollno" placeholder="Roll No." value={info.rollno} onKeyUp={(event)=>{if (event.keyCode == 13) {handleSubmit()}}} />
				</div>

				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="name" className="form-label col-auto col-sm-2 mt-3 me-2">Your Name</label>
					<input type="text" onChange={handleInputChange} style={{textTransform: 'capitalize'}} className="form-control w-auto col-sm-6 me-2 mt-2" id="name" name="name" placeholder="Name" value={info.name} onKeyUp={(event)=>{if (event.keyCode == 13) {handleSubmit()}}} />
				</div>

				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="phone" className="form-label col-auto col-sm-2 mt-3 me-2">Phone No.</label>
					<input type="number" minLength={9} onChange={handleInputChange} className="form-control w-auto col-sm-6 me-2 mt-2" id="phone" name="phone" placeholder="Phone Number" value={info.phone} onKeyUp={(event)=>{if (event.keyCode == 13) {handleSubmit()}}} />
				</div>
                
				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="feedback" className="form-label col-auto col-sm-2 mt-3 me-2">Feedback</label>
					<textarea onChange={handleInputChange} className="form-control w-auto col-sm-6 col-auto me-2 mt-2" rows={4} id="feedack" name="feedback" placeholder="Enter your Feedback here" value={info.feedback} onKeyUp={(event)=>{if (event.keyCode == 13) {handleSubmit()}}} />
				</div>

                <button className="btn btn-primary me-2 my-2" style={{marginBottom: '1px'}} onClick={handleSubmit}>Submit</button>
                <div className="mb-3 mt-1 d-sm-flex">
                    <Link href='/'><a>Go Back</a></Link>
                </div>
			</div>
        </>
    )
}

export default Feedback

import Head from 'next/head'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

const Netra = () => {
	const [info, setInfo] = useState({
        rollno: "",
        netra: "",
        class: "",
        section: "",
        year: ""
    })
	const [sectionList, setSectionList] = useState([{value: '', text: '--Select--'}])

	const handleInputChange = (e) => {
        if(e.target.name=='rollno') e.target.value=e.target.value.toUpperCase()
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        })
        if(e.target.name=="class") {
            let a = e.target.value
            if(a=='CSE') setSectionList([
                {value: '', text: '--Select--'},
                {value: 'A', text: 'A'},
                {value: 'B', text: 'B'},
                {value: 'C', text: 'C'},
                {value: 'D', text: 'D'},
                {value: 'E', text: 'E'},
                {value: 'F', text: 'F'},
                {value: 'G', text: 'G'},
            ])
            else if(a=='CSM') setSectionList([
                {value: '', text: '--Select--'},
                {value: 'A', text: 'A'},
                {value: 'B', text: 'B'},
                {value: 'C', text: 'C'},
            ])
            else if(a=='CSD') setSectionList([
                {value: '', text: '--Select--'},
                {value: 'A', text: 'A'},
            ])
            else if(a=='IT') setSectionList([
                {value: '', text: '--Select--'},
                {value: 'A', text: 'A'},
                {value: 'B', text: 'B'},
            ])
            else setSectionList([
                {value: '', text: '--Select--'},
            ])
        }
	}

    const handleSubmit = () => {
        if(!info.rollno || !info.netra || !info.class || !info.section || !info.section || !info.year ){
            return Swal.fire({
                icon: 'error',
                title: 'Empty Field',
                text: 'Check whether any Field is empty or not',
            })
        }
        // console.log(info)
		fetch("/api/netra", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
                ...info
			})
		}).then((res) => res.json()).then((data) => {
            // console.log(data)
			if(data.error && data.error.code==11000) {
                let a
                if(data.error.keyValue.rollno) a = "Roll No.";
                else if(data.error.keyValue.netra) a = "Netra ID";
                return Swal.fire({
                    icon: 'error',
                    title: 'Already Exists',
                    text: 'The entered '+a+' already exists',
                })
            }
			else if(data.error) return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			})
            else if(data.netra) return Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'Roll No. added Successfully',
			})
			else {
				console.log(data)
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
					<label htmlFor="netra" className="form-label col-auto col-sm-2 mt-3 me-2">Netra ID</label>
					<input type="number" onChange={handleInputChange} className="form-control w-auto col-sm-6 me-2 mt-2" id="netra" name="netra" placeholder="Netra ID" value={info.netra} onKeyUp={(event)=>{if (event.keyCode == 13) {handleSubmit()}}} />
				</div>
				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="year" className="form-label col-2 mt-3 me-2">Year</label>
                    <select value={info.year} onChange={handleInputChange} id="year" name="year" className="form-select w-auto" aria-label="Default select example">
                        <option value="">--Select--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
				</div>
				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="class" className="form-label col-2 mt-3 me-2">Branch</label>
                    <select value={info.class} onChange={handleInputChange} id="class" name="class" className="form-select w-auto" aria-label="Default select example">
                        <option value="">--Select--</option>
                        <option value="CSE">CSE</option>
                        <option value="CSM">CSM</option>
                        <option value="CSD">CSD</option>
                        <option value="IT">IT</option>
                    </select>
				</div>
				<div className="mb-3 mt-1 d-sm-flex">
					<label htmlFor="section" className="form-label col-2 mt-3 me-2">Section</label>
                    <select value={info.section} onChange={handleInputChange} id="section" name="section" className="form-select w-auto" aria-label="Default select example">
                        {sectionList.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
				</div>
                <button className="btn btn-primary me-2 my-2" style={{marginBottom: '1px'}} onClick={handleSubmit}>Submit</button>
                <div className="mb-3 mt-1 d-sm-flex">
                    <Link href='/'><a>Go Back</a></Link>
                </div>
			</div>
        </>
    )
}

export default Netra

import React, { useState, useEffect } from 'react';

const Face = () => {
    const [roll, setRoll] = useState([]);
    const [formData, setFormData] = useState({
        year: '21',
        entryType: '1A',
        branchCode: '05',
        section: '--'
    });

    const { year, entryType, branchCode, section } = formData;

    useEffect(() => {
        const generatedRolls = [];
        if(section=='--') return;

        const validLastCharacters = "0123456789ABCDEFGHJKLMNPQRTUVWXYZ"; // Excluding I, O, S
        const validLastCharacters2 = "0123456789";

        const getNextCharacter = (char) => {
            let chars = validLastCharacters
            if(branchCode=='67' || branchCode=='12'){
                chars = validLastCharacters2
            }
            const index = chars.indexOf(char);
            if (index === chars.length - 1) {
                return chars[0];
            } else {
                return chars[index + 1];
            }
        };

        const getSectionStart = (section) => {
            if(branchCode=='05' || branchCode=='66'){
                switch (section) {
                    case 'A':
                        return '01';
                    case 'B':
                        return '21';
                    case 'C':
                        return '41';
                    case 'D':
                        return '61';
                    case 'E':
                        return '81';
                    case 'F':
                        return 'A1';
                    case 'G':
                        return 'C1';
                    default:
                        return '01';
                }
            }
            else{
                switch (section) {
                    case 'A':
                        return '01';
                    case 'B':
                        return '65';
                }
            }
        };

        let currentRollNo = getSectionStart(section);

        for (let i = 0; i < 64; i++) {
            const rollNumber = `${year}BD${entryType}${branchCode}${currentRollNo}`;
            generatedRolls.push(rollNumber);

            // Update roll number
            if(branchCode=='05' || branchCode=='66'){
                if (currentRollNo[1] === 'Z') {
                    currentRollNo = (getNextCharacter(currentRollNo[1]) === '1'
                        ? getNextCharacter(currentRollNo[0])
                        : currentRollNo[0]) + getNextCharacter(currentRollNo[1]);
                }
                currentRollNo = (getNextCharacter(currentRollNo[1]) === '1'
                    ? getNextCharacter(currentRollNo[0])
                    : currentRollNo[0]) + getNextCharacter(currentRollNo[1]);
            }
            else{
                currentRollNo = (getNextCharacter(currentRollNo[1]) === '0'
                    ? getNextCharacter(currentRollNo[0])
                    : currentRollNo[0]) + getNextCharacter(currentRollNo[1]);
            }
        }
        setRoll(generatedRolls);
    }, [formData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const sectionOptions = {
        '05': ['--', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
        '66': ['--', 'A', 'B', 'C'],
        '12': ['--', 'A', 'B'],
        '67': ['--', 'A']
    };    
    const branchOptions = {'CSE': '05', 'CSM': '66', 'IT': '12', 'CSD': '67'};

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <label>Year:</label>
                    <input type="text" className="form-control" name="year" value={year} onChange={handleInputChange} />
                </div>
                <div className="col-md-3">
                    <label>Entry Type:</label>
                    <input type="text" className="form-control" name="entryType" value={entryType} onChange={handleInputChange} />
                </div>
                <div className="col-md-3">
                    <label>Branch Code:</label>
                    <select className="form-control" name="branchCode" value={branchCode} onChange={handleInputChange}>
                        {Object.keys(branchOptions).map((branch) => (
                            <option key={branchOptions[branch]} value={branchOptions[branch]}>
                                {branch}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label>Section:</label>
                    <select className="form-control" name="section" value={section} onChange={handleInputChange}>
                        {sectionOptions[branchCode]?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row mt-3">
                {roll.map((e, i) => (
                    <div className="col-md-3" key={i}>
                        <img style={{ height: '300px', display: 'inline' }} src={`https://images.weserv.nl/?url=teleuniv.in/sanjaya/student-images/${e}.jpg`} alt={e} /><br/>
                        {e}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Face;

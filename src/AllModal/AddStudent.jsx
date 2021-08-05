import React, { useState, useEffect } from 'react'
import './addStudent.css'
import { Button } from '@material-ui/core'
import Notifications, { notify } from 'react-notify-toast';

function AddStudent({ setData, setLength }) {

    const notification = (data) => {
        let myColor = { background: '#5CE0D2', text: "black" };
        notify.show(data, "custom", 2000, myColor);
    }


    const closeModal = () => {

        var closeModal = document.getElementsByClassName('addStudent')[0];
        closeModal.style.top = "-97%";
    }
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [classOptions, setClassOptions] = useState([])
    const [classes, setClass] = useState("")
    const [sectionses, setSectiones] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [branch, setBranch] = useState("")





    let schoolId = "61064e25ac909b0015cfc04c"
    let [section, setSection] = useState([])

    const addStudent = () => {

        console.log(classes, sectionses)
        if (!name || !email || !password || !contact || classes == "Class" || sectionses == "Section") {
            notification("Pls Add All fields")
            return;
        }

        notification("hold on 1s")


        let obj = {
            schoolId,
            name,
            email,
            "grade": classes,
            "section": sectionses,
            password,
            contact,
            expiryDate,


        }
        console.log(obj)
        fetch(`https://api2xcell.herokuapp.com/api/v1/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.status == "success")
                    notification("success fully added")
                else {
                    notification("validation failed")

                }
                const schoolId = "61064e25ac909b0015cfc04c"
                fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c&page=1&limit=10`)
                    .then((res) => res.json())
                    .then((data) => {

                        setData(data.data.students)


                    })
                fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c`)
                    .then((res) => res.json())
                    .then((data) => {

                        setLength(data.results)
                    })
                closeModal()
            }).catch(err => {

                notification("error in addding")

            })
    }

    const setSubjectsAndSection = (grade) => {

        var gradesArray = JSON.parse(localStorage.getItem("allOptions"))
        console.log(gradesArray, grade)
        for (var i = 0; i < gradesArray.length; i++) {
            if (grade === gradesArray[i].grade) {

                var length, allOptions = [];

                length = gradesArray[i].sections.length
                allOptions = []
                for (var j = 0; j < length; j++) {
                    const obj = {
                        value: gradesArray[i].sections[j]._id,
                        label: gradesArray[i].sections[j].section
                    }
                    allOptions.push(obj)

                }
                console.log(allOptions)
                setSection(allOptions)

                break;

            }

            //for loop
        }

    }



    useEffect(() => {




        const schoolId = "61064e25ac909b0015cfc04c"

        fetch(`https://api2xcell.herokuapp.com/api/v1/schools/61064e25ac909b0015cfc04c`).then(res => res.json()).then(data => {

            setSchoolName(data.data.school.name)
            setBranch(data.data.school.branch)
            setExpiryDate(data.data.school.expiryDate.split("T")[0])
        })

        fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=${schoolId}&fields=sections,grade,subjects`).then(res => res.json()).then(data => {


            const classesArrays = []
            for (var i = 0; i < data.data.grades.length; i++) {
                classesArrays.push(data.data.grades[i].grade)

            }

            localStorage.setItem("allOptions", JSON.stringify(data.data.grades))

            setClassOptions(classesArrays)//set all class options

        })


    }, [])


    return (
        <div className="addStudent" style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}><h2>ADD Student</h2>
                <h2 style={{ cursor: "pointer" }} onClick={closeModal}>X</h2>
            </div>
            <div className="add_student_form">
                <div className="student_school">
                    <div className="studentName">
                        <label>NAME</label><br></br>
                        <input value={name} type="text" placeholder="Enter student name" onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="schoolName">
                        <label>School Name</label><br></br>
                        <input type="text" disabled placeholder="Enter school name" value={schoolName} style={{ marginLeft: '5px', width: "96%" }}></input>
                    </div>
                </div>
                <div className="class_email">
                    <div className="classstudent" style={{ marginTop: '5px' }}>
                        <label>Class</label><br></br>
                        <select onChange={(e) => {
                            setSubjectsAndSection(e.target.value)
                            setClass(e.target.value)
                        }}>
                            <option>Class</option>
                            {classOptions.map((item) => {
                                return (
                                    <>
                                        <option value={item}>{item}</option>
                                    </>
                                )
                            })}

                        </select>

                    </div>
                    <div className="emailstudent" >
                        <label>Section</label>
                        <select style={{ height: "27px" }} onChange={(e) => { setSectiones(e.target.value) }}>
                            <option>Section</option>
                            {section.map((item) => {
                                return (
                                    <>
                                        <option value={item.value}>{item.label}</option>
                                    </>
                                )
                            })}

                        </select>
                    </div>

                </div>
                <div className="branch_password" style={{ marginBottom: "5px" }}>
                    <div className="branch">
                        <label>branch</label><br></br>
                        <input value={branch} disabled></input>
                    </div>
                    <div className="password">
                        <label>Password</label><br></br>
                        <input value={password} type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>
                </div>



                <div className="contact_signup" >
                    <div className="contactstudent" style={{ marginTop: '6px' }}>
                        <label>Contact</label><br></br>
                        <input value={contact} type="number" placeholder="Enter contact" onChange={(e) => { setContact(e.target.value) }}></input>

                    </div>
                    <div className="emailstudent" style={{ marginLeft: '5px' }}>
                        <label>Email</label>
                        <input style={{ width: "101%", height: "24px" }} value={email} type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>

                </div>
                <div className="expiryClass" style={{ width: "100%" }} >

                    &nbsp; <label>Expiry Date</label><br></br>
                    <input value={expiryDate} style={{ width: "101%", marginTop: "6px", marginBottom: "10px" }} type="date" disabled></input>
                </div>


                <div class="add-student-btn">
                    <div class="createBtn">
                        <button onClick={() => {
                            setName("")
                            setEmail("")
                            setContact("")
                            setPassword("")
                            setExpiryDate("")
                        }} >
                            Clear All
                        </button>
                    </div>
                    <div class="cancelBtn" onClick={() => { addStudent() }}>
                        <button >
                            Add
                        </button>
                    </div>


                </div>

            </div>
            <Notifications options={{ zIndex: 200, top: '50px' }} />
        </div>
    )
}

export default AddStudent

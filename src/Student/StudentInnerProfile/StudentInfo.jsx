import React, { useState, useEffect } from 'react'
import './student.css'
function StudentInfo() {


    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [school, setSchool] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [signUpDate, setSignUpDate] = useState("")
    const [classOptions, setClassOptions] = useState([])
    const [studentClass, setStudentClass] = useState('')
    const [studentSection, setStudentSection] = useState('')
    const [allSection, setAllSection] = useState([])
    const [sectionToShow, setSectionToShow] = useState("")
    const [classToShow, setClassToShow] = useState("")
    const handleEdit = () => {



        document.getElementsByClassName("name")[0].disabled = false
        document.getElementsByClassName("email")[0].disabled = false
        document.getElementsByClassName("contact")[0].disabled = false
        document.getElementsByClassName("studentSection")[0].disabled = false
        document.getElementsByClassName("studentClass")[0].disabled = false
        document.getElementsByClassName("expiryDate")[0].disabled = false

    }

    //saveDetails
    const saveDetails = () => {

        if (document.getElementsByClassName("name")[0].disabled) {
            return;

        }

        const obj = {
            name,
            email,
            contact,
            expiryDate,
            "grade": studentClass,
            "section": studentSection

        }
        console.log(obj)

        const studentId = localStorage.getItem("studentId")

        fetch(`https://api2xcell.herokuapp.com/api/v1/students/${studentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(data => {
            console.log(data)

            fetch(`https://api2xcell.herokuapp.com/api/v1/students/${studentId}`).then(res => res.json()).then(data => {


                setName(data.data.student.name)
                setEmail(data.data.student.email)
                setContact(data.data.student.contact)
                setExpiryDate(data.data.student.expiryDate.split('T')[0])
                setSectionToShow(data.data.student.section)
                setClassToShow(data.data.student.grade)

                document.getElementsByClassName("name")[0].disabled = true
                document.getElementsByClassName("email")[0].disabled = true
                document.getElementsByClassName("contact")[0].disabled = true
                document.getElementsByClassName("studentSection")[0].disabled = true
                document.getElementsByClassName("studentClass")[0].disabled = true

                document.getElementsByClassName("expiryDate")[0].disabled = true




            })


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
                setAllSection(allOptions)

                break;

            }

            //for loop
        }

    }





    useEffect(() => {

        const studentId = localStorage.getItem("studentId")
        fetch(`https://api2xcell.herokuapp.com/api/v1/students/${studentId}`).then(res => res.json()).then(data => {

            console.log(studentId, data)
            setName(data.data.student.name)
            setEmail(data.data.student.email)
            setContact(data.data.student.contact)

            setExpiryDate(data.data.student.expiryDate.split('T')[0])
            setSignUpDate(data.data.student.signUpDate.split('T')[0])
            setSectionToShow(data.data.student.section)
            console.log(data.data.student.section)
            setClassToShow(data.data.student.grade)

            document.getElementsByClassName("name")[0].disabled = true
            document.getElementsByClassName("email")[0].disabled = true
            document.getElementsByClassName("contact")[0].disabled = true


            document.getElementsByClassName("studentSection")[0].disabled = true
            document.getElementsByClassName("studentClass")[0].disabled = true




        })

        const schoolId = localStorage.getItem("schoolsId")
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
        <>
            <div id="studentInfo" className="Student_right_side_bottom_right_info VerticalTabs">
                <div className="rightSchoolDetails">
                    <div className="rightSchoolDetails-upper">
                        <div className="rightSchoolDetails-upper-left">
                            <label>Name</label>
                            <input value={name} className="name" onChange={(e) => {
                                console.log(name)
                                setName(e.target.value)
                            }} placeholder="prateek Gupta" ></input>
                        </div>
                        <div className="rightSchoolDetails-upper-right">
                            <div >
                                <label>Class</label>
                                <select onChange={(e) => {
                                    setSubjectsAndSection(e.target.value)
                                    setStudentClass(e.target.value)
                                }} className="studentClass">
                                    <option >Select Class</option>
                                    {classOptions.map((item) => {
                                        console.log(classOptions)
                                        return (
                                            <>
                                                <option value={item} >
                                                    {item}
                                                </option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label>Sections</label>
                                <select className="studentSection" onChange={(e) => { setStudentSection(e.target.value) }}>
                                    <option selected>Select Section</option>
                                    {allSection.map((item) => {
                                        console.log(item)
                                        return (
                                            <>
                                                <option value={item.label} selected>
                                                    {item.label}
                                                </option>
                                            </>
                                        )
                                    })}
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="rightSchoolDetails-lower">
                        <div className="rightSchoolDetails-lower-left">
                            <label> Email</label>
                            <input className="email" value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>

                        </div>
                        <div className="rightSchoolDetails-lower-right">
                            <label> Contact</label>
                            <input className="contact" value={contact} onChange={(e) => { setContact(e.target.value) }}></input>
                        </div>
                    </div>
                    <div className="rightSchoolDetails-lower" style={{ marginTop: "30px" }}>
                        <div className="rightSchoolDetails-lower-left">
                            <label>Expiry Date</label>
                            <input type="date" className="contact expiryDate" value={expiryDate} onChange={(e) => { setExpiryDate(e.target.value) }}></input>

                        </div>
                        <div className="rightSchoolDetails-lower-right">
                            <label>SignUp Date</label>
                            <input type="date" className="signUpDate" value={signUpDate} onChange={(e) => { setSignUpDate(e.target.value) }} disabled ></input>
                        </div>
                    </div>
                    <div className="rightSchoolDetails-lower" style={{ marginTop: "30px" }}>
                        <div className="rightSchoolDetails-lower-left">
                            <label>Student Section</label>
                            <input className="contact expiryDate" value={sectionToShow} disabled></input>

                        </div>
                        <div className="rightSchoolDetails-lower-right">
                            <label>Student Class</label>
                            <input className="signUpDate" value={classToShow} disabled ></input>
                        </div>
                    </div>
                </div>

                <div className="edit_save_button" style={{ marginTop: "60px", marginBottom: "100px" }}>
                    <div className="edit_button">
                        <button onClick={() => { handleEdit() }}> Edit</button>
                    </div>
                    <div className="save_button" onClick={() => {

                        saveDetails()

                    }}>
                        <button>Save </button>
                    </div>

                </div>


            </div>



        </>
    )
}

export default StudentInfo

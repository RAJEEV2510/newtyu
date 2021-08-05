import React, { useState, useEffect } from 'react'
import './teachers.css'
function TeacherInfo() {

    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [school, setSchool] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [role, setRole] = useState("")
    const [signUpDate, setSignUpDate] = useState("")


    const handleEdit = () => {



        document.getElementsByClassName("name")[0].disabled = false
        document.getElementsByClassName("email")[0].disabled = false
        document.getElementsByClassName("contact")[0].disabled = false

        document.getElementsByClassName("rightSchoolDetails-lower-left-role")[0].disabled = false
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
            role
        }
        console.log(obj)

        const staffId = localStorage.getItem("staffId")


        fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(data => {
            console.log(data)

            fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}`).then(res => res.json()).then(data => {

                console.log(staffId, data)
                setName(data.data.staff.name)
                setEmail(data.data.staff.email)
                setContact(data.data.staff.contact)
                setRole(data.data.staff.role)
                setExpiryDate(data.data.staff.expiryDate.split('T')[0])

                document.getElementsByClassName("name")[0].disabled = true
                document.getElementsByClassName("email")[0].disabled = true
                document.getElementsByClassName("contact")[0].disabled = true

                document.getElementsByClassName("rightSchoolDetails-lower-left-role")[0].disabled = true
                document.getElementsByClassName("expiryDate")[0].disabled = true




            })


        })




    }



    useEffect(() => {

        const staffId = localStorage.getItem("staffId")
        fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}`).then(res => res.json()).then(data => {

            console.log(staffId, data)
            setName(data.data.staff.name)
            setEmail(data.data.staff.email)
            setContact(data.data.staff.contact)
            setRole(data.data.staff.role)
            setExpiryDate(data.data.staff.expiryDate.split('T')[0])
            setSignUpDate(data.data.staff.signUpDate.split('T')[0])


            document.getElementsByClassName("name")[0].disabled = true
            document.getElementsByClassName("email")[0].disabled = true
            document.getElementsByClassName("contact")[0].disabled = true

            document.getElementsByClassName("rightSchoolDetails-lower-left-role")[0].disabled = true
            document.getElementsByClassName("expiryDate")[0].disabled = true




        })



    }, [])




    return (
        <div id="teacherInfo" className="teacher_right_side_bottom_right_info VerticalTabs">
            <div className="rightSchoolDetails">
                <div className="rightSchoolDetails-upper">
                    <div className="rightSchoolDetails-upper-left">
                        <label>Name</label>
                        <input className="name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="rightSchoolDetails-upper-righst" style={{ display: "flex", flexDirection: "column", width: "48%", marginTop: "0px", marginBottom: "2px" }}>
                        <label style={{ marginBottom: "2px" }}>SignUp Date</label>
                        <input type="date" value={signUpDate} style={{ width: "100%", border: "1px solid gray", marginTop: "1px", height: "30px" }}></input>
                    </div>
                </div>

                <div className="rightSchoolDetails-lower" style={{ marginBottom: "30px" }}>
                    <div className="rightSchoolDetails-lower-left">
                        <label>Email</label>
                        <input className="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>

                    </div>

                    <div className="rightSchoolDetails-lower-right">
                        <label> Contact</label>
                        <input className="contact" value={contact} onChange={(e) => { setContact(e.target.value) }}></input>
                    </div>
                </div>

                <div className="rightSchoolDetails-lower">
                    <div className="rightSchoolDetails-lower-left">
                        <label>Role</label>
                        <select value={role} className="rightSchoolDetails-lower-left-role" style={{ height: "32px" }} value={role} onChange={(e) => { setRole(e.target.value) }}>

                            {console.log(role)}
                            {role == "teacher" ? <option value="teacher" selected >Teacher</option> : <option value="teacher"  >Teacher</option>}
                            {role == "hod" ? <option value="hod" selected >Hod</option> : <option value="hod"  >Hod</option>}
                            {role == "principal" ? <option value="principal" selected >Principal</option> : <option value="teacher"  >Principal</option>}


                        </select>


                    </div>
                    <div className="rightSchoolDetails-lower-right">
                        <label>Expiry Date</label>
                        <input type="date" className="contact expiryDate" value={expiryDate} onChange={(e) => { setExpiryDate(e.target.value) }}></input>
                    </div>
                </div>
            </div>
            <div className="edit_save_button">
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
    )
}

export default TeacherInfo

import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import './addTeacher.css'
import Notifications, { notify } from 'react-notify-toast';
import Box from '@material-ui/core/Box'

function AddTeacher({ setData, setLength, state }) {


    const [sectionOptions, setSectionOptions] = useState([])
    //class Options
    const [classOptions, setClassOptions] = useState([])
    //subject Options
    const [subjectOptions, setSubjectOptions] = useState([])
    const [schoolName, setSchoolName] = useState("")
    const [branch, setBranch] = useState("")

    //notification



    const notification = (data) => {
        let myColor = { background: '#5CE0D2', text: "black" };
        notify.show(data, "custom", 2000, myColor);
    }
    //states for adding staff
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [role, setRole] = useState("")
    const [signupDate, setSignupDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [object, setObject] = useState([])
    const [object1, setObject1] = useState([])


    //school Data
    const [schoolData, setSchoolData] = useState([])

    const modifiedData = () => {



        const subjectsArray = object ? object.map((item) => item.label) : []
        return subjectsArray
    }


    const submitStaffData = () => {

        const length = object1.length



        const data = []
        const subjectsArray = modifiedData()
        for (var j = 0; j < length; j++) {

            var object = {
                "sectionId": object1[j].value,
                "subjects": subjectsArray
            }
            data.push(object)
        }
        console.log(data)




        const obj = {
            schoolId: "61064e25ac909b0015cfc04c",
            name,
            email,
            role,
            contact,
            password,
            expiryDate,
            "sections": data

        }

        console.log(obj)


        if (name === "" || email === "" || password === "" || role === "" || contact === "" || expiryDate === "") {
            notification("please fills all the field")

            return
        }

        fetch(`https://api2xcell.herokuapp.com/api/v1/staffs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then((data) => data.json()).then((res) => {

            console.log(res)
            if (res.error) {
                notification("validation failed")
            }

            else {

                var schoolId = "61064e25ac909b0015cfc04c"
                fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}&page=1&limit=10`).then((data) => data.json()).then((res) => {
                    setData(res.data ? res.data.staffs : [])

                })

                fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}`).then((data) => data.json()).then((res) => {
                    setLength(res.results)

                })


                notification("successfully added")
                closeModal()
            }

        })

    }


    //close Modal
    const closeModal = () => {

        setName("")
        setEmail("")
        setPassword("")
        setContact("")
        setRole("")
        setSignupDate("")
        setExpiryDate("")


        var closeModal = document.getElementsByClassName('addTeacher')[0];
        closeModal.style.top = "-247%";
    }


    const handleChanges = (e) => {

        console.log("object subject", e)
        setObject(e)//subjects


    }
    const handleChanges1 = (e) => {

        setObject1(e) //sections
        console.log("object section", e)

    }


    const customStyles = {
        valueContainer: (provided, state) => ({
            ...provided,
            textOverflow: "ellipsis",
            maxWidth: "90%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            display: "initial"
        })
    };


    const groupStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };
    const groupBadgeStyles = {
        backgroundColor: "#EBECF0",
        borderRadius: "2em",
        color: "#172B4D",
        display: "inline-block",
        fontSize: 12,
        fontWeight: "normal",
        lineHeight: "1",
        minWidth: 1,
        padding: "0.16666666666667em 0.5em",
        textAlign: "center"
    };

    const multiValueContainer = ({ selectProps, data }) => {
        const label = data.label;
        const allSelected = selectProps.value;
        const index = allSelected.findIndex(selected => selected.label === label);
        const isLastSelected = index === allSelected.length - 1;
        const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
        const val = `${label},`;
        return val;
    };
    const formatGroupLabel = data => (
        <div style={groupStyles}>
            <span>{data.label}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    );

    const setSubjectsAndSection = (grade) => {

        var gradesArray = JSON.parse(localStorage.getItem("allOptions"))

        for (var i = 0; i < gradesArray.length; i++) {
            if (grade === gradesArray[i].grade) {

                var length = gradesArray[i].subjects.length
                var allOptions = []
                console.log(gradesArray[i], length)
                for (var j = 0; j < length; j++) {
                    const obj = {
                        value: gradesArray[i].subjects[j].subject,
                        label: gradesArray[i].subjects[j].subject
                    }
                    allOptions.push(obj)

                }
                console.log(allOptions)
                setSubjectOptions(allOptions)


                length = gradesArray[i].sections.length
                allOptions = []
                for (var j = 0; j < length; j++) {
                    const obj = {
                        value: gradesArray[i].sections[j]._id,
                        label: gradesArray[i].sections[j].section
                    }
                    allOptions.push(obj)

                }
                setSectionOptions(allOptions)

                break;

            }

            //for loop
        }

    }



    const SetOtherData = () => {

        var schoolId = "61064e25ac909b0015cfc04c"


        fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=${schoolId}&fields=sections,grade,subjects`).then(res => res.json()).then(data => {


            const classesArrays = []
            for (var i = 0; i < data.data.grades.length; i++) {
                classesArrays.push(data.data.grades[i].grade)
                console.log(data.data.grades[i].grade)
            }
            console.log(classesArrays)
            localStorage.setItem("allOptions", JSON.stringify(data.data.grades))

            setClassOptions(classesArrays)//set all class options

        })



    }



    useEffect(() => {


        fetch(`https://api2xcell.herokuapp.com/api/v1/schools/61064e25ac909b0015cfc04c`).then(res => res.json()).then(data => {

            setSchoolName(data.data.school.name)
            setExpiryDate(data.data.school.expiryDate.split("T")[0])

        })

        SetOtherData()

    }, [])


    return (
        <div className="addTeacher">
            <div style={{ display: "flex", justifyContent: "space-between" }}><h2>ADD Teacher</h2>
                <h2 style={{ cursor: "pointer" }} onClick={closeModal}>X</h2>
            </div>
            <div className="schoolSelect" style={{ width: "100%", marginBottom: "20px", fontWeight: "500" }}>
                <label>School  Name</label><br></br>
                <input type="text" disabled value={schoolName}></input>
            </div>
            <div className="add_teacher_form">
                <div className="teacherName">
                    <div>
                        <label>Teacher's Name</label><br></br>
                        <input type="text" placeholder="Enter teacher name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>

                    <div className="expiryDate" >
                        <div style={{ width: "105%" }}>
                            <label>Expiry Date</label> <br></br>
                            <input style={{ width: "113%", height: "25px" }} type="date" placeholder="Enter expiry date" value={expiryDate} disabled></input>
                        </div>

                    </div>


                </div>

                <div className="email_contact" style={{ marginTop: "6px" }}>
                    <div className="email">
                        <label>Email</label><br></br>
                        <input type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <div className="contact">
                        <label>Contact</label>
                        <input type="number" placeholder="Enter contact" value={contact} onChange={(e) => { setContact(e.target.value) }}></input>
                    </div>

                </div>
                <div className="role_signup">
                    <div className="role" style={{ marginLeft: "-10px" }}>
                        <label >Role</label><br></br>
                        <select value={role} onChange={(e) => { setRole(e.target.value) }}>
                            <option >Select Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="principal">Principal</option>
                            <option value="hod">Hod</option>

                        </select>

                    </div>
                    <div className="signup">

                        &nbsp;  <label>Password</label><br></br>
                        <Box p={0.3} ml={1} width={"96%"} >
                            <input style={{ width: "100%", border: "1px solid gray", height: "25px" }} type="password" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        </Box>

                    </div>

                </div>


                <div className="heading " style={{ marginBottom: "6px", fontWeight: "500" }}>
                    <div>
                        Link Classes & Subjects
                    </div>


                </div>
                <div className="selectionBoxBlock">
                    <div className="addClasses">
                        <select className="select" onChange={(e) => { setSubjectsAndSection(e.target.value) }} style={{ height: "37px" }}>
                            <option> Class</option>
                            {classOptions.map((item) => {
                                return (
                                    <>
                                        <option value={`${item}`}>{item}</option>
                                    </>
                                )
                            })}
                        </select>
                    </div>

                    <div className="addSection" style={{ marginLeft: "10px", marginRight: "10px" }}>

                        <Select className="select"
                            placeholder={"Select Section"}
                            options={sectionOptions}
                            isMulti

                            components={{

                                MultiValueContainer: multiValueContainer
                                // Option: CustomOption,
                            }}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={true}
                            styles={customStyles}
                            isSearchable={false}
                            onChange={handleChanges1}

                        />
                    </div>
                    <div className="addSubject">
                        <Select className="select"
                            isMulti={true}
                            components={{
                                MultiValueContainer: multiValueContainer
                                // Option: CustomOption,
                            }}

                            options={subjectOptions}
                            placeholder={"Select Subject"}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={true}
                            styles={customStyles}
                            isSearchable={false}
                            onChange={handleChanges}
                        />
                    </div>

                </div>

                <div class="add-teacher-btn" style={{ marginTop: "10px" }}>
                    <div class="createBtn">
                        <button onClick={() => { submitStaffData() }}>
                            Create
                        </button>
                    </div>
                    <div class="cancelBtn" onClick={() => { closeModal() }}>
                        <button >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
            <Notifications options={{ zIndex: 200, top: '50px' }} />
        </div>
    )
}

export default AddTeacher

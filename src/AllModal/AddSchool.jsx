import React, { useState, useEffect } from 'react'
import './addschool.css'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Delete, RemoveCircleOutline } from '@material-ui/icons';
import RemoveIcon from '@material-ui/icons/Remove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddSchool({ setPageData, dataLength }) {

    const closeModal = () => {

        var closeModal = document.getElementsByClassName('addSchool')[0];
        closeModal.style.top = "-47%";


    }
    const notify = (data) => toast(data);

    const [courseArray, setCourseArray] = useState([1])
    const [country, setCountry] = useState([]);
    //country->board->course
    const [board, setBoard] = useState([]);
    //country data  //board data
    const [countryData, setCountryData] = useState("")
    const [boardField, setBoardField] = useState("")

    const [course, setCourse] = useState([])
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [branch, setBranch] = useState("")
    const [studentCount, setStudentCount] = useState("")
    const [teacherCount, setTeacherCount] = useState("")
    const [date, setDate] = useState("")
    const [state, setState] = useState("")
    const [array, setArray] = useState("")


    useEffect(() => {

        fetch("https://api2xcell.herokuapp.com/api/v1/countries").then(response => response.json()).then(data => {
            setCountry(data.data.countries)
            console.log(data.data)
        })
    }, [])


    //board data Set
    const setBoardData = (e) => {

        const requestId = e.target.value.split("/")[0]

        if (e.target.value != "Select Country")
            fetch(`https://api2xcell.herokuapp.com/api/v1/countries/${requestId}`).then(response => response.json()).then(data => {
                setBoard(data.data.country.boards)
                console.log(data)

            })
        else
            setBoard([])

    }

    //set Course Data
    const setCourseData = (e) => {

        const requestId = e.target.value.split("/")[0]
        console.log(e.target.value)
        if (e.target.value != "Select Courses")
            fetch(`https://api2xcell.herokuapp.com/api/v1/boards/${requestId}`).then(response => response.json()).then(data => {
                setCourse(data.data ? data.data.board.courses : [])
            })
        else
            setCourse([])

    }

    //set Create School
    const createSchool = () => {


        //using this we take the course id
        const length = document.getElementsByClassName("selectValues").length;
        var courses = []
        for (var i = 0; i < length; i++) {
            courses.push(document.getElementsByClassName("selectValues")[i].value)

        }
        if (!name || !countryData || !boardField || !state || !city
            || !branch || !teacherCount || !studentCount || !courses || !date) {
            notify("Pls add all fiedl")
            return
        }

        //object to send
        const objToSend = {
            name,
            country: countryData,
            board: boardField,
            state: state,
            city: city,
            branch,
            teacherCount: parseInt(teacherCount),
            studentCount: parseInt(studentCount),
            courses,
            expiryDate: date
        }
        console.log(objToSend)
        fetch("https://api2xcell.herokuapp.com/api/v1/schools", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToSend) // body data type must match "Content-Type" header
        }).then(response => response.json()).then(data => {

            if (data.error) {
                notify("Validation Error")
            }
            else {
                console.log(data)
                fetch("https://api2xcell.herokuapp.com/api/v1/schools?limit=10").then(data => data.json()).then((res) => {
                    console.log(res)
                    setPageData(res.data.schools)
                    fetch("https://api2xcell.herokuapp.com/api/v1/schools").then(data => data.json()).then((res) => {

                        dataLength(res.data.schools.length)
                    })

                })
                notify("data Added")
            }
            closeModal()
        })
    }

    return (
        <div className="addSchool" >
            <div><h2>ADD School</h2></div>
            <div className="add_school_form">
                <div className="schooName">
                    <label>SCHOOL NAME</label><br></br>
                    <input type="text" placeholder="Enter school name" onChange={(e) => { setName(e.target.value) }}></input>
                </div>
                <div className="studentCount_teacherCount">
                    <div className="teacherCount" style={{ marginRight: "20px", width: "47%" }}>
                        <label>Country</label>
                        <select style={{ height: "27px" }} onChange={(e) => {

                            const data = e.target.value.split("/")
                            setCountryData(data[1])
                            setBoardData(e)
                        }}>
                            <option > Select Country</option>
                            {country ? <>{country.map((item) => {

                                return (
                                    <>
                                        <option value={`${item._id}/${item.name}`}>
                                            {item.name}
                                        </option>
                                    </>
                                )
                            })} </> : ""}
                        </select>
                    </div>
                    <div className="state">

                        <label>STATE</label><br></br>
                        <input placeholder="Enter State" style={{ height: "23px" }} type="text" onChange={(e) => { setState(e.target.value) }}></input>

                    </div>

                </div>
                <div className="city_state">
                    <div className="branch" style={{ marginRight: "20px", width: "55%" }}>
                        <label>City</label><br></br>
                        <input placeholder="Enter City" onChange={(e) => { setCity(e.target.value) }} style={{ height: "23px" }}>

                        </input>

                    </div>
                    <div className="board" style={{ width: "55%", marginRight: "0px", }}>
                        <label>BOARD</label><br></br>
                        <select style={{ height: "27px" }} onChange={(e) => {
                            setCourseData(e)
                            setBoardField(e.target.value.split('/')[1])

                        }}>
                            <option>Select Board</option>
                            {board.map((item) => {
                                return (<>
                                    <option value={`${item._id}/${item.name}`}>
                                        {item.name}
                                    </option>
                                </>)
                            })}


                        </select>
                    </div>



                </div>
                <div className="board_branch">
                    <div className="branch" style={{ marginRight: "20px", width: "47%" }}>
                        <label>Branch</label>
                        <input type="text" placeholder="Enter branch" onChange={(e) => { setBranch(e.target.value) }}></input>
                    </div>
                    <div className="teacherCount" style={{ marginRight: "4px", width: "47%" }}>
                        <label>Student's Count</label>
                        <input type="text" placeholder="Enter teacher count" onChange={(e) => { setStudentCount(e.target.value) }}></input>
                    </div>

                </div>
                <div className="board_branch">
                    <div className="branch" style={{ marginRight: "20px", width: "47%" }}>
                        <label>Teacher's Count</label>
                        <input type="text" placeholder="Enter branch" onChange={(e) => { setTeacherCount(e.target.value) }}></input>
                    </div>
                    <div className="teacherCount">
                        <label>Expiry Date</label>
                        <input type="date" placeholder="Enter teacher count" onChange={(e) => { setDate(e.target.value) }}></input>
                    </div>

                </div>
                <div className="assign_class">

                    {courseArray.map((item) => {
                        return (<>
                            <div className="assign_class_course">
                                <AddIcon className="addcourseIcon" onClick={() => {

                                    setCourseArray([...courseArray, Math.random()])
                                }}></AddIcon>
                                <RemoveIcon className="removeCourse" onClick={() => {
                                    if (courseArray.length >= 2)
                                        courseArray.pop()
                                    setCourseArray([...courseArray])
                                }}></RemoveIcon>
                                <label>Assign Course</label>

                                <select className="selectValues">
                                    <option>Select Courses</option>
                                    {course.map((item) => {

                                        return (
                                            <>
                                                <option value={item._id}>
                                                    {item.name}
                                                </option>
                                            </>)
                                    })}
                                </select>
                            </div>
                        </>)
                    })}



                </div>

                <ToastContainer></ToastContainer>
                {/**buttons */}
                <div class="add-school-btn">
                    <div class="createBtn">
                        <button onClick={() => {
                            createSchool()

                        }}>
                            Create
                        </button>
                    </div>
                    <div class="cancelBtn" onClick={() => {
                        closeModal()

                    }}>
                        <button >
                            Cancel
                        </button>
                    </div>


                </div>

            </div>
        </div >
    )
}

export default AddSchool

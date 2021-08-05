import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import useTable from './scheduleTable'
import './student.css'
import Myswitch from './MySwitch';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import Select from 'react-select'

import Notifications, { notify } from 'react-notify-toast';

const fields = {

    schoolname: "School",
    board: "board",
    branch: "branch",
    city: "City",
    state: "State",
    students: "Student",
    teachers: "teachers",
    expirydate: "expdate"
}

function Schedule({ TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }) {



    const notification = (data) => {
        let myColor = { background: '#5CE0D2', text: "black" };
        notify.show(data, "custom", 2000, myColor);
    }


    const addData = () => {

        var modal = document.getElementsByClassName("addTeacher")[0];
        modal.style.top = "50%";
    }

    const [data, setData] = useState([])
    useEffect(() => {

        const studentId = localStorage.getItem('studentId')


        fetch(`https://api2xcell.herokuapp.com/api/v1/students/${studentId}`)
            .then(res => res.json()).then(data => {
                const studentGrade = data.data.student.grade;
                const section = data.data.student.section;
                const schoolId = localStorage.getItem('schoolsId')
                console.log(studentGrade, section, schoolId, "----------sdfj=---------")
                fetch(`https://api2xcell.herokuapp.com/api/v1/grades/${studentGrade}/sections/${section}/subjects?schoolId=${schoolId}
                `)
                    .then(res => res.json()).then(data => {

                        console.log(data)
                        setData(data.data.subjects)

                    })

            })


    }, [])




    return (
        <div id="schedule1" className="teacher_right_side_bottom_right_schedule VerticalTabs">
            <div className="upper_div_section">
                <div className="upper_div_section_left">


                </div>
                <div className="upper_div_section_right">
                    {/**onClick={() => { saveAsCsv({ data, fields, filename }) }} */}
                    <div className="upper_div_section_right_export_csv" >
                        <SystemUpdateAltOutlinedIcon></SystemUpdateAltOutlinedIcon>&nbsp; Export Csv
                    </div>
                    <div className="upper_div_section_right_sort">


                    </div>
                </div>
            </div>
            <div className="below_div_section">
                <TblContainer>
                    <TblHead></TblHead>
                    <TableBody>
                        {data ? data.map((item, index) => (
                            <TableRow >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.subject}</TableCell>
                                {item.teacherName ? <TableCell>{item.teacherName}</TableCell> : <TableCell>Not Assigned</TableCell>}



                            </TableRow>
                        )) : ""}
                    </TableBody>

                </TblContainer>
                {/**Notification Messages */}
                <Notifications options={{ zIndex: 200, top: '50px' }} />
            </div>
        </div>
    )
}

export default Schedule

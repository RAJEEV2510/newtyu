import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './student.css'
import SearchComponentMember from '../../SearchComponent/SearchComponentTeacher'
import useTable from './scheduleTable'
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';
import Schedule from './Schedule'
import { useEffect } from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StudentInfo from './StudentInfo'

//columns for csv fields
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

//labelling of data in table view on component render
const headCells = [
    { id: 1, label: " S.No." },

    { id: 2, label: "Subject" },
    { id: 3, label: "Teacher" },
]


const StudentProfile = () => {


    const loc = useLocation();
    const [filterfn, setFilterFn] = useState({ fn: (data) => data }) //hooks for searching
    console.log(loc)
    const filename = "csvfile"; //hooks for csv files generating
    const { saveAsCsv } = useJsonToCsv(); //save csv file  from json
    const [viewType, setViewType] = useState("card")
    const [paginationCheck, setPaginationCheck] = useState("No")
    const [searchStatusCheck, setsearchStatusCheck] = useState("No")
    const [data, setData] = useState([])
    const [length, setlength] = useState(20)

    useEffect(() => {

        //1. request on Teacher Data
        fetch("http://localhost:3000/data").then(data => data.json()).then((res) => {
            setData(res)
            setlength(res.length)
            console.log(res)

        })

    }, []);



    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(data, length, setData, headCells) //user defined hooks


    useEffect(() => {

        var data = document.getElementsByClassName("VerticalTabs");
        data[0].style.display = "block"
        document.getElementsByClassName("leftVerticalTabs")[0].style.border = "1px solid #5CE0D2";
        document.getElementsByClassName("searchNav-right")[0].style.marginTop = "20px";
    }, []);


    const showTabComponent = (evt, id) => {

        var data = document.getElementsByClassName("VerticalTabs");
        var data2 = document.getElementsByClassName("leftVerticalTabs");
        for (var i = 0; i < data.length; i++) {
            data[i].style.display = "none"
            data2[i].style.border = "none"

        }
        document.getElementById(id).style.display = "block";
        evt.target.style.border = "1px solid #5CE0D2";


    }

    return (<>
      
        <div className="student_right_side" style={{ display: "block!important" }}>
            <div className="student_right_side_top">
                <SearchComponentMember searchStatus={searchStatusCheck} TblPagination={TblPagination} records={data} school={"loc.state.schoolname"} setFilterFn={setFilterFn}
                    paginationCheck={paginationCheck}
                ></SearchComponentMember>
            </div>
            <div className="student_right_side_mid">
                <div class="student_breadcum">
                    <a style={{ textDecoration: "none", color: "black" }} href="/student">All Members </a>
                    <ChevronRightIcon></ChevronRightIcon>Student
                    <ChevronRightIcon></ChevronRightIcon><b>Student Profile</b>
                </div>

            </div>
            <div className="student_right_side_bottom">
                <div className="student_right_side_bottom_left">
                    <div className="student_right_side_bottom_left_info leftVerticalTabs" onClick={(e) => {
                        showTabComponent(e, "studentInfo");
                        setsearchStatusCheck("No");
                        setPaginationCheck("No")
                    }}>
                        Student Info
                    </div>
                    <div className="student_right_side_bottom_left_schedule leftVerticalTabs" onClick={(e) => {
                        showTabComponent(e, "schedule1");
                        setsearchStatusCheck("NO");
                        setPaginationCheck("NO")
                    }}>
                        Schedule
                    </div>
                </div>
                <div className="student_right_side_bottom_right">
                    <StudentInfo > </StudentInfo>
                    <Schedule TblContainer={TblContainer} TblHead={TblHead} TblPagination={TblPagination} recordsAfterPagingAndSorting={recordsAfterPagingAndSorting} ></Schedule>
                </div>
            </div>
        </div>
    </>)
}



function Teachers() { return <></> }

export default Teachers
export { StudentProfile }
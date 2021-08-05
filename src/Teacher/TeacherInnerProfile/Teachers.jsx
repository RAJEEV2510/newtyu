import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './teachers.css'
import SearchComponentMember from '../../SearchComponent/SearchComponentMember'
import useTable from './scheduleTable'
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';
import TeacherInfo from './TeacherInfo'
import Schedule from './Schedule'
import { useEffect } from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
    { id: 2, label: "Class" },
    { id: 3, label: "Section" },
    { id: 4, label: "Subject" },
]


const TeacherProfile = () => {


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
        <div className="teacher_right_side" style={{ display: "block" }}>
            <div className="teacher_right_side_top">
                <SearchComponentMember searchStatus={searchStatusCheck} TblPagination={TblPagination} records={data} school={"loc.state.schoolname"}
                    paginationCheck={paginationCheck}
                ></SearchComponentMember>
            </div>
            <div className="teacher_right_side_mid">
                <div class="teacher_breadcum">
                    <a style={{ textDecoration: "none", color: "black" }} href="/teacher">All Members </a>
                    <ChevronRightIcon></ChevronRightIcon>Teacher
                    <ChevronRightIcon></ChevronRightIcon><b>Teacher Profile</b>
                </div>

            </div>
            <div className="teacher_right_side_bottom">
                <div className="teacher_right_side_bottom_left">
                    <div className="teacher_right_side_bottom_left_info leftVerticalTabs" onClick={(e) => {
                        showTabComponent(e, "teacherInfo");
                        setsearchStatusCheck("No");
                        setPaginationCheck("No")
                    }}>
                        Teacher Info
                    </div>
                    <div className="teacher_right_side_bottom_left_schedule leftVerticalTabs" onClick={(e) => {
                        showTabComponent(e, "schedule1");
                        setsearchStatusCheck("NO");
                        setPaginationCheck("NO")
                    }}>
                        Schedule
                    </div>
                </div>
                <div className="teacher_right_side_bottom_right">
                    <TeacherInfo > </TeacherInfo>
                    <Schedule TblContainer={TblContainer} TblHead={TblHead} TblPagination={TblPagination} recordsAfterPagingAndSorting={recordsAfterPagingAndSorting} ></Schedule>
                </div>
            </div>
        </div>
    </>)
}



function Teachers() { return <></> }

export default Teachers
export { TeacherProfile }
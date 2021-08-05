import React, { useState, useEffect } from 'react';
import './student.css'
import useTable from './useTableStudent'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import Switch from 'react-input-switch';
import Myswitch from './Myswitch';
import TocIcon from '@material-ui/icons/Toc';
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';
import { useHistory } from 'react-router-dom'
import FilterListIcon from '@material-ui/icons/FilterList';
import Search from './Seach';
import MemberModal from '../AllModal/MemberModal';
import AddStudent from '../AllModal/AddStudent'
import exportFromJSON from 'export-from-json'
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
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
    { id: 1, label: "  Name" },
    { id: 2, label: "Role" },
    { id: 3, label: " Email" },
    { id: 4, label: " Contact " },
    { id: 5, label: "Signup Date " },
    { id: 6, label: " Expiry Date" },
    { id: 7, label: "" },
]

const exportCsv = () => {


    fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c`)
        .then((res) => res.json())
        .then((studentData) => {

            const data = studentData.data.students
            const fileName = 'Students'
            const exportType = exportFromJSON.types.csv

            exportFromJSON({ data, fileName, exportType })

        })



}



function Student() {

    const [crossStatus, setCrossStatus] = useState("No");
    const filename = "csvfile"; //hooks for csv files generating
    const { saveAsCsv } = useJsonToCsv(); //save csv file  from json
    const [viewType, setViewType] = useState("card")
    const history = useHistory()

    const [data, setData] = useState([])
    const [length, setLength] = useState(0)
    const [page, setPage] = useState(0);

    //Filter Teacher
    const addFilter = () => {

        var modal = document.getElementsByClassName("filterMember")[0];
        modal.style.top = "50%";
    }

    const addStudent = () => {

        var modal = document.getElementsByClassName("addStudent")[0];
        modal.style.top = "50%";
    }


    //Sidebar Shrink
    const sideBarShrink = () => {

        var sideBar = document.getElementsByClassName("Sidebar")[0];
        var menuName = document.getElementsByClassName("menu-Name");
        var logout = document.getElementsByClassName("logout")[0];
        var aboveDiv = document.getElementsByClassName("Above-div")[0];
        var lowerDiv = document.getElementsByClassName("Lower-div")[0];
        lowerDiv.style.marginTop = "150px";
        aboveDiv.style.display = "none"
        logout.style.display = "none";
        sideBar.style.flex = "0.1";

        for (var i = 0; i < menuName.length; i++) {
            menuName[i].style.display = "none";
        }



    }


    useEffect(() => {



        fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c&page=1&limit=10`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data.students)
                localStorage.removeItem("dataType");
                localStorage.removeItem("signed");
                localStorage.removeItem("sortBy");


                fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c`)
                    .then((res) => res.json())
                    .then((data) => {

                        setLength(data.results)
                    })

            })

    }, [])


    //sort by function
    const handleSort = (DataType, SortBy) => {

        //

        let signed = ""
        if (SortBy == "desc") {
            signed = "-"
        }
        //checking page condition


        //set data in localStorage
        localStorage.setItem("dataType", DataType);
        localStorage.setItem("signed", signed);
        localStorage.setItem("sortBy", SortBy);


        fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c&sort=${signed}${DataType}&page=${page + 1}&limit=10`)
            .then((res) => res.json())
            .then((data) => {

                setData(data.data.students)

            })

    }




    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(setData, headCells, length, page, setPage) //user defined hooks

    return (
        <div className="student">
            <MemberModal></MemberModal>

            <AddStudent setData={setData} setLength={setLength}></AddStudent>
            <div className="student_upper_body">

                {/**SubMENU */}
                <Search searchStatus="Yes" TblPagination={TblPagination}
                    setData={setData} setLength={setLength}
                    school={"TEACHER"}
                    paginationCheck={"Yes"} crossStatus={crossStatus}></Search>
            </div>
            <div className="student_lower_body">
                <div className="student_MainBody_RIGHT">
                    {/**Teacher mid*/}
                    <div className="student_MainBody_Right_mid">
                        <div className="student_MainBody_Right_mid_left" onClick={() => { addStudent() }} style={{ cursor: "pointer" }}>
                            <AddCommentOutlinedIcon className="item"></AddCommentOutlinedIcon> Add Student
                        </div>
                        <div className="student_MainBody_Right_mid_right">
                            <div className="item-1 item" onClick={exportCsv}>
                                <SystemUpdateAltOutlinedIcon className="student_MainBody_Right_mid_right_icon" ></SystemUpdateAltOutlinedIcon> Export Csv
                            </div>
                            <div className="item-2 item" >
                                <Menu menuButton={<MenuButton>
                                <ImportExportIcon className="student_MainBody_Right_mid_right_icon"></ImportExportIcon> Sort By

                                </MenuButton>}>

                                    <SubMenu label="Name">
                                        <MenuItem onClick={() => { handleSort("name", "asc") }}>Ascending</MenuItem>
                                        <MenuItem onClick={() => { handleSort("name", "desc") }}>Descending</MenuItem>
                                    </SubMenu>
                                    <SubMenu label="SignUpDate">
                                        <MenuItem onClick={() => { handleSort("signUpDate", "asc") }}>Ascending</MenuItem>
                                        <MenuItem onClick={() => { handleSort("signUpDate", "desc") }}>Descending</MenuItem>                                    </SubMenu>
                                    <SubMenu label="ExpiryDate">
                                        <MenuItem onClick={() => { handleSort("expiryDate", "asc") }}>Ascending</MenuItem>
                                        <MenuItem onClick={() => { handleSort("expiryDate", "desc") }}>Descending</MenuItem>
                                    </SubMenu>

                                </Menu>

                            </div>
                            <div className="item-3 item" onClick={() => { addFilter() }} >
                                <FilterListIcon> </FilterListIcon> &nbsp;Filter
                            </div>
                        </div>
                    </div>
                    {/**Teacher right cards or table view*/}
                    <TblContainer>
                        <TblHead></TblHead>
                        <TableBody>
                            {data.map((item) => {

                            var expiryDate = item.expiryDate.split("T")
                            var signUpDate = item.signUpDate.split("T")
                            var name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                            var role = item.role.charAt(0).toUpperCase() + item.role.slice(1);
                            return (
                                <>
                                    <TableRow>
                                        <TableCell onClick={() => {
                                            localStorage.setItem('studentName', name)
                                            localStorage.setItem('studentId', item._id)
                                            history.push("/dashboard/student")
                                        }}>{name}</TableCell>
                                        <TableCell
                                            onClick={() => {
                                                localStorage.setItem('studentName', name)
                                                localStorage.setItem('studentId', item._id)
                                                history.push("/dashboard/student")
                                            }}
                                        >{item.role}</TableCell>
                                        <TableCell
                                            onClick={() => {
                                                localStorage.setItem('studentName', name)
                                                localStorage.setItem('studentId', item._id)
                                                history.push("/dashboard/student")
                                            }}
                                        >{item.email}</TableCell>
                                        <TableCell
                                            onClick={() => {
                                                localStorage.setItem('studentName', name)
                                                localStorage.setItem('studentId', item._id)
                                                history.push("/dashboard/student")
                                            }}
                                        >{item.contact}</TableCell>
                                        <TableCell
                                            onClick={() => {
                                                localStorage.setItem('studentName', name)
                                                localStorage.setItem('studentId', item._id)
                                                history.push("/dashboard/student")
                                            }}
                                        >{signUpDate[0]}</TableCell>
                                        <TableCell
                                            onClick={() => {
                                                localStorage.setItem('studentName', name)
                                                localStorage.setItem('studentId', item._id)
                                                history.push("/dashboard/student")
                                            }}
                                        >{expiryDate[0]}</TableCell>
                                        <TableCell><Myswitch enabled={item.enabled} ></Myswitch></TableCell>
                                    </TableRow>

                                </>
                            )

                        })}

                        </TableBody>

                    </TblContainer>



                </div>
            </div>

        </div>
    )
}

export default Student

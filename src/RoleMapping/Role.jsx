import React, { useState, useEffect } from 'react'
import './role.css'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import useTable from './useRoleTable'
import SearchComponentMember from '../SearchComponent/SearchComponentRole'
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AssignSubjects from './AssignSubjects'
function Role() {


    //Not using localStorage for getting Ids 
    //here  share the state between components using props drilling 
    //by gettings ids




    const [open, setOpen] = React.useState(false);
    const [allGrade, setAllGrade] = useState([])
    const [allSection, setAllSection] = useState([])
    const [grade, setGrade] = useState()
    const [section, setSection] = useState()
    const [data, setData] = useState([])
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //labelling of data in table view on component render
    const headCells = [
        { id: 1, label: "S.NO." },
        { id: 2, label: "Subject" },
        { id: 3, label: "Teacher" },

    ]

    const [length, setLength] = useState(0)


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(data, length, setData, headCells) //user defined hooks

    useEffect(() => {

        //1. request on Teacher Data
        fetch("https://api2xcell.herokuapp.com/api/v1/grades?schoolId=61064e25ac909b0015cfc04c").then(data => data.json()).then((res) => {

            setAllGrade(res.data.grades)

        })

    }, []);


    //find subjects by grade
    const findSectionsByGrade = (grade) => {

        const length = allGrade.length;

        for (var i = 0; i < length; i++) {
            if (grade == allGrade[i].grade) {
                setAllSection(allGrade[i].sections)
                break;
            }

        }
    }

    //fetch subjects and teacher after filter done
    const fetchSubjectsAndTeachers = () => {

        console.log(grade, section)
        const sectionValue = section.split(',')
        localStorage.setItem("sectionId", sectionValue[1])
        fetch(`https://api2xcell.herokuapp.com/api/v1/grades/${grade}/sections/${sectionValue[0]}/subjects?schoolId=61064e25ac909b0015cfc04c`).then(data => data.json()).then((res) => {

            setData(res.data.subjects)
            console.log(res.data.subjects)
            handleClose()
            //set Teachers Data
            fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=61064e25ac909b0015cfc04c`).then(data => data.json()).then((res) => {

                console.log(res.data.staffs)
                setTeachers(res.data.staffs)
            })

            //fetch subjects for those teachers not assigned
            const subjectsArray = []
            for (var i = 0; i < res.data.subjects.length; i++) {
                if (!res.data.subjects[i].teacherName) {
                    subjectsArray.push(res.data.subjects[i]);
                }
            }
            //subjects Array
            console.log(subjectsArray)
            setSubjects(subjectsArray)

        })
    }


    return (
        <div className="role">
            <div className="role-upper">
                <SearchComponentMember></SearchComponentMember>

            </div>

            <div className="role-mid">
                <div className="role-mid-left">
                    <AssignSubjects setData={setData} teachers={teachers} subjects={subjects} setSubjects={setSubjects} setTeachers={setTeachers} section={section} grade={grade}></AssignSubjects>
                </div>
                <div className="role-mid-right" >
                    <div onClick={handleClickOpen} style={{ cursor: "pointer" }}>
                        <FilterListIcon className="role-mid-right-item"> </FilterListIcon> &nbsp;Filter
                    </div>
                </div>

            </div>
            <div className="role-lower">

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


            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>

                    <DialogContentText>
                        <h2 style={{ marginLeft: "20px" }}>Filter </h2>
                    </DialogContentText>
                    <div className="filter_dialoag">
                        <div className="filter_grade">
                            <select onChange={(e) => {
                                findSectionsByGrade(e.target.value)
                                setGrade(e.target.value)
                            }}>
                                <option>Select Grade</option>
                                {allGrade.map((item) => {

                                    return (<>

                                        <option value={item.grade}> {item.grade}</option>
                                    </>
                                    )

                                })}


                            </select>

                        </div>
                        <div className="filter_section">
                            <select onChange={(e) => {

                                setSection(e.target.value)
                            }}>
                                <option>Select Section</option>
                                {allSection.map((item) => {
                                    console.log(item)
                                    return (<>

                                        <option value={`${item.section},${item._id}`}> {item.section}</option>
                                    </>
                                    )

                                })}


                            </select>

                        </div>
                    </div>
                    <div className="filter_buttons">
                        <Button onClick={handleClose} style={{ background: "#5CE0D2", marginRight: "20px", color: "black", fontWeight: "500" }} color="primary" variant="contained">
                            Cancel
                        </Button>
                        <Button style={{ background: "#5CE0D2", color: "black", fontWeight: "500" }} onClick={fetchSubjectsAndTeachers} color="primary" variant="contained">
                            Filter
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Role

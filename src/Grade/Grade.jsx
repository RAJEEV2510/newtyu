import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import './grade.css'
import useTable from './useGradeTable'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Select from 'react-select'
import { ToastContainer, toast } from "react-toastify";
import Myswitch from './Myswitch'
import exportFromJSON from 'export-from-json'
import SearchComponentMember from './search'
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

//labelling of data in table view on component render
const headCells = [
    { id: 1, label: "S.No." },
    { id: 2, label: "Grade" },
    { id: 3, label: "Sections" },
    { id: 4, label: "Subjects" },
    { id: 5, label: "Subscription" },



]


const exportCsv = () => {

    const schoolId = localStorage.getItem("schoolsId");
    fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=${schoolId}`).then((res) => res.json()).then((item) => {


        const data = item.data.grades
        const fileName = 'GRADES'
        const exportType = exportFromJSON.types.csv

        exportFromJSON({ data, fileName, exportType })
    })


}


function TeacherSchedule() {

    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [arrayHandler, setArrayHandler] = useState(["1"])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const notification = (data) => {
        let myColor = { background: '#5CE0D2', text: "black" };
        notify.show(data, "custom", 2000, myColor);
    }
    const handleRemove = () => {

        const newArray = arrayHandler;
        console.log(newArray)
        if (newArray.length >= 2) {
            newArray.pop()
            setArrayHandler([...newArray])
        }
        else
            notification("atleast one persist")


    }




    const handleAdd = () => {


        const newArray = arrayHandler;
        if (newArray.length < 3)
            setArrayHandler([...arrayHandler, Math.random()])
        else
            notification("We can't add more options Sorry Limits upto 3")

    }

    let subjectsArray = []


    const [sectionOptions, setSectionOptions] = useState([])
    //class Options
    const [classOptions, setClassOptions] = useState([])
    //subject Options
    const [subjectOptions, setSubjectOptions] = useState([])

    const [subectsRespectiveWithId, setSubjectsRespectiveId] = useState([])
    //section apis //class apis  // subject apis

    //find id with subjects 
    const findIdBySubjectName = (subject) => {

        console.log(subject)
        console.log(subectsRespectiveWithId)
        for (var i = 0; subectsRespectiveWithId.length; i++) {

            if (subectsRespectiveWithId[i].name == subject)
                return subectsRespectiveWithId[i]._id

        }
    }





    const fetchsubjectId = (data, classLength) => {



        //iterate classes
        for (var i = 0; i < classLength; i++) {
            let classId = data[i]._id

            fetch(`https://api2xcell.herokuapp.com/api/v1/courses/${classId}`).then(res => res.json()).then(data => {

                console.log(data)
                let subjectWithId = data ? data.data.course.subjects : []
                console.log(data.data.course)
                subjectsArray = [...subjectsArray, ...subjectWithId]
                setSubjectsRespectiveId(subjectsArray)
                console.log(subjectsArray)

            })
        }
    }



    useEffect(() => {

        const schoolId = localStorage.getItem("schoolsId")
        fetch(`https://api2xcell.herokuapp.com/api/v1/schools/${schoolId}`).then((res) => res.json()).then((item) => {



            setClassOptions(item.data.school.courses)
            let data = item.data.school.courses
            let classLength = item.data.school.courses.length

            fetchsubjectId(data, classLength)


        })

        fetch("https://api2xcell.herokuapp.com/api/v1/sections").then((res) => res.json()).then((item) => {

            const length = item.data.sections.length
            const allOptions = []
            for (var i = 0; i < length; i++) {
                const obj = {
                    value: item.data.sections[i]._id,
                    label: item.data.sections[i].section
                }
                allOptions.push(obj)

            }
            setSectionOptions(allOptions)

        })

    }, [])

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

    const handleSubject = (e) => {


        const classId = e.target.value.split(",")[1]

        if (classId === "Class")
            return

        fetch(`https://api2xcell.herokuapp.com/api/v1/courses/${classId}`).then((res) => res.json()).then((item) => {



            const length = item.data.course.subjects.length
            const allOptions = []

            for (var i = 0; i < length; i++) {
                const obj = {
                    value: item.data.course.subjects[i]._id,
                    label: item.data.course.subjects[i].name
                }
                allOptions.push(obj)

            }
            setSubjectOptions(allOptions)



        })



    }

    //pushing after Assigning

    const handleData = () => {

        var ele = document.getElementsByClassName("select")
        var data = []

        console.log(subjectsArray)
        console.log(ele)
        for (var i = 0; i < ele.length; i = i + 3) {

            var obj;
            const courseName = ele[i].value.split(",")[0]
            const courseId = ele[i].value.split(',')[1]

            const sections = ele[i + 1].innerText.split(',')
            const subjects = ele[i + 2].innerText.split(',')
            sections.pop()
            subjects.pop()

            //map using for modified the array
            const newSubjects = subjects.map((item) => {

                return {
                    "subjectId": findIdBySubjectName(item),
                    "subject": item
                }

            })



            obj = {
                schoolId: localStorage.getItem("schoolsId"),
                courseId,
                courseName,
                sections,
                subjects: newSubjects
            }
            data.push(obj)

        }

        data.shift()

        console.log(data)
        fetch(`https://api2xcell.herokuapp.com/api/v1/grades/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    schoolId: localStorage.getItem("schoolsId"),
                    grades: data
                }
            )

        }).then((res) => res.json()).then((item) => {
            console.log(item)
            if (item.errorLogs.length == 0) {
                notification("success full created")
                handleClose()
                const schoolId = localStorage.getItem("schoolsId")
                fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=${schoolId}`).then((res) => res.json()).then((item) => {

                    console.log(item, "Table Data")
                    setData(item.data.grades)
                })

            }

            else {

                notification(item.errorLogs[0])
            }
        })


    }
    const handleChange = (select) => {
        console.log(select)
    }



    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(data, headCells) //user defined hooks

    //fetch table data
    useEffect(() => {

        const schoolId = localStorage.getItem('schoolsId')
        console.log(schoolId)
        fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=${schoolId}`).then((res) => res.json()).then((item) => {

            console.log(item, "Table Data")
            setData(item.data.grades)
        })



    }, [])




    return (
        <div className="teacher_schedule">
            <div className="grade-upper">
                <SearchComponentMember setData={setData}></SearchComponentMember>
            </div>

            <div className="teacher_schedule_table_header">
                <div className="teacher_schedule_table_header_left" onClick={handleClickOpen}>
                    <AddCommentOutlinedIcon></AddCommentOutlinedIcon> &nbsp; Assign Class & Subject
                </div>
                <div className="teacher_schedule_table_header_right" onClick={exportCsv}>

                    <SystemUpdateAltOutlinedIcon></SystemUpdateAltOutlinedIcon> &nbsp; Export Csv
                </div>

            </div>

            <TblContainer>
                <TblHead></TblHead>

                <TableBody>
                    {data.map((item, index) => (
                        <TableRow >
                            <TableCell><b>{index + 1}</b></TableCell>
                            <TableCell ><b style={{ textTransform: "capitalize" }}>{item.grade}</b></TableCell>

                            <TableCell>{item.sections.map((section) => (
                                <span style={{ textTransform: "capitalize" }}>
                                    <b>  {section.section},</b>
                                </span>
                            ))}</TableCell>
                            <TableCell>{item.subjects.map((subject) => (
                                <span style={{ textTransform: "capitalize" }}>
                                    <b>  {subject.subject},</b>
                                </span>
                            ))}</TableCell>


                            <TableCell><Myswitch enabled={item.enabled}></Myswitch></TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </TblContainer>

            {/**assgin Classes */}
            <Dialog
                maxWidth={"650px"}
                Height={"600px"}
                open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ padding: "10px!important" }}>
                <DialogContent>
                    <div className="staff_modal_assign_class">
                        <div className="staff_modal_assign_class_heading">
                            <h2>Assign Classes & Subejcts</h2>
                            <h2 onClick={handleClose}>X</h2>
                        </div>
                        <div className="staff_modal_assign_class_body">
                            {arrayHandler.map((item) => {

                                return (
                                    <>
                                        <div className="staff_modal_assign_class_body_selectBox" >
                                            <div className="linkAnother">Link Classes & Subjects</div>
                                            <div className="addAnother" onClick={() => {
                                                handleAdd()

                                            }}>Add Another</div>
                                            <div className="removeAnother" onClick={() => {
                                                //logic of  remove elements
                                                handleRemove()
                                            }}>Remove Another</div>
                                            <div className="staff_modal_assign_class_body_class" style={{ zIndex: "1000000000", width: "20%", height: "30px" }}>
                                                <select style={{ height: "38px", marginTop: "0px" }} className="select" onChange={handleSubject}>
                                                    <option> Class</option>
                                                    {classOptions.map((item) => {
                                                        return (
                                                            <>
                                                                <option value={`${item.name},${item._id}`}>{item.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="staff_modal_assign_class_body_section" style={{ width: "40%", fontSize: "10px!important" }}>

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

                                                />

                                            </div>
                                            <div className="staff_modal_assign_class_body_subject" style={{ width: "50%" }}>

                                                <Select className="select"
                                                    isMulti={true}
                                                    onChange={handleChange}
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
                                                />

                                            </div>
                                        </div>

                                    </>
                                )

                            })}


                            <div className="modal_button">

                                <button variant="outlined" color="success" onClick={handleClose} color="primary">
                                    Cancel
                                </button>
                                <button onClick={handleData} color="primary">
                                    Add
                                </button>
                            </div>

                        </div>



                    </div>

                </DialogContent>
            </Dialog>
            <Notifications options={{ zIndex: 200, top: '50px' }} />
        </div>
    )
}

export default TeacherSchedule


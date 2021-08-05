import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import useTable from './scheduleTable'
import './teachers.css'
import Myswitch from './MySwitch';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';
import Select from 'react-select'
import TocIcon from '@material-ui/icons/Toc';
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


    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [arrayHandler, setArrayHandler] = useState(["1"])


    const notification = (data) => {
        let myColor = { background: '#5CE0D2', text: "black" };
        notify.show(data, "custom", 2000, myColor);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    let sectionsArray = []


    const [sectionOptions, setSectionOptions] = useState([])
    //class Options
    const [classOptions, setClassOptions] = useState([])
    //subject Options
    const [subjectOptions, setSubjectOptions] = useState([])

    const [subectsRespectiveWithId, setSubjectsRespectiveId] = useState([])
    //section apis //class apis  // subject apis

    //find id with subjects 
    const findIdBySectionNameAndGrade = (section, grade) => {


        var gradesArray = JSON.parse(localStorage.getItem("allOptions"))

        for (var i = 0; i < gradesArray.length; i++) {
            if (grade === gradesArray[i].grade) {


                const length = gradesArray[i].sections.length
                const allOptions = []
                for (var j = 0; j < length; j++) {

                    if (section == gradesArray[i].sections[j].section) {
                        return gradesArray[i].sections[j]._id
                        break;
                    }

                }
            }

            //for loop
        }

    }





    const fetchSectionId = () => {


        const data = JSON.parse(localStorage.getItem("allOptions"))
        const classLength = data.length
        //iterate classes
        console.log(data)
        for (var i = 0; i < classLength; i++) {

            let sectionsWithId = data[i].sections
            sectionsArray = [...sectionsArray, ...sectionsWithId]
            setSubjectsRespectiveId(sectionsArray)
            console.log(sectionsArray)
        }
    }





    useEffect(() => {

        const schoolId = "61064e25ac909b0015cfc04c"
        fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=${schoolId}&fields=sections,grade,subjects`).then(res => res.json()).then(data => {

            const classesArrays = []
            for (var i = 0; i < data.data.grades.length; i++) {
                classesArrays.push(data.data.grades[i].grade)

            }

            localStorage.setItem("allOptions", JSON.stringify(data.data.grades))
            fetchSectionId()
            setClassOptions(classesArrays)//set all class options

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





    const handleSubject = (grade) => {

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

    //pushing after Assigning to backend

    const handleData = () => {

        var ele = document.getElementsByClassName("select")
        var data = []

        console.log(sectionsArray)
        console.log(ele)
        for (var i = 0; i < ele.length; i = i + 3) {


            var obj;

            try {
                const grade = ele[i].value.split(",")[0]
                const sections = ele[i + 1].innerText.split(',')
                const subjects = ele[i + 2].innerText.split(',')
                sections.pop()

                subjects.pop()
                console.log(sections)
                console.log(subjects)

                //map using for modified the array


                for (var j = 0; j < sections.length; j++) {

                    var obj = {
                        "sectionId": findIdBySectionNameAndGrade(sections[j], grade),
                        "subjects": subjects
                    }
                    data.push(obj)
                }
            }
            catch (e) { }
        }

        // console.log(data, "data pushed")
        const sendData = {
            sections: data

        }
        console.log(sendData, data, "data")
        const staffId = localStorage.getItem("staffId")
        fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}/assignSubjects`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(sendData)

        }).then((res) => res.json()).then((item) => {
            console.log(item)
            if (item.errorLogs.length == 0) {
                notification("success full created")
                handleClose()
                const schoolId = "61064e25ac909b0015cfc04c"
                fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}/assignSubjects`).then((res) => res.json()).then((item) => {

                    console.log(item, "Table Data")
                    const subjectArray = []
                    for (var i = 0; i < item.data.sections.length; i++) {
                        subjectArray.push(item.data.sections[i].subjects[0])
                    }

                    setData(subjectArray)
                    console.log(subjectArray)
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





    //fetch table data
    useEffect(() => {

        const staffId = localStorage.getItem('staffId')

        fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}/assignSubjects`).then((res) => res.json()).then((item) => {

            console.log(item, "Table Data")
            const subjectArray = []
            for (var i = 0; i < item.data.sections.length; i++) {
                subjectArray.push(item.data.sections[i].subjects[0])
            }

            setData(subjectArray)
            console.log(subjectArray)
        })



    }, [])


    const filename = "csvfile"; //hooks for csv files generating

    const { saveAsCsv } = useJsonToCsv(); //save csv file  from json
    const [viewType, setViewType] = useState("card")


    const addData = () => {

        var modal = document.getElementsByClassName("addTeacher")[0];
        modal.style.top = "50%";
    }



    return (
        <div id="schedule1" className="teacher_right_side_bottom_right_schedule VerticalTabs">
            <div className="upper_div_section">
                <div className="upper_div_section_left" onClick={handleClickOpen} style={{ cursor: "pointer" }} >
                    <AddCommentOutlinedIcon></AddCommentOutlinedIcon>&nbsp;
                    Assign Class and Subjects
                </div>
                <div className="upper_div_section_right">
                    {/**onClick={() => { saveAsCsv({ data, fields, filename }) }} */}
                    <div className="upper_div_section_right_export_csv" >
                        <SystemUpdateAltOutlinedIcon></SystemUpdateAltOutlinedIcon>&nbsp; Export Csv
                    </div>
                    <div className="upper_div_section_right_sort">
                        <ImportExportIcon></ImportExportIcon>&nbsp;
                        Sort
                    </div>
                </div>
            </div>
            <div className="below_div_section">
                <TblContainer>
                    <TblHead></TblHead>

                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow >
                                <TableCell><b>{index + 1}</b></TableCell>

                                <TableCell ><b style={{ textTransform: "capitalize" }}>{item.grade}</b></TableCell>

                                <TableCell>
                                    {item.section}
                                </TableCell>
                                <TableCell>{item.subject}</TableCell>
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
                                                <div className="staff_modal_assign_class_body_class" style={{ zIndex: "1000000000", width: "20%" }}>
                                                    <select className="select" onChange={(e) => { handleSubject(e.target.value) }} style={{ height: "38px", marginTop: "-1px" }}>
                                                        <option> Class</option>
                                                        {classOptions.map((item) => {
                                                            return (
                                                                <>
                                                                    <option value={item}>{item}</option>
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
                {/**Notification Messages */}
                <Notifications options={{ zIndex: 200, top: '50px' }} />
            </div>
        </div>
    )
}

export default Schedule

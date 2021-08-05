import React, { useState } from 'react'
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function AssignSubjects({ setData, teachers, subjects, section, grade }) {

    const [open, setOpen] = React.useState(false);

    const [teacher, setTeacher] = useState('')
    const [subject, setSubject] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(section)
    const handleAssign = () => {

        const obj = {
            sectionId: section.split(',')[1],
            subjects: [subject]
        }

        const staffId = teacher.split(',')[1]

        console.log(staffId)
        console.log(obj)
        let sendData = {
            sections: [
                obj
            ]
        }
        fetch(`https://api2xcell.herokuapp.com/api/v1/staffs/${staffId}/assignSubjects`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
        }).then((res) => res.json()).then(data => {

            const sectionValue = section.split(',')[0]
            fetch(`https://api2xcell.herokuapp.com/api/v1/grades/${grade}/sections/${sectionValue}/subjects?schoolId=61064e25ac909b0015cfc04c`).then(data => data.json()).then((res) => {

                setData(res.data.subjects)

                handleClose()

            })


        })

    }

    return (

        <>
            <div onClick={handleClickOpen} style={{ cursor: "pointer" }}>

                <AddCommentOutlinedIcon className="role-mid-right-item"></AddCommentOutlinedIcon>&nbsp; Assign

            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>

                    <DialogContentText>
                        <h2 style={{ marginLeft: "20px", fontWeight: "600", color: "black" }}>Assign Subjects </h2>
                    </DialogContentText>
                    <div className="filter_dialoag">
                        <div className="filter_grade">
                            <select onChange={(e) => {

                                setTeacher(e.target.value)
                            }}>
                                <option>Select Teacher</option>
                                {teachers.map((item) => {

                                    return (<>

                                        <option value={`${item.name},${item._id}`}> {item.name}</option>
                                    </>
                                    )

                                })}


                            </select>

                        </div>
                        <div className="filter_section">
                            <select onChange={(e) => { setSubject(e.target.value) }}>
                                <option>Select Subject</option>
                                {subjects.map((item) => {

                                    return (<>

                                        <option value={item.subject}> {item.subject}</option>
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
                        <Button style={{ background: "#5CE0D2", color: "black", fontWeight: "500" }} onClick={handleAssign} color="primary" variant="contained">
                            Assign Subjects
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignSubjects

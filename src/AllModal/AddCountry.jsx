import React, { useState, useEffect } from "react";
import "./addCountry.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryList from "./countryList";
import DropzoneDialogExample from "./DropZone";
function AddCountry({ addData, selectBoxData, statusOfUpload, setCardData, setHeaderData, setBoxData, setLength, setPageData, setmoduleData }) {
    console.log(selectBoxData);
    const [val, setValue] = useState("");
    const [file, setFile] = useState("");
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");

    //close Modal
    const closeModal = () => {
        document.getElementsByClassName("addCountry")[0].style.top = "-50%";
        localStorage.removeItem("file");
        document.getElementsByClassName("loading")[0].style.display = "none";
        var val = "";
        setValue(val);
        setFile("");
        setFile1("");
        setFile2("");
    };

    const notify = (data) => toast(data); //notification

    //submit button functionality
    const submitData = () => {
        //add Resources
        if (selectBoxData === "Enter Resources Name" && localStorage.getItem("file")) {
            document.getElementsByClassName("addCountry_modal_button_add")[0].disabled = true
            //body of if ---- ///
            document.getElementsByClassName("loading")[0].style.display = "block";
            notify("hold on request in process");
            console.log(file);
            var form = new FormData();
            var id = localStorage.getItem("leftId");
            form.append("file", file);
            form.append("file", file1);
            form.append("file", file2);

            form.append("topicId", id);

            const moduleId = localStorage.getItem("moduleId");
            ///
            fetch(`https://api2xcell.herokuapp.com/api/v1/modules/${moduleId}/resources`, {
                method: "PATCH",
                body: form,
            }
            ).then((response) => response.json()).then((result) => {
                notify("success Full Upload Modules");
                notify("wait we update the list of resources");
                closeModal();
                localStorage.removeItem("file");

                document.getElementsByClassName("loading")[0].style.display = "none";
                //request for update request

                fetch(`https://api2xcell.herokuapp.com/api/v1/modules/${moduleId}`).then(response => response.json()).then(data => {
                    setmoduleData(data.data.module.resources)
                    notify("Update Done");
                    document.getElementsByClassName("addCountry_modal_button_add")[0].disabled = false
                })

            });
            return;
        }

        //add Modules
        if (localStorage.getItem("file")) {
            console.log("HELLO");
            document.getElementsByClassName("addCountry_modal_button_add")[0].disabled = true
            notify("Hold 1s request in process");
            document.getElementsByClassName("loading")[0].style.display = "none";
            var form = new FormData();
            var id = localStorage.getItem("leftId");
            form.append("file", file);
            form.append("file", file1);
            form.append("file", file2);
            console.log(file, file1, file2);

            form.append("name", val);
            form.append("topicId", id);

            console.log(file, val, id);
            fetch(`https://api2xcell.herokuapp.com/api/v1/modules/`, {
                method: "POST",
                body: form,
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Success:", result);

                    notify("success Full Upload Modules");
                    closeModal();
                    fetch(`https://api2xcell.herokuapp.com/api/v1/topics/${id}`)
                        .then((data) => data.json())
                        .then((res) => {
                            console.log(res);
                            setCardData(res.data ? res.data.topic.modules : []);
                            localStorage.removeItem("file");
                            document.getElementsByClassName("loading")[0].style.display =
                                "none";
                            setFile("");
                            setFile1("");
                            setFile2("");
                            notify("Updated Done");
                            document.getElementsByClassName("addCountry_modal_button_add")[0].disabled = false
                        });
                });
        }

        //add Topic
        if (selectBoxData === "Enter Topic") {
            notify("Hold 1s request in process");
            const id = localStorage.getItem("chapterId");
            const data = {
                chapterId: id,
                name: val,
                trial: "true",
            };

            fetch("https://api2xcell.herokuapp.com/api/v1/topics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    fetch(`https://api2xcell.herokuapp.com/api/v1/chapters/${id}`)
                        .then((data) => data.json())
                        .then((res) => {
                            setHeaderData(res ? res.data.chapter.topics : []);
                            notify("add new Topic");
                            setFile("");
                            setFile1("");
                            setFile2("");
                            closeModal();
                            notify("Updated Done");
                        });
                });
        }

        //add board in particular country
        if (selectBoxData === "Enter Board") {
            notify("Hold 1s request in process");

            const data = {
                countryId: localStorage.getItem("id"),
                name: val,
            };
            fetch("https://api2xcell.herokuapp.com/api/v1/boards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    var countryid = localStorage.getItem("Countryid");
                    fetch(`https://api2xcell.herokuapp.com/api/v1/countries/${countryid}`)
                        .then((data) => data.json())
                        .then((res) => {
                            setHeaderData(res.data.country.boards); //set the country item at left
                            closeModal();
                            notify("Updated Done");
                        });
                });
        }

        //add  class in particular country
        if (selectBoxData === "Enter Class") {
            notify("Hold 1s request in process");

            const data = {
                boardId: localStorage.getItem("leftId"),
                name: val,
            };
            fetch("https://api2xcell.herokuapp.com/api/v1/courses/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    var leftTabId = localStorage.getItem("leftId");
                    fetch(`https://api2xcell.herokuapp.com/api/v1/boards/${leftTabId}`)
                        .then((data) => data.json())
                        .then((res) => {
                            console.log(res);
                            setCardData(res.data ? res.data.board.courses : []);
                            closeModal();

                            notify("Updated Done");
                        });
                });
        }

        // add Subject in course/class Enter  Subject Complete
        if (selectBoxData === "Enter Subjects") {
            notify("Hold 1s request in process");
            const data = {
                courseId: localStorage.getItem("courseid"), //course id
                name: val,
            };

            console.log(data, "entering data in course");
            fetch("https://api2xcell.herokuapp.com/api/v1/subjects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    //take course id for left side data updation
                    const courseId = localStorage.getItem("courseid");

                    fetch(`https://api2xcell.herokuapp.com/api/v1/courses/${courseId}`)
                        .then((res) => res.json())
                        .then((data) => {
                            setHeaderData(data.data.course.subjects);

                            notify("Updated Done");
                            closeModal();
                        });
                });
        }

        //add  Chapter in subjects Complete
        if (selectBoxData === "Enter Chapter") {
            notify("Hold 1s request in process");
            var data = undefined;
            var courseMode = localStorage.getItem("courseMode");
            console.log(courseMode);
            if (courseMode === "regular") {
                data = {
                    subjectId: localStorage.getItem("leftId"),
                    name: val,
                };
            } else {
                data = {
                    subjectId: localStorage.getItem("leftId"),
                    name: val,
                    trial: true,
                };
            }

            console.log(data);
            fetch("https://api2xcell.herokuapp.com/api/v1/chapters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);

                    var leftTabId = localStorage.getItem("leftId");
                    //fetch all subjects for updating the state
                    fetch(`https://api2xcell.herokuapp.com/api/v1/subjects/${leftTabId}`)
                        .then((data) => data.json())
                        .then((res) => {
                            console.log(res.data);
                            localStorage.setItem(
                                "CardDataForFiltering",
                                JSON.stringify(res.data.subject.chapters)
                            ); //set Card Data
                            //when added regular mode update data according regular
                            if (localStorage.getItem("courseMode") === "regular") {
                                var newData = JSON.parse(
                                    localStorage.getItem("CardDataForFiltering")
                                ).filter((item) => {
                                    if (!item.trial) return item;
                                });
                                setCardData(newData);
                            }
                            //when added trial mode update data according regular
                            else {
                                var newData = JSON.parse(
                                    localStorage.getItem("CardDataForFiltering")
                                ).filter((item) => {
                                    if (item.trial) return item;
                                });
                                setCardData(newData);
                            }

                            closeModal();

                            notify("Updated Done");
                        });
                });
        }

        //ADD COUNTRY

        if (
            Array.isArray(selectBoxData) &&
            !localStorage.getItem("editCountryId")
        ) {
            const data = {
                name: val,
            };
            fetch("https://api2xcell.herokuapp.com/api/v1/countries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status !== "error") {
                        notify("successfully added");

                        fetch(
                            "https://api2xcell.herokuapp.com/api/v1/countries?page=1&limit=10"
                        )
                            .then((data) => data.json())
                            .then((res) => {
                                setPageData(res.data.countries);
                            });

                        fetch("https://api2xcell.herokuapp.com/api/v1/countries")
                            .then((data) => data.json())
                            .then((res) => {
                                setLength(res.data.countries.length);
                            });
                    } else notify("error");
                    closeModal();
                });
        }

        //edit Country
        if (localStorage.getItem("editCountryId")) {
            let id = localStorage.getItem("editCountryId");
            let data = {
                name: val,
            };
            fetch(`https://api2xcell.herokuapp.com/api/v1/countries/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    //update State request on the same page where we reside on page
                    fetch(
                        "https://api2xcell.herokuapp.com/api/v1/countries?page=1&limit=10"
                    )
                        .then((data) => data.json())
                        .then((res) => {
                            setPageData(res.data.countries);
                        });
                    //notification Of Updation
                    notify("Edit SuccessFully");
                    //Update Of Inner Html
                    document.getElementsByClassName("dynamicheading")[0].innerHTML =
                        "Add Country";
                    //localStorage Removal
                    localStorage.removeItem("editCountryId");

                    closeModal();
                });
        }
    };

    //jsx started of  modal

    return (
        <div className="addCountry">
            <div className="addCountry_heading">
                <h2 className="dynamicheading">Add {addData}</h2>
                <h3
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    X
                </h3>
            </div>
            {statusOfUpload === false ? (
                <div className="addCountry_body">
                    <label>{addData}</label>
                    {/**add Country */}
                    {Array.isArray(selectBoxData) === true ? (
                        <select
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        >
                            {countryList.map((item) => {
                                return (
                                    <>
                                        <option value={item}>{item}</option>
                                    </>
                                );
                            })}
                        </select>
                    ) : (
                        <>
                            <input type="text" placeholder={selectBoxData} value={val} onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            ></input>
                        </>
                    )}
                </div>
            ) : (
                <>
                    {/**module add */}
                    <div className="addModule_body" style={{ display: "flex", paddingLeft: "0px", width: "100%", alignItems: "center", justifyContent: "center", }}>
                        {selectBoxData != "Enter Resources Name" ? (<input value={val} onChange={(e) => { setValue(e.target.value); }}
                            style={{ marginTop: "-5px", height: "27px", width: "44%", marginLeft: "-2px", marginRight: "20px", border: "1px solid gray", borderRadius: "5px", }}
                            type="text"
                            placeholder={selectBoxData}
                        ></input>
                        ) : ("")}
                        <div className="upload_test_body">
                            <div style={{ width: "190px", height: "30px" }}>
                                <DropzoneDialogExample setFile={setFile} filetype={"image"} ></DropzoneDialogExample>
                                <h4>{file === "" ? <>Image Upload</> : file.name}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="upload_test_body" style={{ width: "47%", float: "left" }}>
                        <div style={{ width: "190px", height: "30px" }}>
                            <DropzoneDialogExample setFile1={setFile1} filetype={"video"} ></DropzoneDialogExample>
                            <h4>{file1 === "" ? <>Video Upload</> : file1.name}</h4>
                        </div>
                    </div>

                    <div className="upload_test_body" style={{ width: "48.5%", paddingLeft: "17px" }}>
                        <div style={{ width: "190px", height: "30px" }}>
                            <DropzoneDialogExample setFile2={setFile2} filetype={"zip"} ></DropzoneDialogExample>
                            <h4>{file2 === "" ? <>Zip File Uplaod</> : file2.name}</h4>
                        </div>
                    </div>
                </>
            )}
            {/**buttons section */}
            <div className="addCountry_modal_button">
                <button className="addCountry_modal_button_add" onClick={(e) => {
                    submitData();

                }}>
                    Add
                </button>
                <button className="addCountry_modal_button_cancel" onClick={() => { closeModal(); }}>
                    Cancel
                </button>
            </div>

            {/**Toast Notificatoin */}
            <ToastContainer />
        </div>
    );
}

export default AddCountry;

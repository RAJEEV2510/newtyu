import React from 'react'
import './exportData.css'
function ExportData() {

    const closeModal = () => {
        document.getElementsByClassName("export_Data")[0].style.top = "-80%"
    }

    return (
        <div className="export_Data">
            <div className="export_Data_heading">
                <h3>Export Data</h3>
                <h3 style={{ cursor: 'pointer' }} onClick={() => { closeModal() }} > X</h3>
            </div>
            <div className="export_Data_body">
                <h6>Register User</h6>
                <div className="export_Data_body_part1">
                    <div className="export_Data_body_part1_signup_date">
                        SIGNUP DATE
                        <input type="date"></input>
                    </div>
                    <div className="export_Data_body_part1_expiry_date">
                        EXPIRY DATE
                        <input type="date"></input>
                    </div>
                </div>
                <h6 style={{ marginTop: "10px" }}>USER ACTIVITY</h6>
                <div className="export_Data_body_part2">
                    <div className="export_Data_body_part1_from_date">
                        FROM
                        <input type="date"></input>
                    </div>
                    <div className="export_Data_body_part1_to_date">
                        TO
                        <input type="date"></input>
                    </div>
                </div>
            </div>
            <div className="export_Data_lower">
                <div className="export_Data_lower_button1">
                    <button onClick={() => { closeModal() }}>Cancel</button>
                </div>
                <div className="export_Data_lower_button2">
                    <button>Export</button>
                </div>
            </div>
        </div >
    )
}

export default ExportData

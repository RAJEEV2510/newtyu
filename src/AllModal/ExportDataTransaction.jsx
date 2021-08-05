import React from 'react'
import './exportDataTransaction.css'
function ExportDataTransaction() {
    return (
        <div className="export_data_transaction">
            <div className="export_data_transaction_heading">
                <h2>Export DATA</h2>
                <h4> X</h4>

            </div>
            <div className="export_data_transaction_mid_part">

                <h4>Payment Details</h4>
                <div className="export_data_transaction_mid_part1">
                    <div>
                        FROM
                        <input type="date"></input></div>
                    <div>
                        TO
                        <input type="date"></input>
                    </div>
                </div>
                <h4>Expired Details</h4>
                <div className="export_data_transaction_mid_part2">
                    <div>
                        FROM
                        <input type="date"></input></div>
                    <div>
                        TO
                        <input type="date"></input>
                    </div>
                </div>
                <h4>Activation Code Users</h4>
                <div className="export_data_transaction_mid_part3">
                    <div>
                        FROM
                        <input type="date"></input></div>
                    <div>
                        TO
                        <input type="date"></input>
                    </div>
                </div>

            </div>
            <div className="export_data_transaction_lower_part">
                <div className="export_data_transaction_lower_part_button1">
                    <button>Cancel</button>
                </div>
                <div className="export_data_transaction_lower_part_button2">
                    <button>Export</button>
                </div>
            </div>
        </div>
    )
}

export default ExportDataTransaction

import React, { useState, useEffect } from 'react'
import './dashboard.css'
import user from '../user-circle.svg'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import useTable from './useTableDashboard'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Line } from 'react-chartjs-2';
import {Link} from 'react-router-dom';
import Chart from 'chart.js';
import CachedIcon from '@material-ui/icons/Cached';

//data and options for line charts
const datas = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

    datasets: [
        {
            label: "User Activity",
            data: [12, 19, 3, 5, 2, 3, 10, 11, 23, 23, 45, 23, 24, 21,],
            fill: false,
            backgroundColor: '#5ce0d2',
            borderColor: '#5CE0D2',

        },

    ],
};


const options = {


};


function Dashboard() {
    //labelling of data in table view on component render
    const headCells = [
        { id: 1, label: "Name." },
        { id: 2, label: "Roll No" },
        { id: 3, label: "Class" },
        { id: 4, label: "Chapter" },
        { id: 5, label: "Topic" },
        { id: 6, label: "Module" },
        { id: 7, label: "Visit On" },

    ]

    const [length, setLength] = useState(0)
    const [data, setData] = useState([])

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(data, length, setData, headCells) //user defined hooks

    useEffect(() => {

        //1. request on Teacher Data
        fetch("http://localhost:3000/data").then(data => data.json()).then((res) => {
            setData(res)


        })

    }, []);



    return (
        <div className="dashboard">
            <div className="dashboard-upper-part">
                <div className="dashboard-upper-part-left">
                    <h2>Father Angel Schools</h2>
                    <p>Monday, 5, 2020</p>
                </div>
                <div className="dashboard-upper-part-right">
                    <Link to="/profile/edit"><img src={user}></img></Link>
                </div>
            </div>
            <div className="dashboard-mid-part">
                <div className="dashboard-mid-part-upper">
                    <div className="dashboard-mid-part-upper-left">
                        <div className="dashboard-mid-part-upper-left-1">
                            User Activity&nbsp; <CachedIcon></CachedIcon>
                        </div>
                        <p>Active Users in last 12 hours</p>

                    </div>
                    <div className="dashboard-mid-part-upper-right" >
                        <SystemUpdateAltOutlinedIcon style={{ marginTop: "4px" }}></SystemUpdateAltOutlinedIcon> &nbsp;Export csv
                    </div>


                </div>
                <div className="dashboard-mid-part-lower">
                    <Line data={datas} options={{
                        maintainAspectRatio: false,
                        scales: {

                            x: { grid: { display: false, } },

                        }
                    }} width={300} height={280} />

                </div>

            </div>
            <div className="dashboard-lower-part">
                <div className="dashboard-lower-part-heading">
                    <div className="dashboard-lower-part-heading-left">
                        <h3>Page Visits</h3>
                    </div>
                    <div className="dashboard-lower-part-heading-right">
                        <div className="dashboard-lower-part-heading-right-icon1">
                            <SystemUpdateAltOutlinedIcon style={{ marginTop: "4px" }}></SystemUpdateAltOutlinedIcon> &nbsp;Export csv
                        </div>
                        <div className="dashboard-lower-part-heading-right-icon2">
                            <FilterListIcon style={{ marginTop: "4px" }}></FilterListIcon > &nbsp;Filter
                        </div>
                    </div>

                </div>
                <div className="dashboard-lower-part-body">

                    <TblContainer>
                        <TblHead></TblHead>
                        <TableBody>

                            <TableRow >
                                <TableCell>schoolname</TableCell>
                                <TableCell>board</TableCell>
                                <TableCell>Branch</TableCell>
                                <TableCell>Branch</TableCell>
                                <TableCell>Branch</TableCell>
                                <TableCell>Branch</TableCell>
                                <TableCell>Branch</TableCell>



                            </TableRow>

                        </TableBody>

                    </TblContainer>

                </div>
            </div>
        </div>
    )
}

export default Dashboard

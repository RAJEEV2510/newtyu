import React from 'react'
import './sidebar.css'
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { Link } from 'react-router-dom'
import LaptopMacOutlinedIcon from '@material-ui/icons/LaptopMacOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
function Sidebar() {
    return (
        <div className="Sidebar">
            <div className="Above-div">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className="Above-div-avatar" />
                <div>Admin Name</div>
            </div>
            <div className="Lower-div">
                <div className="Lower-div-above">
                    <div className="menu-Items">
                        <HomeIcon className="menu-Icon" ></HomeIcon>
                        <Link to="/" style={{ textDecoration: "none", color: 'black' }}> <div className="menu-Name"> DASHBOARD</div></Link>
                    </div>
                    <div className="menu-Items allMembers">
                        <GroupOutlinedIcon className="menu-Icon" ></GroupOutlinedIcon>
                        <div className="menu-Name">
                            <Link to="/teacher" className="menu-Items-link" >All MEMBERS
                                <span className="allMemberIcon">

                                    <ChevronRightOutlinedIcon ></ChevronRightOutlinedIcon></span>
                            </Link>
                            <div className="drop-Down" >
                                <div>
                                    <Link to="/teacher" style={{ textDecoration: "none", color: "black" }}>
                                        <div className="link"  >
                                            Teacher</div>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/student" style={{ textDecoration: "none", color: "black" }}>
                                        <div class="link">Students </div></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="menu-Items">
                        <Link to="/grade" style={{ display: "flex", textDecoration: "none", color: "black" }}>
                            <LaptopMacOutlinedIcon className="menu-Icon" ></LaptopMacOutlinedIcon>
                            <div className="menu-Name"> Grades</div>
                        </Link>
                    </div>
                    <div className="menu-Items">
                        <Link to="/role" style={{ display: "flex", textDecoration: "none", color: "black" }}>
                            <PersonOutlineOutlinedIcon className="menu-Icon" ></PersonOutlineOutlinedIcon>
                            <div className="menu-Name"> Role Mapping</div>
                        </Link>
                    </div>
                </div>
                <div className="Lower-div-Lower" >
                    <div className="Lower-div-Lower-Icon">
                        <ExitToAppIcon></ExitToAppIcon>
                    </div>
                    <div className="logout">
                        Logout
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar

import React from 'react'
import './ProfileSidebar.css'
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

function ProfileSidebar() {
    return (
        <div className="ProfileSidebar">
            <div className="Above-div">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className="Above-div-avatar" />
                <div>Admin Name</div>
            </div>
            <div className="Lower-div">
                <div className="Lower-div-above">
                    <div className="menu-Items">
                        <PersonIcon className="menu-Icon" ></PersonIcon>
                        <Link to="/profile/edit" style={{ textDecoration: "none", color: 'black' }}> <div className="menu-Name"> Edit Profile</div></Link>
                    </div>

                    <div className="menu-Items">
                        <Link to="/profile/password" style={{ display: "flex", textDecoration: "none", color: "black" }}>
                            <LocalMallOutlinedIcon className="menu-Icon" ></LocalMallOutlinedIcon>
                            <div className="menu-Name"> Password</div>
                        </Link>
                    </div>
                    <div className="menu-Items">
                        <Link to="/profile/registration-info" style={{ display: "flex", textDecoration: "none", color: "black" }}>
                            <LibraryBooksOutlinedIcon className="menu-Icon" ></LibraryBooksOutlinedIcon>
                            <div className="menu-Name"> Registration Info</div>
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

export default ProfileSidebar

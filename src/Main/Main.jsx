import React from 'react'
import './main.css'
import Dashboard from '../Dashboard/Dashboard'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import Teachers from '../Teacher/TeacherInnerProfile/Teachers'
import { TeacherProfile } from '../Teacher/TeacherInnerProfile/Teachers'
import Sidebar from '../Sidebar/Sidebar'
import Teacher from '../Teacher/Teacher'
import { StudentProfile } from '../Student/StudentInnerProfile/Student'
import Student from '../Student/Student'
import Grade from '../Grade/Grade'
import Role from '../RoleMapping/Role'
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar'
import Profile from '../Profile/Profile'
import EditProfile from '../Profile/EditProfile/EditProfile'
import Password from '../Profile/Password/Password'
import RegistrationInfo from '../Profile/RegistrationInfo/RegistrationInfo'


function Main() {
    return (
        <div className="main">
            <BrowserRouter>

                {/**Left Side */}
                <Switch>
                    <Route path="/profile">
                        <ProfileSidebar></ProfileSidebar>
                    </Route>
                    <Route path="/">
                        <Sidebar></Sidebar>
                    </Route>
                </Switch>
                {/**Right Side */}
                <Switch>
                    
                    <Route path="/" exact >
                        <Dashboard></Dashboard>
                    </Route>
z                    <Route path="/teacher">
                        <Teacher></Teacher>
                    </Route>
                    <Route path="/dashboard/teacher">
                        <TeacherProfile></TeacherProfile>
                    </Route>
                    <Route path="/student">
                        <Student></Student>
                    </Route>
                    <Route path="/dashboard/student" exact>
                        <StudentProfile></StudentProfile>
                    </Route>
                    <Route path="/grade" exact>
                        <Grade></Grade>
                    </Route>
                    <Route path="/role" exact>
                        <Role></Role>
                    </Route>
                    <Route path="/profile">
                        <Profile></Profile>
                    </Route>
                </Switch>

            </BrowserRouter>

        </div>
    )
}

export default Main

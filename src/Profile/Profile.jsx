import React,{ useState,useEffect} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import EditProfile from './EditProfile/EditProfile'
import Password from './Password/Password'
import RegistrationInfo from './RegistrationInfo/RegistrationInfo'

function Profile() {

    const [profileInfo,setProfileInfo] = useState(null)
    const [passwordInfo,setPasswordInfo] = useState(null)
    const [registrationInfo,setRegistrationInfo] = useState(null)

    const getSchoolInfo = async ()=>{
        // States to be updated here after fetching data 
        //Then they are passed as props to the child components
    }

    useEffect(() => {
        getSchoolInfo()
    },[])


    return (
        <div className="EditProfile">
                <Switch>
                    <Route path="/profile/edit">
                        <EditProfile profileInfo={profileInfo}></EditProfile>
                    </Route>
                    <Route path="/profile/password">
                        <Password passwordInfo={passwordInfo}></Password>
                    </Route>
                    <Route path="/profile/registration-info">
                        <RegistrationInfo registrationInfo={registrationInfo}></RegistrationInfo>
                    </Route>
                </Switch>
        </div>
    )
}

export default Profile

import React,{ useState} from 'react'
import user from '../../user-circle.svg'
import CloseBtn from '../CloseBtn'
import './Password.css'

function Password({passwordInfo}) {

    const oldPassword = "someDummyPassword"
    const [newPassword, setNewPassword] = useState(null)

    const updatePassword = () => {}

    return (
        <div className="Password">
            <div className="heading">
                <p>Password</p>
            </div>

            <CloseBtn></CloseBtn>

            <div className="info-container">
                <img src={user} alt="" />
                <span>
                    <p id="school-name">Father Agnel School</p>
                    <p id="school-address">Sector 62, Noida</p>
                </span>
            </div>

            <div className="password-container">
                <span>
                    <label htmlFor="old-password">Old Password</label>
                    <input type="password" className="old-password" value={oldPassword} />
                </span>
                <span>
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" onChange={(e)=>{setNewPassword(e.target.value)}} name="nw-password"/>
                    <p className="password-message">Minimum 8 characters</p>
                </span>
            </div>

            <div className="button-container">
                <button className="save-password-btn" type="button" onClick={()=>{updatePassword()}}>SAVE</button>
            </div>

        </div>
    )
}

export default Password

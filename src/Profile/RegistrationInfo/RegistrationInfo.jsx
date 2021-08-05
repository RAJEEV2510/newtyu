import React from 'react'
import CloseBtn from '../CloseBtn'
import './RegistrationInfo.css'

function RegistrationInfo({registrationInfo}) {
    return (
        <div className="RegistrationInfo">
            <div className="heading">
                <p>Registration</p>
            </div>

            <CloseBtn></CloseBtn>

            <div className="information-container">
                <div className="registration-date">
                    <p>Registration Date</p>
                    <span>
                        <p>Apr 24,2020</p>
                    </span>
                </div>

                <div className="expiry-date">
                    <p>Expiry Date</p>
                    <span>
                        <p>Apr 23,2021</p>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default RegistrationInfo

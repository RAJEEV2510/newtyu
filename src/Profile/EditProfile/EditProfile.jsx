import React from 'react'
import user from '../../user-circle.svg'
import CloseBtn from '../CloseBtn'
import './EditProfile.css'


function EditProfile({profileInfo}) {
    return (
        <div className="EditProfile">

            <div className="heading">
                <p>Edit Profile</p>
            </div>
            <CloseBtn></CloseBtn>
            {/* For the image and buttons on top of the page   */}
            <div className="image-container">
                <img className="profile-image" src={user} alt="Profile-Image" />
                <button className="upload-picture-btn">UPLOAD PICTURE</button>
                <button className="delete-picture-btn">DELETE</button>
            </div>

            {/* input fields  */}
            <div className="form-container">

                <span className="school-name-section">
                    <label htmlFor="school-name">School</label>
                    <input type="text" name="school-name" required className="school-name" />
                </span>
                
                <span className="address">
                    <span>
                        <label htmlFor="state">State</label>
                        <select name="state" id="state">
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                        </select>
                    </span>
                    
                    <span>
                        <label htmlFor="city">City</label>
                        <select name="city" id="city">
                            <option value="Noida">Noida</option>
                        </select>
                    </span>
                    
                    <span>
                        <label htmlFor="branch">Branch</label>
                        <select name="branch" id="branch">
                            <option value="Sector 62">Sector 62</option>
                        </select>  
                    </span>                                     
                </span>
                <span className="contact">
                    <span>
                        <label htmlFor="email">Email</label>
                        <input type="email" nam="email" className="email"/>
                    </span>

                    <span>
                        <label htmlFor="number">Primary Contact</label>
                        <input type="number" nam="number" className="number"/>
                    </span>

                </span>

            </div>
            <div className="button-container">
                <button className="save-profile-btn" type="button" >SAVE</button>
            </div>
            
        </div>
    )
}

export default EditProfile

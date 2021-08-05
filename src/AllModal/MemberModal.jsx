import React from 'react'
import './MemberModal.css'
import { Button } from '@material-ui/core'
function MemberModal() {

    const closeModal = () => {

        var closeModal = document.getElementsByClassName('filterMember')[0];
        closeModal.style.top = "-47%";
    }

    return (
        <div className="filterMember">
            <div><h2  >Filter</h2></div>
            <div className="filterMember_form">
                <div className="filter_school">
                    <label>Select School</label><br></br>
                    <select >
                        <option value="dnp">dnp</option>
                        <option value="snp">snp</option>
                        <option value="cnp">cnp</option>
                        <option value="pnp">pnp</option>
                    </select>
                </div>
                <div className="filter_branch_role">
                    <div className="filter_branch">
                        <label>Select Branch</label><br></br>
                        <select placeholder="none">
                            <option value="cse"></option>
                            <option value="ece"></option>
                            <option value="chemical"></option>
                            <option value="ee"></option>
                        </select>
                    </div>
                    <div className="filter_role">
                        <label>Select Role</label><br></br>
                        <select placeholder="none">
                            <option value="role1">role1</option>
                            <option value="role2">role2</option>
                            <option value="role3">role3</option>
                            <option value="rol4">role3</option>
                        </select>
                    </div>

                </div>
                <div className="filter_signupDate_filter_ExpiryDate">
                    <div className="filter_signupDate">
                        <label>Select SignupDate</label><br></br>
                        <input type="date"></input>

                    </div>
                    <div className="filter_expiryDate">
                        <label>Select ExpiryDate</label><br></br>
                        <input type="date" ></input>
                    </div>

                </div>

                <div class="filter-teacher-btn">
                    <div class="filter_createBtn">
                        <button >
                            Apply
                        </button>
                    </div>
                    <div class="filter_cancelBtn" onClick={() => { closeModal() }}>
                        <button >
                            Cancel
                        </button>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default MemberModal


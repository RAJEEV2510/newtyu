import React from 'react'
import './schoolDetailsFilter.css'
function SchoolDetailsFilter() {

    const closeModal = () => {

        document.getElementsByClassName("school_details_filter")[0].style.top = "-60%"
    }

    return (
        <div className="school_details_filter" >
            <div className="school_details_filter_upper_part">
                <h2>Filters</h2> <h2 style={{ cursor: "pointer" }} onClick={closeModal}>X</h2>
            </div>
            <div className="school_details_filter_mid_part">
                <div className="school_details_filter_mid_part_child1">
                    <div className="school_details_filter_mid_part_school">
                        School
                        <select>
                            <option>school1</option>
                            <option>school1</option>
                            <option>school1</option>

                        </select>
                    </div>
                    <div className="school_details_filter_mid_part_branch">
                        Branch
                        <select>
                            <option>branch1</option>
                            <option>branch1</option>
                            <option>branch1</option>

                        </select>
                    </div>
                </div>
                <div className="school_details_filter_mid_part_child2">
                    <div className="school_details_filter_mid_part_class">
                        Class
                        <select>
                            <option>class1</option>
                            <option>class1</option>
                            <option>class1</option>

                        </select>
                    </div>
                    <div className="school_details_filter_mid_part_section">
                        Section
                        <select>
                            <option>section1</option>
                            <option>section1</option>
                            <option>section1</option>

                        </select>
                    </div>
                </div>
                <div className="school_details_filter_mid_part_child3">
                    <div className="school_details_filter_mid_part_expiry_date">
                        Expiry Date
                        <input type="date"></input>
                    </div>
                    <div className="school_details_filter_mid_part_signup_date">
                        Signup Date
                        <input type="date"></input>
                    </div>
                </div>

            </div>
            <div className="school_details_filter_lower_part">
                <div className="school_details_filter_lower_part_button1">
                    <button onClick={closeModal}> Cancel</button>
                </div>
                <div className="school_details_filter_lower_part_button2">
                    <button>  Apply</button>
                </div>
            </div>
        </div>
    )
}

export default SchoolDetailsFilter

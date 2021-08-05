import React, { useState } from 'react'
import './search.css'
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
function Search({ TblPagination, records, setFilterFn, school, paginationCheck, searchStatus, setPageData }) {



    const handleSearch = (e) => {

        let target = e.target;


        if (target.value === "") {

            fetch(`https://api2xcell.herokuapp.com/api/v1/schools?limit=10`).then(response => response.json()).then(data => {
                setPageData(data.data.schools)
            })

            //fetch the 1st page. or take the data from ist page
        }
        else {
            fetch(`https://api2xcell.herokuapp.com/api/v1/schools?name[regex]=${target.value}&name[options]=i`).then(response => response.json()).then(data => {
                setPageData(data.data.schools)
            })
            // setPageData(records.filter(x => x.schoolname.toLowerCase().includes(target.value.toLowerCase())))

        }


    }

    return (

        <div className="search">
            {/**Nav-Left*/}
            <div className="Main_body_tag_Name_Search">
                <span className="tag_Name">{school} <span> | </span></span>
                <div className="search-icon-input">
                    {searchStatus === "Yes" ?
                        <><SearchIcon className="search-icon" style={{ top: "12px" }}></SearchIcon>
                            <input type="text" placeholder="Search Something" onChange={handleSearch}></input>

                        </> : ""}
                </div>
            </div>
            {/**Nav-Right*/}
            <div className="searchbar-pagination">

                {paginationCheck === "Yes" ?
                    <TblPagination></TblPagination> : <>
                        <h3 onClick={(e) => { window.location.href = "/" }}>X</h3></>
                }

            </div>

        </div>
    )
}

export default Search

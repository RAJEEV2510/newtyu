import React, { useState } from 'react'
import './search.css'
import SearchIcon from '@material-ui/icons/Search';

import user from '../user-circle.svg'
function Search({ TblPagination, paginationCheck, searchStatus, setData }) {



    const handleSearch = (e) => {

        let target = e.target;
        if (target.value === "") {
            fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=61064e25ac909b0015cfc04c`).then((data) => data.json()).then((res) => {
                setData(res.data.grades)
            })


        }

        else {


            fetch(`https://api2xcell.herokuapp.com/api/v1/grades?schoolId=61064e25ac909b0015cfc04c?name[regex]=${target.value}&name[options]=i`).then((data) => data.json()).then((res) => {

                setData(res.data.grades)
            })

        }


    }

    return (
        <>
            <div className="searchNav" style={{ marginTop: "10px" }}>
                <div className="searchNav-left">
                    <div className="searchNav-left-heading" style={{ marginBottom: "60px", marginTop: "-20px" }} >
                        <h2>Grades</h2>

                    </div>
                    <div className="searchNav-left-heading-pagination">
                        {paginationCheck === "Yes" ?
                            <TblPagination></TblPagination> : <>
                            </>}
                    </div>
                </div>
                {/**Search Right */}
                <div className="searchNav-right">
                    <div className="searchNav-right-searchinput">

                        {/* <input type="text" placeholder="Search Something" onChange={handleSearch}></input>
                        <SearchIcon className="search-icon"></SearchIcon> */}

                    </div>
                    <div className="searchNav-right-user">
                        <img src={user}></img>
                    </div>

                </div>


            </div>

        </>
    )
}

export default Search

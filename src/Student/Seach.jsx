import React, { useState } from 'react'
import './search.css'
import SearchIcon from '@material-ui/icons/Search';

import user from '../user-circle.svg'
function Search({ TblPagination, paginationCheck, searchStatus, setData, setLength }) {



    const handleSearch = (e) => {

        let target = e.target;

        if (target === "") {

            fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c&page=1&limit=10`)
                .then((res) => res.json())
                .then((data) => {

                    setData(data.data.students)


                })
            fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c`)
                .then((res) => res.json())
                .then((data) => {

                    setLength(data.results)
                })
        }



        else {


            fetch(`https://api2xcell.herokuapp.com/api/v1/students?school=61064e25ac909b0015cfc04c&name[regex]=${target.value}&name[options]=i`).then((data) => data.json()).then((res) => {

                setData(res.data.students)
            })

        }


    }

    return (
        <>
            <div className="searchNav">
                <div className="searchNav-left">
                    <div className="searchNav-left-heading">
                        <h2>Students</h2>

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
                        {searchStatus === "Yes" ?
                            <>  <input type="text" placeholder="Search Something" onChange={handleSearch}></input>
                                <SearchIcon className="search-icon"></SearchIcon>
                            </> : ""}
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

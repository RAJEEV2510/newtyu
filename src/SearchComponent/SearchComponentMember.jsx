import React, { useState } from 'react'
import './search.css'
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import user from '../user-circle.svg'
function Search({ TblPagination, records, school, paginationCheck, searchStatus, crossStatus, setPageData, searchBy }) {



    const handleSearch = (e) => {

        // let target = e.target;

        //         // fetch(`https://api2xcell.herokuapp.com/api/v1/countries?page=1&limit=10`).then((data) => data.json()).then((res) => {
        //         //     setPageData(res.data.countries)
        //         // })


        // }

        // else {


        //         // fetch(`https://api2xcell.herokuapp.com/api/v1/countries?name[regex]=${target.value}&name[options]=i`).then((data) => data.json()).then((res) => {

        //         //     setPageData(res.data.countries)
        //         // })

        //     }


    }

    return (
        <>
            <div className="searchNav">
                <div className="searchNav-left">
                    <div className="searchNav-left-heading">
                        <h2>Teachers</h2>

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

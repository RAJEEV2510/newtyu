import React, { useState } from 'react'
import './search.css'
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
function Search({ TblPagination, records, setFilterFn, school, paginationCheck, searchStatus, crossStatus, setPageData, searchBy, cardData, setCardData, moduleData, setmoduleData }) {



    const handleSearch = (e) => {

        var tempData = JSON.parse(localStorage.getItem("tempData"))
        const searchString = e.target.value.toLowerCase();
        var flag = false
        const filteredCharacters = tempData.filter(character => {
            if (character.name) {
                flag = true
                return character.name.toLowerCase().includes(searchString)
            }
            else
                return character.fileName.toLowerCase().includes(searchString)

        });
        if (flag)
            setCardData(filteredCharacters)
        else
            setmoduleData(filteredCharacters)
    }

    return (
        <>
            <div className="NavBarMembers" >
                <div className="search">
                    {/**Nav-Left*/}
                    <div className="Main_body_tag_Name_Search">
                        <span className="tag_Name">{school} <span> | </span></span>
                        <div className="search-icon-input">
                            {searchStatus === "Yes" ?
                                <><SearchIcon className="search-icon"></SearchIcon>
                                    <input type="text" placeholder="Search Something" onChange={

                                        handleSearch}></input>
                                </> : ""}
                        </div>
                    </div>
                    {/**Nav-Right*/}
                    <div className="searchbar-pagination">

                        {paginationCheck === "Yes" ?
                            <TblPagination></TblPagination> : <>
                            </>

                        }

                    </div>


                </div>

                {crossStatus === "NO" ? "" :
                    <div className="cross" onClick={() => { window.location.href = "/" }}>
                        X
                    </div>}

            </div>
        </>
    )
}

export default Search

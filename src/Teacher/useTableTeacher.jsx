import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

    table: {
        marginTop: theme.spacing(3),

        '& thead th': {
            fontweight: 700,
            cursor: "pointer",
            color: "gray",

            backgroundColor: "white"
        },
        '& tbody tr:hover': {
            backgroundColor: "#5CE0D2",
            cursor: "pointer"
        },
        'td': {
            width: "200px"
        }
    }
}))

function useTable(setData, headCells, length, page, setPage) {

    const classes = useStyles();
    const pages = [10, 25, 50, 100];

    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const schoolId = localStorage.getItem("schools")
    //table conmponent
    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )
    const TblHead = props => {
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((item) => (
                        <TableCell key={item.id}>{item.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    const handleChange = (event, newPage) => {

        setPage(newPage)
        recordsAfterPagingAndSorting(newPage)
        setRowsPerPage(rowsPerPage)

    }

    const handleChangeRowsPerPage = async (event) => {

        setRowsPerPage(parseInt(event.target.value, 10))

        const schoolId = "61064e25ac909b0015cfc04c"


        // const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}&page=${page + 1}&limit=${parseInt(event.target.value, 10)}`)
        // const arrayData = await data.json();
        // setData(arrayData.data.students)

        const DataType = localStorage.getItem("dataType");
        let signed = localStorage.getItem("signed");
        const SortBy = localStorage.getItem("sortBy");


        if (DataType && SortBy) {


            if (SortBy == "desc") {
                signed = "-"
            }
            else {
                signed = ""
            }
            const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}&page=${page + 1}&limit=${parseInt(event.target.value, 10)}&sort=${signed}${DataType}`)
            const arrayData = await data.json();
            setData(arrayData.data.staffs)
        }
        else {
            const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}&page=${page + 1}&limit=${parseInt(event.target.value, 10)}`)
            const arrayData = await data.json();
            setData(arrayData.data.staffs)
        }


    }

    const recordsAfterPagingAndSorting = async (newPage) => {

        //take page also
        const schoolId = "61064e25ac909b0015cfc04c"


        const DataType = localStorage.getItem("dataType");
        let signed = localStorage.getItem("signed");
        const SortBy = localStorage.getItem("sortBy");
        console.log(page, "PAGES ")
        if (DataType && SortBy) {


            if (SortBy == "desc") {
                signed = "-"
            }
            else {
                signed = ""
            }
            const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}&page=${newPage + 1}&limit=${rowsPerPage}&sort=${signed}${DataType}`)
            const arrayData = await data.json();
            setData(arrayData.data.staffs)
        }
        else {
            const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/staffs?school=${schoolId}&page=${newPage + 1}&limit=${rowsPerPage}`)
            const arrayData = await data.json();
            setData(arrayData.data.staffs)
        }

    }






    const TblPagination = () => (



        <TablePagination
            component="div"
            page={page}
            // labelRowsPerPage=''
            // rowsPerPageOptions={[]}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={length}
            onChangePage={handleChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}

        ></TablePagination >
    )


    return {
        TblContainer,
        TblHead
        , TblPagination
        , recordsAfterPagingAndSorting
    }
}

export default useTable

import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableContainer } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

    table: {


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
    },
    container: {
        maxHeight: 580
    }
}))

function useTable(records, headCells, filterfn, setPageData, len) {

    const classes = useStyles();
    const pages = [10, 25, 50, 100];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    //table conmponent
    const TblContainer = props => (
        <TableContainer className={classes.container}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
                {props.children}
            </Table>
        </TableContainer>
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
        console.log(newPage)
        setPage(newPage)
        recordsAfterPagingAndSorting(newPage)
        setRowsPerPage(rowsPerPage)

    }

    const handleChangeRowsPerPage = async (event) => {

        setRowsPerPage(parseInt(event.target.value, 10))
        const url = localStorage.getItem("url")
        if (url === "countries") {
            const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/${url}?page=${page + 1}&limit=${parseInt(event.target.value, 10)}`)
            const arrayData = await data.json();
            setPageData(arrayData.data.countries)

        }
    }

    const recordsAfterPagingAndSorting = async (newPage) => {


        const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/countries?page=${newPage + 1}&limit=${rowsPerPage}`)
        const arrayData = await data.json();
        setPageData(arrayData.data.countries)


    }





    const TblPagination = () => (



        <TablePagination
            component="div"
            page={page}
            // labelRowsPerPage=''
            // rowsPerPageOptions={[]}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={len}
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

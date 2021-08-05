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
    },
    caption: {

        marginLeft: "-10px",

        fontSize: "0.875rem"
    },
    toolbar: {
        "& > p:nth-of-type(2)": {
        }
    }


}))

function useTable(data, length, setData, headCells) {

    const classes = useStyles();
    const pages = [10, 25, 50, 100];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

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

        // if (url === "countries") {
        //     const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/${url}?page=${page + 1}&limit=${parseInt(event.target.value, 10)}`)
        //     const arrayData = await data.json();
        //     setPageData(arrayData.data.countries)

        // }
    }

    const recordsAfterPagingAndSorting = async (newPage) => {

        // return filterfn.fn(records).slice(page * rowsPerPage, (page + 1) * rowsPerPage)

        // const url = localStorage.getItem("url")

        // if (url === "countries") {
        //     const data = await fetch(`https://api2xcell.herokuapp.com/api/v1/${url}?page=${newPage + 1}&limit=${rowsPerPage}`)
        //     const arrayData = await data.json();
        //     setPageData(arrayData.data.countries)
        // }

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

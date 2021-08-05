import React from 'react'
import {useHistory} from 'react-router-dom'
import ClearIcon from '@material-ui/icons/Clear';

function CloseBtn() {

    const history = useHistory()

    const closeBtnContainer = {
        position: 'absolute',
        top:'1rem',
        right: '1rem',
    }

    const closeBtnStyle = {
        height: 'fit-content',
        width: 'fit-content',
        backgroundColor:'transparent',
        border:'none',
        cursor: 'pointer',
    }

    return (
        <div style={closeBtnContainer}>
            <button type="button" style={closeBtnStyle} onClick={()=>{history.push("/")}}><ClearIcon></ClearIcon></button>
        </div>
    )
}

export default CloseBtn

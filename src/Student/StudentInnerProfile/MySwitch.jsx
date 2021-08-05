import React, { useState, useEffect } from 'react'
import Switch from 'react-input-switch'
function Myswitch({ enabled }) {


    const [value, setValue] = useState('yes');

    useEffect(() => {
        if (enabled == true) {
            setValue("yes")
        }
        else {
            setValue("no")
        }
    }, [])

    console.log(value)
    return (<Switch on="yes" off="no" value={value} onChange={setValue} />)
}

export default Myswitch

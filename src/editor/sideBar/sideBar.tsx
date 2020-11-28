import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    bar:{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        height: '33px',
        backgroundColor: '#2d3233',
        width: '100%',
        alignItems: 'center',
    }
}) 
export default function sideBar() {
    const classes = useStyles()
    return (
        <div>
            
        </div>
    )
}
